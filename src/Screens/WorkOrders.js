import { View, Alert, Image, ScrollView, TouchableWithoutFeedback, StatusBar, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Card, Searchbar, TextInput, Surface, Divider, Text, } from 'react-native-paper';
import Icon2 from 'react-native-vector-icons/Entypo';
import SIPCStyles from './styles';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import WorkOrderBox from '../component/workorderbox';
import API from '../utility/api';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../component/activityindicator';
import { responsiveScreenHeight, responsiveScreenWidth, responsiveScreenFontSize } from 'react-native-responsive-dimensions';

import { MMKV } from 'react-native-mmkv'
import { CONFIG } from '../utility/config';
export const storage = new MMKV();


const WorkOrders = ({ navigation }) => {
  const jsonUser = storage.getString('user')
  const user = JSON.parse(jsonUser);

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);


  const Width = Dimensions.get('window').width;
  const Height = Dimensions.get('window').height;

  const [Active, setActive] = useState(1);
  const [totalCount, setTotalCount] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const [dataLoading, setDataLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  


  const params = JSON.stringify({
    pageSize: CONFIG.pageSize,
    pageNumber: "1",
    appKey: CONFIG.appKey,
    device_id: "68d41abf-31bb-4bc8-95dc-bb835f1bc7a1",
    userId: user.id,
    workorderStatus: Active,
  });


  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      API.instance
        .post(
          '/workorder-list-device?is_api=true',
          params,).then(
            response => {
              setIsLoading(false);
              setData(response.data);
              setTotalCount(response.totalCount);
              setCurrentPage(1);
            },
            error => {
              console.error(error);
              setIsLoading(false);
            },
          );
    }, [Active]),
  );

  const getMoreData = () => {
    if (currentPage * CONFIG.pageSize < totalCount) {
      setDataLoading(true);
      const newParams = JSON.stringify({
        pageSize: CONFIG.pageSize,
        pageNumber: (currentPage + 1).toString(),
        appKey: CONFIG.appKey,
        device_id: "68d41abf-31bb-4bc8-95dc-bb835f1bc7a1",
        userId: user.id,
        workorderStatus: Active,
      });
      API.instance.post('/workorder-list-device?is_api=true', newParams).then(
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
          placeholder="Search Work Orders"
          placeholderTextColor="grey"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={SIPCStyles.searchBar}
          icon={() => (
            <SimpleLineIcons
              name="magnifier"
              size={19}
              style={{ color: 'grey' }}
            />
          )}
        />
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('AddWorkOrders', {
            selectedId: 0,
          })}>
          <Image
            source={require('../assets/plusScreen.png')}
            style={SIPCStyles.headerManImage}
          />
        </TouchableWithoutFeedback>
      </Surface>
      <Divider bold={true} />
      {/* --------------------------ActiveS---------------------------- */}
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
            flex: 1
          }}
          onPress={() => setActive(1)}>
          <Text
            style={[
              SIPCStyles.NormalFont,
              { color: Active == 1 ? '#1485cc' : '#525252' },
            ]}>
            Work Orders
          </Text>
        </Card>

        <Card
          elevation={0}
          style={{
            paddingVertical: 15,
            paddingHorizontal: 20,
            backgroundColor: 'white',
            borderBottomWidth: Active == 2 ? 1 : 0,
            borderColor: Active == 2 ? '#1485cc' : 'transparent', flex: 1
          }}
          onPress={() => setActive(2)}>
          <Text
            style={[
              SIPCStyles.NormalFont,
              { color: Active == 2 ? '#1485cc' : '#525252' },
            ]}>
            In Progress
          </Text>
        </Card>

        <Card
          elevation={0}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 15,
            backgroundColor: 'white',
            borderBottomWidth: Active == 3 ? 1 : 0,
            borderColor: Active == 3 ? '#1485cc' : 'transparent', flex: 1
          }}
          onPress={() => setActive(3)}>
          <Text
            style={[
              SIPCStyles.NormalFont,
              { color: Active == 3 ? '#1485cc' : '#525252' },
            ]}>
            Completed
          </Text>
        </Card>
      </View>
      
        {/* ====================================== */}
        {/* {isLoading ? (
          <Loader />
        )
          : (
            <>
              {data.map((item, index) => {
                return (
                  <WorkOrderBox data={item} key={index} Active={Active} navigation={navigation} />
                )
              })
              }
            </>
          )
        } */}
        {/* =============================================== */}

        <ScrollView
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
                <WorkOrderBox
                  data={item}
                  key={index}
                  Active={Active}
                  navigation={navigation} />
              ))}
              {dataLoading && <Loader marginTop={10} />}
            </>
          ) : (
            <>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
                <Image source={require('../assets/no-work-order-found.png')} style={{ height: Height / 3.5, width: Width / 2, resizeMode: 'contain' }} />
                <Text style={{ textAlign: 'center', color: '#4284c6', fontSize: responsiveScreenFontSize(2.5), fontFamily: 'Poppins-Regular' }}>{Active == 1 ? "No Work Order" : Active == 2 ? "No InProgress Work Order" : "No Completed Work Order"}</Text>
                <Text style={{ textAlign: 'center', fontSize: responsiveScreenFontSize(1.8), fontFamily: 'Poppins-Regular' }}>{Active == 1 ? "No Work Order were found yet." : Active == 2 ? "No In Progress Work Order were found yet." : "No Completed Work Order were found yet."}</Text>
              </View>
            </>
          )}

        </ScrollView>
        {/* =============================================== */}

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
                      <Image source={require('../assets/no-work-order-found.png')} style={{ height: Height /3.5, width: Width / 2,resizeMode:'contain'}} />
                      <Text style={{ textAlign: 'center', color: '#4284c6', fontSize: responsiveScreenFontSize(2.5), fontFamily: 'Poppins-Regular' }}>{Active == 1?"No Work Order":Active == 2?"No InProgress Work Order":"No Completed Work Order"}</Text>
                      <Text style={{ textAlign: 'center', fontSize: responsiveScreenFontSize(1.8), fontFamily: 'Poppins-Regular' }}>{Active == 1?"No Work Order were found yet.":Active == 2?"No In Progress Work Order were found yet.":"No Completed Work Order were found yet."}</Text>
                    </View>
                  </>
                )
              
              }
            </>
          )}
        </View> */}



        {/* ====================================== */}
     
    </View>
  );
};

export default WorkOrders;
