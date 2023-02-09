import { View, Alert, Image, ScrollView, TouchableWithoutFeedback, StatusBar, } from 'react-native';
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



const WorkOrders = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const [Active, setActive] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const params = JSON.stringify({
    "pageSize": "20",
    "pageNumber": "1",
    "appKey": "f9285c6c2d6a6b531ae1f70d2853f612",
    "device_id": "68d41abf-31bb-4bc8-95dc-bb835f1bc7a1",
    "userId": "1",
    "workorderStatus": Active,
  });

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      API.instance
        .post(
          'http://sipcsurvey.devuri.com/sipcsurvey/workorder-list-device?is_api=true',
          params,
        )
        .then(
          response => {
            setIsLoading(false);
            setData(response.data);
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
      <Surface style={SIPCStyles.headerSurface}>
        <Image
          source={require('../assets/man.png')}
          style={SIPCStyles.headerManImage}
        />

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
          onPress={() => navigation.navigate('AddWorkOrders')}>
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
      <ScrollView>
        {/* ====================================== */}
        {isLoading ? (
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
        }




        {/* ====================================== */}
      </ScrollView>
    </View>
  );
};

export default WorkOrders;
