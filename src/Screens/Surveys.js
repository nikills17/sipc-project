import {
  View,
  Alert,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback, FlatList
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
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import API from '../utility/api';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../component/activityindicator';
import { responsiveScreenHeight, responsiveScreenWidth, responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import SurveyBox from '../component/surveybox';


import { MMKV } from 'react-native-mmkv'
import { CONFIG } from '../utility/config';
export const storage = new MMKV();

const Surveys = ({ navigation }) => {

  const jsonUser = storage.getString('user')
  const user = JSON.parse(jsonUser);

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const Width = Dimensions.get('window').width;
  const Height = Dimensions.get('window').height;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState();

  const [dataLoading, setDataLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

 


  const params = JSON.stringify({
    pageSize: CONFIG.pageSize,
    pageNumber: '1',
    appKey: CONFIG.appKey,
    device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
    userId: user.id,
    orgId: user.orgId,
  });

  // useEffect(() => {
  //   API.instance
  //     .post(
  //       '/survey-list-device?is_api=true',
  //       params,
  //     )
  //     .then(
  //       response => {
  //         setData(response.data);
  //       },
  //       error => {
  //         console.error(error);
  //       },
  //     );
  // }, []);
  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      API.instance
        .post(
          '/survey-list-device?is_api=true',
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
    }, []),
  );

  const getMoreData = () => {
    if (currentPage * CONFIG.pageSize < totalCount) {
      setDataLoading(true);
      const newParams = JSON.stringify({
        pageSize: CONFIG.pageSize,
        pageNumber: (currentPage + 1).toString(),
        appKey: CONFIG.appKey,
        device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
        userId: user.id,
        orgId: user.orgId,
      });
      API.instance.post( '/survey-list-device?is_api=true', newParams).then(
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
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={SIPCStyles.searchBar}
          placeholderTextColor="grey"
          icon={() => (
            <SimpleLineIcons
              name="magnifier"
              size={20}
              style={{ color: 'grey' }}
            />
          )}
        />
      </Surface>

      {/* <ScrollView>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            {data.map((item, index) => {
              return (
                <SurveyBox data={item} key={index} navigation={navigation} />
              );
            })}
          </>
        )}

      </ScrollView> */}


      {/* =========================== */}

      <ScrollView
        contentContainerStyle={{paddingBottom: 35}}
        onScroll={({nativeEvent}) => {
          const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;
          if (
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - 35
          ) {
            getMoreData();
          }
        }}>
        {isLoading ? (
          <Loader />
        ) :
          totalCount > 0 ? (
            <>
              {data.map((item, index) => (
                <SurveyBox data={item} key={index} navigation={navigation} />
              ))}
              {dataLoading && <Loader marginTop={10} />}
            </>
          ) : (
            <>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
                <Image source={require('../assets/no-survey-found.png')} style={{ height: Height / 3.5, width: Width / 2, resizeMode: 'contain' }} />
                <Text style={{ textAlign: 'center', color: '#4284c6', fontSize: responsiveScreenFontSize(2.5), fontFamily: 'Poppins-Regular' }}>No Survey</Text>
                <Text style={{ textAlign: 'center', fontSize: responsiveScreenFontSize(1.8), fontFamily: 'Poppins-Regular' }}>No survey available</Text>
              </View>
            </>
          )}

      </ScrollView>


      {/* =========================== */}

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
                      <Image source={require('../assets/no-survey-found.png')} style={{ height: Height /3.5, width: Width / 2, resizeMode:'contain' }} />
                      <Text style={{ textAlign: 'center', color: '#4284c6', fontSize: responsiveScreenFontSize(2.5), fontFamily: 'Poppins-Regular' }}>No Survey</Text>
                      <Text style={{ textAlign: 'center', fontSize: responsiveScreenFontSize(1.8), fontFamily: 'Poppins-Regular' }}>No survey available</Text>
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

export default Surveys;
