import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import SurveyBox from '../component/surveybox';
import InspectionBox from '../component/inspectionbox';
import API from '../utility/api';
import { ScrollView } from 'react-native-gesture-handler';


const Reports = () => {
  const [data, setData] = useState([]);
  const body = JSON.stringify({
    pageSize: '25',
    pageNumber: '1',
    appKey: 'f9285c6c2d6a6b531ae1f70d2853f612',
    device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
    userId: '1',
    orgId: '1',
  });

  useEffect(() => {
    API.instance.post(`http://sipcsurvey.devuri.com/sipcsurvey/survey-list-device?is_api=true`, body)
    .then(response => {
      setData(response.data)
    }, error => console.error());
  }, []);

  return (
    <View style={{ flex: 1 }}>
    <ScrollView>

      {data.map((item, index) => {
        return <InspectionBox data={item} key={index} />;
      })}
    </ScrollView>
    </View>
  );
};

export default Reports;
