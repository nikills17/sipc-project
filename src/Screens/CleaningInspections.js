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



const CleaningInspections = ({ navigation, route }) => {
  const { data, floorName, roomName, buildingName } = route?.params

  const storage = new MMKV();
  const jsonUser = storage.getString('user');
  const user = JSON.parse(jsonUser);

  const [roomData, setRoomData] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  const completeRef = useRef();
  const allItemsRef = useRef();


  // ========CLEANING Checkbox ============
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  // ========MAINTENANCE Checkbox ============

  const [CheckedMain, setCheckedMain] = useState('0');
  const [CheckedMain1, setCheckedMain1] = useState(false);
  const [CheckedMain2, setCheckedMain2] = useState(false);

  // const Cancel = () => {
  //     if (checked1) {
  //         setChecked1(false)
  //     }
  // }

  const SatisfactoryPress = () => {
    if (setChecked(!checked) === setChecked1(false) && setChecked2(false)) {
    }
  };

  const UnSatisfactoryPress = () => {
    if (
      setChecked1(!checked1) ||
      setChecked2(!checked2) === setChecked(false)
    ) {
      console.log('if');
    }
  };
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMessage] = useState();
  const [Active, setActive] = useState(1);

  const Width = Dimensions.get('window').width;
  const Height = Dimensions.get('window').height;

  //  -----------------Floor DropDown
  const [showFloorDropDown, setShowFloorDropDown] = useState(false);
  const [floor, setFloor] = useState(0);
  const [floorList, setFloorList] = useState([]);

  //  -----------------Room DropDown------------------------
  const [showRoomDropDown, setShowRoomDropDown] = useState(false);
  const [room, setRoom] = useState(0);
  const [roomList, setRoomList] = useState([]);
  //  -----------------ALl Items==========
  const [showItemDropDown, setShowItemDropDown] = useState(false);
  const [item, setItem] = useState(0);
  const [itemList, setItemList] = useState([]);

  // ===================API CALLING==================================//

  const payload = JSON.stringify({
    appKey: CONFIG.appKey,
    device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
    inspectionResultId: data.inspection_result_id,
    inspectionTypeId: data.inspection_type_id,
    roomId: data.room_id,
    userId: user.id,
  });
  // console.log('payload' + payload);
  useEffect(() => {
    setIsLoading(true);
    API.instance
      .post(
        `/room-summary-api?is_api=true`, payload
      )
      .then(
        response => {
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

  // useEffect(() => {
  //   API.instance.post(`/floor-by-building-device?is_api=true`,
  //     JSON.stringify({
  //       appKey: CONFIG.appKey,
  //       device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
  //       userId: user.id,
  //       // buildingId: building
  //     })).then(
  //       response => {
  //         setFloorList(response.data);
  //         setFloor(0);
  //         setError(false);
  //         setErrorMessage("")
  //       },
  //       error => console.error(error),
  //     );
  // }
  //   , []);



  // -----------------------IMAGE PICKER---Cleaning---------------------
  // const [Images, setImages] = useState();
  const [CamImg, setCamImg] = useState();

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

  // -----------------------IMAGE PICKER---MAINTENANCE---------------------
  const [MainImages, setMainImages] = useState([]);

  const [numMainColumns, setNumMainColumns] = useState(3);
  const maxMainImages = 10;

  const openMainCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      //cropping: true,
    }).then(image => {
      if (MainImages.length + 1 > maxMainImages) {
        alert(`Max limit reached: ${maxMainImages}`);
        return;
      }
      setMainImages([...MainImages, { path: image.path }]);
    });
  };

  const pickMainImage = () => {
    ImagePicker.openPicker({
      multiple: true,
      maxFiles: maxMainImages - MainImages.length,
    })
      .then(newMainImages => {
        if (MainImages.length + newMainImages.length > maxMainImages) {
          alert(`Max limit reached: ${maxMainImages}`);
          return;
        }
        setImages([...MainImages, ...newMainImages.map(i => ({ path: i.path }))]);
      })
      .catch(error => console.error(error));
  };

  const deleteMainImage = index => {
    setMainImages(MainImages.filter((_, i) => i !== index));
  };

  // ============================================

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
            {Active == 1 ? (
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
              {floorName}
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
                placeholder="Select Floor"
                textStyle={SIPCStyles.textSize}
                dropDownContainerStyle={[SIPCStyles.dropDownContainerStyle2, {}]}
                labelStyle={[SIPCStyles.NormalFont, { paddingHorizontal: 5 }]}
                open={showFloorDropDown}
                value={floor}
                items={floorList}
                setOpen={setShowFloorDropDown}
                setValue={setFloor}
                setItems={setFloorList}
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
                items={roomList}
                setOpen={setShowRoomDropDown}
                setValue={setRoom}
                setItems={setRoomList}
                selectedItemLabelStyle={() => {
                  return (
                    <Image
                      source={require('../assets/building.png')}
                      style={SIPCStyles.MainBuilding}
                    />
                  );
                }}
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
                items={itemList}
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
              borderBottomWidth: Active == 1 ? 1 : 0,
              borderColor: Active == 1 ? '#1485cc' : 'transparent',
              width: Width / 2,
            }}
            onPress={() => setActive(1)}>
            <Text
              style={[
                SIPCStyles.NormalFont,
                {
                  textAlign: 'center',
                  color: Active == 1 ? '#1485cc' : '#525252',
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
              borderBottomWidth: Active == 2 ? 1 : 0,
              borderColor: Active == 2 ? '#1485cc' : 'transparent',
              width: Width / 2,
            }}
            onPress={() => setActive(2)}>
            <Text
              style={[
                SIPCStyles.NormalFont,
                {
                  color: Active == 2 ? '#1485cc' : '#525252',
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

        {Active == 2 ? (
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

            {/* ===========================================FLOOR DATA ========================== */}
            <Surface
              elevation={4}
              style={{
                marginTop: 25,
                backgroundColor: 'white',
                paddingBottom: 20,
              }}>
              <View style={{ backgroundColor: '#fffcf8', padding: 15 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[SIPCStyles.BoldFont, { paddingHorizontal: 15 }]}>
                    Chair - Student
                  </Text>
                  {/* <Text style={SIPCStyles.BoldFont}>LVT or VCT</Text> */}
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={[SIPCStyles.NormalFont, { paddingHorizontal: 15 }]}>
                    3 conditions |
                  </Text>
                  <Text style={SIPCStyles.NormalFont}>0 Issues</Text>
                </View>
              </View>

              {/* ==========================CHECKBOX============================== */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  flexWrap: Width > 500 ? 'wrap' : 'wrap',
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    width: Width > 500 ? '50%' : '100%',
                  }}>
                  <View style={{ flexDirection: 'column' }}>
                    <View style={SIPCStyles.CheckboxView}>
                      <View
                        style={{
                          padding: 10,
                          alignItems: 'center',
                          alignSelf: 'center',
                        }}>
                        <Checkbox
                          status={CheckedMain ? 'checked' : 'unchecked'}
                          onPress={() => {
                            setCheckedMain(!CheckedMain);
                          }}
                        />
                      </View>
                      <View style={{ borderWidth: 1, borderColor: '#ccc' }} />

                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text
                          style={[
                            SIPCStyles.checkboxFont,
                            { paddingLeft: 10, color: '#00aa34' },
                          ]}>
                          Satisfactory
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                {/* ================= */}

                <View
                  style={{
                    flexDirection: 'column',
                    width: Width > 500 ? '50%' : '100%',
                  }}>
                  <View style={{ flexDirection: 'column' }}>
                    <View
                      style={[
                        SIPCStyles.CheckboxView,
                        {
                          borderTopRightRadius: 10,
                          borderTopLeftRadius: 10,
                          borderBottomLeftRadius: CheckedMain == 1 ? 0 : 10,
                          borderBottomRightRadius: CheckedMain == 1 ? 0 : 10,
                        },
                      ]}>
                      <View style={{ padding: 10, alignSelf: 'center' }}>
                        <Checkbox
                          status={CheckedMain == 1 ? 'checked' : 'unchecked'}
                          onPress={() => {
                            setCheckedMain(!CheckedMain);
                          }}
                        />
                      </View>

                      <View style={{ borderWidth: 1, borderColor: '#ccc' }} />

                      <Text
                        style={[
                          SIPCStyles.checkboxFont,
                          { paddingLeft: 10, alignSelf: 'center' },
                        ]}>
                        Duty
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          position: 'absolute',
                          right: 0,
                          alignSelf: 'center',
                        }}>
                        {CheckedMain == 1 ? (
                          <>
                            <TouchableWithoutFeedback
                              onPress={() => {
                                setCheckedMain(!CheckedMain);
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
                                setCheckedMain(!CheckedMain);
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
                            <TouchableWithoutFeedback
                              onPress={() => {
                                setCheckedMain(!CheckedMain);
                              }}>
                              <Image
                                source={require('../assets/msg.png')}
                                style={SIPCStyles.commentImage}
                              />
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback
                              onPress={() => {
                                setCheckedMain(!CheckedMain);
                              }}>
                              <Image
                                source={require('../assets/img.png')}
                                style={SIPCStyles.commentImage}
                              />
                            </TouchableWithoutFeedback>
                          </>
                        )}
                      </View>
                    </View>
                    {CheckedMain == 1 ? (
                      <View style={{ marginHorizontal: 20 }}>
                        <TextInput
                          mode="text"
                          //  label="Outlined input"
                          placeholder="Enter Your Comment"
                          numberOfLines={8}
                          multiline={true}
                          underlineColor="transparent"
                          theme={{ colors: { primary: '#cccccc' } }}
                          style={SIPCStyles.TextInput1}
                        />

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
                                onPress={() => openMainCamera()}>
                                <Image
                                  source={require('../assets/camera.png')}
                                  style={SIPCStyles.cameraImage}
                                />
                              </TouchableWithoutFeedback>

                              <View
                                style={{ borderWidth: 1, borderColor: '#e6e6e6' }}
                              />

                              <TouchableWithoutFeedback onPress={pickMainImage}>
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
                              <View style={{ flexDirection: 'column-reverse' }}>
                                <FlatList
                                  data={MainImages}
                                  numColumns={2}
                                  decelerationRate="fast"
                                  bounces={false}
                                  renderItem={({ item, index }) => (
                                    <View
                                      style={{
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                      }}>
                                      <Image
                                        style={{
                                          width: Width / 4,
                                          height: Height / 10,
                                          marginHorizontal: 35,
                                          marginVertical: 5,
                                          resizeMode: 'contain',
                                          borderRadius: 10,
                                        }}
                                        source={{
                                          uri: `data:${item.type};base64,${item.data}`,
                                        }}
                                      />
                                    </View>
                                  )}
                                  keyExtractor={(item, index) => item.id}
                                />
                              </View>
                            </ScrollView>
                          </View>
                        </View>
                      </View>
                    ) : null}
                  </View>
                </View>
                {/* ======================= */}

                <View style={{ width: Width > 500 ? '50%' : '100%' }}>
                  <View style={{ flexDirection: 'column' }}>
                    <View
                      style={[
                        SIPCStyles.CheckboxView,
                        {
                          borderTopRightRadius: 10,
                          borderTopLeftRadius: 10,
                          borderBottomLeftRadius: CheckedMain2 == 1 ? 0 : 10,
                          borderBottomRightRadius: CheckedMain2 == 1 ? 0 : 10,
                        },
                      ]}>
                      <View style={{ padding: 10, alignSelf: 'center' }}>
                        <Checkbox
                          status={CheckedMain2 ? 'checked' : 'unchecked'}
                          onPress={() => {
                            setCheckedMain2(!CheckedMain2);
                          }}
                        />
                      </View>

                      <View style={{ borderWidth: 1, borderColor: '#ccc' }} />

                      <Text
                        style={[
                          SIPCStyles.checkboxFont,
                          { paddingLeft: 10, alignSelf: 'center' },
                        ]}>
                        Streak
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          position: 'absolute',
                          right: 0,
                          alignSelf: 'center',
                        }}>
                        {CheckedMain2 == 1 ? (
                          <>
                            <TouchableWithoutFeedback
                              onPress={() => {
                                setCheckedMain2(!CheckedMain2);
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
                                setCheckedMain2(!CheckedMain2);
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
                            <TouchableWithoutFeedback
                              onPress={() => {
                                setCheckedMain2(!CheckedMain2);
                              }}>
                              <Image
                                source={require('../assets/msg.png')}
                                style={SIPCStyles.commentImage}
                              />
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback
                              onPress={() => {
                                setCheckedMain2(!CheckedMain2);
                              }}>
                              <Image
                                source={require('../assets/img.png')}
                                style={SIPCStyles.commentImage}
                              />
                            </TouchableWithoutFeedback>
                          </>
                        )}
                      </View>
                    </View>

                    {CheckedMain2 == 1 ? (
                      <View style={{ marginHorizontal: 20 }}>
                        <TextInput
                          mode="text"
                          //  label="Outlined input"
                          placeholder="Enter Your Comment"
                          numberOfLines={8}
                          multiline={true}
                          underlineColor="transparent"
                          theme={{ colors: { primary: '#cccccc' } }}
                          style={SIPCStyles.TextInput1}
                        />

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
                                onPress={() => openMainCamera()}>
                                <Image
                                  source={require('../assets/camera.png')}
                                  style={SIPCStyles.cameraImage}
                                />
                              </TouchableWithoutFeedback>

                              <View
                                style={{ borderWidth: 1, borderColor: '#e6e6e6' }}
                              />

                              <TouchableWithoutFeedback
                                onPress={() => pickMainImage()}>
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
                              flexWrap: Width > 500 ? 'wrap' : 'wrap',
                              flex: 1,
                            }}>
                            <ScrollView
                              nestedScrollEnabled={true}
                              horizontal={true}>
                              <FlatList
                                numColumns={numMainColumns}
                                data={MainImages}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => (
                                  <View style={{ position: 'relative' }}>
                                    <Image
                                      source={{ uri: item.path }}
                                      style={SIPCStyles.CameraClickImage}
                                    />
                                    <TouchableOpacity
                                      style={SIPCStyles.crossImage}
                                      onPress={() => deleteMainImage(index)}>
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
                      </View>
                    ) : null}
                  </View>
                </View>
              </View>
            </Surface>
          </>
        ) : null}

        {/* ===========================IF USER CLICK ON CLEANING ===================== */}

        {/* ===========================================ROOM QUALITY=================== */}

        {Active == 1 ? (
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
            {/* ===========================================FLOOR DATA ========================== */}
            <Surface
              elevation={4}
              style={{
                marginTop: 25,
                backgroundColor: 'white',
                paddingBottom: 20,
              }}>
              <View style={{ backgroundColor: '#fffcf8', padding: 15 }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[SIPCStyles.BoldFont, { paddingHorizontal: 15 }]}>
                    Floor -
                  </Text>
                  <Text style={SIPCStyles.BoldFont}>LVT or VCT</Text>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={[SIPCStyles.NormalFont, { paddingHorizontal: 15 }]}>
                    3 conditions |
                  </Text>
                  <Text style={SIPCStyles.NormalFont}>0 Issues</Text>
                </View>
              </View>

              {/* ==========================CHECKBOX============================== */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  flexWrap: Width > 500 ? 'wrap' : 'wrap',
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    width: Width > 500 ? '50%' : '100%',
                  }}>
                  <View style={{ flexDirection: 'column' }}>
                    {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}> */}
                    <View style={SIPCStyles.CheckboxView}>
                      <View
                        style={{
                          padding: 10,
                          alignItems: 'center',
                          alignSelf: 'center',
                        }}>
                        <Checkbox
                          status={checked ? 'checked' : 'unchecked'}
                          onPress={SatisfactoryPress}
                        />
                      </View>
                      <View style={{ borderWidth: 1, borderColor: '#ccc' }} />

                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text
                          style={[
                            SIPCStyles.checkboxFont,
                            { paddingLeft: 10, color: '#00aa34' },
                          ]}>
                          Satisfactory
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                {/* ================= */}
                <View
                  style={{
                    flexDirection: 'column',
                    width: Width > 500 ? '50%' : '100%',
                  }}>
                  <View style={{ flexDirection: 'column' }}>
                    <View
                      style={[
                        SIPCStyles.CheckboxView,
                        {
                          borderTopRightRadius: 10,
                          borderTopLeftRadius: 10,
                          borderBottomLeftRadius: checked1 == 1 ? 0 : 10,
                          borderBottomRightRadius: checked1 == 1 ? 0 : 10,
                        },
                      ]}>
                      <View style={{ padding: 10, alignSelf: 'center' }}>
                        <Checkbox
                          status={checked1 ? 'checked' : 'unchecked'}
                          onPress={() => {
                            setChecked1(!checked1);
                          }}
                        />
                      </View>

                      <View style={{ borderWidth: 1, borderColor: '#ccc' }} />

                      <Text
                        style={[
                          SIPCStyles.checkboxFont,
                          { paddingLeft: 10, alignSelf: 'center' },
                        ]}>
                        Duty
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          position: 'absolute',
                          right: 0,
                          alignSelf: 'center',
                        }}>
                        {checked1 == 1 ? (
                          <>
                            <TouchableWithoutFeedback
                              onPress={() => {
                                setChecked1(!checked1);
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
                                setChecked1(!checked1);
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
                            <TouchableWithoutFeedback
                              onPress={() => {
                                setChecked1(!checked1);
                              }}>
                              <Image
                                source={require('../assets/msg.png')}
                                style={SIPCStyles.commentImage}
                              />
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback
                              onPress={() => {
                                setChecked1(!checked1);
                              }}>
                              <Image
                                source={require('../assets/img.png')}
                                style={SIPCStyles.commentImage}
                              />
                            </TouchableWithoutFeedback>
                          </>
                        )}
                      </View>


                    </View>
                    {checked1 == 1 ? (
                      <View style={{ marginHorizontal: 20 }}>
                        <TextInput
                          mode="text"
                          //  label="Outlined input"
                          placeholder="Enter Your Comment"
                          numberOfLines={8}
                          multiline={true}
                          underlineColor="transparent"
                          theme={{ colors: { primary: '#cccccc' } }}
                          style={SIPCStyles.TextInput1}
                        />

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
                              flexWrap: Width > 500 ? 'wrap' : 'wrap',
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
                      </View>
                    ) : null}
                  </View>
                </View>
                {/* ======================= */}
                <View
                  style={{
                    flexDirection: 'column',
                    width: Width > 500 ? '50%' : '100%',
                  }}>
                  <View style={{ flexDirection: 'column' }}>
                    <View
                      style={[
                        SIPCStyles.CheckboxView,
                        {
                          borderTopRightRadius: 10,
                          borderTopLeftRadius: 10,
                          borderBottomLeftRadius: checked2 == 1 ? 0 : 10,
                          borderBottomRightRadius: checked2 == 1 ? 0 : 10,
                        },
                      ]}>
                      <View style={{ padding: 10, alignSelf: 'center' }}>
                        <Checkbox
                          status={checked2 ? 'checked' : 'unchecked'}
                          onPress={() => {
                            setChecked2(!checked2);
                          }}
                        />
                      </View>

                      <View style={{ borderWidth: 1, borderColor: '#ccc' }} />

                      <Text
                        style={[
                          SIPCStyles.checkboxFont,
                          { paddingLeft: 10, alignSelf: 'center' },
                        ]}>
                        Streak
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          position: 'absolute',
                          right: 0,
                          alignSelf: 'center',
                        }}>
                        {checked2 == 1 ? (
                          <>
                            <TouchableWithoutFeedback
                              onPress={() => {
                                setChecked2(!checked2);
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
                                setChecked2(!checked2);
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
                            <TouchableWithoutFeedback
                              onPress={() => {
                                setChecked2(!checked2);
                              }}>
                              <Image
                                source={require('../assets/msg.png')}
                                style={SIPCStyles.commentImage}
                              />
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback
                              onPress={() => {
                                setChecked2(!checked2);
                              }}>
                              <Image
                                source={require('../assets/img.png')}
                                style={SIPCStyles.commentImage}
                              />
                            </TouchableWithoutFeedback>
                          </>
                        )}
                      </View>
                    </View>

                    {checked2 == 1 ? (
                      <View style={{ marginHorizontal: 20 }}>
                        <TextInput
                          mode="text"
                          //  label="Outlined input"
                          placeholder="Enter Your Comment"
                          numberOfLines={8}
                          multiline={true}
                          underlineColor="transparent"
                          theme={{ colors: { primary: '#cccccc' } }}
                          style={SIPCStyles.TextInput1}
                        />

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
                      </View>
                    ) : null}
                  </View>
                </View>
              </View>
            </Surface>
          </>
        ) : null}
        {/* ACTIVE == 1 close here */}

        {/* =================================================================== */}
      </ScrollView>

    </View>
  );
};

export default CleaningInspections;
