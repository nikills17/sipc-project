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
import React, { useState, useEffect, useRef } from 'react';
import {
  Card,
  Text,
  Button,
  TextInput,
  Surface,
  Divider,
  Checkbox,
} from 'react-native-paper';
import SIPCStyles from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import API from '../utility/api';
import { CONFIG } from '../utility/config';
import { MMKV } from 'react-native-mmkv';
import InspectionCheckBox from '../component/inspectioncheckbox';
import Loader from '../component/activityindicator';



const CleaningInspections = ({ navigation, route }) => {
  const { data, floorName, roomName, buildingName, building } = route?.params;



  const storage = new MMKV();
  const jsonUser = storage.getString('user');
  const user = JSON.parse(jsonUser);

  const [roomData, setRoomData] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const completeRef = useRef();
  const allItemsRef = useRef();

  const [error, setError] = useState(false);
  const [errorMsg, setErrorMessage] = useState();
  const [Active, setActive] = useState(data.inspection_type_id);

  const Width = Dimensions.get('window').width;
  const Height = Dimensions.get('window').height;

  //  -----------------Floor DropDown
  const [showFloorDropDown, setShowFloorDropDown] = useState(false);
  const [floor, setFloor] = useState(data.floor_id.toString());
  const [floorList, setFloorList] = useState([]);

  //  -----------------Room DropDown------------------------
  const [showRoomDropDown, setShowRoomDropDown] = useState(false);
  const [room, setRoom] = useState(data.room_id.toString());
  const [roomList, setRoomList] = useState([]);

  //  -----------------ALl Items==========
  const [showItemDropDown, setShowItemDropDown] = useState(false);
  const [item, setItem] = useState(0);
  const [itemList, setItemList] = useState([]);

  const [listRooms, setListRooms] = useState([]);

  // ===================API CALLING==================================//

  const payload = JSON.stringify({
    appKey: CONFIG.appKey,
    device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
    inspectionResultId: data.inspection_result_id,
    inspectionTypeId: data.inspection_type_id,
    roomId: data.room_id,
    userId: user.id,
  });
  useEffect(() => {
    setIsLoading(true);
    API.instance
      .post(
        `/room-summary-api?is_api=true`, payload
      )
      .then(
        response => {
          // console.log('roomData.detected_condition=====.' +JSON.stringify(roomData));
          setRoomData(response);
          setIsLoading(false);
        },
        error => {
          console.error(error);
          setIsLoading(false);
        },
      );
  }, [Active]);

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
          console.log('FLOOR DATA===(1)==.' +JSON.stringify(response.data));
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
          console.log('Room DATA====(2)=.' +JSON.stringify(response.data));
            setRoomList(response.data);
            setError(false);
            setErrorMessage("")
          },
          error => console.error(error),
        );
    }
  }, [building,floor]);

  // =================================Item NAME =================================
  useEffect(() => {
    if (room) {
      API.instance.post(`/item-by-room-device?is_api=true`,
        JSON.stringify({
          appKey: CONFIG.appKey,
          device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
          roomId: room, 
        })).then(
          response => {;
            setItemList(response.data);
            setError(false);
            setErrorMessage("")
          },
          error => console.error(error),
        );
    }
  }, [room]);

  //===============================ROOM LIST DATA


  useEffect(() => {
    API.instance.post(`/list-items-by-room-api?is_api=true`,
      JSON.stringify({
        appKey: CONFIG.appKey,
        device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
        roomId: room,
        buildingId: building,
        inspectionResultId: data.inspection_result_id,
        inspectionTypeId: Active,
        userId: user.id,
      })).then(
        response => {
          setListRooms(response.data);
          setError(false);
          setErrorMessage("")
        },
        error => console.error(error),
      );
  }, [Active]);



  return (
    <View style={SIPCStyles.flex}>
      <StatusBar barStyle={'dark-content'} backgroundColor="#3a7fc4" />
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
            {Active === 1 ? (
              <Text
                style={[SIPCStyles.NormalFont, { width: Width / 2 }]}
                numberOfLines={1}>
                Cleaning Inspections-<Text>{buildingName}</Text>
              </Text>
            ) : (
              <Text
                style={[SIPCStyles.NormalFont, { width: Width / 2 }]}
                numberOfLines={1}>
                Maintenance Inspections-<Text>{buildingName}</Text>
              </Text>
            )}
          </View>

          <TouchableWithoutFeedback onPress={() => completeRef.current.open()} >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[SIPCStyles.NormalFont, { color: '#199be2' }]}>
                Complete
              </Text>
              <Entypo
                size={18}
                color={'#818081'}
                style={{ paddingHorizontal: 5 }}
                name="chevron-down"
              />
            </View>
          </TouchableWithoutFeedback>
        </Surface>

        <Divider bold={true} />

        {/* ======================COMPLETE MODAL========================== */}

        <RBSheet
          ref={completeRef}
          closeOnDragDown={false}
          closeOnPressMask={false}
          dragFromTopOnly={true}
          height={Height / 1.12}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: 'transparent',
            },
            container: {
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
                // backgroundColor: 'red',
                paddingTop: 10,
                paddingHorizontal: 15,
              }}>
              <TouchableWithoutFeedback onPress={() => completeRef.current.close()}>
                <Text style={[SIPCStyles.NormalFont, {}]}>Cancel</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => completeRef.current.close()}>
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
              <View style={SIPCStyles.healthImageView}>
                <Image
                  source={require('../assets/room.png')}
                  style={SIPCStyles.MainBuilding}
                />
                <TouchableOpacity>
                  <Text style={[SIPCStyles.NormalFont, { paddingLeft: 10 }]}>
                    Complete Room
                  </Text>
                </TouchableOpacity>
              </View>
              <Divider bold={true} style={{ marginLeft: 30, marginTop: 10 }} />

              {/* <TouchableWithoutFeedback> */}
              <View style={[SIPCStyles.healthImageView, { marginTop: 25 }]}>
                <Image
                  source={require('../assets/building.png')}
                  style={SIPCStyles.MainBuilding}
                />
                <TouchableOpacity>
                  <Text style={[SIPCStyles.NormalFont, { paddingLeft: 10 }]}>
                    Complete Building{' '}
                  </Text>
                </TouchableOpacity>
              </View>
              {/* </TouchableWithoutFeedback> */}

              <Divider bold={true} style={{ marginLeft: 30, marginTop: 10 }} />
            </Surface>
          </View>
        </RBSheet>

        {/* ===========================FLOOR Room Items======================================= */}

        <Surface
          style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            padding: 15,
            justifyContent: 'space-around',
          }}>
          <View
            style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
            <Image
              source={require('../assets/floor.png')}
              style={SIPCStyles.MainBuilding}
            />
            <Text
              style={[
                SIPCStyles.NormalFont,
                { paddingLeft: 8, width: Width / 4.9, fontWeight: '800' },
              ]}
              numberOfLines={1}>
              {floorName }
            </Text>
          </View>

          <View
            style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
            <Image
              source={require('../assets/door.png')}
              style={SIPCStyles.MainBuilding}
            />
            <Text
              style={[
                SIPCStyles.NormalFont,
                { paddingLeft: 8, width: Width / 3.9, fontWeight: '800' },
              ]}
              numberOfLines={1}>
              {roomName}
            </Text>
          </View>

          <View
            style={{ flexDirection: 'row', padding: 5, alignItems: 'center' }}>
            <Image
              source={require('../assets/dot.png')}
              style={SIPCStyles.MainBuilding}
            />
            <Text
              style={[
                SIPCStyles.NormalFont,
                { paddingLeft: 8, width: Width / 5.5, fontWeight: '800' },
              ]}
              numberOfLines={1}>
              All Items
            </Text>
          </View>
          <TouchableWithoutFeedback onPress={() => allItemsRef.current.open()} >
            <View style={{ flexDirection: 'row', padding: 5 }}>
              <Entypo
                size={18}
                color={'#818081'}
                style={{ paddingHorizontal: 5, alignSelf: 'center' }}
                name="chevron-down"
              />
            </View>
          </TouchableWithoutFeedback>
        </Surface>
        <Divider bold={true} />
        {/* =================================================allItemsRef============= */}

        <RBSheet
          ref={allItemsRef}
          closeOnDragDown={false}
          closeOnPressMask={false}
          dragFromTopOnly={true}
          height={Height / 1.24}

          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: 'transparent',
            },
            container: {
              backgroundColor: 'transparent',
            },
          }}>


          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 20,
              backgroundColor: '#e2e0eb',
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingBottom: 15,
              }}>
              <TouchableWithoutFeedback onPress={() => allItemsRef.current.close()}>
                <Text style={[SIPCStyles.NormalFont, {}]}>Cancel</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => allItemsRef.current.close()}>
                <Text style={[SIPCStyles.NormalFont, { color: '#199be2' }]}>
                  Done
                </Text>
              </TouchableWithoutFeedback>
            </View>

            {/* <Surface elevation={4} style={{ padding: 15, backgroundColor: 'white', borderRadius: 10, marginTop: 10,  }}> */}

            {/* ===========================FLoor Dropdown=================== */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                zIndex: 10,
                marginHorizontal: 10,
              }}>
              <DropDownPicker
                searchable={true}
                searchPlaceholder=""
                searchContainerStyle={{
                  backgroundColor: '#fffff6',
                  borderColor: '#D2D2D2',
                }}
                searchTextInputStyle={{ borderColor: '#D2D2D2' }}
                itemSeparator={true}
                itemSeparatorStyle={{
                  backgroundColor: '#D2D2D2',
                  marginVertical: 3,
                }}
                showArrowIcon={true}
                showTickIcon={false}
                ArrowDownIconComponent={() => {
                  return (
                    <Entypo
                      size={18}
                      color={'#818081'}
                      style={{ paddingHorizontal: 5 }}
                      name="chevron-down"
                    />
                  );
                }}
                ArrowUpIconComponent={() => {
                  return (
                    <Entypo
                      size={18}
                      color={'#818081'}
                      style={{ paddingHorizontal: 5 }}
                      name="chevron-up"
                    />
                  );
                }}
                style={[
                  SIPCStyles.DropDownPicker2,
                  {
                    marginHorizontal: 0,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    borderTopLeftRadius: 10,
                    borderTopLeftRadius: 10,
                  },
                ]}
                textStyle={SIPCStyles.textSize}
                dropDownContainerStyle={[SIPCStyles.dropDownContainerStyle2, {}]}
                labelStyle={[SIPCStyles.NormalFont, { paddingHorizontal: 5 }]}
                open={showFloorDropDown}
                value={floor}
                items={floorList.map(item => ({ label: item.name, value: item.id }))}
                setOpen={setShowFloorDropDown}
                setValue={setFloor}
                setItems={setFloorList}
                placeholder="Select Floor"

              />
            </View>

            {/* ===========================Room Dropdown=================== */}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                zIndex: 9,
                marginHorizontal: 10,
              }}>
              <DropDownPicker
                searchable={true}
                searchPlaceholder=""
                searchContainerStyle={{
                  backgroundColor: '#fffff6',
                  borderColor: '#D2D2D2',
                }}
                searchTextInputStyle={{ borderColor: '#D2D2D2' }}
                itemSeparator={true}
                itemSeparatorStyle={{
                  backgroundColor: '#D2D2D2',
                  marginVertical: 3,
                }}
                showArrowIcon={true}
                showTickIcon={false}
                ArrowDownIconComponent={() => {
                  return (
                    <Entypo
                      size={18}
                      color={'#818081'}
                      style={{ paddingHorizontal: 5 }}
                      name="chevron-down"
                    />
                  );
                }}
                ArrowUpIconComponent={() => {
                  return (
                    <Entypo
                      size={18}
                      color={'#818081'}
                      style={{ paddingHorizontal: 5 }}
                      name="chevron-up"
                    />
                  );
                }}
                style={[
                  SIPCStyles.DropDownPicker2,
                  { marginHorizontal: 0, borderRadius: 0 },
                ]}
                placeholder="Select Room"
                textStyle={SIPCStyles.textSize}
                dropDownContainerStyle={[SIPCStyles.dropDownContainerStyle2, {}]}
                labelStyle={[SIPCStyles.NormalFont, { paddingHorizontal: 5 }]}
                open={showRoomDropDown}
                value={room}
                items={roomList.map(item => ({ label: item.room_name, value: item.id }))}
                setOpen={setShowRoomDropDown}
                setValue={setRoom}
                setItems={setRoomList}
              />
            </View>
            {/* ===========================Items Dropdown=================== */}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                zIndex: 8,
                marginHorizontal: 10,
              }}>
              <DropDownPicker
                searchable={true}
                searchPlaceholder=""
                searchContainerStyle={{
                  backgroundColor: '#fffff6',
                  borderColor: '#D2D2D2',
                }}
                searchTextInputStyle={{ borderColor: '#D2D2D2' }}
                itemSeparator={true}
                itemSeparatorStyle={{
                  backgroundColor: '#D2D2D2',
                  marginVertical: 3,
                }}
                showArrowIcon={true}
                showTickIcon={false}
                ArrowDownIconComponent={() => {
                  return (
                    <Entypo
                      size={18}
                      color={'#818081'}
                      style={{ paddingHorizontal: 5 }}
                      name="chevron-down"
                    />
                  );
                }}
                ArrowUpIconComponent={() => {
                  return (
                    <Entypo
                      size={18}
                      color={'#818081'}
                      style={{ paddingHorizontal: 5 }}
                      name="chevron-up"
                    />
                  );
                }}
                style={[
                  SIPCStyles.DropDownPicker2,
                  {
                    marginHorizontal: 0,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                  },
                ]}
                placeholder="Select Item"
                textStyle={SIPCStyles.textSize}
                dropDownContainerStyle={[SIPCStyles.dropDownContainerStyle2, {}]}
                labelStyle={[SIPCStyles.NormalFont, { paddingHorizontal: 5 }]}
                open={showItemDropDown}
                value={item}
                items={itemList.map(item => ({ label: item.item_name, value: item.room_item_id }))}
                setOpen={setShowItemDropDown}
                setValue={setItem}
                setItems={setItemList}
              />
            </View>

            {/* </Surface> */}
          </View>

        </RBSheet>
        {/* ==========================================TABS============================================ */}
        <View
          style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          <Card
            elevation={0}
            style={{
              paddingVertical: 15,
              paddingHorizontal: 20,
              backgroundColor: 'white',
              borderBottomWidth: Active === 1 ? 1 : 0,
              borderColor: Active === 1 ? '#1485cc' : 'transparent',
              width: Width / 2,
            }}
            onPress={() => setActive(1)}>
            <Text
              style={[
                SIPCStyles.NormalFont,
                {
                  textAlign: 'center',
                  color: Active === 1 ? '#1485cc' : '#525252',
                },
              ]}>
              Cleaning
            </Text>
          </Card>

          <Card
            elevation={0}
            style={{
              paddingVertical: 15,
              paddingHorizontal: 20,
              backgroundColor: 'white',
              borderBottomWidth: Active === 2 ? 1 : 0,
              borderColor: Active === 2 ? '#1485cc' : 'transparent',
              width: Width / 2,
            }}
            onPress={() => setActive(2)}>
            <Text
              style={[
                SIPCStyles.NormalFont,
                {
                  color: Active === 2 ? '#1485cc' : '#525252',
                  textAlign: 'center',
                },
              ]}>
              Maintenance
            </Text>
          </Card>
        </View>
        <Divider bold={true} />

        {/* --------------------------IF USER CLICK ON MAINTENANCE --------------------------*/}
        {/* MAINTENANCE+_------------------------------------------- */}

        {Active === 2 && (
          <>
            <View
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 5,
                }}>
                <Card style={SIPCStyles.CleaningItems}>
                  <Text style={[SIPCStyles.NormalFont, {}]}>{roomData.total_item}</Text>
                </Card>
                <Text style={[SIPCStyles.NormalFont, { paddingLeft: 5 }]}>
                  {roomData.total_item === '0' || '1' ? 'Items' : 'Items'}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 5,
                }}>
                <Card style={SIPCStyles.CleaningItems}>
                  <Text style={[SIPCStyles.NormalFont, {}]}>{roomData.detected_condition}</Text>
                </Card>
                <Text style={[SIPCStyles.NormalFont, { paddingLeft: 5 }]}>
                  {roomData.detected_condition === '0' || '1' ? 'Conditions' : 'Condition'}{'\n'} Detected
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 5,
                }}>
                <Card style={SIPCStyles.CleaningItems}>
                  <Text style={[SIPCStyles.NormalFont, {}]}>{roomData.satisfactory_item}</Text>
                </Card>
                <Text style={[SIPCStyles.SemiBold, { paddingLeft: 5 }]}>
                  {roomData.satisfactory_item === '0' || '1' ? 'item' : 'items'}{'\n'}Satisfactory
                </Text>
              </View>
            </View>
            <Divider bold={true} />
            <View
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 15,
              }}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setActive(1);
                }}>
                <Text style={[SIPCStyles.NormalFont, { color: '#1485cc' }]}>
                  Switch to cleaning mode for quality score
                </Text>
              </TouchableWithoutFeedback>
            </View>
            <Divider bold={true} />


          </>
        )}


        {/* ===========================IF USER CLICK ON CLEANING ===================== */}

        {/* ===========================================ROOM QUALITY=================== */}

        {Active === 1 && (
          <>
            <View
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 15,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 5,
                }}>
                <Card style={SIPCStyles.CleaningItems}>
                  <Text style={[SIPCStyles.NormalFont, {}]}>{roomData.total_item}</Text>
                </Card>
                <Text style={[SIPCStyles.NormalFont, { paddingLeft: 5 }]}>
                  {roomData.total_item === '0' || '1' ? 'Items' : 'Items'}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 5,
                }}>
                <Card style={SIPCStyles.CleaningItems}>
                  <Text style={[SIPCStyles.NormalFont, {}]}>{roomData.detected_condition}</Text>
                </Card>
                <Text style={[SIPCStyles.NormalFont, { paddingLeft: 5 }]}>
                  {roomData.detected_condition === '0' || '1' ? 'Conditions' : 'Condition'}{'\n'} Detected
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 5,
                }}>
                <Card style={SIPCStyles.CleaningItems}>
                  <Text style={[SIPCStyles.NormalFont, {}]}>{roomData.satisfactory_item}</Text>
                </Card>
                <Text style={[SIPCStyles.SemiBold, { paddingLeft: 5 }]}>
                  {roomData.satisfactory_item === '0' || '1' ? 'item' : 'items'}{'\n'}Satisfactory
                </Text>
              </View>
            </View>

            <Divider bold={true} />
            <View
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 15,
              }}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  paddingLeft: 10,
                  flexShrink: 1,
                }}>

                <Text style={[SIPCStyles.inspectionScore, SIPCStyles.BoldFont,
                roomData.room_quality > 90 ? SIPCStyles.textSuccess :
                  roomData.room_quality > 80 ? SIPCStyles.textWarning :
                    SIPCStyles.textDanger]}>{roomData.room_quality}%</Text>


                <Text style={[SIPCStyles.lowFont, {}]}>Room Quality</Text>
              </View>

              <View
                style={{ flexDirectionL: 'row', alignItems: 'center', flex: 1 }}>
                <Card
                  style={{
                    backgroundColor: '#00aa34',
                    borderRadius: 5,
                    height: hp('3.5%'),
                    width: wp('8%'),
                  }}
                />
                <Text style={SIPCStyles.NormalFont}>Good</Text>
              </View>

              <View
                style={{ flexDirectionL: 'row', alignItems: 'center', flex: 1 }}>
                <Card
                  style={{
                    backgroundColor: '#fbac00',
                    borderRadius: 5,
                    height: hp('3.5%'),
                    width: wp('8%'),
                  }}
                />
                <Text style={SIPCStyles.NormalFont}>Warning</Text>
              </View>

              <View
                style={{ flexDirectionL: 'row', alignItems: 'center', flex: 1 }}>
                <Card
                  style={{
                    backgroundColor: '#ea1227',
                    borderRadius: 5,
                    height: hp('3.5%'),
                    width: wp('8%'),
                  }}
                />
                <Text style={[SIPCStyles.NormalFont, { textAlign: 'center' }]}>
                  Attention{'\n'}
                </Text>
              </View>
            </View>
          </>
        )}


        {isLoading ? (<>
          <Loader />
        </>) : (<>
          {listRooms.map((item, index) => (
            <InspectionCheckBox
              data={item}
              key={index}
              navigation={navigation} />
          ))}

        </>)}



        {/* =================================================================== */}
      </ScrollView>

    </View>
  );
};
export default CleaningInspections;
