import React, { useState, useEffect } from 'react'
import { View,StatusBar,ScrollView } from 'react-native';
import { Button, Card, Searchbar, TextInput, Surface, Divider, Text, } from 'react-native-paper';
import Icon2 from 'react-native-vector-icons/Entypo';
import SIPCStyles from './styles';
import ViewRoomBox from '../component/viewroombox';


const InspectionViewRoom = () => {
    return (
        <View style={SIPCStyles.flex}>
            <StatusBar barStyle={"dark-content"} backgroundColor="#3a7fc4" />
            <ScrollView nestedScrollEnabled={true}>
                {/* ----------------------------------------------------------------------- */}
                <Surface style={{ backgroundColor: '#3a7fc4', padding: 15, alignItems: 'center' }}>
                    <Text style={SIPCStyles.AddNewText}>SIPC High School</Text>
                </Surface>



                <ViewRoomBox />

            </ScrollView>
        </View>
    )
}

export default InspectionViewRoom