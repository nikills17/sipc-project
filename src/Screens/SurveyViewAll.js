import {
  View,
  Alert,
  Image,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  StatusBar, TouchableOpacity, FlatList
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  Searchbar,
  TextInput,
  Surface,
  Divider,
  Text,
} from 'react-native-paper';
import SIPCStyles from './styles';
import Icon2 from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Col, Grid } from 'react-native-easy-grid';
import SurveyViewAllBox from '../component/surveyviewallbox';
import API from '../utility/api';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../component/activityindicator';
import { responsiveScreenHeight, responsiveScreenWidth, responsiveScreenFontSize } from 'react-native-responsive-dimensions';

import { MMKV } from 'react-native-mmkv'
export const storage = new MMKV();

const SurveyViewAll = ({ navigation }) => {
  const jsonUser = storage.getString('user')
  if (jsonUser == null || jsonUser == '') {
    navigation.navigate("Login");
  }
  const user = JSON.parse(jsonUser);

  const Width = Dimensions.get('window').width;
  const Height = Dimensions.get('window').height;
  const [totalCount, setTotalCount] = useState();


  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const [Active, setActive] = useState(1);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const params = JSON.stringify({
    pageSize: '10',
    pageNumber: '1',
    appKey: 'f9285c6c2d6a6b531ae1f70d2853f612',
    device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
    userId: user.id,
    userSurveyStatus: Active,
    searchKeyword: '',
  });

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      API.instance
        .post(
          'http://sipcsurvey.devuri.com/sipcsurvey/user-surveys-device?is_api=true',
          params,
        )
        .then(
          response => {
            setIsLoading(false);
            setData(response.data);
            setTotalCount(response.totalCount);
          },
          error => {
            console.error(error);
            setIsLoading(false);
          },
        );
    }, [Active]),
  );

  const renderItem = ({ item,index }) => (
    <SurveyViewAllBox data={item} key={index} navigation={navigation} Active={Active}/>

  );


  return (
    <View style={SIPCStyles.flex}>
      <StatusBar barStyle={'dark-content'} backgroundColor="white" />

      {/* ====================================== */}
      <Surface style={SIPCStyles.headerSurface}>
        {
          user.profile_picture != '' ?
            <TouchableOpacity>
              <Image source={{ uri: user.profile_picture }} style={[SIPCStyles.headerManImage, { borderRadius: 100, width: Width / 10, height: Height / 20 }]} />
            </TouchableOpacity>
            :
            <Image source={require('../assets/man.png')} style={[SIPCStyles.headerManImage, { borderRadius: 100, width: Width / 10, height: Height / 20 }]} />
        }

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
      {/* ================TABS============================== */}

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
      <ScrollView>
        {isLoading ? (
          <Loader />
        ) : totalCount > 0 ? (
          <>
            {data.map((item, index) => (
              <SurveyViewAllBox data={item} key={index} navigation={navigation} Active={Active} />
            ))}
          </>
        ) : (
          <>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
              <Image source={require('../assets/no-survey-found.png')} style={{ height: Height / 3.5, width: Width / 2, resizeMode: 'contain' }} />
              <Text style={{ textAlign: 'center', color: '#4284c6', fontSize: responsiveScreenFontSize(2.5), fontFamily: 'Poppins-Regular' }}>{Active == 1 ? "No Completed Survey" : "No Pending Survey"}</Text>
              <Text style={{ textAlign: 'center', fontSize: responsiveScreenFontSize(1.8), fontFamily: 'Poppins-Regular' }}>{Active == 1 ? "No Completed Survey were found yet." : "No Pending Survey were found yet."}</Text>
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
