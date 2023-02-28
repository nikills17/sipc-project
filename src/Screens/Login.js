import { View, Text, Image, Dimensions, StatusBar, TextInput, } from 'react-native'
import React, { useState, useEffect, useRef, useContext } from 'react';
import SIPCStyles from './styles'
import { Button } from 'react-native-paper';
import API from '../utility/api';
import { responsiveScreenHeight, responsiveScreenWidth, responsiveScreenFontSize } from 'react-native-responsive-dimensions';
import { ScrollView } from 'react-native';
import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV();

const Login = ({ navigation }) => {

    const jsonUser = storage.getString('user');
    if(jsonUser!=null && jsonUser!=''){
        // navigation.navigate("Dashboard");
    }

    const Width = Dimensions.get('window').width;
    const Height = Dimensions.get('window').height;

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMessage] = useState();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const SignIn = () => {
        let payload = JSON.stringify({
            appKey: 'f9285c6c2d6a6b531ae1f70d2853f612',
            device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
            email: email,
            password: password,
        });
        API.instance
            .post(
                'http://sipcsurvey.devuri.com/sipcsurvey/login-service?is_api=true',
                payload,
            )
            .then(
                response => {
                    if (response.status == "success") {
                        storage.set('user', JSON.stringify(response.data))
                        navigation.navigate("Dashboard");
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
                    <Text style={{ textAlign: 'center', color: '#4284c6', fontSize: responsiveScreenFontSize(2.5), fontFamily: 'Poppins-Regular' }}>SignIn</Text>

                    <View style={{ flex: 1, backgroundColor: 'white', padding: 20 }}>

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

                        <Text style={{ fontSize: responsiveScreenFontSize(1.8), fontFamily: 'Poppins-Regular', marginHorizontal: 20, }}>Email</Text>
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

                        <Text style={{ fontSize: responsiveScreenFontSize(1.8), fontFamily: 'Poppins-Regular', marginHorizontal: 20, marginTop: 15 }}>Password</Text>
                        <View style={[SIPCStyles.container, { marginTop: 10, marginHorizontal: 20 }]}>

                            <Image
                                source={require('../assets/password.png')}
                                style={SIPCStyles.MainBuilding}
                            />

                            <TextInput
                                mode="text"
                                placeholder="Password"
                                placeholderTextColor={'black'}
                                underlineColor="transparent"
                                secureTextEntry={true}
                                theme={{ colors: { primary: '#cccccc' } }}
                                style={[SIPCStyles.LoginTextInput, { marginLeft: 10 }]}
                                onChangeText={value => setPassword(value)}
                            />
                        </View>





                        <View style={{ margin: 20, }}>
                            <Button onPress={() => SignIn()} style={{ backgroundColor: '#3a7fc4', borderRadius: 10 }} labelStyle={{ color: 'white' }}>
                                SignIn </Button>
                        </View>

                        <Text style={{ textAlign: 'center', color: '#4284c6', fontSize: responsiveScreenFontSize(1.8), fontFamily: 'Poppins-Regular' }} onPress={() => navigation.navigate('ForgetPassword')}>Forgot Password ?</Text>

                    </View>

                </View>










            </ScrollView>
        </View>
    )
}

export default Login