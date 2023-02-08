import { View, Alert, Image, ScrollView, Dimensions, TouchableWithoutFeedback, StatusBar, } from 'react-native'
import React, { useState, useEffect, } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { Button, Card, Searchbar, TextInput, Surface, Divider, Text, } from 'react-native-paper';
import SIPCStyles from './styles';
import Icon2 from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import InspectionBox from '../component/inspectionbox';
import SurveyBox from '../component/surveybox';
import API from '../utility/api';


const Inspections = ({ navigation }) => {

  const Width = Dimensions.get('window').width;
  const Height = Dimensions.get('window').height;

  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const [Active, setActive] = useState(null);

  const [data, setData] = useState([]);
  
  const params = JSON.stringify({
    "pageSize": "25",
    "pageNumber": "1",
    "appKey": "f9285c6c2d6a6b531ae1f70d2853f612",
    "device_id": "68d41abf-31bb-4bc8-95dc-bb835f1bc7a1",
    "userId": "1",
    "inspectionStatus": Active == null ? '' : Active,
    "searchKeyword": "",
  });

  // "inspectionStatus": "", == inspection
  // "inspectionStatus": "0", == pending
  // "inspectionStatus": "1", == complete

  // useEffect(() => {
  //   API.instance
  //     .post(
  //       'http://sipcsurvey.devuri.com/sipcsurvey/inspection-list-device?is_api=true', params,
  //     ).then(response => {
  //       setData(response.data);
  //     },
  //       error => {
  //         console.error(error);
  //       },
  //     );
  // }, [Active]);


  useFocusEffect(
    React.useCallback(() => {
      API.instance
      .post(
        'http://sipcsurvey.devuri.com/sipcsurvey/inspection-list-device?is_api=true', params,
      ).then(response => {
        setData(response.data);
      },
        error => {
          console.error(error);
        },
      );
      // console.log(Active);
    }, [Active])
  );
    
  

  return (
    <View style={SIPCStyles.flex}>
      <StatusBar barStyle={"dark-content"} backgroundColor="white" />

      {/* ====================================== */}
      <Surface style={SIPCStyles.headerSurface}>
        <Image source={require('../assets/man.png')}
          style={SIPCStyles.headerManImage}
        />

        <Searchbar
          placeholder="Search Inspection"
          placeholderTextColor="grey"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={SIPCStyles.searchBar}
          icon={() => <SimpleLineIcons name="magnifier" size={20} style={{ color: 'grey', }} />}
        />

        <TouchableWithoutFeedback onPress={() => navigation.navigate('StartInspections')}>
          <Image
            source={require('../assets/start-inspection.png')}
            style={SIPCStyles.headerManImage} />
        </TouchableWithoutFeedback>
      </Surface>
      <Divider bold={true} />
      {/* ================TABS============================== */}
      
        <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-around', }} >
          <Card elevation={0} style={{
            paddingVertical: 15,
            paddingHorizontal: 20, backgroundColor: 'white', borderBottomWidth: Active == null ? 1 : 0, borderColor: Active == null ? '#1485cc' : 'transparent', 
          }} onPress={() => setActive(null)}>
            <Text style={[SIPCStyles.NormalFont, { color: Active == null ? '#1485cc' : '#525252' }]}>Inspections</Text>
          </Card>

          <Card elevation={0} style={{ paddingVertical: 15, paddingHorizontal: 20, backgroundColor: 'white', borderBottomWidth: Active == 1 ? 1 : 0, borderColor: Active == 1 ? '#1485cc' : 'transparent',  }} onPress={() => setActive(1)}>
            <Text style={[SIPCStyles.NormalFont, { color: Active == 1 ? '#1485cc' : '#525252' }]}>Completed</Text>
          </Card>

          <Card elevation={0} style={{ paddingHorizontal: 20, paddingVertical: 15, backgroundColor: 'white', borderBottomWidth: Active == 0 ? 1 : 0, borderColor: Active == 0 ? '#1485cc' : 'transparent' }} onPress={() => setActive(0)}>
            <Text style={[SIPCStyles.NormalFont, { color: Active == 0 ? '#1485cc' : '#525252',  }]}>Pending</Text>
          </Card>

        </View>
       
        <ScrollView showsVerticalScrollIndicator={false} >
        {/* ==========INSPECTIONS ==================================== */}
        <>
            {data.map((item, index) => {
              return <InspectionBox data={item} key={index} navigation={navigation} />;
            })}
          </>

        {/* 

        {data.filter((item, index) => {

          if (Active === 2) {
            return <InspectionBox data={item} key={index} navigation={navigation} />;
          }
          else if (Active === 3) {
            return <InspectionBox data={item} key={index} navigation={navigation} />;
          }
          return true;
        }).map((item, index) => {
          return <InspectionBox data={item} key={index} navigation={navigation} />;
        })} 
        
        */}

        {/* ========================================== */}
      </ScrollView>
    </View>
  )
}

export default Inspections