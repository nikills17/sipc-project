import {
  View,
  Alert,
  Image,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  StatusBar, TouchableOpacity
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
import ReportBox from '../component/reportsbox';
import { CONFIG } from '../utility/config';



import { MMKV } from 'react-native-mmkv'
export const storage = new MMKV();


const Reports = ({ navigation }) => {

  const jsonUser = storage.getString('user')
  const user = JSON.parse(jsonUser);

  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);





  const Width = Dimensions.get('window').width;
  const Height = Dimensions.get('window').height;

  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const currentDate = new Date().toLocaleDateString('en-US', options);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [dateType, setDateType] = React.useState('survey_submitted');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState(currentDate);
  const onChangeSearch = query => setSearchQuery(query);

  const [Active, setActive] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [data, setData] = useState([]);
  // console.log(endDate);

  const params = JSON.stringify({
    appKey: CONFIG.appKey,
    device_id: "68d41abf-31bb-4bc8-95dc-bb835f1bc7a1",
    user_id: user.id,
    date_type: dateType,
    period: "30",
    start_date: "2023-01-28",
    end_date: "2023-02-28",
    organization_id: "0",
    building_id: "0",
  });

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      API.instance
        .post(
          '/building-report-api?is_api=true',
          params,
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
    }, []),
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
            onPress={() => navigation.navigate('Reports')}>
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
            <TouchableOpacity onPress={() => setActive(1)}
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

            <TouchableOpacity onPress={() => setActive(2)}
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

            <TouchableOpacity onPress={() => setActive(3)}
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

            <TouchableOpacity onPress={() => setActive(4)}
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

            <TouchableOpacity onPress={() => setActive(5)}
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


      {/* ================================ */}
      {/* <ScrollView>
        {data.map((item, index) => (
          <ReportBox data={item} key={index} Active={Active} />
        ))}
      </ScrollView> */}


      <View style={{ zIndex: -1 }}>
        <ScrollView>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {data.map((item, index) => (
                <ReportBox data={item} key={index} Active={Active} />
              ))}
            </>
          )}
        </ScrollView>
      </View>



      {/* ================================ */}


    </View>
  )
}

export default Reports