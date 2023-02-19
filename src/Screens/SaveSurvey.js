import {
  View,
  Alert,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
  PermissionsAndroid,
  TouchableWithoutFeedback,
  ScrollView,
  Modal,
  Dimensions,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  Card,
  Text,
  Button,
  TextInput,
  Surface,
  Divider,
  Checkbox,
  RadioButton,
} from 'react-native-paper';
import Icon2 from 'react-native-vector-icons/Entypo';
import SIPCStyles from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment';
import API from '../utility/api';

const SaveSurvey = ({navigation, route}) => {
  const [RadioChecked, setRadioChecked] = useState();
  const [Checked, setChecked] = useState(false);
  const [Checked1, setChecked1] = useState(false);
  const [surveyData, setSurveyData] = useState([]);
  const [data, setData] = useState([]);

  // const [SecChecked, setSecChecked] = useState()
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
      setImages([...images, {path: image.path}]);
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

  const deleteImage = index => {
    setImages(images.filter((_, i) => i !== index));
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
        // onEndEditing
      />
    );
  };

  const CheckBoxComponent = ({data}) => {
    const [answer, setAnswer] = useState();

    const CheckBox = ({answers}) => {
      const [checked, setChecked] = useState(false);

      return (
        <View
          style={{
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: '#CCCCCC',
            borderRadius: 12,
            marginTop: 2,
            alignItems: 'center',
            paddingRight: 12,
            overflow: 'hidden',
          }}>
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
              onPress={() => {
                setChecked(!checked);
              }}
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
        </View>
      );
    };

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
            return <CheckBox answers={item} key={item.answer_id} />;
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
        <Text style={{fontFamily: 'Poppins-Medium', marginHorizontal: 8, fontSize: 16}}>
          {answers.answer}
        </Text>
      </View>
    );
  };

  const RadioBoxComponent = ({data}) => {
    const [answer, setAnswer] = useState();
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
    const [SubActive, setSubActive] = useState(0);

    const switch_tab = x => {
      if (x == Active) {
        setActive(0);
      } else {
        setActive(x);
      }
    };

    const switch_subSec = x => {
      if (x == SubActive) {
        setSubActive(0);
      } else {
        setSubActive(x);
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
      </>
    );
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
      <Modal
        visible={visible}
        style={{}}
        transparent={true}
        animationType="slide">
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
            <View style={SIPCStyles.healthImageView}>
              <Image
                source={require('../assets/save.png')}
                style={SIPCStyles.MainBuilding}
              />
              <TouchableOpacity>
                <Text style={[SIPCStyles.NormalFont, {paddingLeft: 10}]}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
            <Divider bold={true} style={{marginLeft: 30, marginTop: 10}} />

            {/* <TouchableWithoutFeedback> */}
            <View style={[SIPCStyles.healthImageView, {marginTop: 25}]}>
              <Image
                source={require('../assets/submit.png')}
                style={SIPCStyles.MainBuilding}
              />
              <TouchableOpacity>
                <Text style={[SIPCStyles.NormalFont, {paddingLeft: 10}]}>
                  Submit Survey{' '}
                </Text>
              </TouchableOpacity>
            </View>
            {/* </TouchableWithoutFeedback> */}

            <Divider bold={true} style={{marginLeft: 30, marginTop: 10}} />
          </Surface>
        </View>
      </Modal>
    </View>
  );
};

export default SaveSurvey;
