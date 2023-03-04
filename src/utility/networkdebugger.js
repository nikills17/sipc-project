import React from 'react';
import {Platform, StyleSheet, TouchableHighlight, View} from 'react-native';
import NetworkLogger from 'react-native-network-logger';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

const NetworkDebugger = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      {Platform.OS === 'ios' && (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => navigation.goBack()}
          style={styles.header}>
          <View style={[styles.iconCircle, styles.shadowProp]}>
            <Icon name="chevron-back-outline" color={'#2d6cdf'} size={30} />
          </View>
        </TouchableHighlight>
      )}
      <NetworkLogger />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '3%',
    padding: 10,
  },
  shadowProp: {
    ...Platform.select({
      android: {
        elevation: 10,
      },
      ios: {
        shadowColor: '#AAAAAA',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
    }),
  },
  iconCircle: {
    borderRadius: 30,
    padding: 5,
    backgroundColor: '#FFFFFF',
  },
});

export default NetworkDebugger;
