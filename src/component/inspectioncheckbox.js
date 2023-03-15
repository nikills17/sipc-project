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

const InspectionCheckBox = ({ data, navigation }) => {

    const SatisfactoryPress = () => {
        if (setChecked(!checked) === setChecked1(false)) {
        }
    };

    const Width = Dimensions.get('window').width;
    const Height = Dimensions.get('window').height;

    const [checked, setChecked] = useState(false);
    const [checked1, setChecked1] = useState(false);



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


    const ConditionName = () => {
        
        const [checked1, setChecked1] = useState(false);
        <View
            style={[
                SIPCStyles.CheckboxView,
                {
                    backgroundColor: 'grey',
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: checked1 == 1 ? 0 : 10,
                    borderBottomRightRadius: checked1 == 1 ? 0 : 10,
                },
            ]}>
            <View style={{ padding: 10, alignSelf: 'center' }}>
                <Checkbox
                    status={checked1 ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setChecked1(!checked1);
                    }}
                />
            </View>

            <View style={{ borderWidth: 1, borderColor: '#ccc' }} />

            <Text
                style={[
                    SIPCStyles.checkboxFont,
                    { paddingLeft: 10, alignSelf: 'center' },
                ]}>
                {/* {data[0].conditions[0].condition_name} */}
            </Text>
            <View
                style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    right: 0,
                    alignSelf: 'center',
                }}>
                {checked1 == 1 ? (
                    <>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                setChecked1(!checked1);
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
                                setChecked1(!checked1);
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
                            onPress={() => {
                                setChecked1(!checked1);
                            }}>
                            <Image
                                source={require('../assets/msg.png')}
                                style={SIPCStyles.commentImage}
                            />
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback
                            onPress={() => {
                                setChecked1(!checked1);
                            }}>
                            <Image
                                source={require('../assets/img.png')}
                                style={SIPCStyles.commentImage}
                            />
                        </TouchableWithoutFeedback>
                    </>
                )}
            </View>


        </View>
        {
            checked1 == 1 ? (
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
            ) : null
        }

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
                            3 conditions |
                        </Text>
                        <Text style={SIPCStyles.NormalFont}>0 Issues</Text>
                    </View>
                </View>

                {/* ==========================CHECKBOX============================== */}
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
                                        status={checked ? 'checked' : 'unchecked'}
                                        onPress={SatisfactoryPress}
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
                            <ConditionName />
                        </View>
                    </View>
                </View>
            </Surface>
        </View>
    )
}

export default InspectionCheckBox