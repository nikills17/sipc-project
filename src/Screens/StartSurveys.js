import { View, Alert, Image, TouchableOpacity, StatusBar, Platform, PermissionsAndroid, TouchableWithoutFeedback, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, Card, Searchbar, TextInput, Surface, Divider, Text, } from 'react-native-paper';
import Icon2 from 'react-native-vector-icons/Entypo';
import SIPCStyles from './styles';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import DropDownPicker from 'react-native-dropdown-picker';
import { ScrollView } from 'react-native-gesture-handler';




const StartSurveys = ({navigation}) => {


    const [showDropDown1, setShowDropDown1] = useState(false);
    const [Group, setGroup] = useState();
    const [GroupList, setGroupList] = useState([
        {
            label: 'SIPC',
            value: '0',
        },
        {
            label: '- Township High School District 214',
            value: '1',

        },
        {
            label: '- Prospect High School',
            value: '2',

        },

    ]);
    {/* ============================SELECT Floor ============================= */ }
    const [showDropDown2, setShowDropDown2] = useState(false);
    const [Group2, setGroup2] = useState();
    const [GroupList2, setGroupList2] = useState([
        {

            label: 'Carbondale High School',
            value: '0',
        },
        {
            label: 'SIPC Test Elementary Building',
            value: '1',

        },
        {
            label: 'SIPC High School',
            value: '2',

        },
    ]);


    return (

        <View style={SIPCStyles.flex}>
            <StatusBar barStyle={"dark-content"} backgroundColor="#3a7fc4" />
            <ScrollView>
                {/* ----------------------------------------------------------------------- */}
                <Surface style={{ backgroundColor: '#3a7fc4', padding: 15, alignItems: 'center' }}>
                    <Text style={SIPCStyles.AddNewText}>Start Survey</Text>
                </Surface>


                {/* ============================SELECT ITEM============================= */}

                <View style={{ marginHorizontal: 20, marginVertical: 15, zIndex: 10 }}>
                    <DropDownPicker
                        listMode="SCROLLVIEW"
                        searchable={true}
                        searchPlaceholder=""
                        searchContainerStyle={{ backgroundColor: '#fffff6' }}
                        itemSeparator={true}
                        itemSeparatorStyle={{ backgroundColor: '#D2D2D2', marginVertical: 10, }}
                        showArrowIcon={true}
                        // showTickIcon={false}
                        ArrowDownIconComponent={() => {
                            return (
                                <Entypo size={16} color={'#808080'} style={{ paddingHorizontal: 5 }} name="chevron-thin-down" />);
                        }}
                        ArrowUpIconComponent={() => {
                            return (
                                <Entypo size={16} color={'#808080'} style={{ paddingHorizontal: 5 }} name="chevron-thin-up" />);
                        }}
                        placeholder='Select Organization'
                        placeholderStyle={SIPCStyles.placeholderStyle}
                        style={SIPCStyles.DropDownPicker1}
                        textStyle={SIPCStyles.textSize}
                        dropDownContainerStyle={SIPCStyles.dropDownContainerStyle1}
                        labelStyle={[SIPCStyles.NormalFont, { paddingHorizontal: 5 }]}
                        open={showDropDown1}
                        value={Group}
                        items={GroupList}
                        setOpen={setShowDropDown1}
                        setValue={setGroup}
                        setItems={setGroupList}
                    />
                </View>

                {/* ============================SELECT ISSUE============================= */}
                <View style={{ marginHorizontal: 20, marginVertical: 15, zIndex: 9 }}>
                    <DropDownPicker
                        listMode="SCROLLVIEW"
                        searchable={true}
                        searchPlaceholder=""
                        searchContainerStyle={{ backgroundColor: '#fffff6' }}
                        itemSeparator={true}
                        itemSeparatorStyle={{ backgroundColor: '#D2D2D2', marginVertical: 10, }}
                        showArrowIcon={true}
                        // showTickIcon={false}
                        ArrowDownIconComponent={() => {
                            return (
                                <Entypo size={16} color={'#808080'} style={{ paddingHorizontal: 5 }} name="chevron-thin-down" />);
                        }}
                        ArrowUpIconComponent={() => {
                            return (
                                <Entypo size={16} color={'#808080'} style={{ paddingHorizontal: 5 }} name="chevron-thin-up" />);
                        }}
                        placeholder='Building'
                        placeholderStyle={SIPCStyles.placeholderStyle}
                        style={SIPCStyles.DropDownPicker1}
                        textStyle={SIPCStyles.textSize}
                        dropDownContainerStyle={SIPCStyles.dropDownContainerStyle1}
                        labelStyle={[SIPCStyles.NormalFont, { paddingHorizontal: 5 }]}
                        open={showDropDown2}
                        value={Group2}
                        items={GroupList2}
                        setOpen={setShowDropDown2}
                        setValue={setGroup2}
                        setItems={setGroupList2}
                    />
                </View>
            </ScrollView>
            {/* =================================================================== */}
            <Card style={{ marginTop: 15, backgroundColor: 'white', borderRadius: 0, bottom: 0, position: 'absolute', width: '100%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >

                    <TouchableWithoutFeedback  style={{}} onPress={() => {navigation.navigate('Surveys')}}>
                        <Text style={[SIPCStyles.NormalFont, { padding: 15 }]}>Cancel</Text>
                    </TouchableWithoutFeedback>

                    <View style={{ borderWidth: 1, borderColor: '#e6e6e6' }} />

                    <TouchableWithoutFeedback  style={{}} onPress={() => {navigation.navigate('SaveSurvey')}}>
                        <Text style={[SIPCStyles.NormalFont, { color: '#199be2', padding: 15 }]}>Start</Text>
                    </TouchableWithoutFeedback>

                </View>
            </Card>
        </View>
    )
}

export default StartSurveys