import {
  View,
  Alert,
  Image,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useState, useEffect } from 'react';
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
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';


import { MMKV } from 'react-native-mmkv';
import { CONFIG } from '../utility/config';
export const storage = new MMKV();

const SurveyViewAll = ({ navigation, route }) => {
  const pending = route?.params?.pending ?? 1;
  const jsonUser = storage.getString('user');
  const user = JSON.parse(jsonUser);

  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(!visible);
  const closeMenu = () => setVisible(false);

  const Width = Dimensions.get('window').width;
  const Height = Dimensions.get('window').height;
  const [totalCount, setTotalCount] = useState();

  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const [Active, setActive] = useState(pending);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [dataLoading, setDataLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);


  const params = JSON.stringify({
    pageSize: CONFIG.pageSize,
    pageNumber: '1',
    appKey: CONFIG.appKey,
    device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
    userId: user.id,
    userSurveyStatus: Active,
    searchKeyword: searchQuery,
  });

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      API.instance.post('/user-surveys-device?is_api=true', params).then(
        response => {
          setIsLoading(false);
          setData(response.data);
          setTotalCount(response.totalCount);
          setCurrentPage(1);
          // setSearchQuery(searchQuery)
        },
        error => {
          console.error(error);
          setIsLoading(false);
        },
      );
    }, [Active]),
  );
  // console.log(searchQuery);

  const getMoreData = () => {
    if (currentPage * CONFIG.pageSize < totalCount) {
      setDataLoading(true);
      const newParams = JSON.stringify({
        pageSize: CONFIG.pageSize,
        pageNumber: (currentPage + 1).toString(),
        appKey: CONFIG.appKey,
        device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
        userId: user.id,
        userSurveyStatus: Active,
        searchKeyword: searchQuery,
      });
      API.instance.post('/user-surveys-device?is_api=true', newParams).then(
        response => {
          let newData = response.data;
          setDataLoading(false);
          setData([...data, ...newData]);
          setCurrentPage(currentPage + 1);
        },
        error => {
          console.error(error);
          setDataLoading(false);
        },
      );
    }
  };



  return (
    <View style={SIPCStyles.flex}>
      <StatusBar barStyle={'dark-content'} backgroundColor="white" />

      {/* ====================================== */}
      <Surface style={[SIPCStyles.headerSurface, { zIndex: 0 }]}>
        {user.profile_picture != '' ? (
          <TouchableOpacity onPress={openMenu}>
            <Image
              source={{ uri: user.profile_picture }}
              style={[
                SIPCStyles.headerManImage,
                { borderRadius: 100, width: Width / 10, height: Height / 20 },
              ]}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={openMenu}>
            <Image
              source={require('../assets/man.png')}
              style={[
                SIPCStyles.headerManImage,
                { borderRadius: 100, width: Width / 10, height: Height / 20 },
              ]}
            />
          </TouchableOpacity>
        )}

        <Searchbar
          placeholder="Search Survey"
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

        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Surveys')}>
          <Image
            source={require('../assets/start-inspection.png')}
            style={SIPCStyles.headerManImage}
          />
        </TouchableWithoutFeedback>
      </Surface>
      <Divider bold={true} />

      {/* =============================MENU================== */}
      <View style={{ bottom: 8 }}>
        <Provider style={{ zIndex: 9999, }}>
          <View style={{ zIndex: 9999, }}>
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              style={{ backgroundColor: 'transparent' }}
              contentStyle={{ backgroundColor: 'white', }}
              anchor={{ x: 0, y: 0, }}>

              <Menu.Item onPress={() => { }} title={
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                  <Image source={require('../assets/ii.png')} style={{ height: Height / 35, width: Width / 23, resizeMode: 'contain' }} />
                  <Text style={{ color: 'black', fontSize: responsiveScreenFontSize(1.8), marginLeft: 5 }}>Settings</Text>
                </View>
              } />


              <Menu.Item onPress={() => {
                storage.set('user', ''); navigation.navigate('Login');
              }} title={
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                  <Image source={require('../assets/ii.png')} style={{ height: Height / 35, width: Width / 23, resizeMode: 'contain' }} />
                  <Text style={{ color: 'black', fontSize: responsiveScreenFontSize(1.8), marginLeft: 5 }}>Log Out</Text>
                </View>
              } />
            </Menu>
          </View>
        </Provider>
      </View>
      <Divider bold={true} />

      {/* ================TABS============================== */}

      <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-around', zIndex: -1
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
              { textAlign: 'center', color: Active == 1 ? '#1485cc' : '#525252' },
            ]}>
            Completed
          </Text>
        </Card>

        <Card
          elevation={0}
          style={{
            paddingVertical: 15,
            paddingHorizontal: 20,
            backgroundColor: 'white',
            borderBottomWidth: Active == 0 ? 1 : 0,
            borderColor: Active == 0 ? '#1485cc' : 'transparent',
            width: Width / 2,
          }}
          onPress={() => setActive(0)}>
          <Text
            style={[
              SIPCStyles.NormalFont,
              { color: Active == 0 ? '#1485cc' : '#525252', textAlign: 'center' },
            ]}>
            Pending
          </Text>
        </Card>
      </View>
      <Divider bold={true} />

      {/* ===================================================================================== */}
      <ScrollView style={{ zIndex: -1 }}
        contentContainerStyle={{ paddingBottom: 35 }}
        onScroll={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
          if (
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - 35
          ) {
            getMoreData();
          }
        }}>
        {isLoading ? (
          <Loader />
        ) : totalCount > 0 ? (
          <>
            {data.map((item, index) => (
              <SurveyViewAllBox
                data={item}
                key={index}
                navigation={navigation}
                Active={Active}
              />
            ))}
            {dataLoading && <Loader marginTop={10} />}
          </>
        ) : (
          <>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 100,
              }}>
              <Image
                source={require('../assets/no-survey-found.png')}
                style={{
                  height: Height / 3.5,
                  width: Width / 2,
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={{
                  textAlign: 'center',
                  color: '#4284c6',
                  fontSize: responsiveScreenFontSize(2.5),
                  fontFamily: 'Poppins-Regular',
                }}>
                {Active == 1 ? 'No Completed Survey' : 'No Pending Survey'}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: responsiveScreenFontSize(1.8),
                  fontFamily: 'Poppins-Regular',
                }}>
                {Active == 1
                  ? 'No Completed Survey were found yet.'
                  : 'No Pending Survey were found yet.'}
              </Text>
            </View>
          </>
        )}
      </ScrollView>

      {/* <View>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {totalCount > 0 ? (
               data.map((item, index) => {
                  return (
                    <SurveyViewAllBox
                      data={item}
                      key={index}
                      navigation={navigation}
                      Active={Active}
                    />
                  )
                  }
               )
            ) :
              (
                <>
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
                    <Image source={require('../assets/no-survey-found.png')} style={{ height: Height / 3.5, width: Width / 2, resizeMode: 'contain' }} />
                    <Text style={{ textAlign: 'center', color: '#4284c6', fontSize: responsiveScreenFontSize(2.5), fontFamily: 'Poppins-Regular' }}>{Active == 1 ? "No Completed Survey" : "No Pending Survey"}</Text>
                    <Text style={{ textAlign: 'center', fontSize: responsiveScreenFontSize(1.8), fontFamily: 'Poppins-Regular' }}>{Active == 1 ? "No Completed Survey were found yet." : "No Pending Survey were found yet."}</Text>
                  </View>
                </>
              )

            }
          </>
        )}
      </View> */}
    </View>
  );
};

export default SurveyViewAll;