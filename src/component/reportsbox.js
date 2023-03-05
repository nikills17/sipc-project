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

const ReportBox = () => {
  const [Show, setShow] = useState(false);



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
                <Text style={SIPCStyles.SurfaceTitle}>Title</Text>
              </View>

              <View style={SIPCStyles.healthImageView}>
                <Image
                  source={require('../assets/building.png')}
                  style={SIPCStyles.healthImage}
                />
                <Text style={SIPCStyles.SurfaceType}>Type</Text>
              </View>
            </View>
          
      </Surface>


    {/* ===================================================== */}
    </View>
  )
}

export default ReportBox