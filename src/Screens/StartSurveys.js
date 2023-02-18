import {
  View,
  Alert,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
  PermissionsAndroid,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  Button,
  Card,
  Searchbar,
  TextInput,
  Surface,
  Divider,
  Text,
} from 'react-native-paper';
import Icon2 from 'react-native-vector-icons/Entypo';
import SIPCStyles from './styles';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import DropDownPicker from 'react-native-dropdown-picker';
import {ScrollView} from 'react-native-gesture-handler';
import API from '../utility/api';

const StartSurveys = ({navigation, route}) => {
  const [showDropDown1, setShowDropDown1] = useState(false);
  const [Group, setGroup] = useState();
  const [GroupList, setGroupList] = useState([
    {
      name: 'Select an Organisation first!',
      id: null,
    },
  ]);
  {
    /* ============================SELECT Floor ============================= */
  }
  const [showDropDown2, setShowDropDown2] = useState(false);
  const [Group2, setGroup2] = useState();
  const [GroupList2, setGroupList2] = useState([
    {
      name: 'Select an Organisation first!',
      id: null,
    },
  ]);

  const [error, setError] = useState(false);

  useEffect(() => {
    API.instance
      .post(
        `http://sipcsurvey.devuri.com/sipcsurvey/organization-list-device?is_api=true`,
        JSON.stringify({
          appKey: 'f9285c6c2d6a6b531ae1f70d2853f612',
          device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
          userId: '1',
        }),
      )
      .then(
        response => {
          setGroupList(response.data);
        },
        error => console.error(error),
      );
  }, []);

  useEffect(() => {
    if (Group) {
      API.instance
        .post(
          `http://sipcsurvey.devuri.com/sipcsurvey/get-buildings-by-org?is_api=true`,
          JSON.stringify({
            appKey: 'f9285c6c2d6a6b531ae1f70d2853f612',
            device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
            orgId: Group,
          }),
        )
        .then(
          response => {
            setGroupList2(response.data);
          },
          error => console.error(error),
        );
    }
  }, [Group]);

  return (
    <View style={SIPCStyles.flex}>
      <StatusBar barStyle={'dark-content'} backgroundColor="#3a7fc4" />
      <ScrollView>
        {/* ----------------------------------------------------------------------- */}
        <Surface
          style={{
            backgroundColor: '#3a7fc4',
            padding: 15,
            alignItems: 'center',
          }}>
          <Text style={SIPCStyles.AddNewText}>Start Survey</Text>
        </Surface>

        {/* ============================SELECT ITEM============================= */}

        <View style={{marginHorizontal: 20, marginVertical: 15, zIndex: 10}}>
          <DropDownPicker
            listMode="SCROLLVIEW"
            searchable={true}
            searchPlaceholder=""
            searchContainerStyle={{backgroundColor: '#fffff6'}}
            itemSeparator={true}
            itemSeparatorStyle={{
              backgroundColor: '#D2D2D2',
              marginVertical: 10,
            }}
            showArrowIcon={true}
            // showTickIcon={false}
            ArrowDownIconComponent={() => {
              return (
                <Entypo
                  size={16}
                  color={'#808080'}
                  style={{paddingHorizontal: 5}}
                  name="chevron-thin-down"
                />
              );
            }}
            ArrowUpIconComponent={() => {
              return (
                <Entypo
                  size={16}
                  color={'#808080'}
                  style={{paddingHorizontal: 5}}
                  name="chevron-thin-up"
                />
              );
            }}
            placeholder="Select Organization"
            placeholderStyle={SIPCStyles.placeholderStyle}
            style={SIPCStyles.DropDownPicker1}
            textStyle={SIPCStyles.textSize}
            dropDownContainerStyle={SIPCStyles.dropDownContainerStyle1}
            labelStyle={[SIPCStyles.NormalFont, {paddingHorizontal: 5}]}
            open={showDropDown1}
            value={Group}
            items={GroupList.map(item => ({label: item.name, value: item.id}))}
            setOpen={setShowDropDown1}
            setValue={setGroup}
            setItems={setGroupList}
          />
        </View>

        {/* ============================SELECT ISSUE============================= */}
        <View style={{marginHorizontal: 20, marginVertical: 15, zIndex: 9}}>
          <DropDownPicker
            listMode="SCROLLVIEW"
            searchable={true}
            searchPlaceholder=""
            searchContainerStyle={{backgroundColor: '#fffff6'}}
            itemSeparator={true}
            itemSeparatorStyle={{
              backgroundColor: '#D2D2D2',
              marginVertical: 10,
            }}
            showArrowIcon={true}
            // showTickIcon={false}
            ArrowDownIconComponent={() => {
              return (
                <Entypo
                  size={16}
                  color={'#808080'}
                  style={{paddingHorizontal: 5}}
                  name="chevron-thin-down"
                />
              );
            }}
            ArrowUpIconComponent={() => {
              return (
                <Entypo
                  size={16}
                  color={'#808080'}
                  style={{paddingHorizontal: 5}}
                  name="chevron-thin-up"
                />
              );
            }}
            placeholder="Select Building"
            placeholderStyle={SIPCStyles.placeholderStyle}
            style={SIPCStyles.DropDownPicker1}
            textStyle={SIPCStyles.textSize}
            dropDownContainerStyle={SIPCStyles.dropDownContainerStyle1}
            labelStyle={[SIPCStyles.NormalFont, {paddingHorizontal: 5}]}
            open={showDropDown2}
            value={Group2}
            items={GroupList2.map(item => ({
              label: item.building_name,
              value: item.id,
            }))}
            setOpen={setShowDropDown2}
            setValue={setGroup2}
            setItems={setGroupList2}
          />
        </View>
        {error && (
          <View
            style={{
              width: '100%',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: 'red',
                fontFamily: 'Poppins-Medium',
              }}>
              Select An Organization and A Building
            </Text>
            <Text
              style={{
                color: 'red',
                fontFamily: 'Poppins-Medium',
              }}>
              to Start the Survey!
            </Text>
          </View>
        )}
      </ScrollView>
      {/* =================================================================== */}
      <Card
        style={{
          marginTop: 15,
          backgroundColor: 'white',
          borderRadius: 0,
          bottom: 0,
          position: 'absolute',
          width: '100%',
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableWithoutFeedback
            style={{}}
            onPress={() => {
              navigation.navigate('Surveys');
            }}>
            <Text style={[SIPCStyles.NormalFont, {padding: 15}]}>Cancel</Text>
          </TouchableWithoutFeedback>

          <View style={{borderWidth: 1, borderColor: '#e6e6e6'}} />

          <TouchableWithoutFeedback
            style={{}}
            onPress={() => {
              if (Group && Group2) {
                setError(false);
                navigation.navigate('SaveSurvey', {
                  surveyId: route?.params?.surveyId,
                });
              } else {
                setError(true);
              }
            }}>
            <Text
              style={[SIPCStyles.NormalFont, {color: '#199be2', padding: 15}]}>
              Start
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </Card>
    </View>
  );
};

export default StartSurveys;
