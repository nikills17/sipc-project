import { View, Alert, Image, ScrollView, Dimensions, TouchableWithoutFeedback, StatusBar, FlatList, TouchableOpacity, } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Button, Card, Searchbar, TextInput, Surface, Divider, Text, } from 'react-native-paper';
import SIPCStyles from './styles';
import Icon2 from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import InspectionBox from '../component/inspectionbox';
import SurveyBox from '../component/surveybox';
import API from '../utility/api';
import Loader from '../component/activityindicator';
import { responsiveScreenHeight, responsiveScreenWidth, responsiveScreenFontSize } from 'react-native-responsive-dimensions';


import { MMKV } from 'react-native-mmkv'
export const storage = new MMKV();

const Inspections = ({ navigation }) => {

  const jsonUser = storage.getString('user')
  const user = JSON.parse(jsonUser);

  const Width = Dimensions.get('window').width;
  const Height = Dimensions.get('window').height;

  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const [Active, setActive] = useState(null);
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);


  const params = JSON.stringify({
    pageSize: '10',
    pageNumber: '1',
    appKey: 'f9285c6c2d6a6b531ae1f70d2853f612',
    device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
    userId: user.id,
    inspectionStatus: Active === null ? '' : Active,
    searchKeyword: '',
  });

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      API.instance
        .post(
          'http://sipcsurvey.devuri.com/sipcsurvey/inspection-list-device?is_api=true',
          params,
        )
        .then(
          response => {
            setIsLoading(false);
            if (response.status == "success") {
              setData(response.data);
              setTotalCount(response.totalCount);
            }
          },
          error => {
            console.error(error);
            setIsLoading(false);
          },
        );
    }, [Active]),
  );

  const loadMoreData = () => {
    let newParams = JSON.stringify({
      pageSize: '10',
      pageNumber: pageNumber,
      appKey: 'f9285c6c2d6a6b531ae1f70d2853f612',
      device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
      userId: user.id,
      inspectionStatus: Active === null ? '' : Active,
      searchKeyword: '',
    });

    API.instance
      .post(
        'http://sipcsurvey.devuri.com/sipcsurvey/inspection-list-device?is_api=true',
        newParams,
      )
      .then(
        response => {
          setData(data.concat(response.data));
          setPageNumber(pageNumber + 1)

        },
        error => {
          console.error(error);
        },
      );
  }

  const renderItem = ({ item, navigation, index }) => {
    <InspectionBox data={item} navigation={navigation} key={index} />
  }



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
          placeholder="Search Inspection"
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
          onPress={() => navigation.navigate('StartInspections')}>
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
            paddingHorizontal: 22,
            backgroundColor: 'white',
            borderBottomWidth: Active == null ? 1 : 0,
            borderColor: Active == null ? '#1485cc' : 'transparent', flex: 1
          }}
          onPress={() => setActive(null)}>
          <Text
            style={[
              SIPCStyles.NormalFont,
              { color: Active == null ? '#1485cc' : '#525252' },
            ]}>
            Inspections
          </Text>
        </Card>

        <Card
          elevation={0}
          style={{
            paddingVertical: 15,
            paddingHorizontal: 22,
            backgroundColor: 'white',
            borderBottomWidth: Active == 1 ? 1 : 0,
            borderColor: Active == 1 ? '#1485cc' : 'transparent', flex: 1
          }}
          onPress={() => setActive(1)}>
          <Text
            style={[
              SIPCStyles.NormalFont,
              { color: Active == 1 ? '#1485cc' : '#525252' },
            ]}>
            Completed
          </Text>
        </Card>

        <Card
          elevation={0}
          style={{
            paddingHorizontal: 22,
            paddingVertical: 15,
            backgroundColor: 'white',
            borderBottomWidth: Active == 0 ? 1 : 0,
            borderColor: Active == 0 ? '#1485cc' : 'transparent', flex: 1
          }}
          onPress={() => setActive(0)}>
          <Text
            style={[
              SIPCStyles.NormalFont,
              { color: Active == 0 ? '#1485cc' : '#525252' },
            ]}>
            Pending
          </Text>
        </Card>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ==========INSPECTIONS ==================================== */}

  

   
          {isLoading ? (
            <Loader />
          ) : totalCount > 0 ? (
            <>
              {data.map((item, index) => (
                <InspectionBox data={item} navigation={navigation} key={index} Active={Active} />
              ))}
            </>
          ) : (
            <>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
                <Image source={require('../assets/no-inspection-found.png')} style={{ height: Height / 3, width: Width / 2, resizeMode: 'contain' }} />
                <Text style={{ textAlign: 'center', color: '#4284c6', fontSize: responsiveScreenFontSize(2.5), fontFamily: 'Poppins-Regular' }}>{Active == null ? "No Inspections" : Active == 1 ? "No Completed Inspections" : "No Pending Inspections"}</Text>
                <Text style={{ textAlign: 'center', fontSize: responsiveScreenFontSize(1.8), fontFamily: 'Poppins-Regular' }}>{Active == null ? "No inspection were found yet." : Active == 1 ? "No completed inspection were found yet." : "No pending inspection were found yet."}</Text>
              </View>
            </>
          )}

 

        {/* =========================================== */}

        {/* <View>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {totalCount > 0 ? (
                <FlatList
                  data={data}
                  renderItem={renderItem}
                // keyExtractor={keyExtractor}
                />
              ) :
                (
                  <>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
                      <Image source={require('../assets/no-inspection-found.png')} style={{ height: Height / 3, width: Width / 2, resizeMode: 'contain' }} />
                      <Text style={{ textAlign: 'center', color: '#4284c6', fontSize: responsiveScreenFontSize(2.5), fontFamily: 'Poppins-Regular' }}>{Active == null ? "No Inspections" : Active == 1 ? "No Completed Inspections" : "No Pending Inspections"}</Text>
                      <Text style={{ textAlign: 'center', fontSize: responsiveScreenFontSize(1.8), fontFamily: 'Poppins-Regular' }}>{Active == null ? "No inspection were found yet." : Active == 1 ? "No completed inspection were found yet." : "No pending inspection were found yet."}</Text>
                    </View>
                  </>
                )

              }
            </>
          )}
        </View> */}




      </ScrollView>
    </View>
  );
};

export default Inspections;