import {StyleSheet, TouchableWithoutFeedback, View, Image} from 'react-native';
import React, {useState} from 'react';
import {Surface, Divider, Text} from 'react-native-paper';
import {Col, Grid} from 'react-native-easy-grid';
import SIPCStyles from '../screens/styles';

const SurveyViewAllBox = ({data, navigation, Active}) => {
  const [Show, setShow] = useState(false);
  const [PendingShow, setPendingShow] = useState(false);

  return (
    <>
      {/*-------------------------COMPLETED---------------------------  */}
      {Active === 1 ? (
        <>
          <Surface
            style={{
              padding: 15,
              marginTop: 20,
              backgroundColor: Show == true ? '#fffcf8' : 'white',
            }}>
            <Grid>
              <Col
                size={68}
                style={{justifyContent: 'center', paddingRight: 10}}>
                <View style={{flexDirection: 'column'}}>
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
                    <Text style={SIPCStyles.SurfaceTitle}>
                      {data.survey_name}
                    </Text>
                  </View>
                  <View style={SIPCStyles.healthImageView}>
                    <Image
                      source={require('../assets/building.png')}
                      style={SIPCStyles.healthImage}
                    />
                    <Text style={SIPCStyles.SurfaceType}>
                      {data.building_name}
                    </Text>
                  </View>
                </View>
              </Col>

              <Col size={30} style={{}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <View style={{flexDirection: 'column'}}>
                    <TouchableWithoutFeedback>
                      <Image
                        source={require('../assets/eye.png')}
                        style={SIPCStyles.playImage}
                      />
                    </TouchableWithoutFeedback>
                    <Text style={SIPCStyles.SurfacePlayImageText}>View</Text>
                  </View>

                  <View style={{flexDirection: 'column'}}>
                    <TouchableWithoutFeedback>
                      <Image
                        source={require('../assets/print.png')}
                        style={SIPCStyles.playImage}
                      />
                    </TouchableWithoutFeedback>
                    <Text style={SIPCStyles.SurfacePlayImageText}>
                      {' '}
                      Download
                    </Text>
                  </View>
                </View>
              </Col>
            </Grid>
          </Surface>
          <Divider bold={true} />

          {Show == true ? (
            <>
              <Surface style={{backgroundColor: 'white'}}>
                {/* ================ */}
                <View style={{flexDirection: 'row', padding: 15}}>
                  <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                    ORGANIZATION:
                  </Text>
                  <Text style={[SIPCStyles.ValueFont, {flex: 1}]}>
                    {data.organization_name}
                  </Text>
                </View>
                <Divider bold={true} />
                {/* ============ */}
                <View style={{flexDirection: 'row', padding: 15}}>
                  <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                    Survey Created:
                  </Text>
                  <Text style={SIPCStyles.ValueFont}>
                    {' '}
                    {data.survey_create_date}
                  </Text>
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{flexDirection: 'row', padding: 15}}>
                  <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                    Survey Submitted:
                  </Text>
                  <Text style={SIPCStyles.ValueFont}>{data.last_updated}</Text>
                </View>
                <Divider bold={true} />

                {/* ================ */}
                <View style={{flexDirection: 'row', padding: 15}}>
                  <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                    COMPLETED BY:
                  </Text>
                  <Text style={SIPCStyles.ValueFont}>
                    {data.first_name} {data.last_name}
                  </Text>
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{flexDirection: 'row', padding: 15}}>
                  <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                    TOTAL SCORE:
                  </Text>
                  <Text style={SIPCStyles.ValueFont}>{data.total_score}</Text>
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{flexDirection: 'row', padding: 15}}>
                  <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                    SURVEY SCORE:
                  </Text>
                  <Text style={SIPCStyles.ValueFont}>
                    {data.received_score}
                  </Text>
                </View>
                <Divider bold={true} />
              </Surface>
            </>
          ) : null}
        </>
      ) : (
        //-----------------------------------PENDING--------------------------
        <>
          <Surface
            style={{
              padding: 15,
              marginTop: 20,
              backgroundColor: PendingShow == true ? '#fffcf8' : 'white',
            }}>
            <Grid>
              <Col
                size={68}
                style={{justifyContent: 'center', paddingRight: 10}}>
                <View style={{flexDirection: 'column'}}>
                  <View style={SIPCStyles.ViewRowAlign}>
                    <TouchableWithoutFeedback
                      onPress={() => {
                        setPendingShow(!PendingShow);
                      }}>
                      {PendingShow == true ? (
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
                    <Text style={SIPCStyles.SurfaceTitle}>
                      {data.survey_name}
                    </Text>
                  </View>

                  <View style={SIPCStyles.healthImageView}>
                    <Image
                      source={require('../assets/building.png')}
                      style={SIPCStyles.healthImage}
                    />
                    <Text style={SIPCStyles.SurfaceType}>
                      {data.building_name}
                    </Text>
                  </View>
                </View>
              </Col>

              <Col size={30} style={{}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <View style={{flexDirection: 'column'}}>
                    <TouchableWithoutFeedback>
                      <Image
                        source={require('../assets/continue.png')}
                        style={SIPCStyles.playImage}
                      />
                    </TouchableWithoutFeedback>
                    <Text style={SIPCStyles.SurfacePlayImageText}>
                      Continue
                    </Text>
                  </View>

                  <View style={{flexDirection: 'column'}}>
                    <TouchableWithoutFeedback>
                      <Image
                        source={require('../assets/delete.png')}
                        style={SIPCStyles.playImage}
                      />
                    </TouchableWithoutFeedback>
                    <Text style={SIPCStyles.SurfacePlayImageText}> Delete</Text>
                  </View>
                </View>
              </Col>
            </Grid>
          </Surface>
          <Divider bold={true} />

          {PendingShow == true ? (
            <>
              <Surface style={{backgroundColor: 'white'}}>
                <View style={{flexDirection: 'row', padding: 15}}>
                  <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                    ORGANIZATION:
                  </Text>
                  <Text style={[SIPCStyles.ValueFont, {flex: 1}]}>
                    {data.organization_name}
                  </Text>
                </View>
                <Divider bold={true} />

                <View style={{flexDirection: 'row', padding: 15}}>
                  <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                    Survey Created:
                  </Text>
                  <Text style={SIPCStyles.ValueFont}>
                    {' '}
                    {data.survey_create_date}
                  </Text>
                </View>
                <Divider bold={true} />
              </Surface>
            </>
          ) : null}
        </>
      )}

      {/* --------------------------END------------------------------------------- */}
    </>
  );
};

export default SurveyViewAllBox;

{
  /*  */
}
