import React, {useState, useEffect} from 'react';
import {View, StatusBar, ScrollView} from 'react-native';
import {
  Button,
  Card,
  Searchbar,
  TextInput,
  Surface,
  Divider,
  Text,
} from 'react-native-paper';
import Icon2 from 'react-native-vector-icons/Entypo';
import SIPCStyles from './styles';
import ViewRoomBox from '../component/viewroombox';
import API from '../utility/api';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../component/activityindicator';

const InspectionViewRoom = () => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const params = JSON.stringify({
    "appKey":"f9285c6c2d6a6b531ae1f70d2853f612",
    "device_id":"68d41abf-31bb-4bc8-95dc-bb835f1bc7a1",
    "inspectionResultId":"3"
  });


  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true)
      API.instance
        .post(
          'http://sipcsurvey.devuri.com/sipcsurvey/room-list-device?is_api=true',
          params,
        )
        .then(
          response => {
            setIsLoading(false)
            setData(JSON.parse(JSON.stringify(response.data)));
    console.log("Response", response)
    // console.table("Data", data)
          },
          error => {
            console.error(error);
            setIsLoading(false)
          },
        );
    }, []),
  );

// --------------------------------Inspection -----------------------------//

  return (
    <View style={SIPCStyles.flex}>
      <StatusBar barStyle={'dark-content'} backgroundColor="#3a7fc4" />
      <ScrollView nestedScrollEnabled={true}>
        {/* ----------------------------------------------------------------------- */}
        <Surface
          style={{
            backgroundColor: '#3a7fc4',
            padding: 15,
            alignItems: 'center',
          }}>
          <Text style={SIPCStyles.AddNewText}>SIPC High School</Text>
        </Surface>

{/* ======================= */}

{isLoading ?
          (<Loader />
          )
          :
            (
          <>
            {data.map((item, index) => {
              return (
                <ViewRoomBox data={item} key={index}  />
              )
            })}
          </>
            )
        }

{/* ======================= */}


      </ScrollView>
    </View>
  );
};

export default InspectionViewRoom;
