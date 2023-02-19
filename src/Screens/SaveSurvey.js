import {
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  TextInput,
  Surface,
  Divider,
  Checkbox,
  RadioButton,
} from 'react-native-paper';
import SIPCStyles from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-crop-picker';
import API from '../utility/api';

const SaveSurvey = ({navigation, route}) => {
  const [surveyData, setSurveyData] = useState([]);
  const [data, setData] = useState([]);

  // const [finalAnswer, setfinalAnswer] = useState([]);
  const finalAnswer = useRef([]);

  {
    /* ===================== MODAL================ */
  }
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

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
      });
  }, []);

  const [images, setImages] = useState([]);
  const maxImages = 10;

  const openCamera = (imagePath, setImagePath) => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      //cropping: true,
    }).then(image => {
      if (imagePath.length + 1 > maxImages) {
        alert(`Max limit reached: ${maxImages}`);
        return;
      }
      setImagePath([...imagePath, {image: image.path}]);
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
        setImages([...images, ...newImages.map(i => ({path: i.path}))]);
      })
      .catch(error => console.error(error));
  };

  const TextBox = ({data}) => {
    const [answer, setAnswer] = useState('');

    return (
      <TextInput
        style={{minHeight: 40, maxHeight: 80, marginTop: 12}}
        multiline={true}
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
            if (
              !finalAnswer.current.find(
                el => el.question_id === data.id.toString(),
              )
            ) {
              finalAnswer.current.push(answerObject);
            } else {
              var answerIndex = finalAnswer.current.findIndex(
                el => el.question_id === data.id.toString(),
              );
              finalAnswer.current[answerIndex] = answerObject;
            }
          }
        }}
      />
    );
  };

  //Here answers is the for the item being used in check box and answer is the state which contains all the answer for the particular question
  const CheckBox = ({answers, answer, setAnswer}) => {
    const [checked, setChecked] = useState(false);
    const [comment, setComment] = useState('');
    const [completed, setCompleted] = useState(false);
    const [imagePath, setImagePath] = useState([]);

    return (
      <>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: '#CCCCCC',
            borderRadius: 12,
            marginTop: 2,
            alignItems: 'center',
            paddingRight: 12,
            overflow: 'hidden',
          }}
          onPress={() => {
            setChecked(!checked);
            if (completed) {
              setCompleted(false);
            }
          }}
          activeOpacity={0.85}>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#CCCCCC',
              alignItems: 'center',
              justifyContent: 'center',
              borderTopLeftRadius: 8,
              borderBottomLeftRadius: 8,
              paddingHorizontal: '3%',
              paddingVertical: '8%',
            }}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              color={'#3a7fc4'}
            />
          </View>
          <Text
            style={{
              fontFamily: 'Poppins-Medium',
              marginLeft: 12,
              marginRight: '18%',
              paddingVertical: 2,
            }}>
            {answers.answer}
          </Text>
        </TouchableOpacity>
        {checked && !completed && (
          <View>
            <TextInput
              style={{minHeight: 40, maxHeight: 60, marginTop: 6}}
              multiline={true}
              placeholder={'Add Comment'}
              value={comment}
              onChangeText={setComment}
            />
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
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: 12,
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setChecked(!checked);
                }}>
                <Text style={{fontFamily: 'Poppins-SemiBold'}}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  var answerObject = {
                    id: answers.answer_id.toString(),
                    score: answers.score.toString(),
                    comment: comment,
                    images: imagePath,
                  };
                  setCompleted(!completed);
                  setAnswer([...answer, answerObject]); //TODO :  Add condition to replace if data already exists
                }}>
                <Text
                  style={{fontFamily: 'Poppins-SemiBold', color: '#3a7fc4'}}>
                  SUBMIT
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </>
    );
  };

  const CheckBoxComponent = ({data}) => {
    const [answer, setAnswer] = useState([]);

    useEffect(() => {
      if (answer.length > 0) {
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
    }, [answer]);

    return (
      <>
        <View style={{backgroundColor: 'white', padding: 15}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/question.png')}
              style={SIPCStyles.headerManImage}
            />
            <Text style={[SIPCStyles.SemiBold, {flex: 1, marginLeft: 15}]}>
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

  const RadioBox = ({answers, selected, setSelected}) => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <RadioButton
          status={answers === selected ? 'checked' : 'unchecked'}
          onPress={() => setSelected(answers)}
          value="first"
          color={'#3a7fc4'}
        />
        <Text
          onPress={() => setSelected(answers)}
          style={{
            fontFamily: 'Poppins-Medium',
            marginHorizontal: 16,
            fontSize: 16,
          }}>
          {answers.answer}
        </Text>
      </View>
    );
  };

  const RadioBoxComponent = ({data}) => {
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
              comment: '',
              images: [],
            },
          ],
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
    }, [answer]);

    return (
      <>
        <View style={{backgroundColor: 'white', padding: 15}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/question.png')}
              style={SIPCStyles.headerManImage}
            />
            <Text style={[SIPCStyles.SemiBold, {flex: 1, marginLeft: 15}]}>
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

  const SurveyQuestions = ({data}) => {
    const [Active, setActive] = useState(0);
    const [SubActive, setSubActive] = useState(false);

    const switch_tab = x => {
      if (x == Active) {
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
          <Text style={[SIPCStyles.BoldFont, {marginLeft: '5%'}]}>
            {data.section}
          </Text>
        </View>
        {data.section_data[0].questions_answers.map(question => {
          return (
            <View key={question.id}>
              {question.question_type_id === 1 && (
                <View style={Active !== 1 && {display: 'none'}}>
                  <RadioBoxComponent data={question} />
                </View>
              )}

              {question.question_type_id === 2 && (
                <View style={Active !== 1 && {display: 'none'}}>
                  <CheckBoxComponent data={question} />
                </View>
              )}

              {question.question_type_id === 3 && (
                <View
                  style={[
                    Active !== 1 && {display: 'none'},
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
                  !Active && {display: 'none'},
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
                <Text style={[SIPCStyles.BoldFont, {marginLeft: '5%'}]}>
                  {sub.sub_section}
                </Text>
              </View>
              {sub.questions_answers.map(question => {
                return (
                  <View key={question.id}>
                    {question.question_type_id === 1 && (
                      <View style={SubActive !== true && {display: 'none'}}>
                        <RadioBoxComponent data={question} />
                      </View>
                    )}

                    {question.question_type_id === 2 && (
                      <View style={SubActive !== true && {display: 'none'}}>
                        <CheckBoxComponent data={question} />
                      </View>
                    )}

                    {question.question_type_id === 3 && (
                      <View
                        style={[
                          SubActive !== true && {display: 'none'},
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
            </>
          );
        })}
      </>
    );
  };

  const saveSurvey = () => {
    console.log('Save Survey!');
    let payload = JSON.stringify({
      appKey: 'f9285c6c2d6a6b531ae1f70d2853f612',
      device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
      surveyId: route?.param?.surveyId,
      user_id: '1',
      user_survey_result_id: '0',
      org_id: route?.param?.orgId,
      org_name: route?.param?.orgName,
      building_id: route?.param?.buildingId,
      building_name: route?.param?.buildingName,
      request_type: '0',
      survey_session_id: '',
      first_name: '',
      last_name: '',
      questions: finalAnswer,
    });
    console.log(payload);
    // API.instance
    //   .post(
    //     `http://sipcsurvey.devuri.com/sipcsurvey/save-user-survey-device?is_api=true`,
    //     payload,
    //   )
    //   .then(
    //     response => {
    //       console.log(response);
    //     },
    //     error => {
    //       console.error(error);
    //     },
    //   );
  };

  const submitSurvey = () => {
    console.log('Submit Survey!');
  };

  return (
    <View style={SIPCStyles.flex}>
      <StatusBar barStyle={'dark-content'} backgroundColor="#acbcc6" />
      <ScrollView>
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

          <TouchableWithoutFeedback onPress={showModal}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[SIPCStyles.NormalFont, {color: '#199be2'}]}>
                Save/Submit
              </Text>
              {visible == true ? (
                <Entypo
                  size={18}
                  color={'#818081'}
                  style={{paddingHorizontal: 5, alignSelf: 'center'}}
                  name="chevron-up"
                />
              ) : (
                <Entypo
                  size={18}
                  color={'#818081'}
                  style={{paddingHorizontal: 5, alignSelf: 'center'}}
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

            {/* <TouchableWithoutFeedback> */}
            <TouchableOpacity
              onPress={submitSurvey}
              style={[SIPCStyles.healthImageView, {marginTop: 25}]}>
              <Image
                source={require('../assets/submit.png')}
                style={SIPCStyles.MainBuilding}
              />
              <Text style={[SIPCStyles.NormalFont, {paddingLeft: 10}]}>
                Submit Survey{' '}
              </Text>
            </TouchableOpacity>
            {/* </TouchableWithoutFeedback> */}

            <Divider bold={true} style={{marginLeft: 30, marginTop: 10}} />
          </Surface>
        </View>
      </Modal>
    </View>
  );
};

export default SaveSurvey;
