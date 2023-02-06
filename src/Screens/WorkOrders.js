import { View, Alert, Image, ScrollView, TouchableWithoutFeedback, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, Card, Searchbar, TextInput, Surface, Divider, Text, } from 'react-native-paper';
import Icon2 from 'react-native-vector-icons/Entypo';
import SIPCStyles from './styles';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';

const WorkOrders = ({ navigation }) => {

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const [Tab, setTab] = useState(1);
  const [Active, setActive] = useState(0);
  const [Progress, setProgress] = useState(0);
  const [Complete, setComplete] = useState(0);

  const switch_tab = (x) => {
    if (x == Active) {
      setActive(0);
    } else {
      setActive(x);
    }
  };

  const switch_pro = (x) => {
    if (x == Progress) {
      setProgress(0);
    } else {
      setProgress(x);
    }
  };
  const switch_com = (x) => {
    if (x == Complete) {
      setComplete(0);
    } else {
      setComplete(x);
    }
  };

  //  -----------------Work Order DropDown
  const [showDropDown1, setShowDropDown1] = useState(false);
  const [Group, setGroup] = useState('1');
  const [GroupList, setGroupList] = useState([
    {

      label: 'UNASSIGNED',
      value: '1',
    },
    {
      label: 'IN-PROGRESS',
      value: '2',

    },
    {
      label: 'COMPLETED',
      value: '3',

    },
  ]);
  //  -----------------InProgress DropDown
  const [showDropDown2, setShowDropDown2] = useState(false);
  const [Group2, setGroup2] = useState('1');
  const [GroupList2, setGroupList2] = useState([
    {

      label: 'IN-PROGRESS',
      value: '1',
    },
    {
      label: 'UNASSIGNED',
      value: '2',

    },
    {
      label: 'COMPLETED',
      value: '3',

    },
  ]);
  //  -----------------Completed DropDown
  const [showDropDown3, setShowDropDown3] = useState(false);
  const [Group3, setGroup3] = useState('1');
  const [GroupList3, setGroupList3] = useState([
    {

      label: 'COMPLETED',
      value: '1',
    },
    {
      label: 'UNASSIGNED',
      value: '2',

    },
    {
      label: 'IN-PROGRESS',
      value: '3',

    },
  ]);




  return (
    <View style={SIPCStyles.flex}>
      <StatusBar barStyle={"dark-content"} backgroundColor="white" />
      <ScrollView>
        {/* ====================================== */}
        <Surface style={SIPCStyles.headerSurface}>
          <Image source={require('../assets/man.png')}
            style={SIPCStyles.headerManImage}
          />

          <Searchbar
            placeholder="Search Work Orders"
            placeholderTextColor="grey"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={SIPCStyles.searchBar}
            icon={() => <SimpleLineIcons name="magnifier" size={19} style={{ color: 'grey', }} />}
          />
          <TouchableWithoutFeedback onPress={() => navigation.navigate('AddWorkOrders')}>
            <Image
              source={require('../assets/plusScreen.png')}
              style={SIPCStyles.headerManImage} />
          </TouchableWithoutFeedback>
        </Surface>
        <Divider bold={true} />
        {/* --------------------------TABS---------------------------- */}
        <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-around', }} >
          <Card elevation={0} style={{
            paddingVertical: 15,
            paddingHorizontal: 20, backgroundColor: 'white', borderBottomWidth: Tab == 1 ? 1 : 0, borderColor: Tab == 1 ? '#1485cc' : 'transparent'
          }} onPress={() => setTab(1)}>
            <Text style={[SIPCStyles.NormalFont, { color: Tab == 1 ? '#1485cc' : '#525252' }]}>Work Orders</Text>
          </Card>

          <Card elevation={0} style={{ paddingVertical: 15, paddingHorizontal: 20, backgroundColor: 'white', borderBottomWidth: Tab == 2 ? 1 : 0, borderColor: Tab == 2 ? '#1485cc' : 'transparent' }} onPress={() => setTab(2)}>
            <Text style={[SIPCStyles.NormalFont, { color: Tab == 2 ? '#1485cc' : '#525252' }]}>In Progress</Text>
          </Card>

          <Card elevation={0} style={{ paddingHorizontal: 20, paddingVertical: 15, backgroundColor: 'white', borderBottomWidth: Tab == 3 ? 1 : 0, borderColor: Tab == 3 ? '#1485cc' : 'transparent' }} onPress={() => setTab(3)}>
            <Text style={[SIPCStyles.NormalFont, { color: Tab == 3 ? '#1485cc' : '#525252' }]}>Completed</Text>
          </Card>

        </View>
        {/* ====================Work Orders=================================== */}
        
        {Tab == 1 ?
          <>
            <Surface style={{ marginTop: 20, padding: 15, backgroundColor: Active == 1 ? '#fffcf8' : 'white' }}>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>


                <View style={{ flexDirection: 'column' }}>
                  <View style={SIPCStyles.ViewRowAlign} >
                    <TouchableWithoutFeedback onPress={() => { switch_tab(1) }}>
                      {Active == 1 ?

                        <Image source={require('../assets/minus.png')} style={SIPCStyles.PlusMinusImage} />
                        :
                        <Image source={require('../assets/plus.png')} style={SIPCStyles.PlusMinusImage} />

                      }
                    </TouchableWithoutFeedback>
                    <Text style={SIPCStyles.SurfaceTitle}> Desk - Student</Text>
                  </View>

                  <View style={SIPCStyles.healthImageView}>
                    <Image source={require('../assets/ii.png')} style={SIPCStyles.healthImage} />
                    <Text style={SIPCStyles.SurfaceType}>Broken</Text>
                  </View>
                </View>

                <View style={{ alignItems: 'flex-end', justifyContent: 'center', }}>
                  <TouchableWithoutFeedback>
                    <Image source={require('../assets/print.png')} style={SIPCStyles.playImage} />
                  </TouchableWithoutFeedback>
                  <Text style={[SIPCStyles.SurfacePlayImageText, {}]}>Print </Text>
                </View>
              </View>
            </Surface>
            <Divider bold={true} />

            {Active == 1 ?

              <Surface style={{ backgroundColor: 'white', }}>
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Image source={require('../assets/building.png')} style={SIPCStyles.MainBuilding} />
                  <Text style={SIPCStyles.SurfaceType}>SIPC High School</Text>
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', padding: 15 }}>
                    <Image source={require('../assets/floor.png')} style={SIPCStyles.MainBuilding} />
                    <Text style={SIPCStyles.SurfaceType}>2nd Floor</Text>
                  </View>

                  <View style={{ flexDirection: 'row', padding: 15 }}>
                    <Image source={require('../assets/room.png')} style={SIPCStyles.MainBuilding} />
                    <Text style={SIPCStyles.SurfaceType}>Classroom 100</Text>
                  </View>

                </View>
                <Divider bold={true} />
                {/* =================================== */}
               
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                  <DropDownPicker
                   listMode="SCROLLVIEW"
                    showArrowIcon={true}
                    showTickIcon={false}
                    ArrowDownIconComponent={() => {
                      return (
                        <FontAwesome size={18} color={'#818081'} style={{ paddingHorizontal: 5 }} name="chevron-down" />);
                    }}
                    ArrowUpIconComponent={() => {
                      return (
                        <FontAwesome size={18} color={'#818081'} style={{ paddingHorizontal: 5 }} name="chevron-up" />);
                    }}

                    style={SIPCStyles.DropDownPicker}
                    textStyle={SIPCStyles.textSize}
                    dropDownContainerStyle={SIPCStyles.dropDownContainerStyle}
                    labelStyle={[SIPCStyles.RedColor, { paddingHorizontal: 5 }]}

                    open={showDropDown1}
                    value={Group}
                    items={GroupList}
                    setOpen={setShowDropDown1}
                    setValue={setGroup}
                    setItems={setGroupList}
                  />
                </View>
              
                <Divider bold={true} />
                {/* ================== */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15 }}>
                  <View style={{ flexDirection: 'row', }}>
                    <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>Assigned To:</Text>
                    <Text style={SIPCStyles.ValueFont}>Jhon Smith</Text>
                  </View>
                  <TouchableWithoutFeedback onPress={() => {
                    navigation.navigate('Assignment')
                  }}>
                  <Text style={[SIPCStyles.ValueFont, { color: '#1485cc' }]}>Edit</Text>
                  </TouchableWithoutFeedback>

                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>Created By:</Text>
                  <Text style={SIPCStyles.ValueFont}></Text>
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>Due Date:</Text>
                  <Text style={SIPCStyles.ValueFont}></Text>
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={[SIPCStyles.BoldFont,]}>Comment:</Text>
                  <Text style={[SIPCStyles.ValueFont, { paddingHorizontal: 10, flex: 1 }]}>Work Order section is completed & inspected thoroughly with all the items</Text>
                </View>
                <Divider bold={true} />
                {/* ======================== */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={SIPCStyles.BoldFont}>Images:</Text>
                  <Image source={require('../assets/con1.jpg')} style={{ height: 65, width: 65, marginLeft: 10 }} />
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>Date Created:</Text>
                  <Text style={SIPCStyles.ValueFont}>Dec 27,2022</Text>
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>Date Completed:</Text>
                  <Text style={SIPCStyles.ValueFont}></Text>
                </View>
                <Divider bold={true} />
              </Surface>

              : null}
            {/* ================================================================================================ */}

            <Surface style={{ marginTop: 20, padding: 15, backgroundColor: Active == 2 ? '#fffcf8' : 'white' }}>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>


                <View style={{ flexDirection: 'column' }}>
                  <View style={SIPCStyles.ViewRowAlign} >
                    <TouchableWithoutFeedback onPress={() => { switch_tab(2) }}>
                      {Active == 2 ?

                        <Image source={require('../assets/minus.png')} style={SIPCStyles.PlusMinusImage} />
                        :
                        <Image source={require('../assets/plus.png')} style={SIPCStyles.PlusMinusImage} />

                      }
                    </TouchableWithoutFeedback>
                    <Text style={SIPCStyles.SurfaceTitle}> Mirror</Text>
                  </View>

                  <View style={SIPCStyles.healthImageView}>
                    <Image source={require('../assets/ii.png')} style={SIPCStyles.healthImage} />
                    <Text style={SIPCStyles.SurfaceType}>Streak</Text>
                  </View>
                </View>

                <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                  <TouchableWithoutFeedback>
                    <Image source={require('../assets/print.png')} style={SIPCStyles.playImage} />
                  </TouchableWithoutFeedback>
                  <Text style={[SIPCStyles.SurfacePlayImageText, {}]}>Print </Text>
                </View>
              </View>
            </Surface>
            <Divider bold={true} />


            {Active == 2 ?

              <Surface style={{ backgroundColor: 'white', }}>
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Image source={require('../assets/building.png')} style={SIPCStyles.MainBuilding} />
                  <Text style={SIPCStyles.SurfaceType}>SIPC High School</Text>
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', padding: 15 }}>
                    <Image source={require('../assets/floor.png')} style={SIPCStyles.MainBuilding} />
                    <Text style={SIPCStyles.SurfaceType}>2nd Floor</Text>
                  </View>

                  <View style={{ flexDirection: 'row', padding: 15 }}>
                    <Image source={require('../assets/room.png')} style={SIPCStyles.MainBuilding} />
                    <Text style={SIPCStyles.SurfaceType}>Classroom 100</Text>
                  </View>

                </View>
                <Divider bold={true} />
                {/* =================================== */}

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                  <DropDownPicker
                   listMode="SCROLLVIEW"
                    showArrowIcon={true}
                    showTickIcon={false}
                    ArrowDownIconComponent={() => {
                      return (
                        <FontAwesome size={18} color={'#818081'} style={{ paddingHorizontal: 5 }} name="chevron-down" />);
                    }}
                    ArrowUpIconComponent={() => {
                      return (
                        <FontAwesome size={18} color={'#818081'} style={{ paddingHorizontal: 5 }} name="chevron-up" />);
                    }}

                    style={SIPCStyles.DropDownPicker}
                    textStyle={SIPCStyles.textSize}
                    dropDownContainerStyle={SIPCStyles.dropDownContainerStyle}
                    labelStyle={[SIPCStyles.RedColor, { paddingHorizontal: 5 }]}

                    open={showDropDown1}
                    value={Group}
                    items={GroupList}
                    setOpen={setShowDropDown1}
                    setValue={setGroup}
                    setItems={setGroupList}
                  />
                </View>
                <Divider bold={true} />
                {/* ================== */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15 }}>
                  <View style={{ flexDirection: 'row', }}>
                    <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>Assigned To:</Text>
                    <Text style={SIPCStyles.ValueFont}>Unassigned</Text>
                  </View>
                  <TouchableWithoutFeedback onPress={() => {
                    navigation.navigate('Assignment')
                  }}>
                  <Text style={[SIPCStyles.ValueFont, { color: '#1485cc' }]}>Assign</Text>
                  </TouchableWithoutFeedback>
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>Created By:</Text>
                  <Text style={SIPCStyles.ValueFont}></Text>
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>Due Date:</Text>
                  <Text style={SIPCStyles.ValueFont}></Text>
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={[SIPCStyles.BoldFont,]}>Comment:</Text>
                  <Text style={[SIPCStyles.ValueFont, { paddingHorizontal: 10, flex: 1 }]}>Work Order section is completed & inspected thoroughly with all the items</Text>
                </View>
                <Divider bold={true} />
                {/* ======================== */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={SIPCStyles.BoldFont}>Images:</Text>
                  <Image source={require('../assets/con1.jpg')} style={{ height: 65, width: 65, marginLeft: 10 }} />
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>Date Created:</Text>
                  <Text style={SIPCStyles.ValueFont}>Dec 27,2022</Text>
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>Date Completed:</Text>
                  <Text style={SIPCStyles.ValueFont}></Text>
                </View>
                <Divider bold={true} />
              </Surface>

              : null}
            {/* ================================================================================================ */}

          </>
          : null}
        {/* =============================IN Progress========================== */}
        {Tab == 2 ?
          <>
            <Surface style={{ marginTop: 20, padding: 15, backgroundColor: Progress == 1 ? '#fffcf8' : 'white' }}>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>


                <View style={{ flexDirection: 'column' }}>
                  <View style={SIPCStyles.ViewRowAlign} >
                    <TouchableWithoutFeedback onPress={() => { switch_pro(1) }}>
                      {Progress == 1 ?

                        <Image source={require('../assets/minus.png')} style={SIPCStyles.PlusMinusImage} />
                        :
                        <Image source={require('../assets/plus.png')} style={SIPCStyles.PlusMinusImage} />

                      }
                    </TouchableWithoutFeedback>
                    <Text style={SIPCStyles.SurfaceTitle}> Desk - Student 11</Text>
                  </View>

                  <View style={SIPCStyles.healthImageView}>
                    <Image source={require('../assets/ii.png')} style={SIPCStyles.healthImage} />
                    <Text style={SIPCStyles.SurfaceType}>Broken</Text>
                  </View>
                </View>

                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', }}>
                  <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                    <TouchableWithoutFeedback>
                      <Image source={require('../assets/print.png')} style={SIPCStyles.playImage} />
                    </TouchableWithoutFeedback>
                    <Text style={[SIPCStyles.SurfacePlayImageText, {}]}>Print </Text>
                  </View>
                </View>
              </View>
            </Surface>
            <Divider bold={true} />

            {Progress == 1 ?

              <Surface style={{ backgroundColor: 'white', }}>
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Image source={require('../assets/building.png')} style={SIPCStyles.MainBuilding} />

                  <Text style={SIPCStyles.SurfaceType}>SIPC High School</Text>
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', padding: 15 }}>
                    <Image source={require('../assets/floor.png')} style={SIPCStyles.MainBuilding} />
                    <Text style={SIPCStyles.SurfaceType}>2nd Floor</Text>
                  </View>

                  <View style={{ flexDirection: 'row', padding: 15 }}>
                    <Image source={require('../assets/room.png')} style={SIPCStyles.MainBuilding} />
                    <Text style={SIPCStyles.SurfaceType}>Classroom 100</Text>
                  </View>

                </View>
                <Divider bold={true} />
                {/* =================================== */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                  <DropDownPicker
                   listMode="SCROLLVIEW"
                    showArrowIcon={true}
                    showTickIcon={false}
                    itemSeparator={true}
                    itemSeparatorStyle={{
                      backgroundColor: "transparent",
                      // paddingVertical:5
                    }}
                    ArrowDownIconComponent={() => {
                      return (
                        <FontAwesome size={18} color={'#818081'} style={{ paddingHorizontal: 5 }} name="chevron-down" />);
                    }}
                    ArrowUpIconComponent={() => {
                      return (
                        <FontAwesome size={18} color={'#818081'} style={{ paddingHorizontal: 5 }} name="chevron-up" />);
                    }}

                    style={SIPCStyles.DropDownPicker}
                    textStyle={SIPCStyles.textSize}
                    dropDownContainerStyle={SIPCStyles.dropDownContainerStyle}
                    labelStyle={[SIPCStyles.OrangeColor, { paddingHorizontal: 5 }]}
                    open={showDropDown2}
                    value={Group2}
                    items={GroupList2}
                    setOpen={setShowDropDown2}
                    setValue={setGroup2}
                    setItems={setGroupList2}
                  />
                </View>
                <Divider bold={true} />
                {/* ================== */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15 }}>
                  <View style={{ flexDirection: 'row', }}>
                    <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>Assigned To:</Text>
                    <Text style={SIPCStyles.ValueFont}>Jhon Smith</Text>
                  </View>
                  <TouchableWithoutFeedback onPress={() => {
                    navigation.navigate('Assignment')
                  }}>
                  <Text style={[SIPCStyles.ValueFont, { color: '#1485cc' }]}>Edit</Text>
                  </TouchableWithoutFeedback>
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>Created By:</Text>
                  <Text style={SIPCStyles.ValueFont}></Text>
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>Due Date:</Text>
                  <Text style={SIPCStyles.ValueFont}></Text>
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={[SIPCStyles.BoldFont,]}>Comment:</Text>
                  <Text style={[SIPCStyles.ValueFont, { paddingHorizontal: 10, flex: 1 }]}>Work Order section is completed & inspected thoroughly with all the items</Text>
                </View>
                <Divider bold={true} />
                {/* ======================== */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={SIPCStyles.BoldFont}>Images:</Text>
                  <Image source={require('../assets/con1.jpg')} style={{ height: 65, width: 65, marginLeft: 10 }} />
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>Date Created:</Text>
                  <Text style={SIPCStyles.ValueFont}>Dec 27,2022</Text>
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>Date Completed:</Text>
                  <Text style={SIPCStyles.ValueFont}></Text>
                </View>
                <Divider bold={true} />
              </Surface>

              : null}
            {/* ================================================================================================ */}

            <Surface style={{ marginTop: 20, padding: 15, backgroundColor: Progress == 2 ? '#fffcf8' : 'white' }}>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>


                <View style={{ flexDirection: 'column' }}>
                  <View style={SIPCStyles.ViewRowAlign} >
                    <TouchableWithoutFeedback onPress={() => { switch_pro(2) }}>
                      {Progress == 2 ?

                        <Image source={require('../assets/minus.png')} style={SIPCStyles.PlusMinusImage} />
                        :
                        <Image source={require('../assets/plus.png')} style={SIPCStyles.PlusMinusImage} />

                      }
                    </TouchableWithoutFeedback>
                    <Text style={SIPCStyles.SurfaceTitle}> Mirror</Text>
                  </View>

                  <View style={SIPCStyles.healthImageView}>
                    <Image source={require('../assets/ii.png')} style={SIPCStyles.healthImage} />
                    <Text style={SIPCStyles.SurfaceType}>Streak</Text>
                  </View>
                </View>

                <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                  <TouchableWithoutFeedback>
                    <Image source={require('../assets/print.png')} style={SIPCStyles.playImage} />
                  </TouchableWithoutFeedback>
                  <Text style={[SIPCStyles.SurfacePlayImageText, {}]}>Print </Text>
                </View>
              </View>
            </Surface>
            <Divider bold={true} />


            {Progress == 2 ?

              <Surface style={{ backgroundColor: 'white', }}>
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Image source={require('../assets/building.png')} style={SIPCStyles.MainBuilding} />
                  <Text style={SIPCStyles.SurfaceType}>SIPC High School</Text>
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', padding: 15 }}>
                    <Image source={require('../assets/floor.png')} style={SIPCStyles.MainBuilding} />
                    <Text style={SIPCStyles.SurfaceType}>2nd Floor</Text>
                  </View>

                  <View style={{ flexDirection: 'row', padding: 15 }}>
                    <Image source={require('../assets/room.png')} style={SIPCStyles.MainBuilding} />
                    <Text style={SIPCStyles.SurfaceType}>Classroom 100</Text>
                  </View>

                </View>
                <Divider bold={true} />
                {/* =================================== */}

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                  <DropDownPicker
                   listMode="SCROLLVIEW"
                    showArrowIcon={true}
                    showTickIcon={false}
                    itemSeparator={true}
                    itemSeparatorStyle={{
                      backgroundColor: "transparent",
                      // paddingVertical:5
                    }}
                    ArrowDownIconComponent={() => {
                      return (
                        <FontAwesome size={18} color={'#818081'} style={{ paddingHorizontal: 5 }} name="chevron-down" />);
                    }}
                    ArrowUpIconComponent={() => {
                      return (
                        <FontAwesome size={18} color={'#818081'} style={{ paddingHorizontal: 5 }} name="chevron-up" />);
                    }}

                    style={SIPCStyles.DropDownPicker}
                    textStyle={SIPCStyles.textSize}
                    dropDownContainerStyle={SIPCStyles.dropDownContainerStyle}
                    labelStyle={[SIPCStyles.OrangeColor, { paddingHorizontal: 5 }]}
                    open={showDropDown2}
                    value={Group2}
                    items={GroupList2}
                    setOpen={setShowDropDown2}
                    setValue={setGroup2}
                    setItems={setGroupList2}
                  />
                </View>
                <Divider bold={true} />
                {/* ================== */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15 }}>
                  <View style={{ flexDirection: 'row', }}>
                    <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>Assigned To:</Text>
                    <Text style={SIPCStyles.ValueFont}>Unassigned</Text>
                  </View>
                  <TouchableWithoutFeedback onPress={() => {
                    navigation.navigate('Assignment')
                  }}>
                  <Text style={[SIPCStyles.ValueFont, { color: '#1485cc' }]}>Assign</Text>
                  </TouchableWithoutFeedback>
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>Created By:</Text>
                  <Text style={SIPCStyles.ValueFont}></Text>
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>Due Date:</Text>
                  <Text style={SIPCStyles.ValueFont}></Text>
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={[SIPCStyles.BoldFont,]}>Comment:</Text>
                  <Text style={[SIPCStyles.ValueFont, { paddingHorizontal: 10, flex: 1 }]}>Work Order section is completed & inspected thoroughly with all the items</Text>
                </View>
                <Divider bold={true} />
                {/* ======================== */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={SIPCStyles.BoldFont}>Images:</Text>
                  <Image source={require('../assets/con1.jpg')} style={{ height: 65, width: 65, marginLeft: 10 }} />
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>Date Created:</Text>
                  <Text style={SIPCStyles.ValueFont}>Dec 27,2022</Text>
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>Date Completed:</Text>
                  <Text style={SIPCStyles.ValueFont}></Text>
                </View>
                <Divider bold={true} />
              </Surface>

              : null}
            {/* ================================================================================================ */}
          </>
          : null}
        {/* =============================Completed========================== */}
        {Tab == 3 ?
          <>
            <Surface style={{ marginTop: 20, padding: 15, backgroundColor: Complete == 1 ? '#fffcf8' : 'white' }}>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>


                <View style={{ flexDirection: 'column' }}>
                  <View style={SIPCStyles.ViewRowAlign} >
                    <TouchableWithoutFeedback onPress={() => { switch_com(1) }}>
                      {Complete == 1 ?

                        <Image source={require('../assets/minus.png')} style={SIPCStyles.PlusMinusImage} />
                        :
                        <Image source={require('../assets/plus.png')} style={SIPCStyles.PlusMinusImage} />

                      }
                    </TouchableWithoutFeedback>
                    <Text style={SIPCStyles.SurfaceTitle}> Desk - Student 22</Text>
                  </View>

                  <View style={SIPCStyles.healthImageView}>
                    <Image source={require('../assets/ii.png')} style={SIPCStyles.healthImage} />
                    <Text style={SIPCStyles.SurfaceType}>Broken</Text>
                  </View>
                </View>

                <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', }}>
                  <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                    <TouchableWithoutFeedback>
                      <Image source={require('../assets/print.png')} style={SIPCStyles.playImage} />
                    </TouchableWithoutFeedback>
                    <Text style={[SIPCStyles.SurfacePlayImageText, {}]}>Print </Text>
                  </View>
                </View>
              </View>
            </Surface>
            <Divider bold={true} />

            {Complete == 1 ?

              <Surface style={{ backgroundColor: 'white', }}>
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Image source={require('../assets/building.png')} style={SIPCStyles.MainBuilding} />

                  <Text style={SIPCStyles.SurfaceType}>SIPC High School</Text>
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', padding: 15 }}>
                    <Image source={require('../assets/floor.png')} style={SIPCStyles.MainBuilding} />
                    <Text style={SIPCStyles.SurfaceType}>2nd Floor</Text>
                  </View>

                  <View style={{ flexDirection: 'row', padding: 15 }}>
                    <Image source={require('../assets/room.png')} style={SIPCStyles.MainBuilding} />
                    <Text style={SIPCStyles.SurfaceType}>Classroom 100</Text>
                  </View>

                </View>
                <Divider bold={true} />
                {/* =================================== */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>


                  <DropDownPicker
                   listMode="SCROLLVIEW"
                    showArrowIcon={true}
                    showTickIcon={false}
                    itemSeparator={true}
                    itemSeparatorStyle={{
                      backgroundColor: "transparent",
                    }}
                    ArrowDownIconComponent={() => {
                      return (
                        <FontAwesome size={18} color={'#818081'} style={{ paddingHorizontal: 5 }} name="chevron-down" />);
                    }}
                    ArrowUpIconComponent={() => {
                      return (
                        <FontAwesome size={18} color={'#818081'} style={{ paddingHorizontal: 5 }} name="chevron-up" />);
                    }}
                    style={SIPCStyles.DropDownPicker}
                    textStyle={SIPCStyles.textSize}
                    dropDownContainerStyle={SIPCStyles.dropDownContainerStyle}
                    labelStyle={[SIPCStyles.GreenColor, { paddingHorizontal: 5 }]}
                    open={showDropDown3}
                    value={Group3}
                    items={GroupList3}
                    setOpen={setShowDropDown3}
                    setValue={setGroup3}
                    setItems={setGroupList3}
                  />
                </View>
                <Divider bold={true} />
                {/* ================== */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15 }}>
                  <View style={{ flexDirection: 'row', }}>
                    <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>Assigned To:</Text>
                    <Text style={SIPCStyles.ValueFont}>Jhon Smith</Text>
                  </View>
                  <TouchableWithoutFeedback onPress={() => {
                    navigation.navigate('Assignment')
                  }}>
                  <Text style={[SIPCStyles.ValueFont, { color: '#1485cc' }]}>Edit</Text>
                  </TouchableWithoutFeedback>
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>Created By:</Text>
                  <Text style={SIPCStyles.ValueFont}></Text>
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>Due Date:</Text>
                  <Text style={SIPCStyles.ValueFont}></Text>
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={[SIPCStyles.BoldFont,]}>Comment:</Text>
                  <Text style={[SIPCStyles.ValueFont, { paddingHorizontal: 10, flex: 1 }]}>Work Order section is completed & inspected thoroughly with all the items</Text>
                </View>
                <Divider bold={true} />
                {/* ======================== */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={SIPCStyles.BoldFont}>Images:</Text>
                  <Image source={require('../assets/con1.jpg')} style={{ height: 65, width: 65, marginLeft: 10 }} />
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>Date Created:</Text>
                  <Text style={SIPCStyles.ValueFont}>Dec 27,2022</Text>
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>Date Completed:</Text>
                  <Text style={SIPCStyles.ValueFont}></Text>
                </View>
                <Divider bold={true} />
              </Surface>

              : null}


            {/* ================================================================================================ */}

            <Surface style={{ marginTop: 20, padding: 15, backgroundColor: Complete == 2 ? '#fffcf8' : 'white' }}>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>


                <View style={{ flexDirection: 'column' }}>
                  <View style={SIPCStyles.ViewRowAlign} >
                    <TouchableWithoutFeedback onPress={() => { switch_com(2) }}>
                      {Complete == 2 ?

                        <Image source={require('../assets/minus.png')} style={SIPCStyles.PlusMinusImage} />
                        :
                        <Image source={require('../assets/plus.png')} style={SIPCStyles.PlusMinusImage} />

                      }
                    </TouchableWithoutFeedback>
                    <Text style={SIPCStyles.SurfaceTitle}> Mirror</Text>
                  </View>

                  <View style={SIPCStyles.healthImageView}>
                    <Image source={require('../assets/ii.png')} style={SIPCStyles.healthImage} />
                    <Text style={SIPCStyles.SurfaceType}>Streak</Text>
                  </View>
                </View>

                <View style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                  <TouchableWithoutFeedback>
                    <Image source={require('../assets/print.png')} style={SIPCStyles.playImage} />
                  </TouchableWithoutFeedback>
                  <Text style={[SIPCStyles.SurfacePlayImageText, {}]}>Print </Text>
                </View>
              </View>
            </Surface>
            <Divider bold={true} />


            {Complete == 2 ?

              <Surface style={{ backgroundColor: 'white', }}>
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Image source={require('../assets/building.png')} style={SIPCStyles.MainBuilding} />
                  <Text style={SIPCStyles.SurfaceType}>SIPC High School</Text>
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', padding: 15 }}>
                    <Image source={require('../assets/floor.png')} style={SIPCStyles.MainBuilding} />
                    <Text style={SIPCStyles.SurfaceType}>2nd Floor</Text>
                  </View>

                  <View style={{ flexDirection: 'row', padding: 15 }}>
                    <Image source={require('../assets/room.png')} style={SIPCStyles.MainBuilding} />
                    <Text style={SIPCStyles.SurfaceType}>Classroom 100</Text>
                  </View>

                </View>
                <Divider bold={true} />
                {/* =================================== */}

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

                  <DropDownPicker
                   listMode="SCROLLVIEW"
                    showArrowIcon={true}
                    showTickIcon={false}
                    itemSeparator={true}
                    itemSeparatorStyle={{
                     backgroundColor: "transparent",
                    }}
                    ArrowDownIconComponent={() => {
                      return (
                        <FontAwesome size={18} color={'#818081'} style={{ paddingHorizontal: 5 }} name="chevron-down" />);
                    }}
                    ArrowUpIconComponent={() => {
                      return (
                        <FontAwesome size={18} color={'#818081'} style={{ paddingHorizontal: 5 }} name="chevron-up" />);
                    }}
                    style={SIPCStyles.DropDownPicker}
                    textStyle={SIPCStyles.textSize}
                    dropDownContainerStyle={SIPCStyles.dropDownContainerStyle}
                    labelStyle={[SIPCStyles.GreenColor, { paddingHorizontal: 5 }]}
                    open={showDropDown3}
                    value={Group3}
                    items={GroupList3}
                    setOpen={setShowDropDown3}
                    setValue={setGroup3}
                    setItems={setGroupList3}
                  />
                </View>
                <Divider bold={true} />
                {/* ================== */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15 }}>
                  <View style={{ flexDirection: 'row', }}>
                    <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>Assigned To:</Text>
                    <Text style={SIPCStyles.ValueFont}>Unassigned</Text>
                  </View>
                  <TouchableWithoutFeedback onPress={() => {
                    navigation.navigate('Assignment')
                  }}>
                  <Text style={[SIPCStyles.ValueFont, { color: '#1485cc' }]}>Assign</Text>
                  </TouchableWithoutFeedback>
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>Created By:</Text>
                  <Text style={SIPCStyles.ValueFont}></Text>
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>Due Date:</Text>
                  <Text style={SIPCStyles.ValueFont}></Text>
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={[SIPCStyles.BoldFont,]}>Comment:</Text>
                  <Text style={[SIPCStyles.ValueFont, { paddingHorizontal: 10, flex: 1 }]}>Work Order section is completed & inspected thoroughly with all the items</Text>
                </View>
                <Divider bold={true} />
                {/* ======================== */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={SIPCStyles.BoldFont}>Images:</Text>
                  <Image source={require('../assets/con1.jpg')} style={{ height: 65, width: 65, marginLeft: 10 }} />
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>Date Created:</Text>
                  <Text style={SIPCStyles.ValueFont}>Dec 27,2022</Text>
                </View>
                <Divider bold={true} />
                {/* ================ */}
                <View style={{ flexDirection: 'row', padding: 15 }}>
                  <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>Date Completed:</Text>
                  <Text style={SIPCStyles.ValueFont}></Text>
                </View>
                <Divider bold={true} />
              </Surface>

              : null}
            {/* ================================================================================================ */}

          </>
          : null}





        {/* ====================================== */}
      </ScrollView>
    </View>
  )
}

export default WorkOrders




















