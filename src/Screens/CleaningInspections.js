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
import React, {useState, useEffect, useRef} from 'react';
import {
  Card,
  Text,
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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import API from '../utility/api';
import {CONFIG} from '../utility/config';
import {MMKV} from 'react-native-mmkv';
import InspectionCheckBox from '../component/inspectioncheckbox';
import Loader from '../component/activityindicator';

const CleaningInspections = ({navigation, route}) => {
  const {data, floorName, roomName, buildingName, building} = route?.params;

  const storage = new MMKV();
  const jsonUser = storage.getString('user');
  const user = JSON.parse(jsonUser);

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const [active, setActive] = useState(data.inspection_type_id);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMessage] = useState('');

  const [roomData, setRoomData] = useState([]);
  const [listRooms, setListRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const completeRef = useRef();
  const allItemsRef = useRef();
  const checkBoxRef = useRef([]);
  const checkBoxCommentRef = useRef([]);

  const [showFloorDropDown, setShowFloorDropDown] = useState(false);
  const [floor, setFloor] = useState(data.floor_id.toString());
  const [floorList, setFloorList] = useState([]);

  const [showRoomDropDown, setShowRoomDropDown] = useState(false);
  const [room, setRoom] = useState(data.room_id.toString());
  const [roomList, setRoomList] = useState([]);

  const [showItemDropDown, setShowItemDropDown] = useState(false);
  const [item, setItem] = useState(0);
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const payload = JSON.stringify({
      appKey: CONFIG.appKey,
      device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
      inspectionResultId: data.inspection_result_id,
      inspectionTypeId: data.inspection_type_id,
      roomId: data.room_id,
      userId: user.id,
    });
    API.instance.post(`/room-summary-api?is_api=true`, payload).then(
      response => {
        if (response?.status === 'success');
        {
          setRoomData(response);
          API.instance
            .post(
              `/load-floor-room-item-api?is_api=true`,
              JSON.stringify({
                appKey: CONFIG.appKey,
                device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
                userId: user.id,
                buildingId: data.building_id,
                floorId: data.floor_id,
                roomId: data.room_id,
              }),
            )
            .then(
              response => {
                setIsLoading(false);
                if (response?.status == 'success') {
                  setFloorList(response?.floors);
                  setRoomList(response?.rooms);
                  let items = response?.items;
                  setItemList([{item_name: 'All', room_item_id: 0}, ...items]);
                }
              },
              error => {
                console.error(error), setIsLoading(false);
              },
            );
        }
      },
      error => {
        console.error(error);
      },
    );
  }, []);

  useEffect(() => {
    setIsLoading(true);
    API.instance
      .post(
        `/list-items-by-room-api?is_api=true`,
        JSON.stringify({
          appKey: CONFIG.appKey,
          device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
          roomId: room,
          buildingId: building,
          inspectionResultId: data.inspection_result_id,
          inspectionTypeId: active,
          userId: user.id,
        }),
      )
      .then(
        response => {
          if (response?.status === 'success') {
            setListRooms(response?.data);
            setIsLoading(false);
          }
        },
        error => console.error(error),
      );
  }, [active]);

  const loadRoomByFloor = item => {
    if (item) {
      API.instance
        .post(
          `/room-by-floor-device?is_api=true`,
          JSON.stringify({
            appKey: CONFIG.appKey,
            device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
            userId: user.id,
            buildingId: data.building_id,
            floorId: item.value,
          }),
        )
        .then(
          response => {
            setRoomList(response?.data);
            setItemList([]);
            setRoom();
            setItem(0);
          },
          error => console.error(error),
        );
    }
  };

  const loadItemByRoom = item => {
    if (item) {
      API.instance
        .post(
          `/item-by-room-device?is_api=true`,
          JSON.stringify({
            appKey: CONFIG.appKey,
            device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
            roomId: item.value,
          }),
        )
        .then(
          response => {
            let items = response?.data;
            setItemList([{item_name: 'All', room_item_id: 0}, ...items]);
          },
          error => console.error(error),
        );
    }
  };

  const completeRoom = () => {
    API.instance
      .post(
        `/mark-room-as-completed-api?is_api=true`,
        JSON.stringify({
          appKey: CONFIG.appKey,
          device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
          inspectionResultId: data.inspection_result_id,
          roomId: room,
        }),
      )
      .then(
        response => {
          if (response.status == 'success') {
          }
        },
        error => console.error(error),
      );
  };

  const completeBuilding = () => {
    API.instance
      .post(
        `/mark-building-as-completed-api?is_api=true`,
        JSON.stringify({
          appKey: CONFIG.appKey,
          device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
          inspectionResultId: data.inspection_result_id,
        }),
      )
      .then(
        response => {
          if (response.status == 'success') {
            navigation.navigate('Inspections');
          }
        },
        error => console.error(error),
      );
  };

  const loadSummary = () => {
    const newPayload = JSON.stringify({
      appKey: CONFIG.appKey,
      device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
      inspectionResultId: data.inspection_result_id,
      inspectionTypeId: data.inspection_type_id,
      roomId: data.room_id,
      userId: user.id,
    });
    API.instance.post(`/room-summary-api?is_api=true`, newPayload).then(
      response => {
        if (response?.status === 'success');
        {
          setRoomData(response);
        }
      },
      error => {
        console.error(error);
      },
    );
  };

  const [numColumns, setNumColumns] = useState(3);
  const maxImages = 10;

  const openCamera = (images, setImages) => {
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

  const pickImage = (images, setImages) => {
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

  const deleteImage = (index, images, setImages) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const InspectionCheckBox = ({data, navigation, routeData}) => {
    const [satisfactoryChecked, setSatisfactoryChecked] = useState(false);

    return (
      <View style={SIPCStyles.flex}>
        <Surface
          elevation={4}
          style={{
            marginTop: 25,
            backgroundColor: 'white',
            paddingBottom: 20,
          }}>
          <View style={{backgroundColor: '#fffcf8', padding: 15}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={[SIPCStyles.BoldFont, {paddingHorizontal: 15}]}>
                {data.item_name}
              </Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text style={[SIPCStyles.NormalFont, {paddingHorizontal: 15}]}>
                {data.conditions.length}{' '}
                {data.conditions.length === 1 ? 'Condition' : 'Conditions'} |
              </Text>
              <Text style={SIPCStyles.NormalFont}>0 Issues</Text>
            </View>
          </View>

          {/* ==========================CHECKBOX=== satisfactoryChecked=============== */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              flexWrap: width > 500 ? 'wrap' : 'wrap',
            }}>
            <View
              style={{
                flexDirection: 'column',
                width: width > 500 ? '50%' : '100%',
              }}>
              <View style={{flexDirection: 'column'}}>
                {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}> */}
                <View style={SIPCStyles.CheckboxView}>
                  <View
                    style={{
                      padding: 10,
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}>
                    <Checkbox
                      status={satisfactoryChecked ? 'checked' : 'unchecked'}
                      onPress={() => {
                        // console.log("data.room_item_id=>" + data.room_item_id);
                        // console.log("data.room_id=>" + data.room_id);
                        // console.log("inspectionTypeId=>" + Active);
                        // console.log("conditionId=>" + 0);
                        // loadRoomSummary();
                        setSatisfactoryChecked(!satisfactoryChecked);
                      }}
                    />
                  </View>
                  <View style={{borderWidth: 1, borderColor: '#ccc'}} />

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={[
                        SIPCStyles.checkboxFont,
                        {paddingLeft: 10, color: '#00aa34'},
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
                width: width > 500 ? '50%' : '100%',
              }}>
              <View style={{flexDirection: 'column'}}>
                {data.conditions.map(conditions => (
                  <CheckBox
                    condition={conditions}
                    data={data}
                    satisfactory={satisfactoryChecked}
                    setSatisfactory={setSatisfactoryChecked}
                    key={conditions.id}
                  />
                ))}
              </View>
            </View>
          </View>
        </Surface>
      </View>
    );
  };

  const CheckBox = ({condition, setSatisfactory, satisfactory}) => {
    const [conditionChecked, setConditionChecked] = useState(checkBoxRef.current.find(el => el === condition?.id));
    const [isOpen, setIsOpen] = useState(checkBoxRef.current.find(el => el === condition?.id) && !(checkBoxCommentRef.current.find(el => el === condition?.id)));
    const [comment, setComment] = useState('');
    const [images, setImages] = useState([]);

    useEffect(() => {
      if(satisfactory) {
        setConditionChecked(false);
        setIsOpen(false);
      }
    }, [satisfactory])

    const SaveConditionCheckbox = (isChecked, condition) => {
      const payload = JSON.stringify({
        appKey: CONFIG.appKey,
        device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
        inspectionResultId: data.inspection_result_id,
        roomId: room,
        user_id: user.id,
        roomItemId: condition.room_item_id,
        conditionId: condition.id,
        inspectionTypeId: data.inspection_type_id,
        isChecked: isChecked ? '1' : '0',
      });
      API.instance
        .post(`/save-inspection-item-condition-api?is_api=true`, payload)
        .then(
          response => {
            if (response.status == 'success') {
              loadSummary();
            }
          },
          error => console.error(error),
        );
    };

    const saveComment = condition => {
      const payload = JSON.stringify({
        appKey: CONFIG.appKey,
        device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
        roomId: room,
        roomItemId: condition.room_item_id,
        inspectionResultId: data.inspection_result_id,
        inspectionTypeId: active,
        userId: user.id,
        comment: comment,
        conditionId: condition.id,
      });
      API.instance
        .post(`/save-condition-comment-image-api?is_api=true`, payload)
        .then(
          response => {
            console.log(response);
          },
          error => console.error(error),
        );
    };

    const onSubmit = () => {
      if (comment === '') {
        Alert.alert('Comment is Required');
        setIsOpen(true);
      } else {
        saveComment(condition);
        checkBoxCommentRef.current.push(condition?.id)
      }
    };

    const onCommentImagePress = () => {
      setConditionChecked(true);
      setIsOpen(!isOpen);
    };

    const onPress = () => {
      if (!conditionChecked) {
        setConditionChecked(true);
        setIsOpen(true);
        // checkBoxRef.current.push()
      } else {

      }
    };

    const checkBoxPress = () => {
      var isChecked = false;
      // if (!conditionChecked) {
      //   setConditionChecked(true);
      //   isChecked = true;
      //   setIsOpen(true);
      // } else if (conditionChecked) {
      //   setConditionChecked(false);
      //   setIsOpen(false);
      // }
      if (conditionChecked) {
        setConditionChecked(false);
        setIsOpen(false);
        checkBoxRef.current = checkBoxRef.current.filter(el => el !== condition?.id);
        checkBoxCommentRef.current = checkBoxCommentRef.current.filter(el => el !== condition?.id);
      } else {
        setConditionChecked(true);
        setSatisfactory(false);
        isChecked = true;
        setIsOpen(true);
        checkBoxRef.current.push(condition.id)
      }

      SaveConditionCheckbox(isChecked, condition);
    };

    return (
      <>
        <View
          style={[
            SIPCStyles.CheckboxView,
            {
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: isOpen === true ? 0 : 10,
              borderBottomRightRadius: isOpen === true ? 0 : 10,
            },
          ]}>
          <View style={{padding: 10, alignSelf: 'center'}}>
            <Checkbox
              status={
                satisfactory
                  ? 'unchecked'
                  : conditionChecked
                  ? 'checked'
                  : 'unchecked'
              }
              onPress={checkBoxPress}
            />
          </View>

          <View style={{borderWidth: 1, borderColor: '#ccc'}} />

          <Text
            style={[
              SIPCStyles.checkboxFont,
              {paddingLeft: 10, alignSelf: 'center'},
            ]}>
            {condition.condition_name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              right: 0,
              alignSelf: 'center',
            }}>
            {(!satisfactory && isOpen) === true ? (
              <>
                <TouchableWithoutFeedback
                  onPress={() => {
                    setIsOpen(!isOpen);
                  }}>
                  <Text
                    style={[SIPCStyles.checkboxFont, {marginHorizontal: 10}]}>
                    Cancel
                  </Text>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                  onPress={() => {
                    onSubmit(condition);
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
                <TouchableWithoutFeedback
                  onPress={conditionChecked ? onCommentImagePress : onPress}>
                  <Image
                    source={require('../assets/msg.png')}
                    style={SIPCStyles.commentImage}
                  />
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback
                  onPress={conditionChecked ? onCommentImagePress : onPress}>
                  <Image
                    source={require('../assets/img.png')}
                    style={SIPCStyles.commentImage}
                  />
                </TouchableWithoutFeedback>
              </>
            )}
          </View>
        </View>

        {!satisfactory && isOpen && (
          <View style={{marginHorizontal: 20}}>
            <TextInput
              mode="text"
              placeholder="Enter Your Comment"
              numberOfLines={8}
              multiline={true}
              underlineColor="transparent"
              theme={{colors: {primary: '#cccccc'}}}
              style={SIPCStyles.TextInput1}
              value={comment}
              onChangeText={setComment}
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
                    onPress={() => openCamera(images, setImages)}>
                    <Image
                      source={require('../assets/camera.png')}
                      style={SIPCStyles.cameraImage}
                    />
                  </TouchableWithoutFeedback>

                  <View style={{borderWidth: 1, borderColor: '#e6e6e6'}} />

                  <TouchableWithoutFeedback
                    onPress={() => pickImage(images, setImages)}>
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
                  flexWrap: width > 500 ? 'wrap' : 'wrap',
                  flex: 1,
                }}>
                <ScrollView nestedScrollEnabled={true} horizontal={true}>
                  <FlatList
                    numColumns={numColumns}
                    data={images}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => (
                      <View style={{position: 'relative'}}>
                        <Image
                          source={{uri: item.path}}
                          style={SIPCStyles.CameraClickImage}
                        />
                        <TouchableOpacity
                          style={SIPCStyles.crossImage}
                          onPress={() => deleteImage(index, images, setImages)}>
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
        )}
      </>
    );
  };

  return (
    <View style={SIPCStyles.flex}>
      <StatusBar barStyle={'dark-content'} backgroundColor="#3a7fc4" />
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
            {active === 1 ? (
              <Text
                style={[SIPCStyles.NormalFont, {width: width / 2}]}
                numberOfLines={1}>
                Cleaning Inspections-<Text>{buildingName}</Text>
              </Text>
            ) : (
              <Text
                style={[SIPCStyles.NormalFont, {width: width / 2}]}
                numberOfLines={1}>
                Maintenance Inspections-<Text>{buildingName}</Text>
              </Text>
            )}
          </View>

          <TouchableWithoutFeedback onPress={() => completeRef.current.open()}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[SIPCStyles.NormalFont, {color: '#199be2'}]}>
                Complete
              </Text>
              <Entypo
                size={18}
                color={'#818081'}
                style={{paddingHorizontal: 5}}
                name="chevron-down"
              />
            </View>
          </TouchableWithoutFeedback>
        </Surface>

        <Divider bold={true} />

        {/* ===========================FLOOR Room Items======================================= */}

        <Surface
          style={{
            backgroundColor: 'white',
            flexDirection: 'row',
            padding: 15,
            justifyContent: 'space-around',
          }}>
          <View
            style={{flexDirection: 'row', padding: 5, alignItems: 'center'}}>
            <Image
              source={require('../assets/floor.png')}
              style={SIPCStyles.MainBuilding}
            />
            <Text
              style={[
                SIPCStyles.NormalFont,
                {paddingLeft: 8, width: width / 4.9, fontWeight: '800'},
              ]}
              numberOfLines={1}>
              {floorName}
            </Text>
          </View>

          <View
            style={{flexDirection: 'row', padding: 5, alignItems: 'center'}}>
            <Image
              source={require('../assets/door.png')}
              style={SIPCStyles.MainBuilding}
            />
            <Text
              style={[
                SIPCStyles.NormalFont,
                {paddingLeft: 8, width: width / 3.9, fontWeight: '800'},
              ]}
              numberOfLines={1}>
              {roomName}
            </Text>
          </View>

          <View
            style={{flexDirection: 'row', padding: 5, alignItems: 'center'}}>
            <Image
              source={require('../assets/dot.png')}
              style={SIPCStyles.MainBuilding}
            />
            <Text
              style={[
                SIPCStyles.NormalFont,
                {paddingLeft: 8, width: width / 5.5, fontWeight: '800'},
              ]}
              numberOfLines={1}>
              All Items
            </Text>
          </View>
          <TouchableWithoutFeedback onPress={() => allItemsRef.current.open()}>
            <View style={{flexDirection: 'row', padding: 5}}>
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
        {/* =================================================allItemsRef============= */}

        <RBSheet
          ref={allItemsRef}
          closeOnDragDown={false}
          closeOnPressMask={false}
          dragFromTopOnly={true}
          height={height / 1.24}
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
              <TouchableWithoutFeedback
                onPress={() => allItemsRef.current.close()}>
                <Text style={[SIPCStyles.NormalFont, {}]}>Cancel</Text>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                onPress={() => allItemsRef.current.close()}>
                <Text style={[SIPCStyles.NormalFont, {color: '#199be2'}]}>
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
                searchTextInputStyle={{borderColor: '#D2D2D2'}}
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
                      style={{paddingHorizontal: 5}}
                      name="chevron-down"
                    />
                  );
                }}
                ArrowUpIconComponent={() => {
                  return (
                    <Entypo
                      size={18}
                      color={'#818081'}
                      style={{paddingHorizontal: 5}}
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
                dropDownContainerStyle={[
                  SIPCStyles.dropDownContainerStyle2,
                  {},
                ]}
                labelStyle={[SIPCStyles.NormalFont, {paddingHorizontal: 5}]}
                open={showFloorDropDown}
                value={floor}
                items={floorList.map(item => ({
                  label: item.name,
                  value: item.id,
                }))}
                setOpen={setShowFloorDropDown}
                setValue={setFloor}
                setItems={setFloorList}
                onSelectItem={loadRoomByFloor}
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
                searchTextInputStyle={{borderColor: '#D2D2D2'}}
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
                      style={{paddingHorizontal: 5}}
                      name="chevron-down"
                    />
                  );
                }}
                ArrowUpIconComponent={() => {
                  return (
                    <Entypo
                      size={18}
                      color={'#818081'}
                      style={{paddingHorizontal: 5}}
                      name="chevron-up"
                    />
                  );
                }}
                style={[
                  SIPCStyles.DropDownPicker2,
                  {marginHorizontal: 0, borderRadius: 0},
                ]}
                placeholder="Select Room"
                textStyle={SIPCStyles.textSize}
                dropDownContainerStyle={[
                  SIPCStyles.dropDownContainerStyle2,
                  {},
                ]}
                labelStyle={[SIPCStyles.NormalFont, {paddingHorizontal: 5}]}
                open={showRoomDropDown}
                value={room}
                items={roomList.map(item => ({
                  label: item.room_name,
                  value: item.id,
                }))}
                setOpen={setShowRoomDropDown}
                setValue={setRoom}
                setItems={setRoomList}
                onSelectItem={loadItemByRoom}
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
                searchTextInputStyle={{borderColor: '#D2D2D2'}}
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
                      style={{paddingHorizontal: 5}}
                      name="chevron-down"
                    />
                  );
                }}
                ArrowUpIconComponent={() => {
                  return (
                    <Entypo
                      size={18}
                      color={'#818081'}
                      style={{paddingHorizontal: 5}}
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
                dropDownContainerStyle={[
                  SIPCStyles.dropDownContainerStyle2,
                  {},
                ]}
                labelStyle={[SIPCStyles.NormalFont, {paddingHorizontal: 5}]}
                open={showItemDropDown}
                value={item}
                items={itemList.map(item => ({
                  label: item.item_name,
                  value: item.room_item_id,
                }))}
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
              borderBottomWidth: active === 1 ? 1 : 0,
              borderColor: active === 1 ? '#1485cc' : 'transparent',
              width: width / 2,
            }}
            onPress={() => setActive(1)}>
            <Text
              style={[
                SIPCStyles.NormalFont,
                {
                  textAlign: 'center',
                  color: active === 1 ? '#1485cc' : '#525252',
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
              borderBottomWidth: active === 2 ? 1 : 0,
              borderColor: active === 2 ? '#1485cc' : 'transparent',
              width: width / 2,
            }}
            onPress={() => setActive(2)}>
            <Text
              style={[
                SIPCStyles.NormalFont,
                {
                  color: active === 2 ? '#1485cc' : '#525252',
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

        {active === 2 && (
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
                  <Text style={[SIPCStyles.NormalFont, {}]}>
                    {roomData.total_item}
                  </Text>
                </Card>
                <Text style={[SIPCStyles.NormalFont, {paddingLeft: 5}]}>
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
                  <Text style={[SIPCStyles.NormalFont, {}]}>
                    {roomData.detected_condition}
                  </Text>
                </Card>
                <Text style={[SIPCStyles.NormalFont, {paddingLeft: 5}]}>
                  {roomData.detected_condition === '0' || '1'
                    ? 'Conditions'
                    : 'Condition'}
                  {'\n'} Detected
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 5,
                }}>
                <Card style={SIPCStyles.CleaningItems}>
                  <Text style={[SIPCStyles.NormalFont, {}]}>
                    {roomData.satisfactory_item}
                  </Text>
                </Card>
                <Text style={[SIPCStyles.SemiBold, {paddingLeft: 5}]}>
                  {roomData.satisfactory_item === '0' || '1' ? 'item' : 'items'}
                  {'\n'}Satisfactory
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
                <Text style={[SIPCStyles.NormalFont, {color: '#1485cc'}]}>
                  Switch to cleaning mode for quality score
                </Text>
              </TouchableWithoutFeedback>
            </View>
            <Divider bold={true} />
          </>
        )}

        {/* ===========================IF USER CLICK ON CLEANING ===================== */}

        {/* ===========================================ROOM QUALITY=================== */}

        {active === 1 && (
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
                  <Text style={[SIPCStyles.NormalFont, {}]}>
                    {roomData.total_item}
                  </Text>
                </Card>
                <Text style={[SIPCStyles.NormalFont, {paddingLeft: 5}]}>
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
                  <Text style={[SIPCStyles.NormalFont, {}]}>
                    {roomData.detected_condition}
                  </Text>
                </Card>
                <Text style={[SIPCStyles.NormalFont, {paddingLeft: 5}]}>
                  {roomData.detected_condition === '0' || '1'
                    ? 'Conditions'
                    : 'Condition'}
                  {'\n'} Detected
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 5,
                }}>
                <Card style={SIPCStyles.CleaningItems}>
                  <Text style={[SIPCStyles.NormalFont, {}]}>
                    {roomData.satisfactory_item}
                  </Text>
                </Card>
                <Text style={[SIPCStyles.SemiBold, {paddingLeft: 5}]}>
                  {roomData.satisfactory_item === '0' || '1' ? 'item' : 'items'}
                  {'\n'}Satisfactory
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
                <Text style={SIPCStyles.inspectionScore}>
                  {/* {checkScore(parseFloat(roomData?.room_quality).toFixed(2))} */}
                  <Text
                    style={[
                      SIPCStyles.inspectionScore,
                      roomData?.room_quality > 90
                        ? SIPCStyles.textSuccess
                        : roomData?.room_quality > 80
                        ? SIPCStyles.textWarning
                        : SIPCStyles.textDanger,
                    ]}>
                    {parseFloat(roomData?.room_quality).toFixed(2)}%
                  </Text>
                </Text>
                <Text style={[SIPCStyles.lowFont, {}]}>Room Quality</Text>
              </View>

              <View
                style={{flexDirectionL: 'row', alignItems: 'center', flex: 1}}>
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
                style={{flexDirectionL: 'row', alignItems: 'center', flex: 1}}>
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
                style={{flexDirectionL: 'row', alignItems: 'center', flex: 1}}>
                <Card
                  style={{
                    backgroundColor: '#ea1227',
                    borderRadius: 5,
                    height: hp('3.5%'),
                    width: wp('8%'),
                  }}
                />
                <Text style={[SIPCStyles.NormalFont, {textAlign: 'center'}]}>
                  Attention{'\n'}
                </Text>
              </View>
            </View>
          </>
        )}

        {/* {isLoading ? (<>
          <Loader />
        </>) : (<>
          {listRooms.map((item, index) => (
            <InspectionCheckBox
              data={item}
              key={index}
              navigation={navigation}
              routeData={data}
            />
          ))}

        </>)} */}

        <>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {listRooms.length > 0 &&
                listRooms.map((item, index) => (
                  <InspectionCheckBox
                    data={item}
                    key={index}
                    navigation={navigation}
                    routeData={data}
                  />
                ))}
            </>
          )}
        </>
      </ScrollView>

      {/* ======================COMPLETE MODAL========================== */}
      <RBSheet
        ref={completeRef}
        closeOnDragDown={false}
        closeOnPressMask={false}
        dragFromTopOnly={true}
        height={height / 1.12}
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
            <TouchableWithoutFeedback
              onPress={() => completeRef.current.close()}>
              <Text style={[SIPCStyles.NormalFont, {}]}>Cancel</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => completeRef.current.close()}>
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
                source={require('../assets/room.png')}
                style={SIPCStyles.MainBuilding}
              />
              <TouchableOpacity onPress={completeRoom}>
                <Text style={[SIPCStyles.NormalFont, {paddingLeft: 10}]}>
                  Complete Room
                </Text>
              </TouchableOpacity>
            </View>
            <Divider bold={true} style={{marginLeft: 30, marginTop: 10}} />

            <View style={[SIPCStyles.healthImageView, {marginTop: 25}]}>
              <Image
                source={require('../assets/building.png')}
                style={SIPCStyles.MainBuilding}
              />
              <TouchableOpacity onPress={completeBuilding}>
                <Text style={[SIPCStyles.NormalFont, {paddingLeft: 10}]}>
                  Complete Building{' '}
                </Text>
              </TouchableOpacity>
            </View>

            <Divider bold={true} style={{marginLeft: 30, marginTop: 10}} />
          </Surface>
        </View>
      </RBSheet>
    </View>
  );
};
export default CleaningInspections;
