import { View, Text, Image, Dimensions, StatusBar, TextInput, } from 'react-native'
import React, { useState, useEffect, useRef, useContext } from 'react';
import SIPCStyles from './styles'
import { Button } from 'react-native-paper';
import { AuthContext } from './AuthContext';
import API from '../utility/api';
import { responsiveScreenHeight, responsiveScreenWidth, responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import { ScrollView } from 'react-native';

const ResetInstructions = ({ navigation }) => {

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

return (
<View style={{ flex: 2, backgroundColor: 'white' }}>
<ScrollView>

<View>
<StatusBar barStyle={'dark-content'} backgroundColor="white" />
<View style={{ flex: 1 }}>
<Image source={require('../assets/LoginImage.png')} style={{ height: Height / 3, width: Width / 1 }} />
</View>
</View>

<View style={{ backgroundColor: 'white', height: Height / 4, width: Width / 2.3, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 100, bottom: '10%' }}>
<Image source={require('../assets/SipcLogo.png')} style={{ height: Height / 5.3, width: Width / 3.3,resizeMode:'contain' }} />

</View>
<View style={{ bottom: '10%' }}>
<Text style={{ textAlign: 'center', color: '#4284c6', fontSize: responsiveScreenFontSize(2.5), fontFamily: 'Poppins-Regular' }}>Reset Instruction</Text>


<View style={{ padding: 20, flex: 1, }}>
<Text style={{ textAlign: 'center', fontSize: responsiveScreenFontSize(1.7), fontFamily: 'Poppins-Regular' }}>For your security, an email has been sent to the
address associated with this account. Please check
your email for further instructions.
</Text>

<Text style={{ textAlign: 'center', fontSize: responsiveScreenFontSize(1.7), fontFamily: 'Poppins-Regular', marginTop: 10 }}> Please be sure to check your junk/spam folder in
case you do not receive an email from us. If you still
cannot find the email then please contact us by
writing to <Text style={{ color: '#4284c6',}}>support@sipc.com</Text>
</Text>
</View>


<View style={{ margin: 20, }}>
<Button onPress={() => navigation.navigate('Login')} style={{ backgroundColor: '#3a7fc4', borderRadius: 10 }} labelStyle={{ color: 'white' }}>
Login</Button>
</View>
</View>

</ScrollView>
</View>
)
}

export default ResetInstructions