import React from 'react';
import {View, ActivityIndicator, Dimensions, Platform} from 'react-native';

const Loader = ({color}) => {

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,marginTop:'30%'
      }}>
      <ActivityIndicator
        style={{flex: 1, alignSelf: 'center'}}
        color={color || '#3a7fc4'}
        size={Platform.OS === 'ios' ? 'large' : 50}
      />
    </View>
  );
};

export default Loader;
