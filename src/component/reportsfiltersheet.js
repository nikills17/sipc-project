import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import { ReportsOptions } from '../utility/constants';
import DropDownPicker from 'react-native-dropdown-picker';
import SIPCStyles from '../screens/styles';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { CONFIG } from '../utility/config';
import { getDate } from '../utility/helper';
import API from '../utility/api';

const ReportsFilterSheet = ({
  refFilter,
  active,
  setData,
  setIsLoading,
  setError,
  error,
  user,
}) => {
  const { height } = Dimensions.get('window');
  const today = new Date();

  const [notCalled, setNotCalled] = useState(true);

  //Date Type
  const [dateTypeDropDown, setDateTypeDropDown] = useState(false);
  const [dateType, setDateType] = useState('survey_submitted');
  const dateTypeList = [
    {
      label: 'Survey Created',
      value: 'survey_created',
    },
    {
      label: 'Survey Submitted',
      value: 'survey_submitted',
    },
  ];

  //Date-Picker (START DATE)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date(today.getTime() - 24 * 60 * 60 * 1000 * 30),
  );

  const toggleDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const handleConfirm = date => {
    setSelectedDate(date);
    toggleDatePicker();
  };

  //Date-Picker (End DATE)
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [selectedEndDate, setSelectedEndDate] = useState(today);

  const toggleEndDatePicker = () => {
    setEndDatePickerVisibility(!isEndDatePickerVisible);
  };

  const handleEndDateConfirm = date => {
    setSelectedEndDate(date);
    toggleEndDatePicker();
  };

  //Organization
  const [organizationDropDown, setOrganizationDropDown] = useState(false);
  const [organization, setOrganization] = useState();
  const [organizationList, setOrganizationList] = useState([]);

  //Building Category
  const [buildingCategoryDropDown, setBuildingCategoryDropDown] =
    useState(false);
  const [buildingCategory, setBuildingCategory] = useState();
  const [buildingCategoryList, setBuildingCategoryList] = useState([]);

  const [floorId, setFloorId] = useState(0);
  const [roomId, setRoomId] = useState(0);

  useEffect(() => {
    API.instance
      .post(
        `/organization-list-device?is_api=true`,
        JSON.stringify({
          appKey: CONFIG.appKey,
          device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
          userId: user.id,
        }),
      )
      .then(
        response => {
          setOrganizationList(
            response?.data.map(item => ({ label: item.name, value: item.id })),
          );
        },
        error => console.error(error),
      );
  }, [active]);

  useEffect(() => {
    if (organization) {
      API.instance
        .post(
          `/get-buildings-by-org?is_api=true`,
          JSON.stringify({
            appKey: CONFIG.appKey,
            device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
            orgId: organization,
          }),
        )
        .then(
          response => {
            setBuildingCategoryList(
              response?.data.map(item => ({
                label: item.building_name,
                value: item.id,
              })),
            );
          },
          error => console.error(error),
        );
    }
  }, [organization]);

  const getReports = () => {
    setIsLoading(true);
    let payload = JSON.stringify({
      appKey: CONFIG.appKey,
      device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
      user_id: user.id,
      date_type: dateType,
      period: '0',
      start_date: getDate(selectedDate),
      end_date: getDate(selectedEndDate),
      organization_id: organization ?? 0,
      building_id: buildingCategory ?? 0,
    });
    API.instance.post(ReportsOptions[active].url, payload).then(
      response => {

        setError('');
        setIsLoading(false);
        if (response.status === "success") {
          refFilter.current.close();
          setData(response.data);
        } else {
          console.log(response.error);
          setError(response.error);
        }

        setNotCalled(false);
      },
      error => {
        setIsLoading(false);
        console.error(error);
      },
    );
  };

  useEffect(() => {
    close(true);
  }, [active]);

  const close = check => {
    setError('')
    refFilter.current.close();
    if (check) {
      setDateType('survey_submitted');
      setSelectedDate(new Date(today.getTime() - 24 * 60 * 60 * 1000 * 30));
      setSelectedEndDate(today);
      setOrganizationDropDown(false);
      setOrganization(0);
      setOrganizationList([]);
      setBuildingCategoryDropDown(false);
      setBuildingCategory(0);
      setBuildingCategoryList([]);
      setNotCalled(true);
  
    }
  };

  return (
    <RBSheet
      ref={refFilter}
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
          style={[SIPCStyles.BoldFont, { alignSelf: 'center', color: 'white' }]}>
          {ReportsOptions[active].name}
        </Text>
        <TouchableOpacity
          onPress={() => {
            close(false);
          }}
          style={{
            position: 'absolute',
            right: 25,
            alignSelf: 'center',
          }}>
          <Ionicons name="ios-close" size={25} color={'#FFFFFF'} />
        </TouchableOpacity>
      </View>
      {error && (
        <View style={{ width: '100%', }}>
          <Text style={{ color: 'red', fontFamily: 'Poppins-Medium', fontSize: responsiveScreenFontSize(1.8), marginHorizontal: 20, marginTop: 20 }}>
            Error! {error}
          </Text>
        </View>
      )
      }
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 150 }}>
        {(active === 1 || active === 2) && (
          <>
            {/* ===============DateType DropDown========================= */}
            <View
              style={{ marginHorizontal: 20, marginVertical: 15, zIndex: 10 }}>
              <DropDownPicker
                listMode="SCROLLVIEW"
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
                }}
                showArrowIcon={true}
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
                open={dateTypeDropDown}
                value={dateType}
                items={dateTypeList}
                setOpen={setDateTypeDropDown}
                setValue={setDateType}
              />
            </View>
          </>
        )}

        {/* ========================================Start Date======== */}
        <TouchableOpacity
          onPress={toggleDatePicker}
          activeOpacity={0.95}
          style={[
            SIPCStyles.container,
            { marginHorizontal: 20, marginVertical: 15, borderWidth: 1 },
          ]}>
          <Image
            source={require('../assets/cal.png')}
            style={[SIPCStyles.MainBuilding, { marginRight: 20, marginLeft: 6 }]}
          />
          <Text style={SIPCStyles.NormalFont}>
            {selectedDate ? getDate(selectedDate) : 'Start Date'}
          </Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={toggleDatePicker}
          date={selectedDate}
        />

        {/* ========================================End Date======== */}
        <TouchableOpacity
          onPress={toggleEndDatePicker}
          style={[
            SIPCStyles.container,
            { marginHorizontal: 20, marginVertical: 15, borderWidth: 1 },
          ]}>
          <Image
            source={require('../assets/cal.png')}
            style={[SIPCStyles.MainBuilding, { marginRight: 20, marginLeft: 6 }]}
          />
          <Text style={SIPCStyles.NormalFont}>
            {selectedEndDate ? getDate(selectedEndDate) : 'End Date'}
          </Text>
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isEndDatePickerVisible}
          mode="date"
          onConfirm={handleEndDateConfirm}
          onCancel={toggleEndDatePicker}
          date={selectedEndDate}
        />
        {/* ===============Organization DropDown========================= */}
        <View style={{ marginHorizontal: 20, marginVertical: 15, zIndex: 10 }}>
          <DropDownPicker
            listMode="SCROLLVIEW"
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
          />
        </View>

        {/* ===============Building Category DropDown========================= */}
        <View style={{ marginHorizontal: 20, marginVertical: 15, zIndex: 10 }}>
          <DropDownPicker
            listMode="SCROLLVIEW"
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
      </ScrollView>

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={getReports}
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
          zIndex: 100,
        }}
        labelStyle={{ color: 'white' }}>
        <Text style={[SIPCStyles.BoldFont, { color: 'white' }]}>GET REPORTS</Text>
      </TouchableOpacity>
    </RBSheet>
  );
};

export default ReportsFilterSheet;

const styles = StyleSheet.create({});
