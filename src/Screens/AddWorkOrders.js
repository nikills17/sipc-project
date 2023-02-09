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

const AddWorkOrders = ({navigation}) => {
  const deviceWidth = Dimensions.get('window').width;
  const [showDropDown1, setShowDropDown1] = useState(false);
  const [Group, setGroup] = useState();
  const [GroupList, setGroupList] = useState([
    {
      label: 'Projector',
      value: '0',
    },
    {
      label: 'Floor-Wood',
      value: '1',
    },
    {
      label: 'Lockers',
      value: '2',
    },
    {
      label: 'Lockers',
      value: '3',
    },
    {
      label: 'Lockers',
      value: '4',
    },
  ]);
  {
    /* ============================SELECT ISSUE============================= */
  }
  const [showDropDown2, setShowDropDown2] = useState(false);
  const [Group2, setGroup2] = useState();
  const [GroupList2, setGroupList2] = useState([
    {
      label: 'Worn',
      value: '0',
    },
    {
      label: 'Broken',
      value: '1',
    },
    {
      label: 'Light Out',
      value: '2',
    },
  ]);
  {
    /* ============================SELECT Issue Type============================= */
  }
  const [showDropDown3, setShowDropDown3] = useState(false);
  const [Group3, setGroup3] = useState();
  const [GroupList3, setGroupList3] = useState([
    {
      label: 'Cleaning',
      value: '0',
    },
    {
      label: 'Maintenance',
      value: '1',
    },
  ]);
  {
    /* ============================SELECT Location TYPE============================= */
  }
  const [showDropDown4, setShowDropDown4] = useState(false);
  const [Group4, setGroup4] = useState(0);
  const [GroupList4, setGroupList4] = useState([
    {
      label: 'Building',
      value: '1',
    },
    {
      label: 'Others',
      value: '2',
    },
  ]);
  {
    /* ============================SELECT  Building ============================= */
  }
  const [showDropDown5, setShowDropDown5] = useState(false);
  const [Group5, setGroup5] = useState();
  const [GroupList5, setGroupList5] = useState([
    {
      label: 'SIPC High School',
      value: '0',
    },
    {
      label: 'Test Building',
      value: '1',
    },
    {
      label: 'Carbondale High School',
      value: '2',
    },
  ]);
  {
    /* ============================SELECT Floor============================= */
  }
  const [showDropDown6, setShowDropDown6] = useState(false);
  const [Group6, setGroup6] = useState();
  const [GroupList6, setGroupList6] = useState([
    {
      label: '1st Floor',
      value: '0',
    },
    {
      label: '2nd Floor',
      value: '1',
    },
  ]);
  {
    /* ============================SELECT Room============================= */
  }
  const [showDropDown7, setShowDropDown7] = useState(false);
  const [Group7, setGroup7] = useState();
  const [GroupList7, setGroupList7] = useState([
    {
      label: '101',
      value: '0',
    },
    {
      label: '102',
      value: '1',
    },
  ]);
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
            value={Group}
            items={GroupList}
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
            placeholder="Select Issue"
            placeholderStyle={SIPCStyles.placeholderStyle}
            style={SIPCStyles.DropDownPicker1}
            textStyle={SIPCStyles.textSize}
            dropDownContainerStyle={SIPCStyles.dropDownContainerStyle1}
            labelStyle={[SIPCStyles.NormalFont, {paddingHorizontal: 5}]}
            open={showDropDown2}
            value={Group2}
            items={GroupList2}
            setOpen={setShowDropDown2}
            setValue={setGroup2}
            setItems={setGroupList2}
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
            value={Group3}
            items={GroupList3}
            setOpen={setShowDropDown3}
            setValue={setGroup3}
            setItems={setGroupList3}
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
            open={showDropDown4}
            value={Group4}
            items={GroupList4}
            setOpen={setShowDropDown4}
            setValue={setGroup4}
            setItems={setGroupList4}
            onChangeSearchText={() => {
              setGroup4(0);
            }}
          />

          {Group4 == 0 ? (
            ''
          ) : Group4 == 1 ? (
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
                  open={showDropDown5}
                  value={Group5}
                  items={GroupList5}
                  setOpen={setShowDropDown5}
                  setValue={setGroup5}
                  setItems={setGroupList5}
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
                  open={showDropDown6}
                  value={Group6}
                  items={GroupList6}
                  setOpen={setShowDropDown6}
                  setValue={setGroup6}
                  setItems={setGroupList6}
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
                  open={showDropDown7}
                  value={Group7}
                  items={GroupList7}
                  setOpen={setShowDropDown7}
                  setValue={setGroup7}
                  setItems={setGroupList7}
                />
              </View>
            </>
          ) : (
            // ------------------------------------------------------------------------

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
            />
          )}
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
                    onPress={() => deleteImage(index)}>
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
              onPress={() => navigation.navigate('Work Orders')}
              style={{}}>
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
