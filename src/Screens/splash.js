import React, {useEffect} from 'react';
import {View, StatusBar, StyleSheet, Image} from 'react-native';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

const SplashScreen = ({navigation}) => {
  const jsonUser = storage.getString('user');
  const timeoutHelper = action => {
    const timer = setTimeout(() => {
      action();
    }, 1500);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    timeoutHelper(() => {
      if (jsonUser === undefined || jsonUser === null || jsonUser === '') {
        navigation.replace('Login');
      } else {
        navigation.replace('Dashboard');
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/SipcLogo.png')}
        style={{height: 200, width: 200}}
        resizeMode={'contain'}
      />
      <StatusBar backgroundColor={'#FFFFFF'} barStyle="default" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
});

export default SplashScreen;
