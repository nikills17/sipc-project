import React from 'react';
import {View, ActivityIndicator, Dimensions, Platform} from 'react-native';

const Loader = ({color, bgColor}) => {
  const {height, width} = Dimensions.get('screen');

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        zIndex: 100,
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
