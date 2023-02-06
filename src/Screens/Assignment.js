import {
    View, Alert, Image, TouchableOpacity, StatusBar, Platform,
    PermissionsAndroid,
    TouchableWithoutFeedback, Dimensions
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, Card, Searchbar, TextInput, Surface, Divider, Text, useWindowDimensions } from 'react-native-paper';
import Icon2 from 'react-native-vector-icons/Entypo';
import SIPCStyles from './styles';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import DropDownPicker from 'react-native-dropdown-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Assignment = ({ navigation }) => {
    const [Active, setActive] = useState(1)

    const Width = Dimensions.get('window').width;
    const Height = Dimensions.get('window').height;

    const deviceWidth = Dimensions.get('window').width;


    //  -----------------Work Order DropDown
    const [showDropDown1, setShowDropDown1] = useState(false);
    const [Group, setGroup] = useState('1');
    const [GroupList, setGroupList] = useState([
        {
            label: 'Name 5',
            value: '1',
        },
        {
            label: 'Name 4',
            value: '2',
        },
        {
            label: 'Name 3',
            value: '3',
        },
    ]);
    // ===========================================================
    const [showDropDown2, setShowDropDown2] = useState(false);
    const [Group2, setGroup2] = useState('1');
    const [GroupList2, setGroupList2] = useState([
        {

            label: 'RAHUL 5',
            value: '1',
        },
        {
            label: 'RAHUL 4',
            value: '2',

        },
        {
            label: 'RAHUL 3',
            value: '3',

        },
    ]);



    // ===========================================================
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setSelectedDate(date);
        hideDatePicker();
    };
    // ====================================================
    const [isDatePickerVisible1, setDatePickerVisibility1] = useState(false);
    const [selectedDate1, setSelectedDate1] = useState(null);

    const showDatePicker1 = () => {
        setDatePickerVisibility1(true);
    };

    const hideDatePicker1 = () => {
        setDatePickerVisibility1(false);
    };

    const handleConfirm1 = (date) => {
        setSelectedDate1(date);
        hideDatePicker1();
    };
    // ====================================================
    const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
    const [selectedDate2, setSelectedDate2] = useState(null);

    const showDatePicker2 = () => {
        setDatePickerVisibility2(true);
    };

    const hideDatePicker2 = () => {
        setDatePickerVisibility2(false);
    };

    const handleConfirm2 = (date) => {
        setSelectedDate2(date);
        hideDatePicker2();
    };


    return (
        <View style={[SIPCStyles.flex, { backgroundColor: '#f2f1f6' }]}>
            <StatusBar barStyle={"dark-content"} backgroundColor="#3a7fc4" />
            {/* ----------------------------------------------------------------------- */}
            <Surface style={{ backgroundColor: '#3a7fc4', padding: 15, alignItems: 'center' }}>
                <Text style={SIPCStyles.AddNewText}>Assignment</Text>
            </Surface>
            {/* =========================================== */}


            <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-around', }} >
                <Card elevation={0} style={{
                    paddingVertical: 15, paddingHorizontal: 20, backgroundColor: 'white', borderBottomWidth: Active == 1 ? 1 : 0, borderColor: Active == 1 ? '#1485cc' : 'transparent', width: Width / 2.2
                }} onPress={() => setActive(1)}>
                    <Text style={[SIPCStyles.NormalFont, { textAlign: 'center', color: Active == 1 ? '#1485cc' : '#525252' }]}>Assigned Staff</Text>
                </Card>

                <Card elevation={0} style={{ paddingVertical: 15, paddingHorizontal: 20, backgroundColor: 'white', borderBottomWidth: Active == 2 ? 1 : 0, borderColor: Active == 2 ? '#1485cc' : 'transparent', width: Width / 2.5 }} onPress={() => setActive(2)}>
                    <Text style={[SIPCStyles.NormalFont, { color: Active == 2 ? '#1485cc' : '#525252', textAlign: 'center' }]}>All Staff</Text>
                </Card>

                <Card elevation={0} style={{ paddingVertical: 15, paddingHorizontal: 20, backgroundColor: 'white', borderBottomWidth: Active == 3 ? 1 : 0, borderColor: Active == 3 ? '#1485cc' : 'transparent', width: Width / 2.2 }} onPress={() => setActive(3)}>
                    <Text style={[SIPCStyles.NormalFont, { color: Active == 3 ? '#1485cc' : '#525252', textAlign: 'center' }]}>Add New Staff</Text>
                </Card>
            </View>
            <Divider bold={true} />
            {/* ====================================== */}
            <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
                {Active == 1 ?
                    <>
                        <View style={{ margin: 20 }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={[SIPCStyles.NormalFont, { marginLeft: 10, marginTop: 10 }]}>Select Staff</Text>

                                <View style={{ zIndex: 10, marginTop: 10 }}>
                                    <DropDownPicker
                                        listMode="SCROLLVIEW"
                                        searchable={true}
                                        searchPlaceholder=""
                                        searchContainerStyle={{ backgroundColor: '#fffff6', borderColor: '#D2D2D2', }}
                                        searchTextInputStyle={{ borderColor: '#D2D2D2' }}
                                        itemSeparator={true}
                                        itemSeparatorStyle={{ backgroundColor: '#D2D2D2', marginVertical: 3, }}

                                        showArrowIcon={true}
                                        // showTickIcon={true}
                                        ArrowDownIconComponent={() => {
                                            return (
                                                <Entypo size={16} color={'#808080'} style={{ paddingHorizontal: 5 }} name="chevron-thin-down" />);
                                        }}
                                        ArrowUpIconComponent={() => {
                                            return (
                                                <Entypo size={16} color={'#808080'} style={{ paddingHorizontal: 5 }} name="chevron-thin-up" />);
                                        }}
                                        placeholder='Select Item'
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
                            </View>

                            <View style={{ flexDirection: 'column' }}>
                                <Text style={[SIPCStyles.NormalFont, { marginTop: 20, marginLeft: deviceWidth > 500 ? 25 :10, }]}>Estimated Effort (optional)</Text>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <View style={{ flexDirection: 'column', width: deviceWidth > 500 ? '48%' : '48%', }}>
                                        <TextInput
                                            mode="flat"
                                            //  label="Outlined inpu
                                            placeholder="Hours"
                                            placeholderTextColor={'black'}
                                            underlineColor="transparent"
                                            theme={{ colors: { primary: '#cccccc' } }}
                                            style={[SIPCStyles.TextInput, { height: Height / 14 }]}
                                        />
                                    </View>
                                    <View style={{ flexDirection: 'column', width: deviceWidth > 500 ? '48%' : '48%', }}>
                                        <TextInput
                                            mode="flat"
                                            //  label="Outlined input"
                                            placeholder="Minutes"
                                            placeholderTextColor={'black'}
                                            underlineColor="transparent"
                                            theme={{ colors: { primary: '#cccccc' } }}
                                            style={[SIPCStyles.TextInput, { height: Height / 14 }]}
                                        />
                                    </View>

                                </View>
                            </View>

                            <View style={{ flexDirection: 'column' }}>
                                <Text style={[SIPCStyles.NormalFont, { marginTop: 20, marginLeft: 10 }]}>Due Date*</Text>

                                <View style={SIPCStyles.container}>
                                    <TouchableOpacity onPress={showDatePicker}>
                                        <Image
                                            source={require('../assets/cal.png')}
                                            style={SIPCStyles.MainBuilding}
                                        />
                                    </TouchableOpacity>

                                    <TextInput
                                        style={SIPCStyles.textInputs}
                                        value={selectedDate ? selectedDate.toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        }) : ''}
                                        editable={false}
                                        underlineColor="transparent"
                                        theme={{ colors: { primary: '#cccccc' } }}
                                    />
                                </View>
                            </View>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleConfirm}
                                onCancel={hideDatePicker}
                            />
                        </View>
                    </>
                    : null}
                {/* ========================ACTIVE 2 ALL STAFF */}

                {Active == 2 ?
                    <>
                        <View style={{ margin: 20 }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={[SIPCStyles.NormalFont, { marginLeft: 10, marginTop: 10 }]}>Select Staff</Text>

                                <View style={{ zIndex: 10, marginTop: 10 }}>
                                    <DropDownPicker
                                        listMode="SCROLLVIEW"
                                        searchable={true}
                                        searchPlaceholder=""
                                        searchContainerStyle={{ backgroundColor: '#fffff6', borderColor: '#D2D2D2', }}
                                        searchTextInputStyle={{ borderColor: '#D2D2D2' }}
                                        itemSeparator={true}
                                        itemSeparatorStyle={{ backgroundColor: '#D2D2D2', marginVertical: 3, }}

                                        showArrowIcon={true}
                                        // showTickIcon={true}
                                        ArrowDownIconComponent={() => {
                                            return (
                                                <Entypo size={16} color={'#808080'} style={{ paddingHorizontal: 5 }} name="chevron-thin-down" />);
                                        }}
                                        ArrowUpIconComponent={() => {
                                            return (
                                                <Entypo size={16} color={'#808080'} style={{ paddingHorizontal: 5 }} name="chevron-thin-up" />);
                                        }}
                                        placeholder='Select Staff'
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
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={[SIPCStyles.NormalFont, { marginTop: 20, marginLeft: deviceWidth > 500 ? 25 :10, }]}>Estimated Effort (optional)</Text>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                    <View style={{ flexDirection: 'column', width: deviceWidth > 500 ? '48%' : '48%', }}>
                                        <TextInput
                                            mode="flat"
                                            //  label="Outlined inpu
                                            placeholder="Hours"
                                            placeholderTextColor={'black'}
                                            underlineColor="transparent"
                                            theme={{ colors: { primary: '#cccccc' } }}
                                            style={[SIPCStyles.TextInput, { height: Height / 14 }]}
                                        />
                                    </View>
                                    <View style={{ flexDirection: 'column', width: deviceWidth > 500 ? '48%' : '48%', }}>
                                        <TextInput
                                            mode="flat"
                                            //  label="Outlined input"
                                            placeholder="Minutes"
                                            placeholderTextColor={'black'}
                                            underlineColor="transparent"
                                            theme={{ colors: { primary: '#cccccc' } }}
                                            style={[SIPCStyles.TextInput, { height: Height / 14 }]}
                                        />
                                    </View>

                                </View>
                            </View>


                            <View style={{ flexDirection: 'column' }}>
                                <Text style={[SIPCStyles.NormalFont, { marginTop: 20, marginLeft: 10 }]}>Due Date*</Text>

                                <View style={SIPCStyles.container}>
                                    <TouchableOpacity onPress={showDatePicker1}>
                                        <Image
                                            source={require('../assets/cal.png')}
                                            style={SIPCStyles.MainBuilding}
                                        />
                                    </TouchableOpacity>

                                    <TextInput
                                        style={SIPCStyles.textInputs}
                                        value={selectedDate1 ? selectedDate1.toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        }) : ''}
                                        editable={false}
                                        underlineColor="transparent"
                                        theme={{ colors: { primary: '#cccccc' } }}
                                    />
                                </View>
                            </View>
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible1}
                                mode="date"
                                onConfirm={handleConfirm1}
                                onCancel={hideDatePicker1}
                            />
                        </View>
                    </>
                    : null}
                {/* ====================ACTIVE == 3  ADD NEW STAFF================ */}
                {Active == 3 ?
                    <>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around', flexWrap: 'wrap',
                        }}>

                            <View style={{ flexDirection: 'column', width: deviceWidth > 500 ? '45%' : '90%', }}>
                                <Text style={[SIPCStyles.NormalFont, { marginTop: 20, marginLeft: 5 }]}>First Name*</Text>
                                <TextInput
                                    mode="flat"
                                    placeholder="First Name"
                                    placeholderTextColor={'black'}
                                    underlineColor="transparent"
                                    theme={{ colors: { primary: '#cccccc' } }}
                                    style={SIPCStyles.AssignmentTextInput}
                                />
                            </View>

                            <View style={{ flexDirection: 'column', width: deviceWidth > 500 ? '45%' : '90%', }}>
                                <Text style={[SIPCStyles.NormalFont, { marginTop: 20, marginLeft: 5 }]}>Last Name*</Text>
                                <TextInput
                                    mode="flat"
                                    placeholder="Last Name"
                                    placeholderTextColor={'black'}
                                    underlineColor="transparent"
                                    theme={{ colors: { primary: '#cccccc' } }}
                                    style={SIPCStyles.AssignmentTextInput}
                                />
                            </View>

                            <View style={{ flexDirection: 'column', width: deviceWidth > 500 ? '45%' : '90%', }}>
                                <Text style={[SIPCStyles.NormalFont, { marginTop: 20, marginLeft: 5 }]}>Email (Optional)*</Text>
                                <TextInput
                                    mode="flat"
                                    placeholder="Email Address"
                                    placeholderTextColor={'black'}
                                    underlineColor="transparent"
                                    theme={{ colors: { primary: '#cccccc' } }}
                                    style={SIPCStyles.AssignmentTextInput}
                                />
                            </View>

                            <View style={{ flexDirection: 'column', width: deviceWidth > 500 ? '45%' : '90%', }}>
                                <Text style={[SIPCStyles.NormalFont, { marginTop: 20, marginLeft: 5 }]}>Title(Optional)*</Text>
                                <TextInput
                                    mode="flat"
                                    placeholder="Title"
                                    placeholderTextColor={'black'}
                                    underlineColor="transparent"
                                    theme={{ colors: { primary: '#cccccc' } }}
                                    style={SIPCStyles.AssignmentTextInput}
                                />
                            </View>
                        </View>



                        <View style={{ flexDirection: 'column' }}>
                            <Text style={[SIPCStyles.NormalFont, { marginTop: 20, marginLeft: 25 }]}>Estimated Effort (optional)</Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <View style={{ flexDirection: 'column', width: deviceWidth > 500 ? '45%' : '38%', }}>
                                    <TextInput
                                        mode="flat"
                                        //  label="Outlined inpu
                                        placeholder="Hours"
                                        placeholderTextColor={'black'}
                                        underlineColor="transparent"
                                        theme={{ colors: { primary: '#cccccc' } }}
                                        style={[SIPCStyles.TextInput, { height: Height / 14 }]}
                                    />
                                </View>
                                <View style={{ flexDirection: 'column', width: deviceWidth > 500 ? '45%' : '38%', }}>
                                    <TextInput
                                        mode="flat"
                                        //  label="Outlined input"
                                        placeholder="Minutes"
                                        placeholderTextColor={'black'}
                                        underlineColor="transparent"
                                        theme={{ colors: { primary: '#cccccc' } }}
                                        style={[SIPCStyles.TextInput, { height: Height / 14 }]}
                                    />
                                </View>

                            </View>
                        </View>




                        <View style={{ flexDirection: 'column' }}>
                            <Text style={[SIPCStyles.NormalFont, { marginTop: 20, marginLeft: 30 }]}>Due Date*</Text>

                            <View style={SIPCStyles.AddNEwStaffContainer}>
                                <TouchableOpacity onPress={showDatePicker2}>
                                    <Image
                                        source={require('../assets/cal.png')}
                                        style={SIPCStyles.MainBuilding}
                                    />
                                </TouchableOpacity>

                                <TextInput
                                    style={SIPCStyles.textInputs}
                                    value={selectedDate2 ? selectedDate2.toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    }) : ''}
                                    editable={false}
                                    underlineColor="transparent"
                                    theme={{ colors: { primary: '#cccccc' } }}
                                />
                            </View>
                        </View>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible2}
                            mode="date"
                            onConfirm={handleConfirm2}
                            onCancel={hideDatePicker2}
                        />
                    </>
                    : null}
            </ScrollView>
            <Card style={{ marginTop: 15, backgroundColor: 'white', borderRadius: 0 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >

                    <TouchableWithoutFeedback onPress={() => navigation.navigate('WorkOrders')} style={{}}>
                        <Text style={[SIPCStyles.NormalFont, { padding: 15 }]}>Cancel</Text>
                    </TouchableWithoutFeedback>

                    <View style={{ borderWidth: 1, borderColor: '#e6e6e6' }} />

                    <TouchableWithoutFeedback onPress={() => navigation.navigate('WorkOrders')} style={{}}>
                        <Text style={[SIPCStyles.NormalFont, { color: '#199be2', padding: 15 }]}>Save</Text>
                    </TouchableWithoutFeedback>

                </View>
            </Card>


            {/* =========================================== */}
        </View>
    )
}

export default Assignment