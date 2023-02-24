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
  import { json } from 'stream/consumers';

const SavePendingSurvey = ({ navigation, route }) => {
    const [surveyData, setSurveyData] = useState([]);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMessage] = useState();
  
  
    const { surveyId, surveySessionId, userSurveyResultId, userId } = route?.params;

    const finalAnswer = useRef([]);
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

const setTextBoxJson = (data, answer) =>{
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
};

useEffect(() => {
    var payload = JSON.stringify({
        appKey: 'f9285c6c2d6a6b531ae1f70d2853f612',
        device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
        survey_id: surveyId,
        survey_session_id: surveySessionId,
        user_survey_result_id: userSurveyResultId,
        user_id: userId,
      });
  API.instance
    .post(
      `http://sipcsurvey.devuri.com/sipcsurvey/start-pending-survey-device?is_api=true`,
      payload,
    )
    .then(response => {
      setSurveyData(response.surveyData[0]);
      setData(response.data);
      setError(false);
      setErrorMessage("")
    });
}, []);

const [images, setImages] = useState([]);
const [numColumns, setNumColumns] = useState(3);
const maxImages = 10;

const openCamera = () => {
  ImagePicker.openCamera({
    width: 300,
    height: 400,
    //cropping: true,
  }).then(image => {
    if (images.length + 1 > maxImages) {
      alert(`Max limit reached: ${maxImages}`);
      return;
    }
    setImages([...images, { path: image.path }]);
  });
};

const pickImage = () => {
  ImagePicker.openPicker({
    multiple: true,
    maxFiles: maxImages - images.length,
  })
    .then(newImages => {
      if (images.length + newImages.length > maxImages) {
        alert(`Max limit reached: ${maxImages}`);
        return;
      }
      setImages([...images, ...newImages.map(i => ({ path: i.path }))]);
    })
    .catch(error => console.error(error));
};

const deleteImage = index => {
  setImages(images.filter((_, i) => i !== index));
};

const TextBox = ({ data }) => {
  var textAnswer = "";
  
  if(data.question_type_id == 3 && data.answer_value!=undefined && data.answer_value!=null){
    textAnswer = data.answer_value;
  }
  
  const [answer, setAnswer] = useState(textAnswer);
    if(textAnswer!=''){
    setTextBoxJson(data, answer);
  }
  
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
            setTextBoxJson(data, answer);
        }}
      />
    </View>
  );
};
//Here answers is the for the item being used in check box and answer is the state which contains all the answer for the particular question
const CheckBox = ({ answers, answer, setAnswer }) => {
  var answerComment = "";
  if(answers.comment!=undefined && answers.comment!=null){
    answerComment = answers.comment;
  }
  const [checked, setChecked] = useState(false);
  const [comment, setComment] = useState(answerComment);
  const [completed, setCompleted] = useState(false);
  const [imagePath, setImagePath] = useState([]);

  if(answers.isSelected == 1){
    //setChecked(true);
  }
  
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
              borderRadius: 12,
              marginTop: 15,
              alignItems: 'center',
              paddingRight: 12,
              overflow: 'hidden',
              height: Height / 12,
              marginHorizontal: 20,
              borderBottomRightRadius: checked == 1 ? 0 : 12,
              borderBottomLeftRadius: checked == 1 ? 0 : 12,
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
                  comment: comment,
                  images: imagePath,
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
                  paddingVertical: 2, fontSize: responsiveScreenFontSize(1.8),width:'60%',
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
                {answers.comment_type!="noTextImage" ?
                  (
                    <>
                          <View style={{justifyContent:'center'}}>
                      {checked == 1? (
                        <>
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
                            answers.comment_type=="textOptional" || answers.comment_type=="textRequired"?
                            (
                              <>
                                <TouchableWithoutFeedback
                                  onPress={() => {
                                    setChecked(!checked);
                                  }}>

                                  <Image
                                    source={require('../assets/msg.png')}
                                    style={[SIPCStyles.commentImage,{right:0,position:'absolute',}]}
                                  />
                                </TouchableWithoutFeedback>
                              </>    
                            ):
                            (
                              <>
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                      setChecked(!checked);
                                    }}>
                                    <Image
                                      source={require('../assets/msg.png')}
                                      style={[SIPCStyles.commentImage,{right:0,position:'absolute',}]}
                                    />
                                  </TouchableWithoutFeedback>
                                  
                                  <TouchableWithoutFeedback
                                    onPress={() => {
                                      setChecked(!checked);
                                    }}>
                                    <Image
                                      source={require('../assets/img.png')}
                                      style={[SIPCStyles.commentImage,{right:0,position:'absolute',}]}
                                    />
                                  </TouchableWithoutFeedback>

                              </>
                            )
                          }
                          
                        </>
                      )}
                      </View>
                    </>
                  ):
                  (<></>)
                }

                

              </View>
            </View>
          </TouchableOpacity>

          {checked &&
            answers.comment_type !== 'noTextImage' &&
            !completed && ( //TODO: Need to add this same conditions for radio box
              <View>
                {(answers.comment_type === 'textWithImageOptional' ||
                  answers.comment_type === 'textWithImageRequired') && (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        elevation: 16,
                      }}>
                      <TouchableWithoutFeedback
                        onPress={() => openCamera(imagePath, setImagePath)}>
                        <Image
                          source={require('../assets/camera.png')}
                          style={SIPCStyles.cameraImage}
                        />
                      </TouchableWithoutFeedback>
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: '#e6e6e6',
                        }}
                      />

                      <TouchableWithoutFeedback onPress={pickImage}>
                        <Image
                          source={require('../assets/gallery.png')}
                          style={SIPCStyles.cameraImage}
                        />
                      </TouchableWithoutFeedback>
                    </View>
                  )}
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
                      onChangeText={setComment}
                      numberOfLines={8}
                      multiline={true}
                      underlineColor="transparent"
                      theme={{ colors: { primary: '#cccccc' } }}
                      style={SIPCStyles.TextInput1}
                    />

                      {
                        answers.comment_type=="textWithImageOptional" || answers.comment_type=="textWithImageRequired"?
                        (
                          <>

                          <View
                          style={{
                            borderWidth: 1,
                            paddingBottom: 10,
                            borderColor: '#ccc',
                            borderBottomLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                          }}>

                          <Card style={SIPCStyles.CameraImageCard}>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                              }}>
                              <TouchableWithoutFeedback onPress={openCamera}>
                                <Image
                                  source={require('../assets/camera.png')}
                                  style={SIPCStyles.cameraImage}
                                />
                              </TouchableWithoutFeedback>

                              <View
                                style={{ borderWidth: 1, borderColor: '#e6e6e6' }}
                              />

                              <TouchableWithoutFeedback onPress={pickImage}>
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
                        ):(<></>)
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
            />
          );
        })}
      </View>
    </>
  );
};

