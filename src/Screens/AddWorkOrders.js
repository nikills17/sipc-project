import {
  View,
  Alert,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
  PermissionsAndroid,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ScrollView} from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-crop-picker';
import API from '../utility/api';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import { floor } from 'react-native-reanimated';



const AddWorkOrders = ({navigation, route}) => {
  const deviceWidth = Dimensions.get('window').width;

  const {selectedId} = route?.params;

  const [workOrderId, setWorkOrderId] = useState(selectedId);
  const [Item, setItem] = useState(0);
  const [Issue, setIssue] = useState(0);
  const [IssueType, setIssueType] = useState(0);
  const [locationTypeId, setLocationTypeId] = useState(-1);
  const [buildingId, setBuildingId] = useState(0);
  const [floorId, setFloorId] = useState(0);
  const [roomId, setRoomId] = useState(0);
  const [comment, setComment] = useState('');
  const [location, setLocation] = useState('');
  
  //Items
  const [showDropDown1, setShowDropDown1] = useState(false);
  const [workOrderData, setWorkOrderData] = useState([]);
  const [ItemList, setItemList] = useState([]);
  
  //Issues
  const [showDropDown2, setShowDropDown2] = useState(false);
  const [IssueList, setIssueList] = useState([]);
  
  //Issue Type
  const [showDropDown3, setShowDropDown3] = useState(false);
  const [IssueTypeList, setIssueTypeList] = useState([
    {
      label: 'Cleaning',
      value: '1',
    },
    {
      label: 'Maintenance',
      value: '2',
    },

  ]);
  
  //Location Type
  const [showLocationDropDown, setLocationDropDown] = useState(false);
  const [locationType, setLocationType] = useState([
    {
      label: 'Building',
      value: '1',
    },
    {
      label: 'Others',
      value: '0',
    },
  ]);
  
  //Buildings
  const [showBuildingDropDown, setShowBuildingDropDown] = useState(false);
  const [buildings, setBuildings] = useState([]);
  
  //Floors
  const [showFloorDropDown, setShowFloorDropDown] = useState(false);
  const [floors, setFloors] = useState([]);
  
  //Rooms
  const [showRoomDropDown, setShowRoomDropDown] = useState(false);
  const [rooms, setRooms] = useState([]);
  
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMessage] = useState();


//API Calls

const uploadImage = async (imagePath) => {
  // Check selected image is not null
  if (imagePath != null) {
    // Create FormData
    const data = new FormData();
    data.append("workOrderId", workOrderId);
    data.append("userId", "1");
    data.append("appKey", "f9285c6c2d6a6b531ae1f70d2853f612");
    data.append("device_id", "68d41abf-31bb-4bc8-95dc-bb835f1bc7a1");
    data.append("file", {
      name: "image.png",
      fileName:"image",
      type: "image/png",
      uri: Platform.OS === "android"? imagePath: imagePath.replace("file://", "")
    });
    
    API.instance
        .upload(
          `http://sipcsurvey.devuri.com/sipcsurvey/upload-workorder-image-api?is_api=true`,
          data,
        )
        .then(
          response => {
            setWorkOrderId(response.workOrderId);
            setImages([...images, {path: response.uploaded_url, name: response.image_name}]);
            setError(false);
            setErrorMessage("");
            console.log(JSON.stringify(response));
          },
          error => console.error(error),
        );
  } else {
    // Validation Alert
    Alert.alert("Please Select image first");
  }
};

const saveWorkOrder = () => {
  var payload = JSON.stringify({
    "appKey":"f9285c6c2d6a6b531ae1f70d2853f612",
    "device_id":"68d41abf-31bb-4bc8-95dc-bb835f1bc7a1",
    "workOrderId": workOrderId,
    "conditionId": Issue,
    "conditionTypeId":IssueType,
    "itemId": Item,
    "locationType": locationTypeId,
    "location": location,
    "userId":"1",
    "buildingId": buildingId,
    "floorId": floorId,
    "roomId": roomId,
    "comment": comment,
  });
  console.log(payload);
  API.instance
    .post(
      `http://sipcsurvey.devuri.com/sipcsurvey/save-workorder-api?is_api=true`,
      payload,
    )
    .then(
      response => {
        if (response.status == "success") {
          navigation.navigate('Work Orders');
        } else {
          setError(true);
          setErrorMessage(response.error);
        }
      },
      error => console.error(error),
    );
};

