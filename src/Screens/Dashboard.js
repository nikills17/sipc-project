import { View, Text } from 'react-native'
import React from 'react';

import { MMKV } from 'react-native-mmkv'
export const storage = new MMKV();


const Dashboard = ({ navigation }) => {
 
  const jsonUser = storage.getString('user');
  const user = JSON.parse(jsonUser);

  return (
    <View>
      <Text>Dashboard</Text>
    </View>
  )
}

export default Dashboard