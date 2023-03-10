import {
  View,
  Alert,
  Image,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  StatusBar, TouchableOpacity
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  Card,
  Searchbar,
  TextInput,
  Surface,
  Divider,
  Text, Menu, Provider
} from 'react-native-paper';
import SIPCStyles from './styles';
import Icon2 from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Col, Grid } from 'react-native-easy-grid';
import SurveyViewAllBox from '../component/surveyviewallbox';
import API from '../utility/api';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../component/activityindicator';
import ReportBox from '../component/reportsbox';
import { CONFIG } from '../utility/config';
import RBSheet from "react-native-raw-bottom-sheet";
import DropDownPicker from 'react-native-dropdown-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import DateTimePickerModal from 'react-native-modal-datetime-picker';


import { MMKV } from 'react-native-mmkv'
export const storage = new MMKV();

const Reports = ({ navigation }) => {

  const jsonUser = storage.getString('user')
  const user = JSON.parse(jsonUser);

  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const refRBSheet = useRef();

  const Width = Dimensions.get('window').width;
  const Height = Dimensions.get('window').height;

  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);


  //DataType
  const [dataTypeDropDown, setDataTypeDropDown] = useState(false);
  const [dataType, setDataType] = useState(0);
  const [dataTypeList, setDataTypeList] = useState([
    {
      label: 'Survey Created',
      value: '1',
    },
    {
      label: 'Survey Submitted',
      value: '2',
    },
  ]);


  //Period
  const [periodDropDown, setPeriodDropDown] = useState(false);
  const [period, setPeriod] = useState(0);
  const [periodList, setPeriodList] = useState([
    {
      label: 'Last 30 days',
      value: '1',
    },
    {
      label: 'Last 90 days',
      value: '2',
    },
    {
      label: 'Last 180 days',
      value: '3',
    },
    {
      label: 'Last 365 days',
      value: '4',
    },
  ]);


  //Organization
  const [organizationDropDown, setOrganizationDropDown] = useState(false);
  const [organization, setOrganization] = useState(0);
  const [organizationList, setOrganizationList] = useState([
  ]);

  //Building
  const [buildingDropDown, setBuildingDropDown] = useState(false);
  const [building, setBuilding] = useState(0);
  const [buildingList, setBuildingList] = useState([
  ]);

  //Building Category
  const [buildingCategoryDropDown, setBuildingCategoryDropDown] = useState(false);
  const [buildingCategory, setBuildingCategory] = useState(0);
  const [buildingCategoryList, setBuildingCategoryList] = useState([
  ]);


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
  const [dateType, setDateType] = useState('survey_submitted');

  var previousDate = new Date(currentDate);
  previousDate = new Date(previousDate.setMonth(previousDate.getMonth() - 1)).toISOString().slice(0, 10);

  const [startDate, setStartDate] = useState(previousDate);
  const [endDate, setEndDate] = useState(currentDate);
  const [organizationId, setOrganizationId] = useState(0);
  const [buildingId, setBuildingId] = useState(0);
  const [buildingCategoryId, setBuildingCategoryId] = useState(0);
  const [floorId, setFloorId] = useState(0);
  const [roomId, setRoomId] = useState(0);


  const [Active, setActive] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [apiAction, setAPIAction] = useState('/building-report-api');

  const [data, setData] = useState([]);
  // console.log(endDate);

  const showReport = (tabId) => {
    setStartDate(previousDate);
    setEndDate(currentDate);
    setOrganizationId(0);
    setBuildingId(0);

    if (tabId === 1) {
      setAPIAction('/building-report-api');
    } else if (tabId === 2) {
      setBuildingCategoryId(0);
      setAPIAction('/building-category-report-api');
    } else if (tabId === 3) {
      setAPIAction('/inspection-report-api');
    } else if (tabId === 4) {
      setAPIAction('/workorder-report-api');
    } else if (tabId === 5) {
      setFloorId(0);
      setRoomId(0);
      //setAPIAction('/building-report-api');
    }

    setActive(tabId);
  }

  const payload = JSON.stringify({
    appKey: CONFIG.appKey,
    device_id: "68d41abf-31bb-4bc8-95dc-bb835f1bc7a1",
    user_id: user.id,
    date_type: dateType,
    period: "30",
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
      API.instance
        .post(
          apiAction + '?is_api=true',
          payload,
        )
        .then(
          response => {
            setIsLoading(false);
            if (response.status == "success") {
              setData(response.data);
              // console.log(response.data);
            }
          },
          error => {
            console.error(error);
            setIsLoading(false);
          },
        );
    }, [Active]),
  );

  return (

    <View style={SIPCStyles.flex}>
      <StatusBar barStyle={'dark-content'} backgroundColor="white" />

      {/* ====================================== */}
      <View style={{ zIndex: 0 }}>
        <Surface style={SIPCStyles.headerSurface}>
          {
            user.profile_picture != '' ?
              <TouchableOpacity onPress={openMenu}>
                <Image source={{ uri: user.profile_picture }} style={[SIPCStyles.headerManImage, { borderRadius: 100, width: Width / 10, height: Height / 20 }]} />
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={openMenu}>
                <Image source={require('../assets/man.png')} style={[SIPCStyles.headerManImage, { borderRadius: 100, width: Width / 10, height: Height / 20 }]} />
              </TouchableOpacity>
          }

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
                style={{ color: 'grey' }}
              />
            )}
          />

          <TouchableWithoutFeedback>
            <Image
              source={require('../assets/print.png')}
              style={[SIPCStyles.playImage, {
                height: Height / 18, width: Width / 10, resizeMode: 'contain',
                alignSelf: 'center', marginTop: 0, marginRight: 10
              }]}
            />
          </TouchableWithoutFeedback>


          <TouchableWithoutFeedback
            onPress={() => refRBSheet.current.open()}>
            <Image
              source={require('../assets/filter.png')}
              style={SIPCStyles.headerManImage}
            />
          </TouchableWithoutFeedback>
        </Surface>
      </View>
      {/* =============================MENU================== */}
      <View>

        <View>
          <Provider style={{ zIndex: 9999 }}>
            <View style={{ zIndex: 9999 }}>
              <Menu
                visible={visible}
                onDismiss={closeMenu}
                style={{ backgroundColor: 'transparent' }}
                contentStyle={{ backgroundColor: 'white', }}
                anchor={{ x: 0, y: 0, }}>

                <Menu.Item onPress={() => { }} title="Settings" titleStyle={{ color: 'black' }} />
                <Menu.Item onPress={() => {
                  storage.set('user', '');
                  navigation.navigate('Login');
                }} title="Log Out" titleStyle={{ color: 'black' }} />
              </Menu>
            </View>
          </Provider>
        </View>

      </View>

      <Divider bold={true} />



      {/* ===================TABS==================== */}
      <View style={{ zIndex: -1 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} >

          <View
            style={{
              backgroundColor: 'white',
              flexDirection: 'row',
              justifyContent: 'space-around',
              height: Height / 15
            }}>
            <TouchableOpacity onPress={() => showReport(1)}
              style={{
                paddingVertical: 15,
                paddingHorizontal: 20,
                backgroundColor: 'white',
                borderBottomWidth: Active === 1 ? 1 : 0,
                borderColor: Active === 1 ? '#1485cc' : 'transparent',
              }}>

              <Text
                style={[
                  SIPCStyles.NormalFont,
                  { color: Active === 1 ? '#1485cc' : '#525252' },
                ]}>
                Building
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => showReport(2)}
              style={{
                paddingVertical: 15,
                paddingHorizontal: 20,
                backgroundColor: 'white',
                borderBottomWidth: Active === 2 ? 1 : 0,
                borderColor: Active === 2 ? '#1485cc' : 'transparent',
              }}>

              <Text
                style={[
                  SIPCStyles.NormalFont,
                  { color: Active === 2 ? '#1485cc' : '#525252' },
                ]}>
                Building Category
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => showReport(3)}
              style={{
                paddingHorizontal: 20, paddingVertical: 15,
                backgroundColor: 'white',
                borderBottomWidth: Active === 3 ? 1 : 0,
                borderColor: Active === 3 ? '#1485cc' : 'transparent',
              }}>

              <Text style={[SIPCStyles.NormalFont, { color: Active === 3 ? '#1485cc' : '#525252' },]}>
                Inspection
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => showReport(4)}
              style={{
                paddingHorizontal: 20, paddingVertical: 15,
                backgroundColor: 'white',
                borderBottomWidth: Active === 4 ? 1 : 0,
                borderColor: Active === 4 ? '#1485cc' : 'transparent',
              }}>

              <Text style={[SIPCStyles.NormalFont, { color: Active === 4 ? '#1485cc' : '#525252' },]}>
                WorkOrder
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => showReport(5)}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 15,
                backgroundColor: 'white',
                borderBottomWidth: Active === 5 ? 1 : 0,
                borderColor: Active === 5 ? '#1485cc' : 'transparent',
              }}>

              <Text style={[SIPCStyles.NormalFont, { color: Active === 5 ? '#1485cc' : '#525252', paddingHorizontal: 20 },]}>
                KPI
              </Text>
            </TouchableOpacity>


          </View>
        </ScrollView>
      </View>


      {/* ====================================== */}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={false}
        dragFromTopOnly={true}
        height={Height}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          },
          container: {
            // backgroundColor: 'red',
          }

        }}>

        <View style={{
          flexDirection: 'row', justifyContent: 'center', backgroundColor: '#e2e0eb',
          padding: 25, backgroundColor: '#1281ca'
        }}>

          <Text style={[SIPCStyles.NormalFont, { textAlign: 'center', color: 'white' }]}>{Active === 1 ? 'Building Report' : Active === 2 ? 'Building Category' : Active === 3 ? 'Inspection' : Active === 4 ? 'WorkOrder' : 'KPI'}
          </Text>
        </View>


        {Active === 1 || Active === 2 ?
          <>
            {/* ===============DataType DropDown========================= */}
            <View style={{ marginHorizontal: 20, marginVertical: 15, zIndex: 10 }}>
              <DropDownPicker
                searchable={true}
                searchPlaceholder=""
                searchContainerStyle={{
                  backgroundColor: '#fffff6',
                  borderColor: '#D2D2D2',
                }}
                searchTextInputStyle={{ borderColor: '#D2D2D2' }}
                itemSeparator={true}
                itemSeparatorStyle={{ backgroundColor: '#D2D2D2', marginVertical: 3 }}
                showArrowIcon={true}
                // showTickIcon={true}
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
                placeholder="Date Type"
                placeholderStyle={SIPCStyles.placeholderStyle}
                style={SIPCStyles.DropDownPicker1}
                textStyle={SIPCStyles.textSize}
                dropDownContainerStyle={SIPCStyles.dropDownContainerStyle1}
                labelStyle={[SIPCStyles.NormalFont, { paddingHorizontal: 5 }]}
                open={dataTypeDropDown}
                value={dataType}
                items={dataTypeList}
                setOpen={setDataTypeDropDown}
                setValue={setDataType}
                setItems={setDataTypeList}
              />
            </View>
          </>
          : (<></>)}

        {/* ===============Period DropDown========================= */}
        <View style={{ marginHorizontal: 20, marginVertical: 15, zIndex: 10 }}>
          <DropDownPicker
            searchable={true}
            searchPlaceholder=""
            searchContainerStyle={{
              backgroundColor: '#fffff6',
              borderColor: '#D2D2D2',
            }}
            searchTextInputStyle={{ borderColor: '#D2D2D2' }}
            itemSeparator={true}
            itemSeparatorStyle={{ backgroundColor: '#D2D2D2', marginVertical: 3 }}
            showArrowIcon={true}
            // showTickIcon={true}
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
            placeholder="Period"
            placeholderStyle={SIPCStyles.placeholderStyle}
            style={SIPCStyles.DropDownPicker1}
            textStyle={SIPCStyles.textSize}
            dropDownContainerStyle={SIPCStyles.dropDownContainerStyle1}
            labelStyle={[SIPCStyles.NormalFont, { paddingHorizontal: 5 }]}
            open={periodDropDown}
            value={period}
            items={periodList}
            setOpen={setPeriodDropDown}
            setValue={setPeriod}
            setItems={setPeriodList}
          />
        </View>

        {/* ========================================Start Date======== */}

        <View style={[SIPCStyles.container, { marginHorizontal: 20, marginVertical: 15, borderWidth: 1 }]}>
          <TouchableOpacity onPress={showDatePicker}>
            <Image
              source={require('../assets/cal.png')}
              style={SIPCStyles.MainBuilding}
            />
          </TouchableOpacity>

          <TextInput
            style={SIPCStyles.textInputs}
            placeholder='Start Date'
            value={selectedDate ? selectedDate.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }) : ''}
            editable={false}
            underlineColor="transparent"
            theme={{ colors: { primary: '#cccccc' } }}
          />
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        {/* ========================================End Date======== */}

        <View style={[SIPCStyles.container, { marginHorizontal: 20, marginVertical: 15, borderWidth: 1 }]}>
          <TouchableOpacity onPress={showEndDatePicker}>
            <Image
              source={require('../assets/cal.png')}
              style={SIPCStyles.MainBuilding}
            />
          </TouchableOpacity>

          <TextInput
            style={SIPCStyles.textInputs}
            placeholder='End Date'
            value={selectedEndDate ? selectedEndDate.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }) : ''}
            editable={false}
            underlineColor="transparent"
            theme={{ colors: { primary: '#cccccc' } }}
          />
        </View>

        <DateTimePickerModal
          isVisible={isEndDatePickerVisible}
          mode="date"
          onConfirm={handleEndDateConfirm}
          onCancel={hideEndDatePicker}
        />
        {/* ===============Organization DropDown========================= */}
        <View style={{ marginHorizontal: 20, marginVertical: 15, zIndex: 10 }}>
          <DropDownPicker
            searchable={true}
            searchPlaceholder=""
            searchContainerStyle={{
              backgroundColor: '#fffff6',
              borderColor: '#D2D2D2',
            }}
            searchTextInputStyle={{ borderColor: '#D2D2D2' }}
            itemSeparator={true}
            itemSeparatorStyle={{ backgroundColor: '#D2D2D2', marginVertical: 3 }}
            showArrowIcon={true}
            // showTickIcon={true}
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
            placeholder="Organization"
            placeholderStyle={SIPCStyles.placeholderStyle}
            style={SIPCStyles.DropDownPicker1}
            textStyle={SIPCStyles.textSize}
            dropDownContainerStyle={SIPCStyles.dropDownContainerStyle1}
            labelStyle={[SIPCStyles.NormalFont, { paddingHorizontal: 5 }]}
            open={organizationDropDown}
            value={organization}
            items={organizationList}
            setOpen={setOrganizationDropDown}
            setValue={setOrganization}
            setItems={setOrganizationList}
          />
        </View>


        {Active === 2 ?
          <>
            {/* ===============Building Category DropDown========================= */}
            <View style={{ marginHorizontal: 20, marginVertical: 15, zIndex: 10 }}>
              <DropDownPicker
                searchable={true}
                searchPlaceholder=""
                searchContainerStyle={{
                  backgroundColor: '#fffff6',
                  borderColor: '#D2D2D2',
                }}
                searchTextInputStyle={{ borderColor: '#D2D2D2' }}
                itemSeparator={true}
                itemSeparatorStyle={{ backgroundColor: '#D2D2D2', marginVertical: 3 }}
                showArrowIcon={true}
                // showTickIcon={true}
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
                placeholder="Building Category"
                placeholderStyle={SIPCStyles.placeholderStyle}
                style={SIPCStyles.DropDownPicker1}
                textStyle={SIPCStyles.textSize}
                dropDownContainerStyle={SIPCStyles.dropDownContainerStyle1}
                labelStyle={[SIPCStyles.NormalFont, { paddingHorizontal: 5 }]}
                open={buildingCategoryDropDown}
                value={buildingCategory}
                items={buildingCategoryList}
                setOpen={setBuildingCategoryDropDown}
                setValue={setBuildingCategory}
                setItems={setBuildingCategoryList}
              />
            </View>

            <View style={{ margin: 20, }}>
              <Button style={{ backgroundColor: '#3a7fc4', borderRadius: 10, paddingVertical: 5 }} labelStyle={{ color: 'white' }}>
                <Text style={[SIPCStyles.NormalFont, { color: 'white' }]}> Get Reports</Text> </Button>
            </View>


          </>
          :
          <>
            {/* ===============Building DropDown========================= */}
            <View style={{ marginHorizontal: 20, marginVertical: 15, zIndex: 10 }}>
              <DropDownPicker
                searchable={true}
                searchPlaceholder=""
                searchContainerStyle={{
                  backgroundColor: '#fffff6',
                  borderColor: '#D2D2D2',
                }}
                searchTextInputStyle={{ borderColor: '#D2D2D2' }}
                itemSeparator={true}
                itemSeparatorStyle={{ backgroundColor: '#D2D2D2', marginVertical: 3 }}
                showArrowIcon={true}
                // showTickIcon={true}
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
                placeholder="Building"
                placeholderStyle={SIPCStyles.placeholderStyle}
                style={SIPCStyles.DropDownPicker1}
                textStyle={SIPCStyles.textSize}
                dropDownContainerStyle={SIPCStyles.dropDownContainerStyle1}
                labelStyle={[SIPCStyles.NormalFont, { paddingHorizontal: 5 }]}
                open={buildingDropDown}
                value={building}
                items={buildingList}
                setOpen={setBuildingDropDown}
                setValue={setBuilding}
                setItems={setBuildingList}
              />
            </View>

            {/* <View style={{ margin: 20, }}>
              <Button style={{ backgroundColor: '#3a7fc4', borderRadius: 10, paddingVertical: 5 }} labelStyle={{ color: 'white' }}>
                <Text style={[SIPCStyles.NormalFont, { color: 'white' }]}> Get Reports</Text> </Button>
            </View> */}



          </>
        }

        <View
          style={{ backgroundColor: 'white', borderRadius: 0, bottom: 0, position: 'absolute', width: Width, height: Height / 13, borderColor: '#ccc', borderWidth: 1, }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableWithoutFeedback
              onPress={() => refRBSheet.current.close()}
              style={{}}>
              <Text style={[SIPCStyles.NormalFont, { padding: 15 }]}>Close</Text>
            </TouchableWithoutFeedback>

            <View style={{ borderWidth: 1, borderColor: '#e6e6e6' }} />

            <TouchableWithoutFeedback
            // onPress={saveWorkOrder}
            >
              <Text
                style={[
                  SIPCStyles.NormalFont,
                  { color: '#199be2', padding: 15 },
                ]}>
                Get Reports
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>

      </RBSheet>






      {/* ================================ */}
      {/* <ScrollView>
        {data.map((item, index) => (
          <ReportBox data={item} key={index} Active={Active} />
        ))}
      </ScrollView> */}

      <ScrollView>
        <View style={{ zIndex: -1 }}>

          {isLoading ? (
            <Loader />
          ) : (
            <>
              {data.map((item, index) => (
                <ReportBox data={item} key={index} Active={Active} />
              ))}
            </>
          )}

        </View>
      </ScrollView>


      {/* ================================ */}


    </View>
  )
}

export default Reports