import {StyleSheet, TouchableWithoutFeedback, View, Image} from 'react-native';
import React, {useState} from 'react';
import {Surface, Divider, Text} from 'react-native-paper';
import {Col, Grid} from 'react-native-easy-grid';
import SIPCStyles from '../screens/styles';

const ViewRoomBox = ({data}) => {
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

  let SCORE = data.score;
  SCORE = parseFloat(SCORE).toFixed(2);

  return (
    <>
      <Surface
        style={{
          padding: 15,
          marginTop: 20,
          backgroundColor: Show == true ? '#fffcf8' : 'white',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Col size={60} style={{justifyContent: 'center', paddingRight: 10}}>
            <View style={{flexDirection: 'column'}}>
              <View style={[SIPCStyles.ViewRowAlign]}>
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
                <Text style={SIPCStyles.SurfaceTitle} numberOfLines={1}>
                  {data.room_name}
                </Text>
              </View>
            </View>
          </Col>
          <Col size={10}></Col>
          <Col size={45}>
            <View style={{flexDirection: 'row', marginTop: 0}}>
              <Text style={[SIPCStyles.DescriptionHeading, {marginTop: 0}]}>
                Score :
              </Text>
              <Text style={[SIPCStyles.DescriptionDetails, {marginTop: 0}]}>
              {checkScore(SCORE)}
              </Text>
            </View>
          </Col>
        </View>
      </Surface>
      {Show == true ? (
        <>
          <Surface style={{backgroundColor: 'white'}}>
            <View style={{flexDirection: 'row', display: 'flex', padding: 15}}>
              <Text style={SIPCStyles.DescriptionHeading}>Floor :</Text>
              <Text style={SIPCStyles.DescriptionDetails}>{data.floor_name}</Text>
            </View>

            <Divider bold={true} />
            <View style={{flexDirection: 'row', display: 'flex', padding: 15}}>
              <Text style={SIPCStyles.DescriptionHeading}>Room Type :</Text>
              <Text style={SIPCStyles.DescriptionDetails}>{data.room_type}</Text>
            </View>
          </Surface>
        </>
      ) : null}
    </>
  );
};

export default ViewRoomBox;
