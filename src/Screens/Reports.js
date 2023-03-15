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
import {Searchbar, Surface, Divider, Text} from 'react-native-paper';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {CommonActions, useFocusEffect} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {MMKV} from 'react-native-mmkv';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import SIPCStyles from './styles';
import API from '../utility/api';
import Loader from '../component/activityindicator';
import ReportBox from '../component/reportsbox';
import {CONFIG} from '../utility/config';
import {ReportsOptions} from '../utility/constants';
import ReportsFilterSheet from '../component/reportsfiltersheet';
import {getDate} from '../utility/helper';

const Reports = ({navigation}) => {
  const storage = new MMKV();
  const jsonUser = storage.getString('user');
  const user = JSON.parse(jsonUser);

  const today = new Date();

  const [data, setData] = useState([]);

  const filterRef = useRef();
  const profileRef = useRef();

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const [active, setActive] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  let payload;

  if (active === 1) {
    payload = JSON.stringify({
      appKey: CONFIG.appKey,
      device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
      user_id: user.id,
      date_type: 'survey_submitted',
      period: '30',
      start_date: getDate(new Date(today.getTime() - 24 * 60 * 60 * 1000 * 30)),
      end_date: getDate(today),
      organization_id: 0,
      building_id: 0,
    });
  } else if (active === 2) {
    payload = JSON.stringify({
      appKey: CONFIG.appKey,
      device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
      user_id: user.id,
      date_type: 'survey_submitted',
      period: '30',
      start_date: getDate(new Date(today.getTime() - 24 * 60 * 60 * 1000 * 30)),
      end_date: getDate(today),
      organization_id: 0,
      building_category_id: 0,
    });
  } else if (active === 3 || active === 4){
    payload = JSON.stringify({
      appKey: CONFIG.appKey,
      device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
      user_id: user.id,
      period: '30',
      start_date: getDate(new Date(today.getTime() - 24 * 60 * 60 * 1000 * 30)),
      end_date: getDate(today),
      organization_id: 0,
      building_id: 0,
    });
  }

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      API.instance.post(ReportsOptions[active].url, payload).then(
        response => {
          setIsLoading(false);
          if (response.status == 'success') {
            setData(response.data);
          }
        },
        error => {
          console.error(error);
          setIsLoading(false);
        },
      );
    }, [active]),
  );

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
                  onPress={() => setActive(item.id)}
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

      {/* ====================FILTER SHEET============================ */}
      {active && (
        <ReportsFilterSheet
          refFilter={filterRef}
          active={active}
          setData={setData}
          setIsLoading={setIsLoading}
          user={user}
        />
      )}

      <StatusBar barStyle={'dark-content'} backgroundColor="white" />
    </View>
  );
};

export default Reports;
