import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

import {MMKV} from 'react-native-mmkv';

import {CONFIG} from '../utility/config';

export const storage = new MMKV();

const Dashboard = ({navigation}) => {
  const jsonUser = storage.getString('user');
  const user = JSON.parse(jsonUser);

  return (
    <View>
      <Text>Dashboard</Text>
      {CONFIG.env !== 'Production' && (
        <TouchableOpacity
          onPress={() => navigation.navigate('NetworkDebugger')}>
          <Text>Open Network Logs</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Dashboard;
