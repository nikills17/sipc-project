import {
    View,
    Image,
    ScrollView,
    Dimensions,
    TouchableWithoutFeedback,
    StatusBar,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState, useRef} from 'react';
  import {
    Button,
    Searchbar,
    TextInput,
    Surface,
    Divider,
    Text,
  } from 'react-native-paper';
  import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
  import {CommonActions, useFocusEffect} from '@react-navigation/native';
  import RBSheet from 'react-native-raw-bottom-sheet';
  import DropDownPicker from 'react-native-dropdown-picker';
  import Entypo from 'react-native-vector-icons/Entypo';
  import DateTimePickerModal from 'react-native-modal-datetime-picker';
  import {MMKV} from 'react-native-mmkv';
  import {responsiveFontSize} from 'react-native-responsive-dimensions';
  
  import SIPCStyles from './styles';
  import API from '../utility/api';
  import Loader from '../component/activityindicator';
  import ReportBox from '../component/reportsbox';
  import {CONFIG} from '../utility/config';
  import {ReportsOptions} from '../utility/constants';
  
  const Reports = ({navigation}) => {
    const storage = new MMKV();
    const jsonUser = storage.getString('user');
    const user = JSON.parse(jsonUser);
  
    const [data, setData] = useState([]);
  
    const filterRef = useRef();
    const profileRef = useRef();
  
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
  
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);
  
    //Date Type
    const [dateTypeDropDown, setDateTypeDropDown] = useState(false);
    const [dateType, setDateType] = useState('survey_submitted');
    const [dateTypeList, setDateTypeList] = useState([
      {
        label: 'Survey Created',
        value: 'survey_created',
      },
      {
        label: 'Survey Submitted',
        value: 'survey_submitted',
      },
    ]);
  
    //Organization
    const [organizationDropDown, setOrganizationDropDown] = useState(false);
    const [organization, setOrganization] = useState(0);
    const [organizationList, setOrganizationList] = useState([]);
  
    //Building
    const [buildingDropDown, setBuildingDropDown] = useState(false);
    const [building, setBuilding] = useState(0);
    const [buildingList, setBuildingList] = useState([]);
  
    //Building Category
    const [buildingCategoryDropDown, setBuildingCategoryDropDown] =
      useState(false);
    const [buildingCategory, setBuildingCategory] = useState(0);
    const [buildingCategoryList, setBuildingCategoryList] = useState([]);
  
    //Date-Picker (START DATE)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
  
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirm = date => {
      setSelectedDate(date);
      hideDatePicker();
    };
  
    //Date-Picker (End DATE)
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
  
    const showEndDatePicker = () => {
      setEndDatePickerVisibility(true);
    };
  
    const hideEndDatePicker = () => {
      setEndDatePickerVisibility(false);
    };
  
    const handleEndDateConfirm = date => {
      setSelectedEndDate(date);
      hideEndDatePicker();
    };
  
    const currentDate = new Date().toISOString().slice(0, 10);
  
    var previousDate = new Date(currentDate);
    previousDate = new Date(previousDate.setMonth(previousDate.getMonth() - 1))
      .toISOString()
      .slice(0, 10);
  
    const [startDate, setStartDate] = useState(previousDate);
    const [endDate, setEndDate] = useState(currentDate);
    const [organizationId, setOrganizationId] = useState(0);
    const [buildingId, setBuildingId] = useState(0);
    const [buildingCategoryId, setBuildingCategoryId] = useState(0);
    const [floorId, setFloorId] = useState(0);
    const [roomId, setRoomId] = useState(0);
  
    const [active, setActive] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
  
    const payload = JSON.stringify({
      appKey: CONFIG.appKey,
      device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
      user_id: user.id,
      date_type: dateType,
      period: '30',
      start_date: startDate,
      end_date: endDate,
      organization_id: organizationId,
      building_id: buildingId,
      building_category_id: buildingCategoryId,
      floor_id: floorId,
      room_id: roomId,
    });
  
    useFocusEffect(
      React.useCallback(() => {
        setIsLoading(true);
        API.instance.post(ReportsOptions[active].url, payload).then(
          response => {
            setIsLoading(false);
            if (response.status == 'success') {
              setData(response.data);
              setOrganizationList(response.data);
            }
          },
          error => {
            console.error(error);
            setIsLoading(false);
          },
        );
      }, [active]),
    );
  
    const showReport = tabId => {
      setStartDate(previousDate);
      setEndDate(currentDate);
      setOrganizationId(0);
      setBuildingId(0);
      if (tabId === 5) {
        setFloorId(0);
        setRoomId(0);
        //setAPIAction('/building-report-api');
      }
  
      setActive(tabId);
    };
  
    return (
      <View style={SIPCStyles.flex}>
        {/* ===================HEADER=================== */}
        <View style={{zIndex: 0}}>
          <Surface style={SIPCStyles.headerSurface}>
            {user.profile_picture != '' ? (
              <TouchableOpacity onPress={() => profileRef.current.open()}>
                <Image
                  source={{uri: user.profile_picture}}
                  style={[
                    SIPCStyles.headerManImage,
                    {borderRadius: 100, width: width / 10, height: height / 20},
                  ]}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => profileRef.current.open()}>
                <Image
                  source={require('../assets/man.png')}
                  style={[
                    SIPCStyles.headerManImage,
                    {borderRadius: 100, width: width / 10, height: height / 20},
                  ]}
                />
              </TouchableOpacity>
            )}
  
            <Searchbar
              placeholder="Search"
              placeholderTextColor="grey"
              onChangeText={onChangeSearch}
              value={searchQuery}
              style={SIPCStyles.searchBar}
              icon={() => (
                <SimpleLineIcons
                  name="magnifier"
                  size={20}
                  style={{color: 'grey'}}
                />
              )}
            />
  
            <TouchableWithoutFeedback>
              <Image
                source={require('../assets/print.png')}
                style={[
                  SIPCStyles.playImage,
                  {
                    height: height / 18,
                    width: width / 10,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                    marginTop: 0,
                    marginRight: 10,
                  },
                ]}
              />
            </TouchableWithoutFeedback>
  
            <TouchableWithoutFeedback onPress={() => filterRef.current.open()}>
              <Image
                source={require('../assets/filter.png')}
                style={SIPCStyles.headerManImage}
              />
            </TouchableWithoutFeedback>
          </Surface>
        </View>
  
        <Divider bold={true} />
  
        {/* ===================TABS==================== */}
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{zIndex: -1}}>
            <View
              style={{
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'space-around',
                height: height / 15,
              }}>
              {Object.values(ReportsOptions).map(item => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => showReport(item.id)}
                    style={{
                      paddingVertical: 15,
                      paddingHorizontal: 20,
                      backgroundColor: 'white',
                      borderBottomWidth: active === item.id ? 1 : 0,
                      borderColor: active === item.id ? '#1485cc' : 'transparent',
                    }}>
                    <Text
                      style={[
                        SIPCStyles.NormalFont,
                        {color: active === item.id ? '#1485cc' : '#525252'},
                      ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
  
        {/* ===============MAIN================= */}
        <ScrollView style={{zIndex: -1}}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {data.map((item, index) => (
                <ReportBox data={item} key={index} active={active} />
              ))}
            </>
          )}
        </ScrollView>
  
        {/* ====================PROFILE SHEET============================ */}
        <RBSheet
          ref={profileRef}
          closeOnDragDown={false}
          closeOnPressMask={true}
          closeOnPressBack={true}
          dragFromTopOnly={true}
          fromTop={true}
          height={height}
          animated={true}
          animationType="fade"
          // closeOnPressBack={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: 'transparent',
            },
            container: {
              backgroundColor: '#ccc',
              height: height / 7,
              width: width / 3,
              borderWidth: 1,
              borderColor: '#ccc',
              // marginHorizontal: 5,
              position: 'absolute',
              top: 80,
              left: 0,
              right: 0,
            },
          }}>
          <View
            style={{
              height: height / 7,
              width: width / 3,
              backgroundColor: 'white',
              marginHorizontal: 5,
              padding: 10,
            }}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../assets/ii.png')}
                style={{
                  height: height / 35,
                  width: width / 23,
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: responsiveFontSize(1.8),
                  marginLeft: 5,
                }}>
                Settings
              </Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              onPress={() => {
                setIsLoading(true);
                storage.delete('user');
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{name: 'Login'}],
                  }),
                );
              }}
              style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
              <Image
                source={require('../assets/ii.png')}
                style={{
                  height: height / 35,
                  width: width / 23,
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  color: 'black',
                  fontSize: responsiveFontSize(1.8),
                  marginLeft: 5,
                }}>
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
  
        {/* ===================DATA FILTER=================== */}
        <RBSheet
          ref={filterRef}
          height={height}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
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
              {ReportsOptions[active].name}
            </Text>
            <TouchableOpacity //TODO: Replace with close icon and close function
              style={{
                position: 'absolute',
                right: 25,
                alignSelf: 'center',
              }}>
              <Text style={[SIPCStyles.BoldFont]}>X</Text>
            </TouchableOpacity>
          </View>
  
          {(active === 1 || active === 2) && (
            <>
              {/* ===============DateType DropDown========================= */}
              <View
                style={{marginHorizontal: 20, marginVertical: 15, zIndex: 10}}>
                <DropDownPicker
                  listMode="SCROLLVIEW"
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
                  }}
                  showArrowIcon={true}
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
                  placeholder="Date Type"
                  placeholderStyle={SIPCStyles.placeholderStyle}
                  style={SIPCStyles.DropDownPicker1}
                  textStyle={SIPCStyles.textSize}
                  dropDownContainerStyle={SIPCStyles.dropDownContainerStyle1}
                  labelStyle={[SIPCStyles.NormalFont, {paddingHorizontal: 5}]}
                  open={dateTypeDropDown}
                  value={dateType}
                  items={dateTypeList}
                  setOpen={setDateTypeDropDown}
                  setValue={setDateType}
                  setItems={setDateTypeList}
                />
              </View>
            </>
          )}
  
          {/* ========================================Start Date======== */}
          <TouchableOpacity
            onPress={showDatePicker}
            activeOpacity={0.95}
            style={[
              SIPCStyles.container,
              {marginHorizontal: 20, marginVertical: 15, borderWidth: 1},
            ]}>
            <Image
              source={require('../assets/cal.png')}
              style={[SIPCStyles.MainBuilding, {marginRight: 20, marginLeft: 6}]}
            />
            <Text style={SIPCStyles.NormalFont}>
              {selectedDate
                ? selectedDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'Start Date'}
            </Text>
          </TouchableOpacity>
  
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          {/* ========================================End Date======== */}
  
          <TouchableOpacity
            onPress={showEndDatePicker}
            style={[
              SIPCStyles.container,
              {marginHorizontal: 20, marginVertical: 15, borderWidth: 1},
            ]}>
            <Image
              source={require('../assets/cal.png')}
              style={[SIPCStyles.MainBuilding, {marginRight: 20, marginLeft: 6}]}
            />
            <Text style={SIPCStyles.NormalFont}>
              {selectedEndDate
                ? selectedEndDate.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : 'End Date'}
            </Text>
          </TouchableOpacity>
  
          <DateTimePickerModal
            isVisible={isEndDatePickerVisible}
            mode="date"
            onConfirm={handleEndDateConfirm}
            onCancel={hideEndDatePicker}
          />
          {/* ===============Organization DropDown========================= */}
          <View style={{marginHorizontal: 20, marginVertical: 15, zIndex: 10}}>
            <DropDownPicker
              listMode="SCROLLVIEW"
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
              placeholder="Organization"
              placeholderStyle={SIPCStyles.placeholderStyle}
              style={SIPCStyles.DropDownPicker1}
              textStyle={SIPCStyles.textSize}
              dropDownContainerStyle={SIPCStyles.dropDownContainerStyle1}
              labelStyle={[SIPCStyles.NormalFont, {paddingHorizontal: 5}]}
              open={organizationDropDown}
              value={organization}
              items={organizationList.map(item => ({
                label: item.organization_name,
                value: item.id,
              }))}
              setOpen={setOrganizationDropDown}
              setValue={setOrganization}
              setItems={setOrganizationList}
            />
          </View>
  
          <>
            {/* ===============Building Category DropDown========================= */}
            <View style={{marginHorizontal: 20, marginVertical: 15, zIndex: 10}}>
              <DropDownPicker
                listMode="SCROLLVIEW"
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
                placeholder="Building Category"
                placeholderStyle={SIPCStyles.placeholderStyle}
                style={SIPCStyles.DropDownPicker1}
                textStyle={SIPCStyles.textSize}
                dropDownContainerStyle={SIPCStyles.dropDownContainerStyle1}
                labelStyle={[SIPCStyles.NormalFont, {paddingHorizontal: 5}]}
                open={buildingCategoryDropDown}
                value={buildingCategory}
                items={buildingCategoryList}
                setOpen={setBuildingCategoryDropDown}
                setValue={setBuildingCategory}
                setItems={setBuildingCategoryList}
              />
            </View>
  
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {}}
              style={{
                backgroundColor: '#0091f6',
                borderRadius: 10,
                paddingVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 20,
                position: 'absolute',
                width: '90%',
                bottom: 50,
              }}
              labelStyle={{color: 'white'}}>
              <Text style={[SIPCStyles.BoldFont, {color: 'white'}]}>
                GET REPORTS
              </Text>
            </TouchableOpacity>
          </>
        </RBSheet>
  
        <StatusBar barStyle={'dark-content'} backgroundColor="white" />
      </View>
    );
  };
  
  export default Reports;
  