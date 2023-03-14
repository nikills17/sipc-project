import {
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
  ScrollView,
  Modal,
  Dimensions,
  FlatList,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  TextInput,
  Surface,
  Divider,
  Checkbox,
  RadioButton,
  Card,
} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-crop-picker';
import {responsiveScreenFontSize} from 'react-native-responsive-dimensions';
import RBSheet from 'react-native-raw-bottom-sheet';
import {MMKV} from 'react-native-mmkv';

import SIPCStyles from './styles';
import API from '../utility/api';
import Loader from '../component/activityindicator';
import {SurveyOptions} from '../utility/constants';
import {CONFIG} from '../utility/config';

const SaveSurvey = ({navigation, route}) => {
  const {orgId, orgName, buildingId, buildingName, surveyId} = route?.params;

  const storage = new MMKV();
  const jsonUser = storage.getString('user');
  const user = JSON.parse(jsonUser);

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const [surveyData, setSurveyData] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const finalAnswer = useRef([]);
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();

  const maxImages = 10;
  var surveySessionId = '';
  var userSurveyResultId = 0;

  useEffect(() => {
    setIsLoading(true);
    API.instance
      .post(
        `/start-survey-device?is_api=true`,
        JSON.stringify({
          appKey: CONFIG.appKey,
          device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
          surveyId: surveyId,
        }),
      )
      .then(
        response => {
          setSurveyData(response.surveyData[0]);
          setData(response.data);
          setIsLoading(false);
        },
        error => {
          console.error(error);
          setIsLoading(false);
        },
      );
  }, []);

  const uploadImage = (imagePath, answers, imageNames, setImageNames) => {
    if (!imagePath) return;

    const data = new FormData();
    data.append('appKey', CONFIG.appKey);
    data.append('device_id', '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1');
    data.append('survey_id', surveyId);
    data.append('user_id', user.id);
    data.append('org_id', user.orgId);
    data.append('question_id', answers.question_id);
    data.append('answer_id', answers.answer_id);
    data.append('survey_session_id', surveySessionId ?? '');
    data.append('user_survey_result_id', userSurveyResultId ?? 0);
    data.append('file', {
      name: 'image.png',
      fileName: 'image',
      type: 'image/png',
      uri:
        Platform.OS === 'android'
          ? imagePath
          : imagePath.replace('file://', ''),
    });

    API.instance
      .upload('/upload-survey-image-api?is_api=true', data)
      .then(response => {
        if (response.status === 'success') {
          const imageName = response.uploaded_url;
          setImageNames([...imageNames, imageName]);

          setError(false);
          setErrorMessage('');
        } else {
          setError(true);
          setErrorMessage(response.error);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const openCamera = (answers, imageNames, setImageNames) => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
    }).then(
      image => {
        if (imageNames.length + 1 > maxImages) {
          alert(`Max limit reached: ${maxImages}`);
          return;
        }
        uploadImage(image.path, answers, imageNames, setImageNames);
      },
      error => {
        console.error(error);
      },
    );
  };

  const pickImage = (answers, imageNames, setImageNames) => {
    ImagePicker.openPicker({})
      .then(image => {
        if (imageNames.length + 1 > maxImages) {
          alert(`Max limit reached: ${maxImages}`);
          return;
        }
        uploadImage(image.path, answers, imageNames, setImageNames);
      })
      .catch(error => console.error(error));
  };

  const deleteImage = index => {
    //setImages(images.filter((_, i) => i !== index));
  };

  const RadioBox = ({answers, answer, setAnswer, selected}) => {
    const [comment, setComment] = useState('');
    const [completed, setCompleted] = useState(false);
    const [imagePath, setImagePath] = useState([]);
    const commentType = SurveyOptions[answers.comment_type];

    const onPress = () => {
      if (!selected) {
        const answerObject = [
          {
            id: answers.answer_id.toString(),
            score: answers.score.toString(),
            is_comment_required: answers.is_comment_required.toString(),
            answer_name: answers.answer,
            comment: '',
            images: '',
          },
        ];
        setComment('');
        setImagePath('');
        setAnswer(answerObject);
        setCompleted(false);
      }
    };

    const onCancel = () => {
      if (commentType.commentRequired || commentType.imageRequired) {
        setAnswer([]);
        setComment('');
      } else {
        setCompleted(true);
      }
    };


    const onSubmit = () => {
      if (comment === '' && (commentType.commentRequired || !commentType.commentRequired)) {
        Alert.alert('Comment is required.');
      } else if (commentType.imageRequired && imagePath === '') {
        Alert.alert('Image is required.');
      } else {
        const filteredArray = Array.isArray(imagePath)
          ? imagePath
              .map(el => ({image: el.split('/').pop()}))
              .filter(el => el.image)
          : [];
        const answerObject = [
          {
            id: answers.answer_id.toString(),
            score: answers.score.toString(),
            is_comment_required: answers.is_comment_required.toString(),
            answer_name: answers.answer,
            comment,
            images: filteredArray.length ? filteredArray : '',
          },
        ];
        setAnswer(answerObject);
        setCompleted(true);
      }
    };

    const onCommentImagePress = () => {
      setCompleted(!completed);
    };

    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: width > 500 ? 50 : 20,
            marginVertical: width > 500 ? 5 : 0,
            borderWidth: 1,
            borderColor: '#CCCCCC',
            borderRadius: 10,
            marginTop: 15,
            alignItems: 'center',
            height: height / 12,
            borderBottomRightRadius:
              commentType.completePopup &&
              answer &&
              answer[0] === answers.answer_id
                ? 0
                : 12,
            borderBottomLeftRadius:
              commentType.completePopup &&
              answer &&
              answer[0] === answers.answer_id
                ? 0
                : 12,
          }}>
          <View style={{paddingHorizontal: 10}}>
            <RadioButton
              status={selected ? 'checked' : 'unchecked'}
              onPress={onPress}
              value="first"
              color={'#3a7fc4'}
            />
          </View>
          <View
            style={{borderWidth: 1, height: '100%', borderColor: '#CCCCCC'}}
          />
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              marginHorizontal: 16,
              fontSize: responsiveScreenFontSize(1.8),
              width: '30%',
            }}>
            {answers.answer}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              right: 0,
              alignSelf: 'center',
            }}>
            {SurveyOptions[answers.comment_type].completePopup && (
              <>
                {selected && !completed ? (
                  <>
                    <TouchableWithoutFeedback onPress={onCancel}>
                      <Text
                        style={[
                          SIPCStyles.checkboxFont,
                          {marginHorizontal: 10},
                        ]}>
                        Cancel
                      </Text>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback
                      onPress={() => {
                        onSubmit();
                      }}>
                      <Text
                        style={[
                          SIPCStyles.checkboxFont,
                          {color: '#199be2', marginHorizontal: 10},
                        ]}>
                        Submit
                      </Text>
                    </TouchableWithoutFeedback>
                  </>
                ) : (
                  <>
                    {commentType.commentShow && (
                      <TouchableWithoutFeedback
                        onPress={selected ? onCommentImagePress : onPress}>
                        <Image
                          source={require('../assets/msg.png')}
                          style={[SIPCStyles.commentImage]}
                        />
                      </TouchableWithoutFeedback>
                    )}

                    {commentType.imageShow && (
                      <TouchableWithoutFeedback
                        onPress={selected ? onCommentImagePress : onPress}>
                        <Image
                          source={require('../assets/img.png')}
                          style={[SIPCStyles.commentImage]}
                        />
                      </TouchableWithoutFeedback>
                    )}
                  </>
                )}
              </>
            )}
          </View>
        </View>

        {selected && !completed && (
          <View>
            {SurveyOptions[answers.comment_type].commentShow && (
              <TextInput
                numberOfLines={8}
                multiline={true}
                underlineColor="transparent"
                theme={{colors: {primary: '#cccccc'}}}
                style={[SIPCStyles.TextInput1, {marginHorizontal: 20}]}
                placeholder={'Add Comments'}
                value={comment}
                onChangeText={setComment}
              />
            )}

            {SurveyOptions[answers.comment_type].imageShow && (
              <View
                style={{
                  borderWidth: 1,
                  paddingBottom: 10,
                  borderColor: '#ccc',
                  borderBottomLeftRadius: 10,
                  borderBottomRightRadius: 10,
                  borderTopLeftRadius: 0,
                  borderTopRightRadius: 0,
                  marginHorizontal: 20,
                }}>
                <Card style={SIPCStyles.CameraImageCard}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <TouchableWithoutFeedback
                      onPress={() =>
                        openCamera(answers, imagePath, setImagePath)
                      }>
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

                    <TouchableWithoutFeedback
                      onPress={() =>
                        pickImage(answers, imagePath, setImagePath)
                      }>
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
                  {imagePath[0] !== '' && (
                    <FlatList
                      horizontal
                      data={imagePath}
                      keyExtractor={(item, index) => index}
                      renderItem={({item, index}) => (
                        <View style={{position: 'relative'}}>
                          <Image
                            source={{uri: item}}
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
                  )}
                </View>
              </View>
            )}
          </View>
        )}
      </>
    );
  };

  const RadioBoxComponent = ({data}) => {
    const [answer, setAnswer] = useState([]);

    useEffect(() => {
      const answerObject = {
        question_id: data.id.toString(),
        question_type_id: data.question_type_id.toString(),
        answer,
      };

      const answerIndex = finalAnswer.current.findIndex(
        el => el.question_id === data.id.toString(),
      );
      answer.length > 0
        ? answerIndex === -1
          ? finalAnswer.current.push(answerObject)
          : (finalAnswer.current[answerIndex] = answerObject)
        : (finalAnswer.current = finalAnswer.current.filter(
            el => el.question_id !== data.id.toString(),
          ));
    }, [answer]);

    return (
      <View style={{backgroundColor: 'white', padding: 15}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../assets/question.png')}
            style={SIPCStyles.headerManImage}
          />
          <Text style={[SIPCStyles.SemiBold, {flex: 1, marginLeft: 15}]}>
            {data.question}
          </Text>
        </View>
        {data.answers.map((item, index) => (
          <RadioBox
            answers={item}
            key={index}
            answer={answer}
            setAnswer={setAnswer}
            selected={item?.answer_id.toString() === answer[0]?.id}
          />
        ))}
      </View>
    );
  };

  //Here answers is the for the item being used in check box and answer is the state which contains all the answer for the particular question
  const CheckBox = ({answers, answer, setAnswer}) => {
    const [checked, setChecked] = useState(false);
    const [comment, setComment] = useState('');
    const [completed, setCompleted] = useState(false);
    const [imagePath, setImagePath] = useState([]);
    const commentType = SurveyOptions[answers.comment_type];

    const onPress = () => {
      if (checked) {
        setAnswer(answer.filter(el => el.id !== answers.answer_id.toString()));
        setImagePath('');
        setComment('');
        setChecked(false);
      } else {
        setChecked(true);
        if (commentType.directAdd) {
          const filteredArray = Array.isArray(imagePath)
            ? imagePath
                .map(el => ({image: el.split('/').pop()}))
                .filter(el => el.image)
            : [];
          const result = filteredArray.length ? filteredArray : '';
          setAnswer([
            ...answer,
            {
              id: answers.answer_id.toString(),
              score: answers.score.toString(),
              is_comment_required: answers.is_comment_required.toString(),
              answer_name: answers.answer.toString(),
              comment,
              images: result,
            },
          ]);
        }
        setCompleted(false);
      }
    };

    const onCancel = () => {
      if (commentType.commentRequired) {
        setChecked(!checked);
        setComment('');
        setImagePath('');
      } else {
        setCompleted(true);
      }
    };

    const onSubmit = () => {
      if (comment === '' && (commentType.commentRequired || !commentType.commentRequired)) {
        Alert.alert('Comment is required.');
      }  else if (commentType.imageRequired && imagePath === '') {
        Alert.alert('Image is required.');
      } else {
        const filteredArray = Array.isArray(imagePath)
          ? imagePath
              .map(el => ({image: el.split('/').pop()}))
              .filter(el => el.image)
          : [];
        const answerObject = {
          id: answers.answer_id.toString(),
          score: answers.score.toString(),
          is_comment_required: answers.is_comment_required.toString(),
          answer_name: answers.answer.toString(),
          comment,
          images: filteredArray.length ? filteredArray : '',
        };
        if (answer.some(el => el.id === answers.answer_id.toString())) {
          const oldObject = answer.filter(
            el => el.id !== answers.answer_id.toString(),
          );
          setAnswer([...oldObject, answerObject]);
        } else {
          setAnswer([...answer, answerObject]);
        }
        setCompleted(true);
      }
    };

    const onCommentImagePress = () => {
      setChecked(true);
      setCompleted(!completed);
    };

    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
        }}>
        <View
          style={{
            flexDirection: 'column',
            width: width > 500 ? '50%' : '100%',
          }}>
          <>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 1,
                borderColor: '#CCCCCC',
                borderRadius: 12,
                marginTop: 15,
                alignItems: 'center',
                paddingRight: 12,
                overflow: 'hidden',
                height: height / 12,
                marginHorizontal: 20,
                borderBottomRightRadius: checked && completed === 1 ? 0 : 12,
                borderBottomLeftRadius: checked && completed === 1 ? 0 : 12,
              }}>
              <TouchableOpacity
                style={{paddingHorizontal: 10}}
                onPress={onPress}
                activeOpacity={0.85}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  color={'#3a7fc4'}
                />
              </TouchableOpacity>

              <View
                style={{
                  borderWidth: 0.8,
                  height: '100%',
                  borderColor: '#CCCCCC',
                }}
              />
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  marginLeft: 12,
                  paddingVertical: 2,
                  fontSize: responsiveScreenFontSize(1.8),
                  width: '30%',
                }}>
                {answers.answer}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  position: 'absolute',
                  right: 0,
                  alignSelf: 'center',
                }}>
                {commentType.completePopup && (
                  <>
                    {checked && !completed ? (
                      <>
                        <TouchableOpacity onPress={onCancel}>
                          <Text
                            style={[
                              SIPCStyles.checkboxFont,
                              {marginHorizontal: 10},
                            ]}>
                            Cancel
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => {
                            onSubmit();
                          }}>
                          <Text
                            style={[
                              SIPCStyles.checkboxFont,
                              {color: '#199be2', marginHorizontal: 10},
                            ]}>
                            Submit
                          </Text>
                        </TouchableOpacity>
                      </>
                    ) : (
                      <>
                        {commentType.commentShow && (
                          <TouchableWithoutFeedback
                            onPress={checked ? onCommentImagePress : onPress}>
                            <Image
                              source={require('../assets/msg.png')}
                              style={[SIPCStyles.commentImage]}
                            />
                          </TouchableWithoutFeedback>
                        )}

                        {commentType.imageShow && (
                          <TouchableWithoutFeedback
                            onPress={checked ? onCommentImagePress : onPress}>
                            <Image
                              source={require('../assets/img.png')}
                              style={[SIPCStyles.commentImage]}
                            />
                          </TouchableWithoutFeedback>
                        )}
                      </>
                    )}
                  </>
                )}
              </View>
            </View>

            {checked && !completed && commentType.completePopup && (
              <View>
                {/* {commentType.imageRequired && (
                  <Text
                    style={{
                      color: 'red',
                      alignSelf: 'center',
                      fontSize: responsiveScreenFontSize(1.8),
                    }}>
                    Image is Required!
                  </Text>
                )} */}

                {checked && (
                  <View style={{marginHorizontal: 20}}>
                    <TextInput
                      mode="text"
                      //  label="Outlined input"
                      placeholder={
                        commentType.commentRequired
                          ? 'Add Comment(Required)'
                          : 'Add Comment(Optional)'
                      }
                      value={comment}
                      onChangeText={setComment}
                      numberOfLines={8}
                      multiline={true}
                      underlineColor="transparent"
                      theme={{colors: {primary: '#cccccc'}}}
                      style={SIPCStyles.TextInput1}
                    />

                    {commentType.imageShow && (
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
                            <TouchableWithoutFeedback
                              onPress={() =>
                                openCamera(answers, imagePath, setImagePath)
                              }>
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

                            <TouchableWithoutFeedback
                              onPress={() =>
                                pickImage(answers, imagePath, setImagePath)
                              }>
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
                          {imagePath[0] !== '' && (
                            <FlatList
                              horizontal
                              data={imagePath}
                              keyExtractor={(item, index) => index}
                              renderItem={({item, index}) => (
                                <View style={{position: 'relative'}}>
                                  <Image
                                    source={{uri: item}}
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
                          )}
                        </View>
                      </View>
                    )}
                  </View>
                )}
              </View>
            )}
          </>
        </View>
      </View>
    );
  };

  const CheckBoxComponent = ({data}) => {
    const [answer, setAnswer] = useState([]);

    useEffect(() => {
      const answerObject = {
        question_id: data.id.toString(),
        question_type_id: data.question_type_id.toString(),
        answer,
      };
      const answerIndex = finalAnswer.current.findIndex(
        el => el.question_id === data.id.toString(),
      );
      answer.length > 0
        ? answerIndex === -1
          ? finalAnswer.current.push(answerObject)
          : (finalAnswer.current[answerIndex] = answerObject)
        : (finalAnswer.current = finalAnswer.current.filter(
            el => el.question_id !== data.id.toString(),
          ));
    }, [answer]);

    return (
      <View style={{backgroundColor: 'white', padding: 15}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../assets/question.png')}
            style={SIPCStyles.headerManImage}
          />
          <Text style={[SIPCStyles.SemiBold, {flex: 1, marginLeft: 15}]}>
            {data.question}
          </Text>
        </View>
        {data.answers.map(item => (
          <CheckBox
            answers={item}
            key={item.answer_id}
            answer={answer}
            setAnswer={setAnswer}
          />
        ))}
      </View>
    );
  };

  const setTextBoxJson = (data, answer) => {
    if (answer) {
      let answerObject = {
        question_id: data.id.toString(),
        question_type_id: data.question_type_id.toString(),
        answer: answer,
      };
      if (
        !finalAnswer.current.find(el => el.question_id === data.id.toString())
      ) {
        finalAnswer.current.push(answerObject);
      } else {
        var answerIndex = finalAnswer.current.findIndex(
          el => el.question_id === data.id.toString(),
        );
        finalAnswer.current[answerIndex] = answerObject;
      }
    }
  };

  const TextBox = ({data}) => {
    const [answer, setAnswer] = useState('');

    return (
      <View style={{borderRadius: 12, flex: 1}}>
        <TextInput
          mode="text"
          numberOfLines={8}
          multiline={true}
          underlineColor="transparent"
          theme={{colors: {primary: '#cccccc'}}}
          style={[
            SIPCStyles.TextInput1,
            {marginHorizontal: 20, marginTop: 10, borderRadius: 12, flex: 1},
          ]}
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

  const SurveyQuestions = ({data, index}) => {
    const [active, setActive] = useState(index === 0);
    const [subActive, setSubActive] = useState(false);

    return (
      <>
        <View
          style={{
            paddingHorizontal: '5%',
            marginTop: 25,
            backgroundColor: active ? '#fffcf8' : 'white',
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
              setActive(!active);
            }}>
            {active ? (
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
          <Text style={[SIPCStyles.BoldFont, {marginLeft: '5%'}]}>
            {data.section}
          </Text>
        </View>
        {data.section_data[0].questions_answers.map(question => {
          return (
            <View key={question.id}>
              {question.question_type_id === 1 && (
                <View style={!active && {display: 'none'}}>
                  <RadioBoxComponent data={question} />
                </View>
              )}

              {question.question_type_id === 2 && (
                <View style={!active && {display: 'none'}}>
                  <CheckBoxComponent data={question} />
                </View>
              )}

              {question.question_type_id === 3 && (
                <View
                  style={[
                    !active && {display: 'none'},
                    {backgroundColor: 'white', padding: 15},
                  ]}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../assets/question.png')}
                      style={SIPCStyles.headerManImage}
                    />
                    <Text
                      style={[SIPCStyles.SemiBold, {flex: 1, paddingLeft: 15}]}>
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
            <View key={sub.sub_section_id}>
              <View
                style={[
                  {
                    paddingHorizontal: '6%',
                    backgroundColor: subActive ? '#fffcf8' : 'white',
                    padding: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderColor: '#CCCCCC',
                  },
                  !active && {display: 'none'},
                ]}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    setSubActive(!subActive);
                  }}>
                  {subActive ? (
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
                <Text style={[SIPCStyles.BoldFont, {marginLeft: '5%'}]}>
                  {sub.sub_section}
                </Text>
              </View>
              {sub.questions_answers.map(question => {
                return (
                  <View key={question.id}>
                    {question.question_type_id === 1 && (
                      <View
                        style={(!active || !subActive) && {display: 'none'}}>
                        <RadioBoxComponent data={question} />
                      </View>
                    )}

                    {question.question_type_id === 2 && (
                      <View
                        style={(!active || !subActive) && {display: 'none'}}>
                        <CheckBoxComponent data={question} />
                      </View>
                    )}

                    {question.question_type_id === 3 && (
                      <View
                        style={[
                          (!active || !subActive) && {display: 'none'},
                          {backgroundColor: 'white', padding: 15},
                        ]}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Image
                            source={require('../assets/question.png')}
                            style={SIPCStyles.headerManImage}
                          />
                          <Text
                            style={[
                              SIPCStyles.SemiBold,
                              {flex: 1, paddingLeft: 15},
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
            </View>
          );
        })}
      </>
    );
  };

  const close = sheetObj => {
    setError(false);
    setErrorMessage('');
    sheetObj.current.close();
  };

  const saveSurvey = () => {
    var payload = JSON.stringify({
      appKey: CONFIG.appKey,
      device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
      surveyId: surveyId,
      user_id: user.id,
      user_survey_result_id:
        userSurveyResultId == undefined ? 0 : userSurveyResultId,
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
    console.log('Save Answer: ' + payload);
    API.instance
      .post(
        `/save-user-survey-device?is_api=true`,
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
      appKey: CONFIG.appKey,
      device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
      surveyId: surveyId,
      user_id: user.id,
      user_survey_result_id:
        userSurveyResultId == undefined ? 0 : userSurveyResultId,
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

    API.instance.post(`/save-user-survey-device?is_api=true`, payload).then(
      response => {
        setIsLoading(false);
        if (response.status == 'success') {
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
      {/* ======================HEader============================================= */}
      <Surface style={[SIPCStyles.headerSurface, {alignItems: 'center'}]}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/left.png')}
            style={SIPCStyles.headerManImage}
          />
        </TouchableWithoutFeedback>

        <View style={{marginHorizontal: 10}}>
          <Text
            style={[SIPCStyles.NormalFont, {width: width / 2}]}
            numberOfLines={1}>
            Survey: {surveyData.title}
          </Text>
        </View>

        <TouchableWithoutFeedback onPress={() => refRBSheet.current.open()}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[SIPCStyles.NormalFont, {color: '#199be2'}]}>
              Save/Submit
            </Text>
            <Entypo
              size={18}
              color={'#818081'}
              style={{paddingHorizontal: 5, alignSelf: 'center'}}
              name="chevron-down"
            />
          </View>
        </TouchableWithoutFeedback>
      </Surface>
      <Divider bold={true} />
      <ScrollView>
        {/* ===============================MULTIPLE============================ */}
        {data.map((item, index) => {
          return <SurveyQuestions data={item} key={index} index={index} />;
        })}
        {/* ============================================================ */}
      </ScrollView>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={false}
        dragFromTopOnly={true}
        height={height/1.12}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: 'transparent',
          },
          container:{
            backgroundColor: 'transparent',
          },
        }}>
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
            <TouchableWithoutFeedback onPress={() => close(refRBSheet)}>
              <Text style={[SIPCStyles.NormalFont, {}]}>Cancel</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => close(refRBSheet)}>
              <Text style={[SIPCStyles.NormalFont, {color: '#199be2'}]}>
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
                    fontFamily: 'Poppins-Medium',
                    fontSize: responsiveScreenFontSize(1.8),
                    marginHorizontal: 20,
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
              <Text style={[SIPCStyles.NormalFont, {paddingLeft: 10}]}>
                Save
              </Text>
            </TouchableOpacity>
            <Divider bold={true} style={{marginLeft: 30, marginTop: 10}} />

            <TouchableOpacity
              onPress={() => refRBSheet1.current.open()}
              style={[SIPCStyles.healthImageView, {marginTop: 25}]}>
              <Image
                source={require('../assets/submit.png')}
                style={SIPCStyles.MainBuilding}
              />
              <Text style={[SIPCStyles.NormalFont, {paddingLeft: 10}]}>
                Submit Survey
              </Text>
            </TouchableOpacity>

            <Divider bold={true} style={{marginLeft: 30, marginTop: 10}} />
          </Surface>
        </View>
      </RBSheet>

      <RBSheet
        ref={refRBSheet1}
        closeOnDragDown={false}
        closeOnPressMask={false}
        dragFromTopOnly={true}
        height={height}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
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
              padding: 25,
              backgroundColor: '#1281ca',
            }}>
            <Text
              style={[
                SIPCStyles.NormalFont,
                {textAlign: 'center', color: 'white'},
              ]}>
              Survey Completed By
            </Text>
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
                    fontFamily: 'Poppins-Medium',
                    fontSize: responsiveScreenFontSize(1.8),
                    marginHorizontal: 20,
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
              theme={{colors: {primary: '#cccccc'}}}
              style={[
                SIPCStyles.TextInput,
                {height: height / 18, marginTop: 15, borderRadius: 0},
              ]}
            />

            <TextInput
              onChangeText={value => setLastName(value)}
              mode="flat"
              placeholder="Last Name"
              placeholderTextColor={'black'}
              underlineColor="transparent"
              theme={{colors: {primary: '#cccccc'}}}
              style={[
                SIPCStyles.TextInput,
                {height: height / 18, marginTop: 25, borderRadius: 0},
              ]}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginVertical: 15,
              }}>
              <TouchableWithoutFeedback
                onPress={() => close(refRBSheet1)}
                style={{borderWidth: 1}}>
                <Text style={[SIPCStyles.NormalFont, {marginRight: 15}]}>
                  Cancel
                </Text>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={() => submitSurvey()}>
                <Text style={[SIPCStyles.NormalFont, {color: '#199be2'}]}>
                  Continue
                </Text>
              </TouchableWithoutFeedback>
            </View>
          </Surface>
        </View>
      </RBSheet>
      {isLoading && (
        <View
          style={{
            position: 'absolute',
            height: height,
            width: width,
            backgroundColor: '#00000077',
          }}>
          <Loader justifyContent="flex-start" marginTop={0} />
        </View>
      )}
      <StatusBar barStyle={'dark-content'} backgroundColor="#acbcc6" />
    </View>
  );
};

export default SaveSurvey;
