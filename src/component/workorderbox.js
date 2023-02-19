import {
  View,
  Alert,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  Button,
  Card,
  Searchbar,
  TextInput,
  Surface,
  Divider,
  Text,
} from 'react-native-paper';
import Icon2 from 'react-native-vector-icons/Entypo';
import SIPCStyles from '../screens/styles';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation} from '@react-navigation/native';
import {Col, Grid} from 'react-native-easy-grid';

const WorkOrderBox = ({data, Active, navigation}) => {
  const images = data.images.split(',');

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

  const dropDownData = {
    '-1': 'UNASSIGNED',
    0: 'IN-PROGRESS',
    1: 'COMPLETED',
  };

  const [showDropDown1, setShowDropDown1] = useState(false);
  const [Group, setGroup] = useState(data.work_order_status);

  const GroupList = [
    {
      label: dropDownData[-1],
      value: '-1',
    },
    {
      label: dropDownData[0],
      value: '0',
    },
    {
      label: dropDownData[1],
      value: '1',
    },
  ];

  const handleDropDownChange = () => {
    if (Group === '0') {
      navigation.navigate('Assignment');
    } else if (Group === '1') {
      navigation.navigate('Assignment');
    }
  };

  // //  -----------------InProgress DropDown
  // const [showDropDown2, setShowDropDown2] = useState(false);
  // const [Group2, setGroup2] = useState(data.work_order_status);
  // const GroupList2 = ([
  //     {
  //         label: dropDownData[-1],
  //         value: '-1',
  //     },
  //     {
  //         label: dropDownData[0],
  //         value: '0',
  //     },
  //     {
  //         label: dropDownData[1],
  //         value: '1',
  //     },
  // ]);

  // const handleDropDownChange2 = () => {
  //     if (Group2 === '-1') {
  //         navigation.navigate('Assignment');
  //     } else if (Group2 === '1') {
  //         navigation.navigate('Assignment');
  //     }
  // };
  // //  -----------------Completed DropDown
  // const [showDropDown3, setShowDropDown3] = useState(false);
  // const [Group3, setGroup3] = useState(data.work_order_status);
  // const [GroupList3, setGroupList3] = useState([
  //     {
  //         label: dropDownData[-1],
  //         value: '-1',
  //     },
  //     {
  //         label: dropDownData[0],
  //         value: '0',
  //     },
  //     {
  //         label: dropDownData[1],
  //         value: '1',
  //     },
  // ]);

  // const handleDropDownChange3 = () => {
  //     if (Group3 === '0') {
  //         navigation.navigate('Assignment');
  //     } else if (Group3 === '1') {
  //         navigation.navigate('Assignment');
  //     }
  // };

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
            <Grid>
              <Col
                size={85}
                style={{justifyContent: 'center', paddingRight: 10}}>
                <View style={{flexDirection: 'column'}}>
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
                      {' '}
                      {data.item_name}
                    </Text>
                  </View>

                  <View style={SIPCStyles.healthImageView}>
                    <Image
                      source={require('../assets/ii.png')}
                      style={SIPCStyles.healthImage}
                    />
                    <Text style={SIPCStyles.SurfaceType}>
                      {data.condition_name}
                    </Text>
                  </View>
                </View>
              </Col>
              <Col size={15} style={{alignItems: 'center'}}>
                <TouchableWithoutFeedback>
                  <Image
                    source={require('../assets/print.png')}
                    style={SIPCStyles.playImage}
                  />
                </TouchableWithoutFeedback>
                <Text style={[SIPCStyles.SurfacePlayImageText, {}]}>
                  Print{' '}
                </Text>
              </Col>
            </Grid>
          </Surface>
          <Divider bold={true} />

          {Show === true ? (
            <Surface style={{backgroundColor: 'white'}}>
              {data.location_type_id === '1' ? (
                <>
                  <View style={{flexDirection: 'row', padding: 15}}>
                    <Image
                      source={require('../assets/building.png')}
                      style={SIPCStyles.MainBuilding}
                    />
                    <Text style={SIPCStyles.SurfaceType}>
                      {data.building_name}
                    </Text>
                  </View>
                  <Divider bold={true} />
                  {/* ================ */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                    }}>
                    <View style={{flexDirection: 'row', padding: 15}}>
                      <Image
                        source={require('../assets/floor.png')}
                        style={SIPCStyles.MainBuilding}
                      />
                      <Text style={SIPCStyles.SurfaceType}>
                        {data.floor_name}
                      </Text>
                    </View>

                    <View style={{flexDirection: 'row', padding: 15}}>
                      <Image
                        source={require('../assets/room.png')}
                        style={SIPCStyles.MainBuilding}
                      />
                      <Text style={SIPCStyles.SurfaceType}>
                        {data.room_name}
                      </Text>
                    </View>
                  </View>
                  <Divider bold={true} />
                </>
              ) : (
                <>
                  <View style={{flexDirection: 'row', padding: 15}}>
                    <Image
                      source={require('../assets/location.png')}
                      style={SIPCStyles.MainBuilding}
                    />
                    <Text style={SIPCStyles.SurfaceType}>{data.location}</Text>
                  </View>
                  <Divider bold={true} />
                </>
              )}

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
                        style={{paddingHorizontal: 5}}
                        name="chevron-down"
                      />
                    );
                  }}
                  ArrowUpIconComponent={() => {
                    return (
                      <FontAwesome
                        size={18}
                        color={'#818081'}
                        style={{paddingHorizontal: 5}}
                        name="chevron-up"
                      />
                    );
                  }}
                  style={SIPCStyles.DropDownPicker}
                  textStyle={[
                    SIPCStyles.textSize,
                    SIPCStyles.textSize,
                    {
                      color:
                        Group === '-1'
                          ? '#e63757'
                          : Group === '0'
                          ? '#f6c343'
                          : '#00d97e',
                    },
                  ]}
                  dropDownContainerStyle={SIPCStyles.dropDownContainerStyle}
                  labelStyle={[SIPCStyles.RedColor, {paddingHorizontal: 5}]}
                  open={showDropDown1}
                  value={Group}
                  items={GroupList}
                  setOpen={setShowDropDown1}
                  setValue={setGroup}
                  onChangeValue={value => {
                    handleDropDownChange(value);
                  }}
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
                <View style={{flexDirection: 'row'}}>
                  <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                    Assigned To:
                  </Text>
                  <Text style={SIPCStyles.ValueFont}>
                    {data.assigned_firstname}
                  </Text>
                </View>
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate('Assignment');
                  }}>
                  <Text style={[SIPCStyles.ValueFont, {color: '#1485cc'}]}>
                    Edit
                  </Text>
                </TouchableWithoutFeedback>
              </View>
              <Divider bold={true} />
              {/* ================ */}
              <View style={{flexDirection: 'row', padding: 15}}>
                <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                  Created By:
                </Text>
                <Text style={SIPCStyles.ValueFont}></Text>
              </View>
              <Divider bold={true} />
              {/* ================ */}
              <View style={{flexDirection: 'row', padding: 15}}>
                <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                  Due Date:
                </Text>
                <Text style={SIPCStyles.ValueFont}></Text>
              </View>
              <Divider bold={true} />
              {/* ================ */}
              <View style={{flexDirection: 'row', padding: 15}}>
                <Text style={[SIPCStyles.BoldFont]}>Comment:</Text>
                <Text
                  style={[
                    SIPCStyles.ValueFont,
                    {paddingHorizontal: 10, flex: 1},
                  ]}>
                  {data.comment}
                </Text>
              </View>
              <Divider bold={true} />
              {/* ======================== */}
              <View
                style={{flexDirection: 'row', padding: 15, flexWrap: 'wrap'}}>
                <Text style={SIPCStyles.BoldFont}>Images:</Text>
                {images.map((image, index) => (
                  <Image
                    key={index}
                    source={{uri: data.image_path + image}}
                    style={{height: 65, width: 65, margin: 10}}
                  />
                ))}
              </View>
              <Divider bold={true} />
              {/* ================ */}
              <View style={{flexDirection: 'row', padding: 15}}>
                <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                  Date Created:
                </Text>
                <Text style={SIPCStyles.ValueFont}>{data.date_created}</Text>
              </View>
              <Divider bold={true} />
              {/* ================ */}
              <View style={{flexDirection: 'row', padding: 15}}>
                <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                  Date Completed:
                </Text>
                <Text style={SIPCStyles.ValueFont}>{data.completed_date}</Text>
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
            <Grid>
              <Col
                size={85}
                style={{justifyContent: 'center', paddingRight: 10}}>
                <View style={{flexDirection: 'column'}}>
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
                    <Text style={SIPCStyles.SurfaceType}>
                      {data.condition_name}
                    </Text>
                  </View>
                </View>
              </Col>

              <Col size={15} style={{alignItems: 'center'}}>
                <TouchableWithoutFeedback>
                  <Image
                    source={require('../assets/print.png')}
                    style={SIPCStyles.playImage}
                  />
                </TouchableWithoutFeedback>
                <Text style={[SIPCStyles.SurfacePlayImageText, {}]}>
                  Print{' '}
                </Text>
              </Col>
            </Grid>
          </Surface>
          <Divider bold={true} />

          {Show === true ? (
            <Surface style={{backgroundColor: 'white'}}>
              {data.location_type_id === '1' ? (
                <>
                  <View style={{flexDirection: 'row', padding: 15}}>
                    <Image
                      source={require('../assets/building.png')}
                      style={SIPCStyles.MainBuilding}
                    />
                    <Text style={SIPCStyles.SurfaceType}>
                      {data.building_name}
                    </Text>
                  </View>
                  <Divider bold={true} />
                  {/* ================ */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                    }}>
                    <View style={{flexDirection: 'row', padding: 15}}>
                      <Image
                        source={require('../assets/floor.png')}
                        style={SIPCStyles.MainBuilding}
                      />
                      <Text style={SIPCStyles.SurfaceType}>
                        {data.floor_name}
                      </Text>
                    </View>

                    <View style={{flexDirection: 'row', padding: 15}}>
                      <Image
                        source={require('../assets/room.png')}
                        style={SIPCStyles.MainBuilding}
                      />
                      <Text style={SIPCStyles.SurfaceType}>
                        {data.room_name}
                      </Text>
                    </View>
                  </View>
                  <Divider bold={true} />
                </>
              ) : (
                <>
                  <View style={{flexDirection: 'row', padding: 15}}>
                    <Image
                      source={require('../assets/location.png')}
                      style={SIPCStyles.MainBuilding}
                    />
                    <Text style={SIPCStyles.SurfaceType}>{data.location}</Text>
                  </View>
                  <Divider bold={true} />
                </>
              )}

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
                        style={{paddingHorizontal: 5}}
                        name="chevron-down"
                      />
                    );
                  }}
                  ArrowUpIconComponent={() => {
                    return (
                      <FontAwesome
                        size={18}
                        color={'#818081'}
                        style={{paddingHorizontal: 5}}
                        name="chevron-up"
                      />
                    );
                  }}
                  style={SIPCStyles.DropDownPicker}
                  textStyle={SIPCStyles.textSize}
                  dropDownContainerStyle={SIPCStyles.dropDownContainerStyle}
                  labelStyle={[SIPCStyles.RedColor, {paddingHorizontal: 5}]}
                  open={showDropDown1}
                  value={Group}
                  items={GroupList}
                  setOpen={setShowDropDown1}
                  setValue={setGroup}
                  onChangeValue={value => {
                    handleDropDownChange(value);
                  }}
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
                <View style={{flexDirection: 'row'}}>
                  <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                    Assigned To:
                  </Text>
                  <Text style={SIPCStyles.ValueFont}>
                    {data.assigned_firstname}
                  </Text>
                </View>
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate('Assignment');
                  }}>
                  <Text style={[SIPCStyles.ValueFont, {color: '#1485cc'}]}>
                    Edit
                  </Text>
                </TouchableWithoutFeedback>
              </View>
              <Divider bold={true} />
              {/* ================ */}
              <View style={{flexDirection: 'row', padding: 15}}>
                <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                  Created By:
                </Text>
                <Text style={SIPCStyles.ValueFont}></Text>
              </View>
              <Divider bold={true} />
              {/* ================ */}
              <View style={{flexDirection: 'row', padding: 15}}>
                <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                  Due Date:
                </Text>
                <Text style={SIPCStyles.ValueFont}>
                  {data.assigned_firstname}
                </Text>
              </View>
              <Divider bold={true} />
              {/* ================ */}
              <View style={{flexDirection: 'row', padding: 15}}>
                <Text style={[SIPCStyles.BoldFont]}>Comment:</Text>
                <Text
                  style={[
                    SIPCStyles.ValueFont,
                    {paddingHorizontal: 10, flex: 1},
                  ]}>
                  {data.comment}
                </Text>
              </View>
              <Divider bold={true} />
              {/* ======================== */}
              <View
                style={{flexDirection: 'row', padding: 15, flexWrap: 'wrap'}}>
                <Text style={SIPCStyles.BoldFont}>Images:</Text>

                {images.map((image, index) => (
                  <Image
                    key={index}
                    source={{uri: data.image_path + image}}
                    style={{height: 65, width: 65, margin: 10}}
                  />
                ))}
              </View>
              <Divider bold={true} />
              {/* ================ */}
              <View style={{flexDirection: 'row', padding: 15}}>
                <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                  Date Created:
                </Text>
                <Text style={SIPCStyles.ValueFont}>{data.date_created}</Text>
              </View>
              <Divider bold={true} />
              {/* ================ */}
              <View style={{flexDirection: 'row', padding: 15}}>
                <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                  Date Completed:
                </Text>
                <Text style={SIPCStyles.ValueFont}>{data.completed_date}</Text>
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
            style={{
              marginTop: 20,
              padding: 15,
              backgroundColor: Show === true ? '#fffcf8' : 'white',
            }}>
            <Grid>
              <Col
                size={85}
                style={{justifyContent: 'center', paddingRight: 10}}>
                <View style={{flexDirection: 'column'}}>
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
                    <Text style={SIPCStyles.SurfaceType}>
                      {data.condition_name}
                    </Text>
                  </View>
                </View>
              </Col>

              <Col size={15} style={{alignItems: 'center'}}>
                <TouchableWithoutFeedback>
                  <Image
                    source={require('../assets/print.png')}
                    style={SIPCStyles.playImage}
                  />
                </TouchableWithoutFeedback>
                <Text style={[SIPCStyles.SurfacePlayImageText, {}]}>
                  Print{' '}
                </Text>
              </Col>
            </Grid>
          </Surface>
          <Divider bold={true} />

          {Show === true ? (
            <Surface style={{backgroundColor: 'white'}}>
              {data.location_type_id === '1' ? (
                <>
                  <View style={{flexDirection: 'row', padding: 15}}>
                    <Image
                      source={require('../assets/building.png')}
                      style={SIPCStyles.MainBuilding}
                    />
                    <Text style={SIPCStyles.SurfaceType}>
                      {data.building_name}
                    </Text>
                  </View>
                  <Divider bold={true} />
                  {/* ================ */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                    }}>
                    <View style={{flexDirection: 'row', padding: 15}}>
                      <Image
                        source={require('../assets/floor.png')}
                        style={SIPCStyles.MainBuilding}
                      />
                      <Text style={SIPCStyles.SurfaceType}>
                        {data.floor_name}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        padding: 15,
                        flexWrap: 'wrap',
                      }}>
                      <Image
                        source={require('../assets/room.png')}
                        style={SIPCStyles.MainBuilding}
                      />
                      <Text style={[SIPCStyles.SurfaceType, {}]}>
                        {data.room_name}
                      </Text>
                    </View>
                  </View>
                  <Divider bold={true} />
                </>
              ) : (
                <>
                  <View style={{flexDirection: 'row', padding: 15}}>
                    <Image
                      source={require('../assets/location.png')}
                      style={SIPCStyles.MainBuilding}
                    />
                    <Text style={SIPCStyles.SurfaceType}>{data.location}</Text>
                  </View>
                  <Divider bold={true} />
                </>
              )}

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
                        style={{paddingHorizontal: 5}}
                        name="chevron-down"
                      />
                    );
                  }}
                  ArrowUpIconComponent={() => {
                    return (
                      <FontAwesome
                        size={18}
                        color={'#818081'}
                        style={{paddingHorizontal: 5}}
                        name="chevron-up"
                      />
                    );
                  }}
                  style={SIPCStyles.DropDownPicker}
                  textStyle={SIPCStyles.textSize}
                  dropDownContainerStyle={SIPCStyles.dropDownContainerStyle}
                  labelStyle={[SIPCStyles.RedColor, {paddingHorizontal: 5}]}
                  open={showDropDown1}
                  value={Group}
                  items={GroupList}
                  setOpen={setShowDropDown1}
                  setValue={setGroup}
                  onChangeValue={value => {
                    handleDropDownChange(value);
                  }}
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
                <View style={{flexDirection: 'row'}}>
                  <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                    Assigned To:
                  </Text>
                  <Text style={SIPCStyles.ValueFont}>
                    {data.assigned_firstname}
                  </Text>
                </View>
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate('Assignment');
                  }}>
                  <Text style={[SIPCStyles.ValueFont, {color: '#1485cc'}]}>
                    Edit
                  </Text>
                </TouchableWithoutFeedback>
              </View>
              <Divider bold={true} />
              {/* ================ */}
              <View style={{flexDirection: 'row', padding: 15}}>
                <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                  Created By:
                </Text>
                <Text style={SIPCStyles.ValueFont}></Text>
              </View>
              <Divider bold={true} />
              {/* ================ */}
              <View style={{flexDirection: 'row', padding: 15}}>
                <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                  Due Date:
                </Text>
                <Text style={SIPCStyles.ValueFont}></Text>
              </View>
              <Divider bold={true} />
              {/* ================ */}
              <View style={{flexDirection: 'row', padding: 15}}>
                <Text style={[SIPCStyles.BoldFont]}>Comment:</Text>
                <Text
                  style={[
                    SIPCStyles.ValueFont,
                    {paddingHorizontal: 10, flex: 1},
                  ]}>
                  {data.comment}
                </Text>
              </View>
              <Divider bold={true} />
              {/* ======================== */}
              <View
                style={{flexDirection: 'row', padding: 15, flexWrap: 'wrap'}}>
                <Text style={SIPCStyles.BoldFont}>Images:</Text>
                {images.map((image, index) => (
                  <Image
                    key={index}
                    source={{uri: data.image_path + image}}
                    style={{height: 65, width: 65, margin: 10}}
                  />
                ))}
              </View>
              <Divider bold={true} />
              {/* ================ */}
              <View style={{flexDirection: 'row', padding: 15}}>
                <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                  Date Created:
                </Text>
                <Text style={SIPCStyles.ValueFont}>{data.date_created}</Text>
              </View>
              <Divider bold={true} />
              {/* ================ */}
              <View style={{flexDirection: 'row', padding: 15}}>
                <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                  Date Completed:
                </Text>
                <Text style={SIPCStyles.ValueFont}>{data.completed_date}</Text>
              </View>
              <Divider bold={true} />
            </Surface>
          ) : null}
        </>
      ) : null}
    </View>
  );
};

export default WorkOrderBox;
