import {
    View,
    Alert,
    Image,
    TouchableOpacity,
    StatusBar,
    Platform,
    PermissionsAndroid,
    TouchableWithoutFeedback,
    ScrollView,
    Modal,
    Dimensions,
    FlatList,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import {
    Card,
    Text,
    Button,
    TextInput,
    Surface,
    Divider,
    Checkbox,
} from 'react-native-paper';
import SIPCStyles from '../screens/styles'
import ImagePicker from 'react-native-image-crop-picker';
import { MMKV } from 'react-native-mmkv';

const InspectionCheckBox = ({ data, navigation, routeData,Active }) => {


    const storage = new MMKV();
    const jsonUser = storage.getString('user');
    const user = JSON.parse(jsonUser);

    const Width = Dimensions.get('window').width;
    const Height = Dimensions.get('window').height;

    const [satisfactoryChecked, setSatisfactoryChecked] = useState(false);  

    // const satisfactoryValue = satisfactoryChecked ? 1 : 0;
    // // console.log('satisfactoryChecked(8)====>' + satisfactoryValue);


    const [images, setImages] = useState([]);
    const [numColumns, setNumColumns] = useState(3);
    const maxImages = 10;

    const openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            //cropping: true,
        }).then(image => {
            if (images.length + 1 > maxImages) {
                alert(`Max limit reached: ${maxImages}`);
                return;
            }
            setImages([...images, { path: image.path }]);
        });
    };

    const pickImage = () => {
        ImagePicker.openPicker({
            multiple: true,
            maxFiles: maxImages - images.length,
        })
            .then(newImages => {
                if (images.length + newImages.length > maxImages) {
                    alert(`Max limit reached: ${maxImages}`);
                    return;
                }
                setImages([...images, ...newImages.map(i => ({ path: i.path }))]);
            })
            .catch(error => console.error(error));
    };

    const deleteImage = index => {
        setImages(images.filter((_, i) => i !== index));
    };



    // const handleCheck1 = () => {
    //     if (conditionChecked) {
    //         setConditionChecked(false);
    //     }
    //     setSatisfactoryChecked(!satisfactoryChecked);
    // };

    // const handleCheck2 = () => {
    //     if (satisfactoryChecked) {
    //         setSatisfactoryChecked(false);
    //     }
    //     setConditionChecked(!conditionChecked);
    // };






    const CheckBox = ({ condition, }) => {

        const [conditionChecked, setConditionChecked] = useState(false);
        const [isOpen, setIsOpen] = useState(false);

        const value = conditionChecked ? 0 : 1;

        const onCommentImagePress = () => {
            setConditionChecked(true);
            setIsOpen(!isOpen);
          };

          const onPress = () => {
            if (!conditionChecked) {
                setConditionChecked(true);
                setIsOpen(true);
            }
          };

        const checkBoxPress = () => {
            if (!conditionChecked) {
                setConditionChecked(true);
                setIsOpen(true);
            }else if (conditionChecked) {
                setConditionChecked(false);
                setIsOpen(false);
            }
            // console.log('data.user_id(1)====>' + user.id);
            // console.log('data.room_item_id(2)====>' + condition.room_item_id);
            // console.log('data.room_id(3)====>' + routeData.room_id);
            // console.log('data.conditionId(4)====>' + condition.id);
            // console.log('data.inspectionResultId(5)====>' + routeData.inspection_result_id);
            // console.log('data.inspectionTypeId(6)====>' + Active);
            // console.log('data.checked(7)====>' + value);
        }

        return (
            <>
                <View
                    style={[
                        SIPCStyles.CheckboxView,
                        {
                            borderTopRightRadius: 10,
                            borderTopLeftRadius: 10,
                            borderBottomLeftRadius: isOpen  === true ? 0 : 10,
                            borderBottomRightRadius: isOpen  === true ? 0 : 10,
                        },
                    ]}>
                    <View style={{ padding: 10, alignSelf: 'center' }}>
                        <Checkbox
                            status={conditionChecked ? 'checked' : 'unchecked'}
                            onPress={checkBoxPress}
                        />
                    </View>

                    <View style={{ borderWidth: 1, borderColor: '#ccc' }} />

                    <Text
                        style={[
                            SIPCStyles.checkboxFont,
                            { paddingLeft: 10, alignSelf: 'center' },
                        ]}>
                        {condition.condition_name}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            position: 'absolute',
                            right: 0,
                            alignSelf: 'center',
                        }}>
                        {isOpen === true ? (
                            <>
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        setIsOpen(!isOpen);
                                    }}>
                                    <Text
                                        style={[
                                            SIPCStyles.checkboxFont,
                                            { marginHorizontal: 10 },
                                        ]}>
                                        Cancel
                                    </Text>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        setIsOpen(!isOpen);
                                    }}>
                                    <Text
                                        style={[
                                            SIPCStyles.checkboxFont,
                                            { color: '#199be2', marginHorizontal: 10 },
                                        ]}>
                                        Submit
                                    </Text>
                                </TouchableWithoutFeedback>
                            </>
                        ) : (
                            <>
                                <TouchableWithoutFeedback 
                                    onPress={conditionChecked?onCommentImagePress:onPress}
                                    >
                                    <Image
                                        source={require('../assets/msg.png')}
                                        style={SIPCStyles.commentImage}
                                    />
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback
                                    onPress={conditionChecked ? onCommentImagePress : onPress}
                                    >
                                    <Image
                                        source={require('../assets/img.png')}
                                        style={SIPCStyles.commentImage}
                                    />
                                </TouchableWithoutFeedback>
                            </>
                        )}
                    </View>
                </View>

                {isOpen === true ? (
                    <>
                        <View style={{ marginHorizontal: 20 }}>
                            <TextInput
                                mode="text"
                                placeholder="Enter Your Comment"
                                numberOfLines={8}
                                multiline={true}
                                underlineColor="transparent"
                                theme={{ colors: { primary: '#cccccc' } }}
                                style={SIPCStyles.TextInput1}
                            />

                            <View
                                style={{
                                    borderWidth: 1,
                                    paddingBottom: 10,
                                    borderColor: '#ccc',
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: 10,
                                    borderTopLeftRadius: 0,
                                    borderTopRightRadius: 0,
                                }}>
                                <Card style={SIPCStyles.CameraImageCard}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-around',
                                        }}>
                                        <TouchableWithoutFeedback onPress={openCamera}>
                                            <Image
                                                source={require('../assets/camera.png')}
                                                style={SIPCStyles.cameraImage}
                                            />
                                        </TouchableWithoutFeedback>

                                        <View
                                            style={{ borderWidth: 1, borderColor: '#e6e6e6' }}
                                        />

                                        <TouchableWithoutFeedback onPress={pickImage}>
                                            <Image
                                                source={require('../assets/gallery.png')}
                                                style={SIPCStyles.cameraImage}
                                            />
                                        </TouchableWithoutFeedback>
                                    </View>
                                </Card>

                                <View
                                    style={{
                                        marginTop: 10,
                                        flexDirection: 'row',
                                        flexWrap: Width > 500 ? 'wrap' : 'wrap',
                                        flex: 1,
                                    }}>
                                    <ScrollView
                                        nestedScrollEnabled={true}
                                        horizontal={true}>
                                        <FlatList
                                            numColumns={numColumns}
                                            data={images}
                                            keyExtractor={(item, index) => index.toString()}
                                            renderItem={({ item, index }) => (
                                                <View style={{ position: 'relative' }}>
                                                    <Image
                                                        source={{ uri: item.path }}
                                                        style={SIPCStyles.CameraClickImage}
                                                    />
                                                    <TouchableOpacity
                                                        style={SIPCStyles.crossImage}
                                                        onPress={() => deleteImage(index)}>
                                                        <Text
                                                            style={{
                                                                color: 'white',
                                                                fontWeight: 'bold',
                                                            }}>
                                                            X
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )}
                                        />
                                    </ScrollView>
                                </View>
                            </View>
                        </View>
                    </>
                ) : null}

            </>
        )
    }





    return (
        <View style={SIPCStyles.flex}>
            <Surface
                elevation={4}
                style={{
                    marginTop: 25,
                    backgroundColor: 'white',
                    paddingBottom: 20,
                }}>
                <View style={{ backgroundColor: '#fffcf8', padding: 15 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[SIPCStyles.BoldFont, { paddingHorizontal: 15 }]}>
                            {data.item_name}
                        </Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text
                            style={[SIPCStyles.NormalFont, { paddingHorizontal: 15 }]}>
                            {data.conditions.length} {data.conditions.length === 1 ? "Condition" : "Conditions"} |
                        </Text>
                        <Text style={SIPCStyles.NormalFont}>0 Issues</Text>
                    </View>
                </View>

                {/* ==========================CHECKBOX=== satisfactoryChecked=============== */}
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        flexWrap: Width > 500 ? 'wrap' : 'wrap',
                    }}>
                    <View
                        style={{
                            flexDirection: 'column',
                            width: Width > 500 ? '50%' : '100%',
                        }}>
                        <View style={{ flexDirection: 'column' }}>
                            {/* <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}> */}
                            <View style={SIPCStyles.CheckboxView}>
                                <View
                                    style={{
                                        padding: 10,
                                        alignItems: 'center',
                                        alignSelf: 'center',
                                    }}>
                                    <Checkbox
                                        status={satisfactoryChecked ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            console.log("data.room_item_id=>"+data.room_item_id);
                                            console.log("data.room_id=>"+data.room_id);
                                            console.log("inspectionTypeId=>"+Active);
                                            console.log("conditionId=>"+0);
                                            setSatisfactoryChecked(!satisfactoryChecked);
                                        }}
                                    />
                                </View>
                                <View style={{ borderWidth: 1, borderColor: '#ccc' }} />

                                <View
                                    style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text
                                        style={[
                                            SIPCStyles.checkboxFont,
                                            { paddingLeft: 10, color: '#00aa34' },
                                        ]}>
                                        Satisfactory
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* ================= */}
                    <View
                        style={{
                            flexDirection: 'column',
                            width: Width > 500 ? '50%' : '100%',
                        }}>
                        <View style={{ flexDirection: 'column', }}>



                            {/* {data.conditions.map((conditions, id) => (
                                <CheckBox
                                    condition={conditions}
                                    key={id} />
                            ))} */}

                            {data.conditions.map(conditions => (
                                <CheckBox
                                    condition={conditions}
                                    data={data}
                                    key={conditions.id}
                                />
                            ))}

                        </View>
                    </View>
                </View>
            </Surface>
        </View>
    )
}

export default InspectionCheckBox