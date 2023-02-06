import { View, Platform, StyleSheet, StatusBar, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Text } from 'react-native-paper'
import { useGetData, getData } from './ReactApiData'
import { useQuery } from "react-query";
import axios from "axios"


const Dashboard = () => {

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);


  const getDataUsingSimpleGetCall = () => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((json) => setData(json.data))
      .finally(() => setLoading(false));
  };

  const renderItem = (itemData) => {
    return (
      <View style={styles.containerFlate}>
        <View style={{ borderWidth: 1, margin: 5, padding: 5 }}>
          <Text style={{ fontSize: 18, color: "red" }}>Id : {itemData.item.id}</Text>
          <Text style={styles.title}>Name : {itemData.item.name}</Text>
          <Text style={styles.title}>Email : {itemData.item.email}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar barStyle={"dark-content"} backgroundColor="white" />

      {isLoading &&

        <TouchableOpacity onPress={getDataUsingSimpleGetCall}>
          <Text style={styles.font}>Dashboard</Text>
        </TouchableOpacity>

      }
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

    </View>

  )
}

const styles = StyleSheet.create({

  font: {
    fontSize: Platform.OS == 'ios' ? 20 : 20, ntSize: 30, color: '#3a7fc4',
  }
});

export default Dashboard