import { View, Alert, Image, ScrollView, TouchableWithoutFeedback, StatusBar, } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Card, Searchbar, TextInput, Surface, Divider, Text, } from 'react-native-paper';
import Icon2 from 'react-native-vector-icons/Entypo';
import SIPCStyles from '../screens/styles';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';


const WorkOrderBox = ({ data, Active, navigation }) => {
  
    
    const images = data.images

    // useEffect(() => {
    //     fetch('http://sipcsurvey.devuri.com/sipcsurvey/workorder-list-device?is_api=true')
    //       .then(response => response.json())
    //       .then(data => {
    //         setImages(data.images);
    //       })
    //       .catch(error => {
    //         console.error(error);
    //       });
    //   }, []);

    const [Show, setShow] = useState(false);

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


    const handleDropDownChange = (value) => {
        setGroup(value);

        if (value === '2') {
            console.log('2')
            navigation.navigate('Assignment');
        } else if (value === '3') {
            navigation.navigate('Assignment');
        }
        console.log('3')

    };
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

    // console.log(Active)

    return (
        <View>
            {/* ====================Work Orders=================================== */}

            {Active == 1 ? (
                <>
                    <Surface
                        style={{
                            marginTop: 20,
                            padding: 15,
                            backgroundColor: Show === true ? '#fffcf8' : 'white',
                        }}>
                        <View
                            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'column' }}>
                                <View style={SIPCStyles.ViewRowAlign}>
                                    <TouchableWithoutFeedback
                                        onPress={() => {
                                            setShow(!Show);
                                        }}>
                                        {Show === true ? (
                                            <Image
                                                source={require('../assets/minus.png')}
                                                style={SIPCStyles.PlusMinusImage}
                                            />
                                        ) : (
                                            <Image
                                                source={require('../assets/plus.png')}
                                                style={SIPCStyles.PlusMinusImage}
                                            />
                                        )}
                                    </TouchableWithoutFeedback>
                                    <Text style={SIPCStyles.SurfaceTitle}> {data.item_name}</Text>
                                </View>

                                <View style={SIPCStyles.healthImageView}>
                                    <Image
                                        source={require('../assets/ii.png')}
                                        style={SIPCStyles.healthImage}
                                    />
                                    <Text style={SIPCStyles.SurfaceType}>{data.condition_name}</Text>
                                </View>
                            </View>

                            <View
                                style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                                <TouchableWithoutFeedback>
                                    <Image
                                        source={require('../assets/print.png')}
                                        style={SIPCStyles.playImage}
                                    />
                                </TouchableWithoutFeedback>
                                <Text style={[SIPCStyles.SurfacePlayImageText, {}]}>
                                    Print{' '}
                                </Text>
                            </View>
                        </View>
                    </Surface>
                    <Divider bold={true} />

                    {Show === true ? (
                        <Surface style={{ backgroundColor: 'white' }}>

                            {data.location_type_id === '1' ?
                                <>
                                    <View style={{ flexDirection: 'row', padding: 15 }}>
                                        <Image
                                            source={require('../assets/building.png')}
                                            style={SIPCStyles.MainBuilding}
                                        />
                                        <Text style={SIPCStyles.SurfaceType}>{data.building_name}</Text>
                                    </View>
                                    <Divider bold={true} />
                                    {/* ================ */}
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                        <View style={{ flexDirection: 'row', padding: 15 }}>
                                            <Image
                                                source={require('../assets/floor.png')}
                                                style={SIPCStyles.MainBuilding}
                                            />
                                            <Text style={SIPCStyles.SurfaceType}>{data.floor_name}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', padding: 15 }}>
                                            <Image
                                                source={require('../assets/room.png')}
                                                style={SIPCStyles.MainBuilding}
                                            />
                                            <Text style={SIPCStyles.SurfaceType}>{data.room_name}</Text>
                                        </View>
                                    </View>
                                    <Divider bold={true} />
                                </> 
                                :
                                <>
                                    <View style={{ flexDirection: 'row', padding: 15 }}>
                                        <Image
                                            source={require('../assets/location.png')}
                                            style={SIPCStyles.MainBuilding}
                                        />
                                        <Text style={SIPCStyles.SurfaceType}>{data.location}</Text>
                                    </View>
                                    <Divider bold={true} />

                            
                                </>
                            }


                            {/* =================================== */}

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}>
                                <DropDownPicker
                                    listMode="SCROLLVIEW"
                                    showArrowIcon={true}
                                    showTickIcon={false}
                                    ArrowDownIconComponent={() => {
                                        return (
                                            <FontAwesome
                                                size={18}
                                                color={'#818081'}
                                                style={{ paddingHorizontal: 5 }}
                                                name="chevron-down"
                                            />
                                        );
                                    }}
                                    ArrowUpIconComponent={() => {
                                        return (
                                            <FontAwesome
                                                size={18}
                                                color={'#818081'}
                                                style={{ paddingHorizontal: 5 }}
                                                name="chevron-up"
                                            />
                                        );
                                    }}
                                    style={SIPCStyles.DropDownPicker}
                                    textStyle={SIPCStyles.textSize}
                                    dropDownContainerStyle={SIPCStyles.dropDownContainerStyle}
                                    labelStyle={[SIPCStyles.RedColor, { paddingHorizontal: 5 }]}
                                    open={showDropDown1}
                                    value={Group}
                                    items={GroupList}
                                    setOpen={setShowDropDown1}
                                    setValue={handleDropDownChange}
                                    setItems={setGroupList}
                                />
                            </View>

                            <Divider bold={true} />
                            {/* ================== */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    padding: 15,
                                }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>
                                        Assigned To:
                                    </Text>
                                    <Text style={SIPCStyles.ValueFont}>Jhon Smith</Text>
                                </View>
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        navigation.navigate('Assignment');
                                    }}>
                                    <Text style={[SIPCStyles.ValueFont, { color: '#1485cc' }]}>
                                        Edit
                                    </Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <Divider bold={true} />
                            {/* ================ */}
                            <View style={{ flexDirection: 'row', padding: 15 }}>
                                <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>
                                    Created By:
                                </Text>
                                <Text style={SIPCStyles.ValueFont}></Text>
                            </View>
                            <Divider bold={true} />
                            {/* ================ */}
                            <View style={{ flexDirection: 'row', padding: 15 }}>
                                <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>
                                    Due Date:
                                </Text>
                                <Text style={SIPCStyles.ValueFont}></Text>
                            </View>
                            <Divider bold={true} />
                            {/* ================ */}
                            <View style={{ flexDirection: 'row', padding: 15 }}>
                                <Text style={[SIPCStyles.BoldFont]}>Comment:</Text>
                                <Text
                                    style={[
                                        SIPCStyles.ValueFont,
                                        { paddingHorizontal: 10, flex: 1 },
                                    ]}>
                                    {data.comment}
                                </Text>
                            </View>
                            <Divider bold={true} />
                            {/* ======================== */}
                            <View style={{ flexDirection: 'row', padding: 15, flexWrap: 'wrap' }}>
                                <Text style={SIPCStyles.BoldFont}>Images:</Text>
                                <Image
                                    source={require('../assets/con1.jpg')}
                                    style={{ height: 65, width: 65, margin: 10 }}
                                />
                            </View>
                            <Divider bold={true} />
                            {/* ================ */}
                            <View style={{ flexDirection: 'row', padding: 15 }}>
                                <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>
                                    Date Created:
                                </Text>
                                <Text style={SIPCStyles.ValueFont}>{data.date_created}</Text>
                            </View>
                            <Divider bold={true} />
                            {/* ================ */}
                            <View style={{ flexDirection: 'row', padding: 15 }}>
                                <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>
                                    Date Completed:
                                </Text>
                                <Text style={SIPCStyles.ValueFont}>{data.last_updated}</Text>
                            </View>
                            <Divider bold={true} />
                        </Surface>
                    ) : null}
                </>
            ) : null}
            {/* =============================IN Progress========================== */}
            {Active == 2 ? (
                <>
                    <Surface
                        style={{
                            marginTop: 20,
                            padding: 15,
                            backgroundColor: Show === true ? '#fffcf8' : 'white',
                        }}>
                        <View
                            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'column' }}>
                                <View style={SIPCStyles.ViewRowAlign}>
                                    <TouchableWithoutFeedback
                                        onPress={() => {
                                            setShow(!Show);
                                        }}>
                                        {Show === true ? (
                                            <Image
                                                source={require('../assets/minus.png')}
                                                style={SIPCStyles.PlusMinusImage}
                                            />
                                        ) : (
                                            <Image
                                                source={require('../assets/plus.png')}
                                                style={SIPCStyles.PlusMinusImage}
                                            />
                                        )}
                                    </TouchableWithoutFeedback>
                                    <Text style={SIPCStyles.SurfaceTitle}>
                                        {data.item_name}
                                    </Text>
                                </View>

                                <View style={SIPCStyles.healthImageView}>
                                    <Image
                                        source={require('../assets/ii.png')}
                                        style={SIPCStyles.healthImage}
                                    />
                                    <Text style={SIPCStyles.SurfaceType}>{data.condition_name}</Text>
                                </View>
                            </View>

                            <View
                                style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <View
                                    style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                                    <TouchableWithoutFeedback>
                                        <Image
                                            source={require('../assets/print.png')}
                                            style={SIPCStyles.playImage}
                                        />
                                    </TouchableWithoutFeedback>
                                    <Text style={[SIPCStyles.SurfacePlayImageText, {}]}>
                                        Print{' '}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </Surface>
                    <Divider bold={true} />

                    {Show === true ? (
                        <Surface style={{ backgroundColor: 'white' }}>
                           {data.location_type_id === '1' ?
                                <>
                                    <View style={{ flexDirection: 'row', padding: 15 }}>
                                        <Image
                                            source={require('../assets/building.png')}
                                            style={SIPCStyles.MainBuilding}
                                        />
                                        <Text style={SIPCStyles.SurfaceType}>{data.building_name}</Text>
                                    </View>
                                    <Divider bold={true} />
                                    {/* ================ */}
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                        <View style={{ flexDirection: 'row', padding: 15 }}>
                                            <Image
                                                source={require('../assets/floor.png')}
                                                style={SIPCStyles.MainBuilding}
                                            />
                                            <Text style={SIPCStyles.SurfaceType}>{data.floor_name}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', padding: 15 }}>
                                            <Image
                                                source={require('../assets/room.png')}
                                                style={SIPCStyles.MainBuilding}
                                            />
                                            <Text style={SIPCStyles.SurfaceType}>{data.room_name}</Text>
                                        </View>
                                    </View>
                                    <Divider bold={true} />
                                </> 
                                :
                                <>
                                    <View style={{ flexDirection: 'row', padding: 15 }}>
                                        <Image
                                            source={require('../assets/location.png')}
                                            style={SIPCStyles.MainBuilding}
                                        />
                                        <Text style={SIPCStyles.SurfaceType}>{data.location}</Text>
                                    </View>
                                    <Divider bold={true} />

                            
                                </>
                            }

                            {/* =================================== */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}>
                                <DropDownPicker
                                    listMode="SCROLLVIEW"
                                    showArrowIcon={true}
                                    showTickIcon={false}
                                    itemSeparator={true}
                                    itemSeparatorStyle={{
                                        backgroundColor: 'transparent',
                                        // paddingVertical:5
                                    }}
                                    ArrowDownIconComponent={() => {
                                        return (
                                            <FontAwesome
                                                size={18}
                                                color={'#818081'}
                                                style={{ paddingHorizontal: 5 }}
                                                name="chevron-down"
                                            />
                                        );
                                    }}
                                    ArrowUpIconComponent={() => {
                                        return (
                                            <FontAwesome
                                                size={18}
                                                color={'#818081'}
                                                style={{ paddingHorizontal: 5 }}
                                                name="chevron-up"
                                            />
                                        );
                                    }}
                                    style={SIPCStyles.DropDownPicker}
                                    textStyle={SIPCStyles.textSize}
                                    dropDownContainerStyle={SIPCStyles.dropDownContainerStyle}
                                    labelStyle={[
                                        SIPCStyles.OrangeColor,
                                        { paddingHorizontal: 5 },
                                    ]}
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
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    padding: 15,
                                }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>
                                        Assigned To:
                                    </Text>
                                    <Text style={SIPCStyles.ValueFont}>Jhon Smith</Text>
                                </View>
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        navigation.navigate('Assignment');
                                    }}>
                                    <Text style={[SIPCStyles.ValueFont, { color: '#1485cc' }]}>
                                        Edit
                                    </Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <Divider bold={true} />
                            {/* ================ */}
                            <View style={{ flexDirection: 'row', padding: 15 }}>
                                <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>
                                    Created By:
                                </Text>
                                <Text style={SIPCStyles.ValueFont}></Text>
                            </View>
                            <Divider bold={true} />
                            {/* ================ */}
                            <View style={{ flexDirection: 'row', padding: 15 }}>
                                <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>
                                    Due Date:
                                </Text>
                                <Text style={SIPCStyles.ValueFont}></Text>
                            </View>
                            <Divider bold={true} />
                            {/* ================ */}
                            <View style={{ flexDirection: 'row', padding: 15 }}>
                                <Text style={[SIPCStyles.BoldFont]}>Comment:</Text>
                                <Text
                                    style={[
                                        SIPCStyles.ValueFont,
                                        { paddingHorizontal: 10, flex: 1 },
                                    ]}>
                                    {data.comment}
                                </Text>
                            </View>
                            <Divider bold={true} />
                            {/* ======================== */}
                            <View style={{ flexDirection: 'row', padding: 15, flexWrap: 'wrap' }}>
                                <Text style={SIPCStyles.BoldFont}>Images:</Text>

                                {images.map((image, index) => (
                                    <Image
                                        key={index}
                                        source={{ uri: data.image_path + image }}
                                        style={{ height: 65, width: 65, margin: 10 }}
                                    />
                                ))}


                            </View>
                            <Divider bold={true} />
                            {/* ================ */}
                            <View style={{ flexDirection: 'row', padding: 15 }}>
                                <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>
                                    Date Created:
                                </Text>
                                <Text style={SIPCStyles.ValueFont}>{data.date_created}</Text>
                            </View>
                            <Divider bold={true} />
                            {/* ================ */}
                            <View style={{ flexDirection: 'row', padding: 15 }}>
                                <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>
                                    Date Completed:
                                </Text>
                                <Text style={SIPCStyles.ValueFont}>{data.last_updated}</Text>
                            </View>
                            <Divider bold={true} />
                        </Surface>
                    ) : null}

                </>
            ) : null}
            {/* =============================Completed========================== */}
            {Active == 3 ? (
                <>
                    <Surface
                        style={{ marginTop: 20, padding: 15, backgroundColor: Show === true ? '#fffcf8' : 'white', }}>
                        <View
                            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'column' }}>
                                <View style={SIPCStyles.ViewRowAlign}>
                                    <TouchableWithoutFeedback
                                        onPress={() => {
                                            setShow(!Show);
                                        }}>
                                        {Show === true ? (
                                            <Image
                                                source={require('../assets/minus.png')}
                                                style={SIPCStyles.PlusMinusImage}
                                            />
                                        ) : (
                                            <Image
                                                source={require('../assets/plus.png')}
                                                style={SIPCStyles.PlusMinusImage}
                                            />
                                        )}
                                    </TouchableWithoutFeedback>
                                    <Text style={SIPCStyles.SurfaceTitle}>
                                        {data.item_name}
                                    </Text>
                                </View>

                                <View style={SIPCStyles.healthImageView}>
                                    <Image
                                        source={require('../assets/ii.png')}
                                        style={SIPCStyles.healthImage}
                                    />
                                    <Text style={SIPCStyles.SurfaceType}>{data.condition_name}</Text>
                                </View>
                            </View>

                            <View
                                style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                <View
                                    style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                                    <TouchableWithoutFeedback>
                                        <Image
                                            source={require('../assets/print.png')}
                                            style={SIPCStyles.playImage}
                                        />
                                    </TouchableWithoutFeedback>
                                    <Text style={[SIPCStyles.SurfacePlayImageText, {}]}>
                                        Print{' '}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </Surface>
                    <Divider bold={true} />

                    {Show === true ? (
                        <Surface style={{ backgroundColor: 'white' }}>
                        {data.location_type_id === '1' ?
                                <>
                                    <View style={{ flexDirection: 'row', padding: 15 }}>
                                        <Image
                                            source={require('../assets/building.png')}
                                            style={SIPCStyles.MainBuilding}
                                        />
                                        <Text style={SIPCStyles.SurfaceType}>{data.building_name}</Text>
                                    </View>
                                    <Divider bold={true} />
                                    {/* ================ */}
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                        <View style={{ flexDirection: 'row', padding: 15 }}>
                                            <Image
                                                source={require('../assets/floor.png')}
                                                style={SIPCStyles.MainBuilding}
                                            />
                                            <Text style={SIPCStyles.SurfaceType}>{data.floor_name}</Text>
                                        </View>

                                        <View style={{ flexDirection: 'row', padding: 15 }}>
                                            <Image
                                                source={require('../assets/room.png')}
                                                style={SIPCStyles.MainBuilding}
                                            />
                                            <Text style={SIPCStyles.SurfaceType}>{data.room_name}</Text>
                                        </View>
                                    </View>
                                    <Divider bold={true} />
                                </> 
                                :
                                <>
                                    <View style={{ flexDirection: 'row', padding: 15 }}>
                                        <Image
                                            source={require('../assets/location.png')}
                                            style={SIPCStyles.MainBuilding}
                                        />
                                        <Text style={SIPCStyles.SurfaceType}>{data.location}</Text>
                                    </View>
                                    <Divider bold={true} />

                            
                                </>
                            }

                            {/* =================================== */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                }}>
                                <DropDownPicker
                                    listMode="SCROLLVIEW"
                                    showArrowIcon={true}
                                    showTickIcon={false}
                                    itemSeparator={true}
                                    itemSeparatorStyle={{
                                        backgroundColor: 'transparent',
                                    }}
                                    ArrowDownIconComponent={() => {
                                        return (
                                            <FontAwesome
                                                size={18}
                                                color={'#818081'}
                                                style={{ paddingHorizontal: 5 }}
                                                name="chevron-down"
                                            />
                                        );
                                    }}
                                    ArrowUpIconComponent={() => {
                                        return (
                                            <FontAwesome
                                                size={18}
                                                color={'#818081'}
                                                style={{ paddingHorizontal: 5 }}
                                                name="chevron-up"
                                            />
                                        );
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
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    padding: 15,
                                }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>
                                        Assigned To:
                                    </Text>
                                    <Text style={SIPCStyles.ValueFont}>Jhon Smith</Text>
                                </View>
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        navigation.navigate('Assignment');
                                    }}>
                                    <Text style={[SIPCStyles.ValueFont, { color: '#1485cc' }]}>
                                        Edit
                                    </Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <Divider bold={true} />
                            {/* ================ */}
                            <View style={{ flexDirection: 'row', padding: 15 }}>
                                <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>
                                    Created By:
                                </Text>
                                <Text style={SIPCStyles.ValueFont}></Text>
                            </View>
                            <Divider bold={true} />
                            {/* ================ */}
                            <View style={{ flexDirection: 'row', padding: 15 }}>
                                <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>
                                    Due Date:
                                </Text>
                                <Text style={SIPCStyles.ValueFont}></Text>
                            </View>
                            <Divider bold={true} />
                            {/* ================ */}
                            <View style={{ flexDirection: 'row', padding: 15 }}>
                                <Text style={[SIPCStyles.BoldFont]}>Comment:</Text>
                                <Text
                                    style={[
                                        SIPCStyles.ValueFont,
                                        { paddingHorizontal: 10, flex: 1 },
                                    ]}>
                                    {data.comment}
                                </Text>
                            </View>
                            <Divider bold={true} />
                            {/* ======================== */}
                            <View style={{ flexDirection: 'row', padding: 15, flexWrap: 'wrap' }}>
                                <Text style={SIPCStyles.BoldFont}>Images:</Text>
                                <Image
                                    source={require('../assets/con1.jpg')}
                                    style={{ height: 65, width: 65, margin: 10 }}
                                />
                            </View>
                            <Divider bold={true} />
                            {/* ================ */}
                            <View style={{ flexDirection: 'row', padding: 15 }}>
                                <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>
                                    Date Created:
                                </Text>
                                <Text style={SIPCStyles.ValueFont}>{data.date_created}</Text>
                            </View>
                            <Divider bold={true} />
                            {/* ================ */}
                            <View style={{ flexDirection: 'row', padding: 15 }}>
                                <Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>
                                    Date Completed:
                                </Text>
                                <Text style={SIPCStyles.ValueFont}>{data.last_updated}</Text>
                            </View>
                            <Divider bold={true} />
                        </Surface>
                    ) : null}

                </>
            ) : null}
        </View>
    )
}

export default WorkOrderBox