import {
  View,
  Alert,
  Image,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import {
  Button,
  Card,
  Searchbar,
  TextInput,
  Surface,
  Divider,
  Text,
} from 'react-native-paper';
import SIPCStyles from '../screens/styles';
import Moment from 'moment';
import { Col, Grid } from 'react-native-easy-grid';
import API from '../utility/api';
import { CONFIG } from '../utility/config';
import { MMKV } from 'react-native-mmkv'
export const storage = new MMKV();




const InspectionBox = ({ data, navigation, setError, setErrorMessage }) => {

  const jsonUser = storage.getString('user')
  const user = JSON.parse(jsonUser);

  const [Show, setShow] = useState(false);

  const checkScore = score => {
    if (score > 90) {
      return (
        <Text style={[SIPCStyles.inspectionScore, SIPCStyles.textSuccess]}>
          {score}%
        </Text>
      );
    } else if (score > 80) {
      return (
        <Text style={[SIPCStyles.inspectionScore, SIPCStyles.textWarning]}>
          {score}%
        </Text>
      );
    } else {
      return (
        <Text style={[SIPCStyles.inspectionScore, SIPCStyles.textDanger]}>
          {score}%
        </Text>
      );
    }
  };

  let SCORE = data.received_score;
  SCORE = parseFloat(SCORE).toFixed(2);


  const params = JSON.stringify({
    appKey: CONFIG.appKey,
    device_id: "68d41abf-31bb-4bc8-95dc-bb835f1bc7a1",
    buildingId: data.building_id,
    inspectionResultId: data.id,
    inspectionTypeId: '1',
    userId: user.id,
  });
  const continuePendingInspection = () => {
    API.instance
      .post(
        '/pending-inspection-api?is_api=true',
        params).then(
          response => {
            if (response.status === "success") {
              console.log('response=====> ' + JSON.stringify(response.roomName));
              navigation.navigate('CleaningInspections',
                {
                  data: response.data,
                  buildingName: response.buildingName,
                  floorName: response.floorName,
                  roomName: response.roomName,
                }
              )
            } else {
              setError(true);
              setErrorMessage(response.error);
            }
          },
          error => {
            console.error(error);
          },
        );
  }



  return (
    <View>
      <Surface
        style={{
          marginTop: 20,
          padding: 15,
          backgroundColor: Show == true ? '#fffcf8' : 'white',
        }}>
        <Grid>
          <Col size={80} style={{ justifyContent: 'center', paddingRight: 10 }}>
            <View style={{ flexDirection: 'column' }}>
              <View style={SIPCStyles.ViewRowAlign}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    setShow(!Show);
                  }}>
                  {Show == true ? (
                    <Image
                      source={require('../assets/minus.png')}
                      style={SIPCStyles.PlusMinusImage}
                    />
                  ) : (
                    <Image
                      source={require('../assets/plus.png')}
                      style={SIPCStyles.PlusMinusImage}
                    />
                  )}
                </TouchableWithoutFeedback>
                <Text style={SIPCStyles.SurfaceTitle}>{data.date_created}</Text>
              </View>

              <View style={SIPCStyles.healthImageView}>
                <Image
                  source={require('../assets/building.png')}
                  style={SIPCStyles.healthImage}
                />
                <Text style={SIPCStyles.SurfaceType}>{data.building_name}</Text>
              </View>
            </View>
          </Col>

          <Col size={16} style={{ alignItems: 'center' }}>
            <TouchableWithoutFeedback onPress={() => continuePendingInspection()} >
              {data.is_completed == '1' ? (
                <Image
                  source={require('../assets/share.png')}
                  style={SIPCStyles.playImage}
                />
              ) : (
                <Image
                  source={require('../assets/continue.png')}
                  style={SIPCStyles.playImage}
                />
              )}
            </TouchableWithoutFeedback>
            <Text style={SIPCStyles.SurfacePlayImageText}>
              {data.is_completed == '1' ? 'View' : 'Continue'}
            </Text>
          </Col>
        </Grid>
      </Surface>
      {/* ======================================== */}
      {Show == true ? (
        <>
          <Surface style={{ backgroundColor: 'white', padding: 15 }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>
                  Rooms:
                </Text>
                <Text style={SIPCStyles.ValueFont}>{data.total_room}</Text>
              </View>
              <Text
                style={[SIPCStyles.ValueFont, { color: '#1485cc' }]}
                onPress={() => {
                  navigation.navigate('InspectionViewRoom', {
                    inspectionResultId: data.id,
                  });
                }}>
                View Rooms
              </Text>
            </View>
          </Surface>

          <Surface style={{ backgroundColor: 'white', padding: 15 }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>
                  Score:
                </Text>
                {checkScore(SCORE)}

                {/* <Text style={[SIPCStyles.inspectionScore,
                                data.received_score > 90 ? SIPCStyles.textSuccess :
                                    data.received_score > 80 ? SIPCStyles.textWarning :
                                        SIPCStyles.textDanger]}>{data.received_score}%</Text> */}
              </View>
              {data.is_completed == '1' ? (
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>
                    Status:
                  </Text>
                  <Text
                    style={[
                      SIPCStyles.inspectionScore,
                      SIPCStyles.textSuccess,
                    ]}>
                    Completed
                  </Text>
                </View>
              ) : (
                <View style={{ flexDirection: 'row' }}>
                  <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>
                    Status:
                  </Text>
                  <Text
                    style={[
                      SIPCStyles.inspectionScore,
                      SIPCStyles.textWarning,
                    ]}>
                    In Progress
                  </Text>
                </View>
              )}
            </View>
          </Surface>

          <Surface style={{ backgroundColor: 'white', padding: 15 }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>
                  Inspector:
                </Text>
                <Text style={SIPCStyles.ValueFont}>
                  {data.inspector_first_name} {data.inspector_last_name}
                </Text>
              </View>
            </View>
          </Surface>
        </>
      ) : null}
    </View>
  );
};

export default InspectionBox;
