import { StyleSheet, TouchableWithoutFeedback, View, Image, } from 'react-native';
import React, { useState } from 'react';
import { Surface, Divider, Text, } from 'react-native-paper';
import { Col, Grid } from 'react-native-easy-grid';
import SIPCStyles from '../screens/styles';

const ViewRoomBox = () => {
    const [Show, setShow] = useState(false);

    return (
        <>
            <Surface
                style={{ padding: 15, marginTop: 20, backgroundColor: Show == true ? '#fffcf8' : 'white', }}>
                <View style={{flexDirection:'row',}}>
                <Col size={70} style={{ justifyContent: 'center', paddingRight: 10 }}>
                    <View style={{ flexDirection: 'column' }}>
                        <View style={[SIPCStyles.ViewRowAlign]}>
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
                            <Text style={SIPCStyles.SurfaceTitle} numberOfLines={1}>302 - Business - Management </Text>
                        </View>
                    </View>
                </Col>
                <Col size={40}>
                    <View style={{ flexDirection: 'row',marginTop:0}}>
                        <Text style={[SIPCStyles.DescriptionHeading,{marginTop:0}]}>Score :</Text>
                        <Text style={[SIPCStyles.DescriptionDetails,{marginTop:0}]}>
                            100.00%
                        </Text>
                    </View>
                </Col>
</View>
            </Surface>
            {Show == true ? (
                <>
                    <Surface style={{ backgroundColor: 'white' }}>
                        <View style={{ flexDirection: 'row', display: 'flex', padding: 15 }}>
                            <Text style={SIPCStyles.DescriptionHeading}>Floor :</Text>
                            <Text style={SIPCStyles.DescriptionDetails}>
                                3rd Floor
                            </Text>
                        </View>


                        <Divider bold={true} />
                        <View style={{ flexDirection: 'row', display: 'flex', padding: 15 }}>
                            <Text style={SIPCStyles.DescriptionHeading}>Room Type :</Text>
                            <Text style={SIPCStyles.DescriptionDetails}>
                                Classroom
                            </Text>
                        </View>
                    </Surface>
                </>
            ) : null}



        </>
    )
}

export default ViewRoomBox;