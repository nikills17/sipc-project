import { View, Text, Image, Dimensions, StatusBar, TextInput, } from 'react-native'
import React, { useState, useEffect, useRef, useContext } from 'react';
import SIPCStyles from './styles'
import { Button } from 'react-native-paper';
import { AuthContext } from './AuthContext';
import API from '../utility/api';
import { responsiveScreenHeight, responsiveScreenWidth, responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import { ScrollView } from 'react-native';



const ForgetPassword = ({navigation}) => {


    const Width = Dimensions.get('window').width;
    const Height = Dimensions.get('window').height;

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMessage] = useState('');

    const [email, setEmail] = useState('');


    const SendReset = () => {
        let payload = JSON.stringify({
            appKey: 'f9285c6c2d6a6b531ae1f70d2853f612',
            device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
            email: email,
        });
        API.instance
            .post(
                'http://sipcsurvey.devuri.com/sipcsurvey/forgot-password-api?is_api=true',
                payload,
            )
            .then(
                response => {
                    if (response.status == "success") {
                        navigation.navigate("ResetInstructions");
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
        <View style={{ flex: 2, backgroundColor: 'white' }}>
        <ScrollView>

                <View>
                    <StatusBar barStyle={'dark-content'} backgroundColor="white" />
                    <View style={{ flex: 1 }}>
                        <Image source={require('../assets/LoginImage.png')} style={{ height: Height / 3, width: Width / 1 }} />
                    </View>
                </View>

                <View style={{ backgroundColor: 'white', height: Height / 4, width: Width / 2.3, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', borderRadius: 100, bottom: 80 }}>
                    <Image source={require('../assets/SipcLogo.png')} style={{ height: Height / 5.3, width: Width / 3.3, }} />

                </View>
                <View style={{ bottom: 80 }}>
                    <Text style={{ textAlign: 'center', color: '#4284c6', fontSize: responsiveScreenFontSize(2.5), fontFamily: 'Poppins-Regular' }}>Forgot Password</Text>

                    {error && (
                            <View
                                style={{
                                    width: '100%',

                                }}>
                                <Text
                                    style={{
                                        color: 'red',
                                        fontFamily: 'Poppins-Medium', fontSize: responsiveScreenFontSize(1.8), marginHorizontal: 20
                                    }}>
                                    Error! {errorMsg}
                                </Text>
                            </View>
                        )}

                    <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>
                        <Text style={{ fontSize: responsiveScreenFontSize(1.8), fontFamily: 'Poppins-Regular', marginHorizontal: 20, }}>Email Address</Text>
                        <View style={[SIPCStyles.container, { marginTop: 10, marginHorizontal: 20 }]}>

                            <Image
                                source={require('../assets/email.png')}
                                style={SIPCStyles.MainBuilding}
                            />

                            <TextInput
                                mode="text"
                                placeholder="Email"
                                placeholderTextColor={'black'}
                                underlineColor="transparent"
                                theme={{ colors: { primary: '#cccccc' } }}
                                style={[SIPCStyles.LoginTextInput, { marginLeft: 10 }]}
                                onChangeText={value => setEmail(value)}
                            />
                        </View>
                    </View>
                    <View style={{ margin: 20, }}>
                            <Button onPress={() => SendReset()} style={{ backgroundColor: '#3a7fc4', borderRadius: 10 }} labelStyle={{ color: 'white' }}>
                                Send Reset Instructions </Button>
                        </View>

                        <Text style={{ textAlign: 'center', color: 'grey', fontSize: responsiveScreenFontSize(1.8), fontFamily: 'Poppins-Regular' }} >Remember Your Password<Text onPress={() => navigation.navigate('Login')} style={{ color: '#4284c6',}}> Log In ?</Text></Text>

                </View>
        </ScrollView>
            </View>
    )
}

export default ForgetPassword