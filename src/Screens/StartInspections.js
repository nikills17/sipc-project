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
import React, { useState, useEffect } from 'react';
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
import { ScrollView } from 'react-native-gesture-handler';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';

import { MMKV } from 'react-native-mmkv'
import { CONFIG } from '../utility/config';
import API from '../utility/api';
export const storage = new MMKV();

const StartInspections = ({ navigation, route }) => {

  const jsonUser = storage.getString('user')
  const user = JSON.parse(jsonUser);

  

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMessage] = useState();

  const [showBuildingDropDown, setShowBuildingDropDown] = useState(false);
  const [building, setBuilding] = useState(0);
  const [buildingList, setBuildingList] = useState([]);
  {
    /* ============================SELECT Floor ============================= */
  }
  const [showFloorDropDown, setShowFloorDropDown] = useState(false);
  const [floor, setFloor] = useState(0);
  const [floorList, setFloorList] = useState([]);
  {
    /* ============================SELECT Room============================= */
  }
  const [showRoomDropDown, setShowRoomDropDown] = useState(false);
  const [room, setRoom] = useState(0);
  const [roomList, setRoomList] = useState([]);

  // =================================Building NAME =================================
  useEffect(() => {
    API.instance
      .post(
        `/inspection-building-device?is_api=true`,
        JSON.stringify({
          appKey: CONFIG.appKey,
          device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
          userId: user.id,
        }),
      )
      .then(
        response => {
          setError(false);
          setBuildingList(response.data);
          setError(false);
          setErrorMessage("")
        },
        error => console.error(error),
      );
  }, []);

  // =================================FLOOR NAME =================================
  useEffect(() => {
    if (building) {
      API.instance.post(`/floor-by-building-device?is_api=true`,
        JSON.stringify({
          appKey: CONFIG.appKey,
          device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
          userId: user.id,
          buildingId: building
        })).then(
          response => {
            setFloorList(response.data);
            setError(false);
            setErrorMessage("")
          },
          error => console.error(error),
        );
    }
  }, [building]);

  // =================================Room NAME =================================
  useEffect(() => {
    if (building && floor) {
      API.instance.post(`/room-by-floor-device?is_api=true`,
        JSON.stringify({
          appKey: CONFIG.appKey,
          device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
          userId: user.id,
          buildingId: building,
          floorId: floor,
        })).then(
          response => {
            setRoomList(response.data);
            setError(false);
            setErrorMessage("")
          },
          error => console.error(error),
        );
    }
  }, [building, floor]);
  // =================================================

  const params = JSON.stringify({
    appKey: CONFIG.appKey,
    device_id: "68d41abf-31bb-4bc8-95dc-bb835f1bc7a1",
    buildingId: building,
    floorId: floor,
    roomId: room,
    userId: user.id,
  });

  const StartInspection = () => {
    API.instance
      .post(
        '/start-inspection-validate-api?is_api=true',
        params).then(
          response => {
            setError(false);
            setErrorMessage("");
            if (response.status === "success") {
              navigation.navigate('CleaningInspections', {
                data: response.data,
                buildingName: buildingList.find(el => el.id === building)
                  .building_name,
                floorName: floorList.find(el => el.id === floor)
                  .name,
                roomName: roomList.find(el => el.id === room)
                  .room_name,
              })
            } else {
              setError(true);
              setErrorMessage(response.error);
            }
          },
          error => {
            console.error(error);
          },
        );
  }



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
          <Text style={SIPCStyles.AddNewText}>Start Inspections</Text>
        </Surface>
        {/* ============================SELECT ITEM============================= */}
        {error && (
          <View style={{ width: '100%', }}>
            <Text style={{ color: 'red', fontFamily: 'Poppins-Medium', fontSize: responsiveScreenFontSize(1.8), marginHorizontal: 20, marginTop: 20 }}>
              Error! {errorMsg}
            </Text>
          </View>
        )
        }
        <View style={{ marginHorizontal: 20, marginVertical: 15, zIndex: 10 }}>
          <DropDownPicker
            listMode="SCROLLVIEW"
            searchable={true}
            searchPlaceholder=""
            searchContainerStyle={{ backgroundColor: '#fffff6' }}
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
                  style={{ paddingHorizontal: 5 }}
                  name="chevron-thin-down"
                />
              );
            }}
            ArrowUpIconComponent={() => {
              return (
                <Entypo
                  size={16}
                  color={'#808080'}
                  style={{ paddingHorizontal: 5 }}
                  name="chevron-thin-up"
                />
              );
            }}
            placeholder="Select Building"
            placeholderStyle={SIPCStyles.placeholderStyle}
            style={SIPCStyles.DropDownPicker1}
            textStyle={SIPCStyles.textSize}
            dropDownContainerStyle={SIPCStyles.dropDownContainerStyle1}
            labelStyle={[SIPCStyles.NormalFont, { paddingHorizontal: 5 }]}
            open={showBuildingDropDown}
            value={building}
            items={buildingList.map(item => ({ label: item.building_name, value: item.id }))}
            setOpen={setShowBuildingDropDown}
            setValue={setBuilding}
            setItems={setBuildingList}
          />
        </View>

        {/* ============================SELECT ISSUE============================= */}
        <View style={{ marginHorizontal: 20, marginVertical: 15, zIndex: 9 }}>
          <DropDownPicker
            listMode="SCROLLVIEW"
            searchable={true}
            searchPlaceholder=""
            searchContainerStyle={{ backgroundColor: '#fffff6' }}
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
                  style={{ paddingHorizontal: 5 }}
                  name="chevron-thin-down"
                />
              );
            }}
            ArrowUpIconComponent={() => {
              return (
                <Entypo
                  size={16}
                  color={'#808080'}
                  style={{ paddingHorizontal: 5 }}
                  name="chevron-thin-up"
                />
              );
            }}
            placeholder="Select Floor"
            placeholderStyle={SIPCStyles.placeholderStyle}
            style={SIPCStyles.DropDownPicker1}
            textStyle={SIPCStyles.textSize}
            dropDownContainerStyle={SIPCStyles.dropDownContainerStyle1}
            labelStyle={[SIPCStyles.NormalFont, { paddingHorizontal: 5 }]}
            open={showFloorDropDown}
            value={floor}
            items={floorList.map(item => ({ label: item.name, value: item.id }))}
            setOpen={setShowFloorDropDown}
            setValue={setFloor}
            setItems={setFloorList}
          />
        </View>
        {/* ============================SELECT ISSUE TYPE============================= */}
        <View style={{ marginHorizontal: 20, marginVertical: 15, zIndex: 8 }}>
          <DropDownPicker
            listMode="SCROLLVIEW"
            searchable={true}
            searchPlaceholder=""
            searchContainerStyle={{ backgroundColor: '#fffff6' }}
            itemSeparator={true}
            itemSeparatorStyle={{
              backgroundColor: '#D2D2D2',
              marginVertical: 10,
            }}
            showArrowIcon={true}
            showTickIcon={false}
            ArrowDownIconComponent={() => {
              return (
                <Entypo
                  size={16}
                  color={'#808080'}
                  style={{ paddingHorizontal: 5 }}
                  name="chevron-thin-down"
                />
              );
            }}
            ArrowUpIconComponent={() => {
              return (
                <Entypo
                  size={16}
                  color={'#808080'}
                  style={{ paddingHorizontal: 5 }}
                  name="chevron-thin-up"
                />
              );
            }}
            placeholder="Select Room"
            placeholderStyle={SIPCStyles.placeholderStyle}
            style={SIPCStyles.DropDownPicker1}
            textStyle={SIPCStyles.textSize}
            dropDownContainerStyle={SIPCStyles.dropDownContainerStyle1}
            labelStyle={[SIPCStyles.NormalFont, { paddingHorizontal: 5 }]}
            open={showRoomDropDown}
            value={room}
            items={roomList.map(item => ({ label: item.room_name, value: item.id }))}
            setOpen={setShowRoomDropDown}
            setValue={setRoom}
            setItems={setRoomList}
          />
        </View>
      </ScrollView>
      {/* ============================================================================ */}

      <Card
        style={{
          marginTop: 15,
          backgroundColor: 'white',
          borderRadius: 0,
          bottom: 0,
          position: 'absolute',
          width: '100%',
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Inspections')}>
            <Text style={[SIPCStyles.NormalFont, { padding: 15 }]}>Cancel</Text>
          </TouchableWithoutFeedback>

          <View style={{ borderWidth: 1, borderColor: '#e6e6e6' }} />

          <TouchableWithoutFeedback
            onPress={() => StartInspection()} >
            <Text
              style={[SIPCStyles.NormalFont, { color: '#199be2', padding: 15 }]}>
              Start
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </Card>
    </View>
  );
};

export default StartInspections;