useEffect(() => {
  console.log("buildingId"+buildingId);
  if (buildingId) {
    setFloors([]);
    setFloorId(0);
    console.log("floorId"+floorId);
    setRooms([]);
    setRoomId(0);
    var payload = JSON.stringify({
      "appKey":"f9285c6c2d6a6b531ae1f70d2853f612",
      "device_id":"68d41abf-31bb-4bc8-95dc-bb835f1bc7a1",
      "userId":"1",
      "buildingId": buildingId
    });
    API.instance
      .post(
        `http://sipcsurvey.devuri.com/sipcsurvey/floor-by-building-device?is_api=true`,
        payload,
      )
      .then(
        response => {
          if (response.status == "success") {
            setFloors(response.data);
            setError(false);
            setErrorMessage("");
          } else {
            setError(true);
            setErrorMessage(response.error);
          }
        },
        error => console.error(error),
      );
  }
}, [buildingId]);

useEffect(() => {
  if (floorId) {
    setRoomId(0);
    var payload = JSON.stringify({
      "appKey":"f9285c6c2d6a6b531ae1f70d2853f612",
      "device_id":"68d41abf-31bb-4bc8-95dc-bb835f1bc7a1",
      "floorId": floorId,
      "buildingId": buildingId
    });
    API.instance
      .post(
        `http://sipcsurvey.devuri.com/sipcsurvey/room-by-floor-device?is_api=true`,
        payload,
      )
      .then(
        response => {
          //setIsLoading(false);
          if (response.status == "success") {
            setRooms(response.data);
            setError(false);
            setErrorMessage("");
          } else {
            setError(true);
            setErrorMessage(response.error);
          }
        },
        error => console.error(error),
      );
  }
}, [floorId]);

