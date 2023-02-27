import {
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
  ScrollView,
  Modal,
  Dimensions, FlatList
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  TextInput,
  Surface,
  Divider,
  Checkbox,
  RadioButton, Card,
} from 'react-native-paper';
import SIPCStyles from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-crop-picker';
import API from '../utility/api';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import RBSheet from "react-native-raw-bottom-sheet";

const SaveSurvey = ({ navigation, route }) => {
  const [surveyData, setSurveyData] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMessage] = useState();
  var surveySessionId = '';
  var userSurveyResultId = 0;


  const { orgId, orgName, buildingId, buildingName, surveyId } = route?.params;

  const finalAnswer = useRef([]);
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const screenHeight = Dimensions.get("window").height;

  const Width = Dimensions.get('window').width;
  const Height = Dimensions.get('window').height;
  const deviceWidth = Dimensions.get('window').width;


  /* ===================== MODAL================ */

  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setError(false);
    setErrorMessage("");
    setVisible(true);
  }
  const hideModal = () => {
    setError(false);
    setErrorMessage("");
    setVisible(false)
  };

  /* ===================Submit MODAL================ */

  const [visible1, setVisible1] = useState(false);
  const showModal1 = () => {
    setError(false);
    setErrorMessage("");
    setFirstName('');
    setLastName('');
    setVisible1(true);
  }
  const hideModal1 = () => {
    setError(false);
    setErrorMessage("");
    setFirstName('');
    setLastName('');
    setVisible1(false);
  }

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [totalQuestion, setTotalQuestion] = useState(0)


  const width = Dimensions.get('window').width;

  useEffect(() => {
    API.instance
      .post(
        `http://sipcsurvey.devuri.com/sipcsurvey/start-survey-device?is_api=true`,
        JSON.stringify({
          appKey: 'f9285c6c2d6a6b531ae1f70d2853f612',
          device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
          surveyId: route?.params?.surveyId,
        }),
      )
      .then(response => {
        setSurveyData(response.surveyData[0]);
        setData(response.data);
        setError(false);
        setErrorMessage("")
      });
  }, []);

  const [numColumns, setNumColumns] = useState(3);
  const maxImages = 10;

  const uploadImage = async (imagePath, answer, setAnswer, answers, images, setImages, imageNames, setImageNames, questionTypeId) => {
    // Check answer image is not null
    if (imagePath != null) {
      // Create FormData
      const data = new FormData();
      data.append("appKey", "f9285c6c2d6a6b531ae1f70d2853f612");
      data.append("device_id", "68d41abf-31bb-4bc8-95dc-bb835f1bc7a1");
      data.append("survey_id", surveyId);
      data.append("user_id", "1");
      data.append("org_id", "1");
      data.append("question_id", answers.question_id);
      data.append("answer_id", answers.answer_id);
      data.append("survey_session_id", surveySessionId == undefined ? '' : surveySessionId);
      data.append("user_survey_result_id", userSurveyResultId == undefined ? 0 : userSurveyResultId);

      data.append("file", {
        name: "image.png",
        fileName: "image",
        type: "image/png",
        uri: Platform.OS === "android" ? imagePath : imagePath.replace("file://", "")
      });


      API.instance
        .upload(
          `http://sipcsurvey.devuri.com/sipcsurvey/upload-survey-image-api?is_api=true`,
          data,
        )
        .then(
          response => {
            surveySessionId = response.survey_session_id;
            userSurveyResultId = response.user_survey_result_id;

            var imageName = response.image_name;

            imageNames.push({ "image": imageName });
            setImageNames([...imageNames]);


            // var answerObject = {
            //   id: answers.answer_id.toString(),
            //   score: answers.score.toString(),
            //   is_comment_required: answers.is_comment_required.toString(),
            //   answer_name: answers.answer.toString(),
            //   comment: '',
            //   images: imageNames,
            // };

            if (questionTypeId == "2") { //checkbox
              var elementPos = [...answer].map(function (x) { return x.id; }).indexOf(answers.answer_id.toString());
              var currentAnswerObj = [...answer][elementPos];
              const newObj = {
                ...currentAnswerObj,
                // replace the value of the key with a new value
                images: imageNames
              };
              if (elementPos != -1) {
                answer.splice(elementPos, 1);
                setAnswer([...answer, newObj]);
              }
            } else { // Radio
              setAnswer(answers);
            }


            setImages([...images, { path: response.uploaded_url, name: response.image_name }]);
            setError(false);
            setErrorMessage("");
          },
          error => console.error(error),
        );
    }
  };

  const openCamera = (answer, setAnswer, answers, images, setImages, imageNames, setImageNames, questionTypeId) => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      //cropping: true,
    }).then(image => {
      if (images.length + 1 > maxImages) {
        alert(`Max limit reached: ${maxImages}`);
        return;
      }
      uploadImage(image.path, answer, setAnswer, answers, images, setImages, imageNames, setImageNames, questionTypeId);
    });
  };

  const pickImage = (answer, setAnswer, answers, images, setImages, imageNames, setImageNames, questionTypeId) => {
    ImagePicker.openPicker({})
      .then(image => {
        if (images.length + 1 > maxImages) {
          alert(`Max limit reached: ${maxImages}`);
          return;
        }
        uploadImage(image.path, answer, setAnswer, answers, images, setImages, imageNames, setImageNames, questionTypeId);
      })
      .catch(error => console.error(error));
  };

  const deleteImage = index => {
    //setImages(images.filter((_, i) => i !== index));
  };

  const TextBox = ({ data }) => {
    const [answer, setAnswer] = useState('');

    return (
      <View style={{ borderRadius: 12, flex: 1 }}>
        <TextInput
          mode="text"
          numberOfLines={8}
          multiline={true}
          underlineColor="transparent"
          theme={{ colors: { primary: '#cccccc' } }}
          style={[SIPCStyles.TextInput1, { marginHorizontal: 20, marginTop: 10, borderRadius: 12, flex: 1 }]}
          placeholder={'Answer'}
          value={answer}
          onChangeText={setAnswer}
          onEndEditing={() => {
            if (answer) {
              let answerObject = {
                question_id: data.id.toString(),
                question_type_id: data.question_type_id.toString(),
                answer: answer,
              };
              if (!finalAnswer.current.find(el => el.question_id === data.id.toString(),)) {
                finalAnswer.current.push(answerObject);
              } else {
                var answerIndex = finalAnswer.current.findIndex(el => el.question_id === data.id.toString(),);
                finalAnswer.current[answerIndex] = answerObject;
              }
            }
          }}
        />
      </View>
    );
  };

  //Here answers is the for the item being used in check box and answer is the state which contains all the answer for the particular question
  const CheckBox = ({ answers, answer, setAnswer, imageNames, setImageNames, comment, setComment }) => {
    const [checked, setChecked] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [images, setImages] = useState([]);

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          flexWrap: deviceWidth > 500 ? 'wrap' : 'wrap',
        }}>
        <View
          style={{
            flexDirection: 'column',
            width: deviceWidth > 500 ? '50%' : '100%',
          }}>
          <>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: '#CCCCCC',
                // borderRadius: 12,
                marginTop: 15,
                alignItems: 'center',
                paddingRight: 12,
                overflow: 'hidden',
                height: Height / 12,
                marginHorizontal: 20,
                borderBottomRightRadius: checked == 1 && answers.comment_type != "noTextImage" ? 0 : 12,
                borderBottomLeftRadius: checked == 1 && answers.comment_type != "noTextImage" ? 0 : 12,
                borderTopRightRadius: 12,
                borderTopLeftRadius: 12
              }}
              onPress={() => {
                var elementPos = [...answer].map(function (x) { return x.id; }).indexOf(answers.answer_id.toString());
                if (elementPos != -1) {
                  answer.splice(elementPos, 1);
                  setAnswer([...answer]);
                } else {
                  var answerObject = {
                    id: answers.answer_id.toString(),
                    score: answers.score.toString(),
                    is_comment_required: answers.is_comment_required.toString(),
                    answer_name: answers.answer.toString(),
                    comment: '',
                    images: '',
                  };
                  setAnswer([...answer, answerObject]);
                }

                setChecked(!checked);
                if (completed) {
                  setCompleted(false);
                }

              }}
              activeOpacity={0.85}>
              <View style={{ paddingHorizontal: 10 }}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  color={'#3a7fc4'}
                />
              </View>

              <View style={{ borderWidth: .8, height: '100%', borderColor: '#CCCCCC' }} />

              <View style={{ flexDirection: 'row', }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-Medium',
                    marginLeft: 12,
                    marginRight: '18%',
                    paddingVertical: 2, fontSize: responsiveScreenFontSize(1.8),
                  }}>
                  {answers.answer}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    // position: 'absolute',
                    // left:'60%',
                    alignSelf: 'center',
                  }}>
                  {answers.comment_type != "noTextImage" ?
                    (
                      <>
                        {checked == 1 ? (
                          <>
                            <View style={{}}></View>
                            <TouchableWithoutFeedback
                              onPress={() => {
                                setChecked(!checked);
                              }}>
                              <Text
                                style={[
                                  SIPCStyles.checkboxFont,
                                  { marginHorizontal: 10 },
                                ]}>
                                Cancel
                              </Text>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback
                              onPress={() => {
                                setChecked(!checked);
                              }}>
                              <Text
                                style={[
                                  SIPCStyles.checkboxFont,
                                  { color: '#199be2', marginHorizontal: 10 },
                                ]}>
                                Submit
                              </Text>
                            </TouchableWithoutFeedback>
                          </>
                        ) : (
                          <>
                            {
                              answers.comment_type == "textOptional" || answers.comment_type == "textRequired" ?
                                (
                                  <>
                                    <TouchableWithoutFeedback
                                      onPress={() => {
                                        setChecked(!checked);
                                      }}>
                                      <Image
                                        source={require('../assets/msg.png')}
                                        style={SIPCStyles.commentImage}
                                      />
                                    </TouchableWithoutFeedback>
                                  </>
                                ) :
                                (
                                  <>
                                    <TouchableWithoutFeedback
                                      onPress={() => {
                                        setChecked(!checked);
                                      }}>
                                      <Image
                                        source={require('../assets/msg.png')}
                                        style={SIPCStyles.commentImage}
                                      />
                                    </TouchableWithoutFeedback>

                                    <TouchableWithoutFeedback
                                      onPress={() => {
                                        setChecked(!checked);
                                      }}>
                                      <Image
                                        source={require('../assets/img.png')}
                                        style={SIPCStyles.commentImage}
                                      />
                                    </TouchableWithoutFeedback>

                                  </>
                                )
                            }

                          </>
                        )}
                      </>
                    ) :
                    (<></>)
                  }



                </View>
              </View>
            </TouchableOpacity>

            {checked &&
              answers.comment_type !== 'noTextImage' &&
              !completed && ( //TODO: Need to add this same conditions for radio box
                <View>

                  {answers.comment_type === 'textWithImageRequired' && (
                    <Text style={{ color: 'red', alignSelf: 'center', fontSize: responsiveScreenFontSize(1.8), }}>
                      Image is Required!
                    </Text>
                  )}

                  {checked == 1 ? (
                    <View style={{ marginHorizontal: 20 }}>
                      <TextInput
                        mode="text"
                        //  label="Outlined input"
                        placeholder={
                          answers.comment_type === 'textOptional'
                            ? 'Add Comment(Optional)'
                            : 'Add Comment(Required)'
                        }
                        value={comment}
                        numberOfLines={8}
                        multiline={true}
                        underlineColor="transparent"
                        theme={{ colors: { primary: '#cccccc' } }}
                        style={SIPCStyles.TextInput1}
                        onChangeText={value => setComment(value)}
                      />

                      {
                        answers.comment_type == "textWithImageOptional" || answers.comment_type == "textWithImageRequired" ?
                          (
                            <>

                              <View
                                style={{
                                  borderWidth: 1,
                                  paddingBottom: 10,
                                  borderColor: '#ccc',

                                }}>

                                <Card style={SIPCStyles.CameraImageCard}>
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      justifyContent: 'space-around',
                                    }}>
                                    <TouchableWithoutFeedback
                                      onPress={() => openCamera(answer, setAnswer, answers, images, setImages, imageNames, setImageNames, 2)}>
                                      <Image
                                        source={require('../assets/camera.png')}
                                        style={SIPCStyles.cameraImage}
                                      />
                                    </TouchableWithoutFeedback>

                                    <View
                                      style={{ borderWidth: 1, borderColor: '#e6e6e6' }}
                                    />

                                    <TouchableWithoutFeedback
                                      onPress={() => pickImage(answer, setAnswer, answers, images, setImages, imageNames, setImageNames, 2)}>
                                      <Image
                                        source={require('../assets/gallery.png')}
                                        style={SIPCStyles.cameraImage}
                                      />
                                    </TouchableWithoutFeedback>
                                  </View>
                                </Card>

                                <View
                                  style={{
                                    marginTop: 10,
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    flex: 1,
                                  }}>
                                  <ScrollView
                                    nestedScrollEnabled={true}
                                    horizontal={true}>
                                    <FlatList
                                      numColumns={numColumns}
                                      data={images}
                                      keyExtractor={(item, index) => index.toString()}
                                      renderItem={({ item, index }) => (
                                        <View style={{ position: 'relative' }}>
                                          <Image
                                            source={{ uri: item.path }}
                                            style={SIPCStyles.CameraClickImage}
                                          />
                                          <TouchableOpacity
                                            style={SIPCStyles.crossImage}
                                            onPress={() => deleteImage(index)}>
                                            <Text
                                              style={{
                                                color: 'white',
                                                fontWeight: 'bold',
                                              }}>
                                              X
                                            </Text>
                                          </TouchableOpacity>
                                        </View>
                                      )}
                                    />
                                  </ScrollView>
                                </View>
                              </View>
                            </>
                          ) : (<></>)
                      }




                    </View>
                  ) : null}

                </View>
              )}
          </>
        </View>
      </View>
    );
  };

  const CheckBoxComponent = ({ data }) => {
    const [answer, setAnswer] = useState([]);
    const [comment, setComment] = useState('');
    const [imageNames, setImageNames] = useState([]);
    useEffect(() => {

      if (answer.length > 0) {
        let answerObject = {
          question_id: data.id.toString(),
          question_type_id: data.question_type_id.toString(),
          answer: answer,
        };

        if (!finalAnswer.current.find(el => el.question_id === data.id.toString())) {
          finalAnswer.current.push(answerObject);
        } else {
          var answerIndex = finalAnswer.current.findIndex(el => el.question_id === data.id.toString(),);
          finalAnswer.current[answerIndex] = answerObject;
        }
      } else {
        var elementPos = finalAnswer.current.map(function (x) { return x.question_id }).indexOf(data.id.toString());
        if (elementPos != -1) {
          if (finalAnswer.current[elementPos].answer.length == 0) {
            finalAnswer.current.splice(elementPos, 1);
          }
        }
      }

    }, [answer]);

    return (
      <>
        <View style={{ backgroundColor: 'white', padding: 15 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/question.png')}
              style={SIPCStyles.headerManImage}
            />
            <Text style={[SIPCStyles.SemiBold, { flex: 1, marginLeft: 15 }]}>
              {data.question}
            </Text>
          </View>
          {data.answers.map(item => {
            return (
              <CheckBox
                answers={item}
                key={item.answer_id}
                answer={answer}
                setAnswer={setAnswer}
                comment={comment}
                setComment={setComment}
                imageNames={imageNames}
                setImageNames={setImageNames}
              />
            );
          })}
        </View>
      </>
    );
  };

  const RadioBox = ({ answers, answer, setAnswer, imageNames, setImageNames, comment, setComment }) => {
    const [completed, setCompleted] = useState(false);
    const [images, setImages] = useState([]);

    return (
      <>
        <View style={{
          flexDirection: 'row', alignItems: 'center', marginHorizontal: deviceWidth > 500 ? 50 : 20, marginVertical: deviceWidth > 500 ? 5 : 0, borderWidth: 1,
          borderColor: '#CCCCCC',
          marginTop: 15,
          alignItems: 'center',
          // paddingRight: 12,
          // overflow: 'hidden',
          height: Height / 12,

          borderBottomRightRadius: answers.comment_type != "noTextImage" && answer && answer.answer_id == answers.answer_id ? 0 : 12,
          borderBottomLeftRadius: answers.comment_type != "noTextImage" && answer && answer.answer_id == answers.answer_id ? 0 : 12,
          borderTopRightRadius: 12,
          borderTopLeftRadius: 12

        }}>
          <View style={{ paddingHorizontal: 10 }}>
            <RadioButton
              status={answers === answer ? 'checked' : 'unchecked'}
              onPress={() => setAnswer(answers)}
              value="first"
              color={'#3a7fc4'}
            />
          </View>
          <View style={{ borderWidth: .8, height: '100%', borderColor: '#CCCCCC' }} />

          <Text style={{ fontFamily: 'Poppins-Medium', marginHorizontal: 16, fontSize: responsiveScreenFontSize(1.8), }}>{answers.answer}</Text>

          <View style={{ flexDirection: 'row', alignSelf: 'center', }}>
            {
              answers.comment_type != "noTextImage" ?
                (
                  <>
                    {
                      answer == 1 ? (
                        <>
                          <View style={{}}></View>
                          <TouchableWithoutFeedback
                            onPress={() => {
                              setAnswer(!answer);
                            }}>
                            <Text
                              style={[
                                SIPCStyles.checkboxFont,
                                { marginHorizontal: 10 },
                              ]}>
                              Cancel
                            </Text>
                          </TouchableWithoutFeedback>

                          <TouchableWithoutFeedback
                            onPress={() => {
                              setAnswer(!answer);
                            }}>
                            <Text
                              style={[
                                SIPCStyles.checkboxFont,
                                { color: '#199be2', marginHorizontal: 10 },
                              ]}>
                              Submit
                            </Text>
                          </TouchableWithoutFeedback>
                        </>
                      ) : (
                        <>
                          {
                            answers.comment_type == "textOptional" || answers.comment_type == "textRequired" ?
                              (
                                <>
                                  <TouchableWithoutFeedback
                                    onPress={() => setAnswer(answers)}>
                                    <Image
                                      source={require('../assets/msg.png')}
                                      style={SIPCStyles.commentImage}
                                    />
                                  </TouchableWithoutFeedback>
                                </>
                              ) :
                              (
                                <>
                                  <TouchableWithoutFeedback
                                    onPress={() => setAnswer(answers)}>
                                    <Image
                                      source={require('../assets/msg.png')}
                                      style={SIPCStyles.commentImage}
                                    />
                                  </TouchableWithoutFeedback>

                                  <TouchableWithoutFeedback
                                    onPress={() => setAnswer(answers)}>
                                    <Image
                                      source={require('../assets/img.png')}
                                      style={SIPCStyles.commentImage}
                                    />
                                  </TouchableWithoutFeedback>
                                </>
                              )
                          }

                        </>
                      )}
                  </>
                ) :
                (
                  <>
                  </>
                )
            }

          </View>
        </View>

        {/* ============================================== */}
        {answer && answer.answer_id === answers.answer_id && !completed && (
          <View>
            {
              answers.comment_type != "noTextImage" ?
                (
                  <>
                    <TextInput
                      numberOfLines={8}
                      multiline={true}
                      underlineColor="transparent"
                      theme={{ colors: { primary: '#cccccc' } }}
                      style={[SIPCStyles.TextInput1, { marginHorizontal: 20 }]}
                      placeholder={'Add Comments'}
                      // value={comment}
                      onChangeText={value => setComment(value)}

                    />
                  </>
                ) : (
                  <></>
                )
            }

            {/* ====================================== */}

            {
              answers.comment_type == "textWithImageOptional" || answers.comment_type == "textWithImageRequired" ?
                (
                  <>
                    <View
                      style={{
                        borderWidth: 1,
                        paddingBottom: 10,
                        borderColor: '#ccc',
                        // borderBottomLeftRadius: 10,
                        // borderBottomRightRadius: 10,
                        // borderTopLeftRadius: 0,
                        // borderTopRightRadius: 0,
                        marginHorizontal: 20
                      }}>
                      <Card style={SIPCStyles.CameraImageCard}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                          }}>
                          <TouchableWithoutFeedback
                            onPress={() => openCamera(answer, setAnswer, answers, images, setImages, imageNames, setImageNames, 1)}>
                            <Image
                              source={require('../assets/camera.png')}
                              style={SIPCStyles.cameraImage}
                            />
                          </TouchableWithoutFeedback>

                          <View
                            style={{ borderWidth: 1, borderColor: '#e6e6e6' }}
                          />

                          <TouchableWithoutFeedback
                            onPress={() => pickImage(answer, setAnswer, answers, images, setImages, imageNames, setImageNames, 1)}>
                            <Image
                              source={require('../assets/gallery.png')}
                              style={SIPCStyles.cameraImage}
                            />
                          </TouchableWithoutFeedback>
                        </View>
                      </Card>

                      <View
                        style={{
                          marginTop: 10,
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          flex: 1,
                        }}>
                        <ScrollView
                          nestedScrollEnabled={true}
                          horizontal={true}>
                          <FlatList
                            numColumns={numColumns}
                            data={images}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
                              <View style={{ position: 'relative' }}>
                                <Image
                                  source={{ uri: item.path }}
                                  style={SIPCStyles.CameraClickImage}
                                />
                                <TouchableOpacity
                                  style={SIPCStyles.crossImage}
                                  onPress={() => deleteImage(index)}>
                                  <Text
                                    style={{
                                      color: 'white',
                                      fontWeight: 'bold',
                                    }}>
                                    X
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            )}
                          />
                        </ScrollView>
                      </View>
                    </View>
                  </>
                ) :
                (<></>)
            }

          </View>
        )}
      </>
    );
  };

  const RadioBoxComponent = ({ data }) => {
    const [answer, setAnswer] = useState();
    const [comment, setComment] = useState('');
    const [imageNames, setImageNames] = useState([]);

    useEffect(() => {
      if (answer) {
        let answerObject = {
          question_id: data.id.toString(),
          question_type_id: data.question_type_id.toString(),
          answer: [
            {
              id: answer.answer_id.toString(),
              score: answer.score.toString(),
              is_comment_required: answer.is_comment_required.toString(),
              answer_name: answer.answer.toString(),
              comment: comment,
              images: imageNames,
            },
          ],
        };

        if (!finalAnswer.current.find(el => el.question_id === data.id.toString())) {
          finalAnswer.current.push(answerObject);
        } else {
          var answerIndex = finalAnswer.current.findIndex(el => el.question_id === data.id.toString(),);
          finalAnswer.current[answerIndex] = answerObject;
        }
      }
    }, [answer]);

    return (
      <>
        <View style={{ backgroundColor: 'white', padding: 15 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/question.png')}
              style={SIPCStyles.headerManImage}
            />
            <Text style={[SIPCStyles.SemiBold, { flex: 1, marginLeft: 15 }]}>
              {data.question}
            </Text>
          </View>
          {data.answers.map((item, index) => {
            return (
              <RadioBox
                answers={item}
                key={index}
                answer={answer}
                setAnswer={setAnswer}
                comment={comment}
                setComment={setComment}
                imageNames={imageNames}
                setImageNames={setImageNames}
              />
            );
          })}
        </View>
      </>
    );
  };

  const SurveyQuestions = ({ data }) => {
    const [Active, setActive] = useState(0);
    const [SubActive, setSubActive] = useState(false);

    const switch_tab = x => {
      if (x === Active) {
        setActive(0);
      } else {
        setActive(x);
      }
    };

    return (
      <>
        <View
          style={{
            paddingHorizontal: '5%',
            marginTop: 25,
            backgroundColor: Active === 1 ? '#fffcf8' : 'white',
            elevation: 4,
            padding: 15,
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: '#CCCCCC',
            borderRadius: 4,
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              switch_tab(1);
            }}>
            {Active == 1 ? (
              <Image
                source={require('../assets/minus.png')}
                style={SIPCStyles.PlusMinusImage}
              />
            ) : (
              <Image
                source={require('../assets/plus.png')}
                style={SIPCStyles.PlusMinusImage}
              />
            )}
          </TouchableWithoutFeedback>
          <Text style={[SIPCStyles.BoldFont, { marginLeft: '5%' }]}>
            {data.section}
          </Text>
        </View>
        {data.section_data[0].questions_answers.map(question => {
          //setTotalQuestion(totalQuestion+1);
          return (
            <View key={question.id}>

              {question.question_type_id === 1 && (
                <View style={Active !== 1 && { display: 'none' }}>
                  <RadioBoxComponent data={question} />
                </View>
              )}

              {question.question_type_id === 2 && (
                <View style={Active !== 1 && { display: 'none' }}>
                  <CheckBoxComponent data={question} />
                </View>
              )}

              {question.question_type_id === 3 && (
                <View
                  style={[
                    Active !== 1 && { display: 'none' },
                    { backgroundColor: 'white', padding: 15 },
                  ]}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      source={require('../assets/question.png')}
                      style={SIPCStyles.headerManImage}
                    />
                    <Text
                      style={[SIPCStyles.SemiBold, { flex: 1, paddingLeft: 15 }]}>
                      {question.question}
                    </Text>
                  </View>
                  <TextBox data={question} />
                </View>
              )}
            </View>
          );
        })}
        {data.sub_section_data.map(sub => {
          return (
            <>
              <View
                key={sub.sub_section_id}
                style={[
                  {
                    paddingHorizontal: '6%',
                    backgroundColor: setSubActive === 1 ? '#fffcf8' : 'white',
                    padding: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderColor: '#CCCCCC',
                  },
                  !Active && { display: 'none' },
                ]}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    setSubActive(!SubActive);
                  }}>
                  {SubActive == 1 ? (
                    <Image
                      source={require('../assets/minus.png')}
                      style={SIPCStyles.PlusMinusImage}
                    />
                  ) : (
                    <Image
                      source={require('../assets/plus.png')}
                      style={SIPCStyles.PlusMinusImage}
                    />
                  )}
                </TouchableWithoutFeedback>
                <Text style={[SIPCStyles.BoldFont, { marginLeft: '5%' }]}>
                  {sub.sub_section}
                </Text>
              </View>
              {sub.questions_answers.map(question => {
                //setTotalQuestion(totalQuestion + 1);
                return (
                  <View key={question.id}>
                    {question.question_type_id === 1 && (
                      <View style={SubActive !== true && { display: 'none' }}>
                        <RadioBoxComponent data={question} />
                      </View>
                    )}

                    {question.question_type_id === 2 && (
                      <View style={SubActive !== true && { display: 'none' }}>
                        <CheckBoxComponent data={question} />
                      </View>
                    )}

                    {question.question_type_id === 3 && (
                      <View
                        style={[
                          SubActive !== true && { display: 'none' },
                          { backgroundColor: 'white', padding: 15 },
                        ]}>
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Image
                            source={require('../assets/question.png')}
                            style={SIPCStyles.headerManImage}
                          />
                          <Text
                            style={[
                              SIPCStyles.SemiBold,
                              { flex: 1, paddingLeft: 15 },
                            ]}>
                            {question.question}
                          </Text>
                        </View>
                        <TextBox data={question} />
                      </View>
                    )}
                  </View>
                );
              })}
            </>
          );
        })}
      </>
    );
  };
  // ====================================================================
  const saveSurvey = () => {
    var payload = JSON.stringify({
      appKey: 'f9285c6c2d6a6b531ae1f70d2853f612',
      device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
      surveyId: surveyId,
      user_id: '1',
      user_survey_result_id: userSurveyResultId == undefined ? 0 : userSurveyResultId,
      org_id: orgId,
      org_name: orgName,
      building_id: buildingId,
      building_name: buildingName,
      request_type: '0',
      survey_session_id: surveySessionId == undefined ? '' : surveySessionId,
      first_name: '',
      last_name: '',
      questions: finalAnswer.current,
    });
    console.log("Save Answer: " + payload);
    setIsLoading(true);
    API.instance
      .post(
        `http://sipcsurvey.devuri.com/sipcsurvey/save-user-survey-device?is_api=true`,
        payload,
      )
      .then(
        response => {
          setIsLoading(false);
          if (response.status == "success") {
            navigation.navigate('SurveyViewAll');
          } else {
            setError(true);
            setErrorMessage(response.error);
          }
        },
        error => {
          setIsLoading(false);
          console.error(error);
        },
      );
  };

  const submitSurvey = () => {
    var payload = JSON.stringify({
      appKey: 'f9285c6c2d6a6b531ae1f70d2853f612',
      device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
      surveyId: surveyId,
      user_id: '1',
      user_survey_result_id: userSurveyResultId == undefined ? 0 : userSurveyResultId,
      survey_session_id: surveySessionId == undefined ? '' : surveySessionId,
      org_id: orgId,
      org_name: orgName,
      building_id: buildingId,
      building_name: buildingName,
      request_type: '1',
      first_name: firstName,
      last_name: lastName,
      questions: finalAnswer.current,
    });

    setIsLoading(true);
    API.instance
      .post(
        `http://sipcsurvey.devuri.com/sipcsurvey/save-user-survey-device?is_api=true`,
        payload,
      )
      .then(
        response => {
          setIsLoading(false);
          if (response.status == "success") {
            navigation.navigate('SurveyViewAll');
          } else {
            setError(true);
            setErrorMessage(response.error);

          }
        },
        error => {
          setIsLoading(false);
          console.error(error);
        },
      );
  };

  return (
    <View style={SIPCStyles.flex}>
      <StatusBar barStyle={'dark-content'} backgroundColor="#acbcc6" />
      <ScrollView>
        {/* ======================HEader============================================= */}
        <Surface style={[SIPCStyles.headerSurface, { alignItems: 'center' }]}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/left.png')}
              style={SIPCStyles.headerManImage}
            />
          </TouchableWithoutFeedback>

          <View style={{ marginHorizontal: 10 }}>
            <Text
              style={[SIPCStyles.NormalFont, { width: width / 2 }]}
              numberOfLines={1}>
              Survey: {surveyData.title}
            </Text>
          </View>

          <TouchableWithoutFeedback onPress={() => refRBSheet.current.open()} >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[SIPCStyles.NormalFont, { color: '#199be2' }]}>
                Save/Submit
              </Text>
              {visible == true ? (
                <Entypo
                  size={18}
                  color={'#818081'}
                  style={{ paddingHorizontal: 5, alignSelf: 'center' }}
                  name="chevron-up"
                />
              ) : (
                <Entypo
                  size={18}
                  color={'#818081'}
                  style={{ paddingHorizontal: 5, alignSelf: 'center' }}
                  name="chevron-down"
                />
              )}
            </View>
          </TouchableWithoutFeedback>
        </Surface>
        <Divider bold={true} />
        {/* ===============================MULTIPLE============================ */}
        {data.map((item, index) => {
          return <SurveyQuestions data={item} key={index} />;
        })}
        {/* ============================================================ */}
      </ScrollView>
      {/* ================================MODAL=================================== */}
      {/* <Modal visible={visible} transparent={true} animationType="slide">


        <View
          style={{
            justifyContent: 'center',
            backgroundColor: '#e2e0eb',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            paddingBottom: 20,
            top: hp('11%'),
          }}>


          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#e2e0eb',
              paddingTop: 15,
              paddingHorizontal: 15,
            }}>
            <TouchableWithoutFeedback onPress={hideModal}>
              <Text style={[SIPCStyles.NormalFont, {}]}>Cancel</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={hideModal}>
              <Text style={[SIPCStyles.NormalFont, { color: '#199be2' }]}>
                Done
              </Text>
            </TouchableWithoutFeedback>
          </View>



          <Surface
            elevation={4}
            style={{
              padding: 15,
              backgroundColor: 'white',
              borderRadius: 10,
              marginTop: 10,
              marginHorizontal: 30,
            }}>

            {error && (
              <View
                style={{
                  width: '100%',

                }}>
                <Text
                  style={{
                    color: 'red',
                    fontFamily: 'Poppins-Medium', fontSize: responsiveScreenFontSize(1.8), marginHorizontal: 20
                  }}>
                  Error! {errorMsg}
                </Text>
              </View>
            )}

            <TouchableOpacity
              onPress={saveSurvey}
              style={SIPCStyles.healthImageView}>
              <Image
                source={require('../assets/save.png')}
                style={SIPCStyles.MainBuilding}
              />
              <Text style={[SIPCStyles.NormalFont, { paddingLeft: 10 }]}>
                Save
              </Text>
            </TouchableOpacity>
            <Divider bold={true} style={{ marginLeft: 30, marginTop: 10 }} />


            <TouchableOpacity
              onPress={showModal1}
              style={[SIPCStyles.healthImageView, { marginTop: 25 }]}>
              <Image
                source={require('../assets/submit.png')}
                style={SIPCStyles.MainBuilding}
              />
              <Text style={[SIPCStyles.NormalFont, { paddingLeft: 10 }]}>
                Submit Survey
              </Text>
            </TouchableOpacity>


            <Divider bold={true} style={{ marginLeft: 30, marginTop: 10 }} />
          </Surface>
        </View>
      </Modal> */}




      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={false}
        dragFromTopOnly={true}
        height={screenHeight}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            backgroundColor: '#e2e0eb',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            paddingBottom: 20,
            // top: hp('11%'),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#e2e0eb',
              paddingTop: 15,
              paddingHorizontal: 15,
            }}>
            <TouchableWithoutFeedback onPress={() => refRBSheet.current.close()}>
              <Text style={[SIPCStyles.NormalFont, {}]}>Cancel</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => refRBSheet.current.close()}>
              <Text style={[SIPCStyles.NormalFont, { color: '#199be2' }]}>
                Done
              </Text>
            </TouchableWithoutFeedback>
          </View>
          <Surface
            elevation={4}
            style={{
              padding: 15,
              backgroundColor: 'white',
              borderRadius: 10,
              marginTop: 10,
              marginHorizontal: 30,
            }}>

            {error && (
              <View
                style={{
                  width: '100%',

                }}>
                <Text
                  style={{
                    color: 'red',
                    fontFamily: 'Poppins-Medium', fontSize: responsiveScreenFontSize(1.8), marginHorizontal: 20
                  }}>
                  Error! {errorMsg}
                </Text>
              </View>
            )}

            <TouchableOpacity
              onPress={saveSurvey}
              style={SIPCStyles.healthImageView}>
              <Image
                source={require('../assets/save.png')}
                style={SIPCStyles.MainBuilding}
              />
              <Text style={[SIPCStyles.NormalFont, { paddingLeft: 10 }]}>
                Save
              </Text>
            </TouchableOpacity>
            <Divider bold={true} style={{ marginLeft: 30, marginTop: 10 }} />


            <TouchableOpacity
              onPress={() => refRBSheet1.current.open()}
              style={[SIPCStyles.healthImageView, { marginTop: 25 }]}>
              <Image
                source={require('../assets/submit.png')}
                style={SIPCStyles.MainBuilding}
              />
              <Text style={[SIPCStyles.NormalFont, { paddingLeft: 10 }]}>
                Submit Survey
              </Text>
            </TouchableOpacity>


            <Divider bold={true} style={{ marginLeft: 30, marginTop: 10 }} />
          </Surface>
        </View>
      </RBSheet>



      {/* ===============================================Submit Modal============== */}

      {/* <Modal visible={visible1} transparent={true} animationType="slide">
        <View
          style={{
            justifyContent: 'center',
            backgroundColor: '#e2e0eb',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            paddingBottom: 20,
           
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: '#e2e0eb',
              padding: 25, backgroundColor: '#1281ca'
            }}>
            <Text style={[SIPCStyles.NormalFont, { textAlign: 'center', color: 'white', }]}>Survey Completed By</Text>
          </View>

          <Surface
            elevation={4}
            style={{
              padding: 15,
              backgroundColor: 'white',
            }}>

            {error && (
              <View
                style={{
                  width: '100%',

                }}>
                <Text
                  style={{
                    color: 'red',
                    fontFamily: 'Poppins-Medium', fontSize: responsiveScreenFontSize(1.8), marginHorizontal: 20
                  }}>
                  Error! {errorMsg}
                </Text>
              </View>
            )}

            <TextInput
              onChangeText={value => setFirstName(value)}
              mode="flat"
            
              placeholder="First Name"
              placeholderTextColor={'black'}
              underlineColor="transparent"
              theme={{ colors: { primary: '#cccccc' } }}
              style={[SIPCStyles.TextInput, { height: Height / 18, marginTop: 15, borderRadius: 0 }]}
            />

            <TextInput
              onChangeText={value => setLastName(value)}
              mode="flat"
             
              placeholder="Last Name"
              placeholderTextColor={'black'}
              underlineColor="transparent"
              theme={{ colors: { primary: '#cccccc' } }}
              style={[SIPCStyles.TextInput, { height: Height / 18, marginTop: 25, borderRadius: 0 }]}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end', marginVertical: 15
              }}>
              <TouchableWithoutFeedback onPress={hideModal1} style={{ borderWidth: 1 }}>
                <Text style={[SIPCStyles.NormalFont, { marginRight: 15 }]}>Cancel</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={submitSurvey}>
                <Text style={[SIPCStyles.NormalFont, { color: '#199be2', }]}>
                  Continue
                </Text>
              </TouchableWithoutFeedback>
            </View>



          </Surface>
        </View>
      </Modal> */}

      <RBSheet
        ref={refRBSheet1}
        closeOnDragDown={false}
        closeOnPressMask={false}
        dragFromTopOnly={true}
        height={screenHeight}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            backgroundColor: '#e2e0eb',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            paddingBottom: 20,

          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: '#e2e0eb',
              padding: 25, backgroundColor: '#1281ca'
            }}>
            <Text style={[SIPCStyles.NormalFont, { textAlign: 'center', color: 'white', }]}>Survey Completed By</Text>
          </View>

          <Surface
            elevation={4}
            style={{
              padding: 15,
              backgroundColor: 'white',
            }}>

            {error && (
              <View
                style={{
                  width: '100%',

                }}>
                <Text
                  style={{
                    color: 'red',
                    fontFamily: 'Poppins-Medium', fontSize: responsiveScreenFontSize(1.8), marginHorizontal: 20
                  }}>
                  Error! {errorMsg}
                </Text>
              </View>
            )}

            <TextInput
              onChangeText={value => setFirstName(value)}
              mode="flat"

              placeholder="First Name"
              placeholderTextColor={'black'}
              underlineColor="transparent"
              theme={{ colors: { primary: '#cccccc' } }}
              style={[SIPCStyles.TextInput, { height: Height / 18, marginTop: 15, borderRadius: 0 }]}
            />

            <TextInput
              onChangeText={value => setLastName(value)}
              mode="flat"

              placeholder="Last Name"
              placeholderTextColor={'black'}
              underlineColor="transparent"
              theme={{ colors: { primary: '#cccccc' } }}
              style={[SIPCStyles.TextInput, { height: Height / 18, marginTop: 25, borderRadius: 0 }]}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end', marginVertical: 15
              }}>
              <TouchableWithoutFeedback onPress={() => refRBSheet1.current.close()} style={{ borderWidth: 1 }}>
                <Text style={[SIPCStyles.NormalFont, { marginRight: 15 }]}>Cancel</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => refRBSheet1.current.close()}>
                <Text style={[SIPCStyles.NormalFont, { color: '#199be2', }]}>
                  Continue
                </Text>
              </TouchableWithoutFeedback>
            </View>



          </Surface>
        </View>



      </RBSheet>


      {/* ============================================================= */}


    </View>
  );
};

export default SaveSurvey;
