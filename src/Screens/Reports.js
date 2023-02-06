import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import SurveyBox from '../component/surveybox';
import axios from 'axios';

const Reports = () => {

  const [data, setData] = useState([]);
  const params = JSON.stringify({
    "pageSize": "25",
    "pageNumber": "1",
    "appKey": "f9285c6c2d6a6b531ae1f70d2853f612",
    "device_id": "68d41abf-31bb-4bc8-95dc-bb835f1bc7a1",
    "userId": "1",
    "orgId": "1"
  });
  
  useEffect(() => {
    
    axios.get('http://sipcsurvey.devuri.com/sipcsurvey/survey-list-device?is_api=true', {request: params}).then((response) => {
      // console.log(response.data)
      setData(response.data);
    }, (error) => {
      console.error(error);
    });
  }, [])

  return (
    <View style={{flex:1, }}>
      {data.map((item,index) => {
        return <SurveyBox data={item} key={index} />
      })}
    </View>
  )
}

export default Reports;