const RadioBox = ({ answers, selected, setSelected }) => {
  const [comment, setComment] = useState('');
  const [completed, setCompleted] = useState(false);
  const [imagePath, setImagePath] = useState([]);
  if(answers.isSelected == 1){
    //setSelected(answers);
  }
  
  return (
    <>
      <View style={{
        flexDirection: 'row', alignItems: 'center', marginHorizontal: deviceWidth > 500 ? 50 : 20, marginVertical: deviceWidth > 500 ? 5 : 0, borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 10,
        marginTop: 15,
        alignItems: 'center',
        // paddingRight: 12,
        // overflow: 'hidden',
        height: Height / 12,
       borderBottomRightRadius:selected ? 0 :10,
       borderBottomLeftRadius:selected ? 0 :10,
      }}>
        <View style={{ paddingHorizontal: 10 }}>
          <RadioButton
            status={answers === selected ? 'checked' : 'unchecked'}
            onPress={() => setSelected(answers)}
            value="first"
            color={'#3a7fc4'}
          />
        </View>
        <View style={{ borderWidth: .8, height: '100%', borderColor: '#CCCCCC' }} />

        <Text style={{ fontFamily: 'Poppins-Medium', marginHorizontal: 16, fontSize: responsiveScreenFontSize(1.8), }}>{answers.answer}</Text>

        <View style={{flexDirection: 'row',alignSelf: 'center', }}>
        {
          answers.comment_type!="noTextImage" ?
          (
            <>
              {
                selected == 1 ? (
                    <>
                      <View style={{}}></View>
                      <TouchableWithoutFeedback
                        onPress={() => {
                          setSelected(!selected);
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
                          setSelected(!selected);
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
                        answers.comment_type=="textOptional" || answers.comment_type=="textRequired"?
                        (
                          <>
                          <TouchableWithoutFeedback
                          onPress={() => setSelected(answers)}>
                            <Image
                              source={require('../assets/msg.png')}
                              style={SIPCStyles.commentImage}
                            />
                          </TouchableWithoutFeedback>
                          </>
                        ):
                        (
                          <>
                          <TouchableWithoutFeedback
                            onPress={() => setSelected(answers)}>
                              <Image
                                source={require('../assets/msg.png')}
                                style={SIPCStyles.commentImage}
                              />
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback
                            onPress={() => setSelected(answers)}>
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
          ):
          (
            <>
            </>
          )
        }

              </View>
      </View>

{/* ============================================== */}
      {selected && selected.answer_id === answers.answer_id && !completed && (
        <View>
        {
          answers.comment_type!="noTextImage"?
          (
            <>
            <TextInput
            numberOfLines={8}
                      multiline={true}
                      underlineColor="transparent"
                      theme={{ colors: { primary: '#cccccc' } }}
                      style={[SIPCStyles.TextInput1,{marginHorizontal:20}]}
            placeholder={'Add Comments'}
            value={comment}
            onChangeText={setComment}
          />
            </>
          ):(
            <></>
          )
        }
          
{/* ====================================== */}

{
answers.comment_type=="textWithImageOptional" || answers.comment_type=="textWithImageRequired"?
      (
        <>
        <View
                      style={{
                        borderWidth: 1,
                        paddingBottom: 10,
                        borderColor: '#ccc',
                        borderBottomLeftRadius: 10,
                        borderBottomRightRadius: 10,
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        marginHorizontal:20
                      }}>
                      <Card style={SIPCStyles.CameraImageCard}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                          }}>
                          <TouchableWithoutFeedback onPress={openCamera}>
                            <Image
                              source={require('../assets/camera.png')}
                              style={SIPCStyles.cameraImage}
                            />
                          </TouchableWithoutFeedback>

                          <View
                            style={{ borderWidth: 1, borderColor: '#e6e6e6' }}
                          />

                          <TouchableWithoutFeedback onPress={pickImage}>
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
      ):
      (<></>)
}


{/* ====================================== */}
         
        </View>
      )}
    </>
  );
};

const RadioBoxComponent = ({ data }) => {
  const [answer, setAnswer] = useState();

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
            comment: '',
            images: [],
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
              selected={answer}
              setSelected={setAnswer}
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
    user_id: userId,
    user_survey_result_id: userSurveyResultId,
    request_type: '0',
    survey_session_id: surveySessionId,
    first_name: '',
    last_name: '',
    questions: finalAnswer.current,
  });
  console.log(payload)
//   setIsLoading(true);
//   API.instance
//     .post(
//       `http://sipcsurvey.devuri.com/sipcsurvey/save-user-pending-survey-device?is_api=true`,
//       payload,
//     )
//     .then(
//       response => {
//         setIsLoading(false);
//         if (response.status == "success") {
//           navigation.navigate('SurveyViewAll');
//         } else {
//           setError(true);
//           setErrorMessage(response.error);
//         }
//       },
//       error => {
//         setIsLoading(false);
//         console.error(error);
//       },
//     );
};

const submitSurvey = () => {
  var payload = JSON.stringify({
    appKey: 'f9285c6c2d6a6b531ae1f70d2853f612',
    device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
    surveyId: surveyId,
    user_id: userId,
    user_survey_result_id: userSurveyResultId,
    request_type: '1',
    survey_session_id: surveySessionId,
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

        <TouchableWithoutFeedback onPress={showModal}>
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
    <Modal visible={visible} transparent={true} animationType="slide">


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
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'red',
                  fontFamily: 'Poppins-Medium', fontSize: responsiveScreenFontSize(1.8),
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

          {/* <TouchableWithoutFeedback> */}
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
          {/* </TouchableWithoutFeedback> */}

          <Divider bold={true} style={{ marginLeft: 30, marginTop: 10 }} />
        </Surface>
      </View>
    </Modal>
    {/* ===============================================Submit Modal============== */}
    <Modal visible={visible1} transparent={true} animationType="slide">
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
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: 'red',
                  fontFamily: 'Poppins-Medium', fontSize: responsiveScreenFontSize(1.8),
                }}>
                Error! {errorMsg}
              </Text>
            </View>
          )}

          <TextInput
            onChangeText={value => setFirstName(value)}
            mode="flat"
            //  label="Outlined input
            placeholder="First Name"
            placeholderTextColor={'black'}
            underlineColor="transparent"
            theme={{ colors: { primary: '#cccccc' } }}
            style={[SIPCStyles.TextInput, { height: Height / 18, marginTop: 15, borderRadius: 0 }]}
          />

          <TextInput
            onChangeText={value => setLastName(value)}
            mode="flat"
            //  label="Outlined inpu
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
    </Modal>

    {/* ============================================================= */}


  </View>
);
};

export default SavePendingSurvey