useEffect(() => {
  API.instance
    .post(
      `http://sipcsurvey.devuri.com/sipcsurvey/buildings-device?is_api=true`,
      JSON.stringify({
        appKey: 'f9285c6c2d6a6b531ae1f70d2853f612',
        device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
        userId: '1'
      }),
    )
    .then(
      response => {
        if (response.status == "success") {
          setBuildings(response.data);
          setError(false);
          setErrorMessage("");
        } else {
          setError(true);
          setErrorMessage(response.error);
        }
      },
      error => console.error(error),
    );
}, []);

 useEffect(() => {
  API.instance
    .post(
      `http://sipcsurvey.devuri.com/sipcsurvey/workorder-condition-item-list-api?is_api=true`,
      JSON.stringify({
        appKey: 'f9285c6c2d6a6b531ae1f70d2853f612',
        device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
        userId: '1',
        workOrderId: workOrderId,
      }),
    )
    .then(
      response => {
        setWorkOrderData(response.workorder_data);
        setItemList(response.item_data);
        setIssueList(response.issue_data);
        setError(false);
        setErrorMessage("")
        // console.log(response.item_data)
      },
      error => console.error(error),
    );
}, []);






  // -----------------------IMAGE PICKER------------------------
  const [filePath, setFilePath] = useState({});
  
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response);

        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        setFilePath(response);
      });
    }
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);
      console.log('base64 -> ', response.base64);
      console.log('uri -> ', response.uri);
      console.log('width -> ', response.width);
      console.log('height -> ', response.height);
      console.log('fileSize -> ', response.fileSize);
      console.log('type -> ', response.type);
      console.log('fileName -> ', response.fileName);
      setFilePath(response);
    });
  };
  DropDownPicker.setListMode('SCROLLVIEW');

  const [images, setImages] = useState([]);
  const [image, setImage] = useState(null);
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
     uploadImage(image.path);
    });
  };

  const pickImage = () => {
    ImagePicker.openPicker({})
      .then(newImages => {
         if (images.length + newImages.length > maxImages) {
           alert(`Max limit reached: ${maxImages}`);
           return;
         }
        uploadImage(newImages.path);
      })
      .catch(error => console.error(error));
  };

  const deleteImage = (index, imageName) => {
    var payload = JSON.stringify({
      "appKey":"f9285c6c2d6a6b531ae1f70d2853f612",
      "device_id":"68d41abf-31bb-4bc8-95dc-bb835f1bc7a1",
      "workOrderId": workOrderId,
      "userId": "1",
      "imageName": imageName,
    });
    
    API.instance
      .post(
        `http://sipcsurvey.devuri.com/sipcsurvey/remove-workorder-image-api?is_api=true`,
        payload,
      )
      .then(
        response => {
          if(response.status == "success"){
            setImages(images.filter((_, i) => i !== index));
          }
        },
        error => console.error(error),
      );
    
  };

  return (
    <View style={SIPCStyles.flex}>
      <StatusBar barStyle={'dark-content'} backgroundColor="#3a7fc4" />
      <ScrollView nestedScrollEnabled={true}>
        {/* ----------------------------------------------------------------------- */}
        <Surface
          style={{
            backgroundColor: '#3a7fc4',
            padding: 15,
            alignItems: 'center',
          }}>
          <Text style={SIPCStyles.AddNewText}>Add New Work Order</Text>
        </Surface>
        {/* ============================SELECT ITEM============================= */}

        {error && (
          <View style={{ width: '100%',  }}>
            <Text style={{ color: 'red', fontFamily: 'Poppins-Medium', fontSize: responsiveScreenFontSize(1.8),marginHorizontal:20,marginTop:20 }}>
              Error! {errorMsg}
            </Text>
          </View>
        )
        }

        <View style={{marginHorizontal: 20, marginVertical: 15, zIndex: 10}}>
          <DropDownPicker
            searchable={true}
            searchPlaceholder=""
            searchContainerStyle={{
              backgroundColor: '#fffff6',
              borderColor: '#D2D2D2',
            }}
            searchTextInputStyle={{borderColor: '#D2D2D2'}}
            itemSeparator={true}
            itemSeparatorStyle={{backgroundColor: '#D2D2D2', marginVertical: 3}}
            showArrowIcon={true}
            // showTickIcon={true}
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
            placeholder="Select Item"
            placeholderStyle={SIPCStyles.placeholderStyle}
            style={SIPCStyles.DropDownPicker1}
            textStyle={SIPCStyles.textSize}
            dropDownContainerStyle={SIPCStyles.dropDownContainerStyle1}
            labelStyle={[SIPCStyles.NormalFont, {paddingHorizontal: 5}]}
            open={showDropDown1}
            value={Item}
            items={ItemList.map(item => ({ label: item.item_name, value: item.id }))}
            setOpen={setShowDropDown1}
            setValue={setItem}
            setItems={setItemList}
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
            placeholder="Select Issue"
            placeholderStyle={SIPCStyles.placeholderStyle}
            style={SIPCStyles.DropDownPicker1}
            textStyle={SIPCStyles.textSize}
            dropDownContainerStyle={SIPCStyles.dropDownContainerStyle1}
            labelStyle={[SIPCStyles.NormalFont, {paddingHorizontal: 5}]}
            open={showDropDown2}
            value={Issue}
            items={IssueList.map(item => ({ label: item.condition_name, value: item.id }))}
            setOpen={setShowDropDown2}
            setValue={setIssue}
            setItems={setIssueList}
          />
        </View>
        {/* ============================SELECT ISSUE TYPE============================= */}
        <View style={{marginHorizontal: 20, marginVertical: 15, zIndex: 8}}>
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
            showTickIcon={false}
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
            placeholder="Select Issue Type"
            placeholderStyle={SIPCStyles.placeholderStyle}
            style={SIPCStyles.DropDownPicker1}
            textStyle={SIPCStyles.textSize}
            dropDownContainerStyle={SIPCStyles.dropDownContainerStyle1}
            labelStyle={[SIPCStyles.NormalFont, {paddingHorizontal: 5}]}
            open={showDropDown3}
            value={IssueType}
            items={IssueTypeList}
            setOpen={setShowDropDown3}
            setValue={setIssueType}
            // setItems={setIssueTypeList}
          />
        </View>

        {/* ============================SELECT Location TYPE============================= */}
        <View style={{marginHorizontal: 20, marginVertical: 15, zIndex: 7}}>
          <DropDownPicker
            showArrowIcon={true}
            listMode="SCROLLVIEW"
            searchable={true}
            searchPlaceholder=""
            itemSeparator={true}
            itemSeparatorStyle={{
              backgroundColor: '#D2D2D2',
              marginVertical: 10,
            }}
            searchContainerStyle={{backgroundColor: '#fffff6'}}
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
            placeholder="Select Location Type"
            placeholderStyle={SIPCStyles.placeholderStyle}
            style={SIPCStyles.DropDownPicker1}
            textStyle={SIPCStyles.textSize}
            dropDownContainerStyle={SIPCStyles.dropDownContainerStyle1}
            labelStyle={[SIPCStyles.NormalFont, {paddingHorizontal: 5}]}
            open={showLocationDropDown}
            value={locationTypeId}
            items={locationType}
            setOpen={setLocationDropDown}
            setValue={setLocationTypeId}
            setItems={setLocationType}
          />

          {locationTypeId == 0 ? (
            <TextInput
              mode="flat"
              //  label="Outlined input"
              numberOfLines={2}
              multiline={true}
              placeholder="Location"
              placeholderTextColor={'black'}
              underlineColor="transparent"
              theme={{colors: {primary: '#cccccc'}}}
              style={[SIPCStyles.TextInput, {marginTop: 30}]}
              onChangeText={value => setLocation(value)}
            />
          ) : locationTypeId == 1 ? (
            
            <>
              {/* ----------------------------------SELECT BUILDING=================== */}
              <View style={{marginHorizontal: 0, marginTop: 30, zIndex: 8}}>
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
                  showTickIcon={false}
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
                  open={showBuildingDropDown}
                  value={buildingId}
                  items={buildings.map(building => ({ label: building.building_name, value: building.id }))}
                  setOpen={setShowBuildingDropDown}
                  setValue={setBuildingId}
                  setItems={setBuildings}
                />
              </View>
              {/* ====================================SELECT FLOOR ===================== */}
              <View style={{marginHorizontal: 0, marginTop: 30, zIndex: 8}}>
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
                  showTickIcon={false}
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
                  placeholder="Select Floor"
                  placeholderStyle={SIPCStyles.placeholderStyle}
                  style={SIPCStyles.DropDownPicker1}
                  textStyle={SIPCStyles.textSize}
                  dropDownContainerStyle={SIPCStyles.dropDownContainerStyle1}
                  labelStyle={[SIPCStyles.NormalFont, {paddingHorizontal: 5}]}
                  open={showFloorDropDown}
                  value={floorId}
                  items={floors.map(floor => ({ label: floor.name, value: floor.id }))}
                  setOpen={setShowFloorDropDown}
                  setValue={setFloorId}
                  setItems={setFloors}
                />
              </View>
              {/* ===============================SELECT ROOM==================== */}
              <View style={{marginHorizontal: 0, marginTop: 30, zIndex: 8}}>
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
                  showTickIcon={false}
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
                  placeholder="Select Room"
                  placeholderStyle={SIPCStyles.placeholderStyle}
                  style={SIPCStyles.DropDownPicker1}
                  textStyle={SIPCStyles.textSize}
                  dropDownContainerStyle={SIPCStyles.dropDownContainerStyle1}
                  labelStyle={[SIPCStyles.NormalFont, {paddingHorizontal: 5}]}
                  open={showRoomDropDown}
                  value={roomId}
                  items={rooms.map(room => ({ label: room.room_name, value: room.id }))}
                  setOpen={setShowRoomDropDown}
                  setValue={setRoomId}
                  setItems={setRooms}
                />
              </View>
            </>
          ):(<></>)}
        </View>

        {/* ==========================TextInput===================== */}

        <View style={{marginHorizontal: 20, marginVertical: 15}}>
          <TextInput
            mode="flat"
            //  label="Outlined input"
            placeholder="Enter Your Comment"
            numberOfLines={8}
            multiline={true}
            underlineColor="transparent"
            theme={{colors: {primary: '#cccccc'}}}
            style={SIPCStyles.TextInput}
            onChangeText={value => setComment(value)}
          />
        </View>
        {/* ================================================================ */}

        <Card style={SIPCStyles.CameraImageCard}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableWithoutFeedback onPress={() => openCamera('photo')}>
              <Image
                source={require('../assets/camera.png')}
                style={SIPCStyles.cameraImage}
              />
            </TouchableWithoutFeedback>

            <View style={{borderWidth: 1, borderColor: '#e6e6e6'}} />

            <TouchableWithoutFeedback onPress={() => pickImage('photo')}>
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
            flexWrap: deviceWidth > 500 ? 'wrap' : 'wrap',
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
                    onPress={() => deleteImage(index, item.name)}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>X</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </ScrollView>
        </View>

        <Card
          style={{marginTop: 15, backgroundColor: 'white', borderRadius: 0,bottom:0}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate('Work Orders')}
              style={{}}>
              <Text style={[SIPCStyles.NormalFont, {padding: 15}]}>Cancel</Text>
            </TouchableWithoutFeedback>

            <View style={{borderWidth: 1, borderColor: '#e6e6e6'}} />

            <TouchableWithoutFeedback
              onPress={saveWorkOrder}>
              <Text
                style={[
                  SIPCStyles.NormalFont,
                  {color: '#199be2', padding: 15},
                ]}>
                Save
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </Card>

        {/* ====================================================================================== */}
      </ScrollView>
    </View>
  );
};

export default AddWorkOrders;
