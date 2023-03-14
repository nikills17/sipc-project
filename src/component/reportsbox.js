import {View, Image, TouchableWithoutFeedback} from 'react-native';
import React, {useState} from 'react';
import {Surface, Divider, Text} from 'react-native-paper';
import SIPCStyles from '../screens/styles';
import moment from 'moment';

const ReportBox = ({data, active}) => {
  const completedDate = data.room_completed_date;
  const parsedDate = moment(completedDate, 'YYYY-MM-DD HH:mm:ss.S');
  const room_completed_date = parsedDate.format('MMM DD, YYYY');

  const checkScore = score => {
    if (score > 90) {
      return (
        <Text style={[SIPCStyles.inspectionScore, SIPCStyles.textSuccess]}>
          {score}%
        </Text>
      );
    } else if (score > 80) {
      return (
        <Text style={[SIPCStyles.inspectionScore, SIPCStyles.textWarning]}>
          {score}%
        </Text>
      );
    } else {
      return (
        <Text style={[SIPCStyles.inspectionScore, SIPCStyles.textDanger]}>
          {score}%
        </Text>
      );
    }
  };

  let SCORE = data.received_score;
  SCORE = parseFloat(SCORE).toFixed(2);

  const [Show, setShow] = useState(false);

  const startDate = new Date(data.survey_create_date);
  const endDate = new Date(data.last_updated);
  const formattedStartDate = startDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const formattedEndDate = endDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <View>
      {(active === 1 || active === 2) && (
        <>
          <Surface
            style={{
              marginTop: 20,
              padding: 15,
              backgroundColor: Show == true ? '#fffcf8' : 'white',
            }}>
            <View style={{flexDirection: 'column'}}>
              <View style={SIPCStyles.ViewRowAlign}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    setShow(!Show);
                  }}>
                  {Show == true ? (
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
                <Text style={[SIPCStyles.SurfaceTitle, {flex: 1}]}>
                  {data.survey_name}
                </Text>
              </View>

              <View style={SIPCStyles.healthImageView}>
                <Image
                  source={require('../assets/ii.png')}
                  style={SIPCStyles.healthImage}
                />
                <Text style={[SIPCStyles.SurfaceType, {flex: 1}]}>
                  {data.survey_type}
                </Text>
              </View>
            </View>
          </Surface>

          {Show === true ? (
            <>
              <Surface style={{backgroundColor: 'white', padding: 15}}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../assets/building.png')}
                    style={SIPCStyles.healthImage}
                  />
                  <Text style={SIPCStyles.SurfaceType}>
                    {data.building_name}
                  </Text>
                </View>
              </Surface>

              <Surface style={{backgroundColor: 'white', padding: 15}}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={require('../assets/Bank.png')}
                    style={SIPCStyles.healthImage}
                  />
                  <Text style={SIPCStyles.SurfaceType}>
                    {data.organization_name}
                  </Text>
                </View>
              </Surface>

              <Surface style={{backgroundColor: 'white', padding: 15}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                      Survey Score:
                    </Text>
                    <Text style={SIPCStyles.ValueFont}>
                      {data.received_score}
                    </Text>
                    {/* <Text style={[SIPCStyles.ValueFont,
                  data.received_score > 90 ? SIPCStyles.textSuccess :
                  data.received_score > 80 ? SIPCStyles.textWarning :
                     SIPCStyles.textDanger]}>{data.received_score}%</Text> */}
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                      Total Score:
                    </Text>
                    <Text style={SIPCStyles.ValueFont}>{data.total_score}</Text>
                  </View>
                </View>
              </Surface>

              <Surface style={{backgroundColor: 'white', padding: 15}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                      Created:
                    </Text>
                    <Text style={SIPCStyles.ValueFont}>
                      {formattedStartDate}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                      Submitted:
                    </Text>
                    <Text style={SIPCStyles.ValueFont}>{formattedEndDate}</Text>
                  </View>
                </View>
              </Surface>
            </>
          ) : null}
        </>
      )}

      {active === 3 && (
        <>
          <Surface
            style={{
              marginTop: 20,
              padding: 15,
              backgroundColor: Show == true ? '#fffcf8' : 'white',
            }}>
            <View style={{flexDirection: 'column'}}>
              <View style={SIPCStyles.ViewRowAlign}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    setShow(!Show);
                  }}>
                  {Show == true ? (
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
                <Text style={SIPCStyles.SurfaceTitle}>{data.date_created}</Text>
              </View>

              <View style={SIPCStyles.healthImageView}>
                <Image
                  source={require('../assets/building.png')}
                  style={SIPCStyles.healthImage}
                />
                <Text style={SIPCStyles.SurfaceType}>{data.building_name}</Text>
              </View>
            </View>
          </Surface>

          {Show == true ? (
            <>
              <Surface style={{backgroundColor: 'white', padding: 15}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                      Rooms:
                    </Text>
                    <Text style={SIPCStyles.ValueFont}>{data.total_room}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                      Type:
                    </Text>
                    <Text style={SIPCStyles.ValueFont}>
                      {data.inspection_type_id === '2'
                        ? 'Maintenance'
                        : 'Cleaning'}
                    </Text>
                  </View>
                  {/* <Text
                    style={[SIPCStyles.ValueFont, { color: '#1485cc' }]}
                    onPress={() => {
                      navigation.navigate('InspectionViewRoom', {
                        inspectionResultId: data.id,
                      });
                    }}>
                    View Rooms
                  </Text> */}
                </View>
              </Surface>

              <Surface style={{backgroundColor: 'white', padding: 15}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                      Score:
                    </Text>
                    {checkScore(SCORE)}

                    {/* <Text style={[SIPCStyles.inspectionScore,
                    data.received_score > 90 ? SIPCStyles.textSuccess :
                        data.received_score > 80 ? SIPCStyles.textWarning :
                            SIPCStyles.textDanger]}>{data.received_score}%</Text> */}
                  </View>
                  {data.is_completed == '1' ? (
                    <View style={{flexDirection: 'row'}}>
                      <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                        Status:
                      </Text>
                      <Text
                        style={[
                          SIPCStyles.inspectionScore,
                          SIPCStyles.textSuccess,
                        ]}>
                        Completed
                      </Text>
                    </View>
                  ) : (
                    <View style={{flexDirection: 'row'}}>
                      <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                        Status:
                      </Text>
                      <Text
                        style={[
                          SIPCStyles.inspectionScore,
                          SIPCStyles.textWarning,
                        ]}>
                        In Progress
                      </Text>
                    </View>
                  )}
                </View>
              </Surface>

              <Surface style={{backgroundColor: 'white', padding: 15}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                      Inspector:
                    </Text>
                    <Text style={SIPCStyles.ValueFont}>
                      {data.inspector_first_name} {data.inspector_last_name}
                    </Text>
                  </View>
                </View>
              </Surface>
            </>
          ) : null}
        </>
      )}

      {active === 4 && (
        <>
          {/* ===================== */}
          <Surface
            style={{
              marginTop: 20,
              padding: 15,
              backgroundColor: Show === true ? '#fffcf8' : 'white',
            }}>
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
                <Text style={SIPCStyles.SurfaceTitle}> {data.item_name}</Text>
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
          </Surface>
          <Divider bold={true} />

          {Show === true ? (
            <Surface style={{backgroundColor: 'white'}}>
              {/* {data.location_type_id === '1' ? ( */}
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
                    <Text style={SIPCStyles.SurfaceType}>{data.room_name}</Text>
                  </View>
                </View>
                <Divider bold={true} />
              </>
              {/* ) : (
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
              )} */}

              {/* =================================== */}

              {/* <View
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
                  textStyle={[
                    SIPCStyles.textSize,
                    SIPCStyles.textSize,
                    {
                      color:
                        workOrderStatus === '-1' ? '#e63757' : workOrderStatus === '0' ? '#f6c343' : '#00d97e',
                    },
                  ]}
                  dropDownContainerStyle={SIPCStyles.dropDownContainerStyle}
                  labelStyle={[SIPCStyles.DropDownLabelFont, { paddingHorizontal: 5 }]}
                  open={showDropDown1}
                  value={workOrderStatus}
                  items={statusList}
                  setOpen={setShowDropDown1}
                  setValue={setWorkOrderStatus}
                  onSelectItem={(item) => {
                    console.log(item);
                    if (currentWOStatus == "0" && item.value == "-1") {
                      //changing In-Progress to Unassign
                      updateWorkOrderStatus(data.id, item.value, navigation);
                    }
                    //handleDropDownChange(item);
                  }}
                />
              </View> */}

              <Divider bold={true} />
              {/* ================== */}
              {/*  */}
              {/* ================ */}
              <View style={{flexDirection: 'row', padding: 15}}>
                <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                  Assigned To:
                </Text>
                <Text style={SIPCStyles.ValueFont}>
                  {data.assigned_username === ''
                    ? 'Unassigned'
                    : data.assigned_username}
                </Text>
              </View>
              <Divider bold={true} />
              {/* ================ */}

              <View style={{flexDirection: 'row', padding: 15}}>
                <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                  Status:
                </Text>
                <Text style={SIPCStyles.ValueFont}>
                  {data.work_order_status === '0'
                    ? 'Unassigned'
                    : data.work_order_status}
                </Text>
              </View>
              <Divider bold={true} />

              {/* ================ */}
              <View style={{flexDirection: 'row', padding: 15}}>
                <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                  Inspector:
                </Text>
                <Text style={SIPCStyles.ValueFont}>
                  {data.inspector_first_name} {data.inspector_last_name}
                </Text>
              </View>
              <Divider bold={true} />

              {/* ================ */}
              <View style={{flexDirection: 'row', padding: 15}}>
                <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                  Issue Type:
                </Text>
                <Text style={SIPCStyles.ValueFont}>
                  {data.inspection_type_id === '2' ? 'Maintenance' : 'Cleaning'}
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
                {data.image ? (
                  <Image
                    source={{uri: data.image}}
                    style={{height: 65, width: 65, margin: 10}}
                  />
                ) : null}
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
                <Text style={SIPCStyles.ValueFont}>{room_completed_date}</Text>
              </View>
              <Divider bold={true} />
              {/* ================ */}

              <View style={{flexDirection: 'row', padding: 15}}>
                <Text style={[SIPCStyles.BoldFont, {paddingRight: 10}]}>
                  Completed By:
                </Text>
                <Text style={SIPCStyles.ValueFont}></Text>
              </View>
              <Divider bold={true} />
              {/* ================ */}
            </Surface>
          ) : null}

          {/* ===================== */}
        </>
      )}
    </View>
  );
};

export default ReportBox;
