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


const ReportBox = ({ data, Active }) => {


  const [Show, setShow] = useState(false);

  const startDate = new Date(data.survey_create_date);
  const endDate = new Date(data.last_updated);
  const formattedStartDate = startDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const formattedEndDate = endDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });



  return (
    <View>
      {/* ===================================================== */}

      <Surface
        style={{
          marginTop: 20,
          padding: 15,
          backgroundColor: Show == true ? '#fffcf8' : 'white',
        }}>

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
            <Text style={[SIPCStyles.SurfaceTitle, { flex: 1 }]}>{data.survey_name}</Text>
          </View>

          <View style={SIPCStyles.healthImageView}>
            <Image
              source={require('../assets/ii.png')}
              style={SIPCStyles.healthImage}
            />
            <Text style={[SIPCStyles.SurfaceType, { flex: 1 }]}>{data.survey_type}</Text>
          </View>
        </View>

      </Surface>

      {Show === true ?
        <>
          <Surface style={{ backgroundColor: 'white', padding: 15, }}>
            <View style={{ flexDirection: 'row', }}>
              <Image
                source={require('../assets/building.png')}
                style={SIPCStyles.healthImage}
              />
              <Text style={SIPCStyles.SurfaceType}>{data.building_name}</Text>
            </View>
          </Surface>

          <Surface style={{ backgroundColor: 'white', padding: 15 }}>
            <View style={{ flexDirection: 'row', }}>

              <Image
                source={require('../assets/Bank.png')}
                style={SIPCStyles.healthImage}
              />
              <Text style={SIPCStyles.SurfaceType}>{data.organization_name}</Text>
            </View>
          </Surface>


          <Surface style={{ backgroundColor: 'white', padding: 15 }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>
                  Survey Score:
                </Text>
                <Text style={SIPCStyles.ValueFont}>{data.received_score}</Text>
                {/* <Text style={[SIPCStyles.ValueFont,
                  data.received_score > 90 ? SIPCStyles.textSuccess :
                  data.received_score > 80 ? SIPCStyles.textWarning :
                     SIPCStyles.textDanger]}>{data.received_score}%</Text> */}
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>
                  Total Score:
                </Text>
                <Text style={SIPCStyles.ValueFont}>{data.total_score}</Text>
              </View>
            </View>
          </Surface>

          <Surface style={{ backgroundColor: 'white', padding: 15 }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>
                  Created:
                </Text>
                <Text style={SIPCStyles.ValueFont}>{formattedStartDate}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>
                  Submitted:
                </Text>
                <Text style={SIPCStyles.ValueFont}>{formattedEndDate}</Text>
              </View>
            </View>
          </Surface>

        </>
        : null}


      {/* ===================================================== */}
    </View>
  )
}

export default ReportBox