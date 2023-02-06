import { View, Alert, Image, TouchableOpacity, StatusBar, Platform, PermissionsAndroid, TouchableWithoutFeedback, ScrollView, Modal, Dimensions, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Card, Text, Button, TextInput, Surface, Divider, Checkbox, RadioButton } from 'react-native-paper';
import Icon2 from 'react-native-vector-icons/Entypo';
import SIPCStyles from './styles';
import Entypo from 'react-native-vector-icons/Entypo';
import DropDownPicker from 'react-native-dropdown-picker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import moment from "moment";



const SaveSurvey = ({ navigation }) => {

const [RadioChecked, setRadioChecked] = useState();
const [Checked, setChecked] = useState(false);
const [Checked1, setChecked1] = useState(false);

// const [SecChecked, setSecChecked] = useState()
{/* ===================== MODAL================ */ }
const [visible, setVisible] = useState(false);
const showModal = () => setVisible(true);
const hideModal = () => setVisible(false);

const [Active, setActive] = useState(0);
const [SubActive, setSubActive] = useState(0)

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;


// =============================

// const switch_yes = () => {
//     if (setChecked(!Checked) === setChecked1(false)) {
//     }
// };

// const switch_no = () => {
//     if (setChecked1(!Checked1) === setChecked(false)) {
//     }
// };

const switch_tab = (x) => {
if (x == Active) {
setActive(0);
} else {
setActive(x);
}
};

const switch_subSec = (x) => {
if (x == SubActive) {
setSubActive(0);
} else {
setSubActive(x);
}
};


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
    maxFiles: maxImages - images.length
  }).then((newImages) => {
    if (images.length + newImages.length > maxImages) {
      alert(`Max limit reached: ${maxImages}`);
      return;
    }
    setImages([...images, ...newImages.map((i) => ({ path: i.path }))]);
  }).catch(error => console.error(error));
};

const deleteImage = (index) => {
  setImages(images.filter((_, i) => i !== index));
};

return (
<View style={SIPCStyles.flex}>
<StatusBar barStyle={"dark-content"} backgroundColor="#3a7fc4" />
<ScrollView>
{/* ======================HEader============================================= */}
<Surface style={[SIPCStyles.headerSurface, { alignItems: 'center' }]}>
<TouchableWithoutFeedback onPress={() => navigation.goBack()}>
<Image source={require('../assets/left.png')}
style={SIPCStyles.headerManImage}
/>
</TouchableWithoutFeedback>


<View style={{ marginHorizontal: 10, }}>

<Text style={[SIPCStyles.NormalFont, { width: Width / 2, }]} numberOfLines={1}>Survey: Annual Health Life Safety Survey</Text>

</View>

<TouchableWithoutFeedback onPress={showModal}>
<View style={{ flexDirection: 'row', alignItems: 'center' }}>
<Text style={[SIPCStyles.NormalFont, { color: '#199be2' }]}>Save/Submit</Text>
{visible == true ?
<Entypo size={18} color={'#818081'} style={{ paddingHorizontal: 5, alignSelf: 'center' }} name="chevron-up" />
:
<Entypo size={18} color={'#818081'} style={{ paddingHorizontal: 5, alignSelf: 'center' }} name="chevron-down" />

}

</View>
</TouchableWithoutFeedback>
</Surface>
<Divider bold={true} />
{/* ============================================================ */}
<Surface elevation={4} style={{ marginTop: 25, backgroundColor: 'white', }}>

<View style={{ backgroundColor: Active == 1 ? '#fffcf8' : 'white', padding: 15, }}>

<View style={[SIPCStyles.ViewRowAlign, { alignItems: 'center' }]} >
<TouchableWithoutFeedback onPress={() => { switch_tab(1) }}>
{Active == 1 ?

<Image source={require('../assets/minus.png')} style={SIPCStyles.PlusMinusImage} />
:
<Image source={require('../assets/plus.png')} style={SIPCStyles.PlusMinusImage} />

}
</TouchableWithoutFeedback>
<Text style={[SIPCStyles.BoldFont, { paddingHorizontal: 15 }]}>Fire Alarm</Text>
</View>
</View>
<Divider bold={true} />

{Active == 1 ?
<>
<View style={{ paddingVertical: 20, }}>
<View style={{ flexDirection: 'row', paddingHorizontal: 15 }}>
<Image source={require('../assets/question.png')}
style={SIPCStyles.headerManImage}
/>
<Text style={[SIPCStyles.SemiBold, { flex: 1, paddingLeft: 15 }]}>Fire Alarm System - Has the Fire Alarm System been Tested and Inspected?</Text>
</View>

{/* ==========================CHECKBOX============================== */}
<View style={{ flexDirection: 'row',justifyContent: 'space-around', flexWrap: 'wrap',}}>

<View style={{ flexDirection: 'column', width: deviceWidth > 500 ? '50%' : '100%', }}>
<View style={{flexDirection:'column'}}>
<View style={[SIPCStyles.CheckboxView, { borderTopRightRadius: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: Checked == 1 ? 0 : 10, borderBottomRightRadius: Checked == 1 ? 0 : 10, }]}>

<View style={{ padding: 10, alignSelf: 'center' }}>

<Checkbox
status={Checked ? 'checked' : 'unchecked'}
onPress={() => {
setChecked(!Checked)
}}
/>
</View>

<View style={{ borderWidth: 1, borderColor: '#ccc', }} />

<Text style={[SIPCStyles.checkboxFont, { paddingLeft: 10, alignSelf: 'center' }]}>Yes</Text>
<View style={{ flexDirection: 'row', position: 'absolute', right: 0, alignSelf: 'center' }}>

{Checked == 1 ?
<>
<TouchableWithoutFeedback onPress={() => {
setChecked(!Checked);
}}>
<Text style={[SIPCStyles.checkboxFont, { marginHorizontal: 10 }]}>Cancel</Text>
</TouchableWithoutFeedback>

<TouchableWithoutFeedback onPress={() => {
setChecked(!Checked);
}}>
<Text style={[SIPCStyles.checkboxFont, { color: '#199be2', marginHorizontal: 10 }]}>Submit</Text>
</TouchableWithoutFeedback>
</>

:
<>
<TouchableWithoutFeedback onPress={() => {
setChecked(!Checked);
}}>
<Image source={require('../assets/msg.png')}
style={SIPCStyles.commentImage} />
</TouchableWithoutFeedback>

<TouchableWithoutFeedback onPress={() => {
setChecked(!Checked);
}}>
<Image source={require('../assets/img.png')}
style={SIPCStyles.commentImage} />
</TouchableWithoutFeedback>
</>
}

</View>


</View>
{Checked == 1 ?

<View style={[SIPCStyles.CheckBox,{ marginHorizontal: 20, }]}>

<TextInput
mode="text"
//  label="Outlined input"
placeholder="Enter Your Comment"
numberOfLines={8}
multiline={true}
underlineColor="transparent"
theme={{ colors: { primary: '#cccccc' } }}
style={SIPCStyles.TextInput1}

/>

<View style={{ borderWidth: 1, paddingBottom: 10, borderColor: '#ccc', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
<Card style={SIPCStyles.CameraImageCard}>
<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
<TouchableWithoutFeedback onPress={() => openCamera()}>
<Image source={require('../assets/camera.png')} style={SIPCStyles.cameraImage} />
</TouchableWithoutFeedback>

<View style={{ borderWidth: 1, borderColor: '#e6e6e6' }} />

<TouchableWithoutFeedback onPress={pickImage}>
<Image source={require('../assets/gallery.png')} style={SIPCStyles.cameraImage} />
</TouchableWithoutFeedback>


</View>
</Card>

<View style={{ marginTop: 10, flexDirection: 'row', flexWrap: deviceWidth > 500 ? 'wrap' : 'wrap', flex: 1 }}>

<ScrollView nestedScrollEnabled={true} horizontal={true}>
<FlatList
        numColumns={numColumns}
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{ position: 'relative' }}>
            <Image source={{ uri: item.path }} style={SIPCStyles.CameraClickImage} />
            <TouchableOpacity
              style={SIPCStyles.crossImage}
              onPress={() => deleteImage(index)}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
</ScrollView>
</View>
</View>

</View>
: null}
</View>
</View>
{/* ==========================CHECKBOX============================== */}

<View style={{ flexDirection: 'column', width: deviceWidth > 500 ? '50%' : '100%', }}>
<View style={{flexDirection:'column'}}>
<View style={[SIPCStyles.CheckboxView, { borderTopRightRadius: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: Checked1 == 1 ? 0 : 10, borderBottomRightRadius: Checked1 == 1 ? 0 : 10, }]}>

<View style={{ padding: 10, alignSelf: 'center' }}>

<Checkbox
status={Checked1 ? 'checked' : 'unchecked'}
onPress={() => {
setChecked1(!Checked1)
}}
/>
</View>

<View style={{ borderWidth: 1, borderColor: '#ccc', }} />

<Text style={[SIPCStyles.checkboxFont, { paddingLeft: 10, alignSelf: 'center' }]}>No</Text>
<View style={{ flexDirection: 'row', position: 'absolute', right: 0, alignSelf: 'center' }}>

{Checked1 == 1 ?
<>
<TouchableWithoutFeedback onPress={() => {
setChecked1(!Checked1);
}}>
<Text style={[SIPCStyles.checkboxFont, { marginHorizontal: 10 }]}>Cancel</Text>
</TouchableWithoutFeedback>

<TouchableWithoutFeedback onPress={() => {
setChecked1(!Checked1);
}}>
<Text style={[SIPCStyles.checkboxFont, { color: '#199be2', marginHorizontal: 10 }]}>Submit</Text>
</TouchableWithoutFeedback>
</>

:
<>
<TouchableWithoutFeedback onPress={() => {
setChecked1(!Checked1);
}}>
<Image source={require('../assets/msg.png')}
style={SIPCStyles.commentImage} />
</TouchableWithoutFeedback>

<TouchableWithoutFeedback onPress={() => {
setChecked1(!Checked1);
}}>
<Image source={require('../assets/img.png')}
style={SIPCStyles.commentImage} />
</TouchableWithoutFeedback>
</>
}

</View>


</View>
{Checked1 == 1 ?
  

<View style={[SIPCStyles.CheckBox,{ marginHorizontal: 20, }]}>

<TextInput
mode="text"
//  label="Outlined input"
placeholder="Enter Your Comment"
numberOfLines={8}
multiline={true}
underlineColor="transparent"
theme={{ colors: { primary: '#cccccc' } }}
style={SIPCStyles.TextInput1}

/>

<View style={{ borderWidth: 1, paddingBottom: 10, borderColor: '#ccc', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
<Card style={SIPCStyles.CameraImageCard}>
<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
<TouchableWithoutFeedback onPress={() => openCamera()}>
<Image source={require('../assets/camera.png')} style={SIPCStyles.cameraImage} />
</TouchableWithoutFeedback>

<View style={{ borderWidth: 1, borderColor: '#e6e6e6' }} />

<TouchableWithoutFeedback onPress={pickImage}>
<Image source={require('../assets/gallery.png')} style={SIPCStyles.cameraImage} />
</TouchableWithoutFeedback>


</View>
</Card>

<View style={{ marginTop: 10, flexDirection: 'row', flexWrap: deviceWidth > 500 ? 'wrap' : 'wrap', flex: 1 }}>

<ScrollView nestedScrollEnabled={true} horizontal={true}>
<FlatList
        numColumns={numColumns}
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{ position: 'relative' }}>
            <Image source={{ uri: item.path }} style={SIPCStyles.CameraClickImage} />
            <TouchableOpacity
              style={SIPCStyles.crossImage}
              onPress={() => deleteImage(index)}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
</ScrollView>
</View>
</View>


 </View>
: null}
</View>
</View>
<Divider bold={true} />
</View>
</View>
{/* ==========================SUB SECTION================================== */}

<Surface style={{ backgroundColor: SubActive == 1 ? '#fffcf8' : 'white', padding: 20, }}>
<View style={[SIPCStyles.ViewRowAlign, { alignItems: 'center', }]} >
<TouchableWithoutFeedback onPress={() => { switch_subSec(1) }}>
{SubActive == 1 ?

<Image source={require('../assets/minus.png')} style={SIPCStyles.PlusMinusImage} />
:
<Image source={require('../assets/plus.png')} style={SIPCStyles.PlusMinusImage} />

}
</TouchableWithoutFeedback>
<Text style={[SIPCStyles.BoldFont, { paddingHorizontal: 15 }]}>Sub Section</Text>
</View>

</Surface>
<Divider bold={true} />
{SubActive == 1 ?
<Surface style={{ backgroundColor: 'white', padding: 20, }}>
<View style={{ flexDirection: 'row', paddingHorizontal: 15 }}>
<Image source={require('../assets/question.png')}
style={SIPCStyles.headerManImage}
/>
<Text style={[SIPCStyles.SemiBold, { flex: 1, paddingLeft: 15 }]}>Sprinkler System - Has the Sprinkler System been inspected and or tested?</Text>
</View>


{/* ========================= */}
<View style={{ flexDirection: 'row',justifyContent: 'space-around', flexWrap: 'wrap',}}>
<View style={{ flexDirection: 'column', width: deviceWidth > 500 ? '50%' : '100%', }}>
<View style={{flexDirection:'column'}}>


<View style={[SIPCStyles.CheckboxView, { borderTopRightRadius: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: RadioChecked == "first" ? 0 : 10, borderBottomRightRadius: RadioChecked == "first" ? 0 : 10 }]}>

<View style={{ padding: 10, alignSelf: 'center' }}>

<RadioButton
value="first"
status={RadioChecked === 'first' ? 'checked' : 'unchecked'}
onPress={() => setRadioChecked('first')}
/>

</View>


<View style={{ borderWidth: 1, borderColor: '#ccc', }} />
<Text style={[SIPCStyles.checkboxFont, { paddingLeft: 10, alignSelf: 'center', width: Width / 2 }]}>yes</Text>
<View style={{ flexDirection: 'row', position: 'absolute', right: 0, alignSelf: 'center' }}>

{RadioChecked == "first" ?
<>
<TouchableWithoutFeedback onPress={() => {
setRadioChecked();
}}>
<Text style={[SIPCStyles.checkboxFont, { marginHorizontal: 10 }]}>Cancel</Text>
</TouchableWithoutFeedback>

<TouchableWithoutFeedback onPress={() => {
setRadioChecked();
}}>
<Text style={[SIPCStyles.checkboxFont, { color: '#199be2', marginHorizontal: 10 }]}>Submit</Text>
</TouchableWithoutFeedback>
</>
:
<>
<TouchableWithoutFeedback onPress={() => {
setRadioChecked('first');
}}>
<Image source={require('../assets/msg.png')}
style={SIPCStyles.commentImage} />
</TouchableWithoutFeedback>

<TouchableWithoutFeedback onPress={() => {
setRadioChecked('first');
}}>
<Image source={require('../assets/img.png')}
style={SIPCStyles.commentImage} />
</TouchableWithoutFeedback>
</>
}

</View>


</View>
{RadioChecked == "first" ?

<View style={{ marginHorizontal: 19, }}>

<TextInput
mode="text"
//  label="Outlined input"
placeholder="Enter Your Comment"
numberOfLines={8}
multiline={true}
underlineColor="transparent"
theme={{ colors: { primary: '#cccccc' } }}
style={SIPCStyles.TextInput1}

/>

<View style={{ borderWidth: 1, paddingBottom: 10, borderColor: '#ccc', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
<Card style={SIPCStyles.CameraImageCard}>
<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
<TouchableWithoutFeedback onPress={() => openCamera()}>
<Image source={require('../assets/camera.png')} style={SIPCStyles.cameraImage} />
</TouchableWithoutFeedback>

<View style={{ borderWidth: 1, borderColor: '#e6e6e6' }} />

<TouchableWithoutFeedback onPress={() => pickImage()}>
<Image source={require('../assets/gallery.png')} style={SIPCStyles.cameraImage} />
</TouchableWithoutFeedback>


</View>
</Card>

<View style={{ marginTop: 10, flexDirection: 'row', flexWrap: deviceWidth > 500 ? 'wrap' : 'wrap', flex: 1 }}>

<ScrollView nestedScrollEnabled={true} horizontal={true}>
<FlatList
        numColumns={numColumns}
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{ position: 'relative' }}>
            <Image source={{ uri: item.path }} style={SIPCStyles.CameraClickImage} />
            <TouchableOpacity
              style={SIPCStyles.crossImage}
              onPress={() => deleteImage(index)}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
</ScrollView>
</View>
</View>

</View>
: null}
</View>
</View>
{/* ====================RadioChecked First finish=========== */}

<View style={{ flexDirection: 'column', width: deviceWidth > 500 ? '50%' : '100%', }}>
<View style={{flexDirection:'column'}}>
<View style={[SIPCStyles.CheckboxView, { borderTopRightRadius: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: RadioChecked == "second" ? 0 : 10, borderBottomRightRadius: RadioChecked == "second" ? 0 : 10 }]}>

<View style={{ padding: 10, alignSelf: 'center' }}>

<RadioButton
value="second"
status={RadioChecked === 'second' ? 'checked' : 'unchecked'}
onPress={() => setRadioChecked('second')}
/>

</View>

<View style={{ borderWidth: 1, borderColor: '#ccc', }} />

<Text style={[SIPCStyles.checkboxFont, { paddingLeft: 10, alignSelf: 'center', width: Width / 2 }]}>No </Text>
<View style={{ flexDirection: 'row', position: 'absolute', right: 0, alignSelf: 'center' }}>

{RadioChecked == "second" ?
<>
<TouchableWithoutFeedback onPress={() => {
setRadioChecked();
}}>
<Text style={[SIPCStyles.checkboxFont, { marginHorizontal: 10 }]}>Cancel</Text>
</TouchableWithoutFeedback>

<TouchableWithoutFeedback onPress={() => {
setRadioChecked();
}}>
<Text style={[SIPCStyles.checkboxFont, { color: '#199be2', marginHorizontal: 10 }]}>Submit</Text>
</TouchableWithoutFeedback>
</>
:
<>
<TouchableWithoutFeedback onPress={() => {
setRadioChecked('second');
}}>
<Image source={require('../assets/msg.png')}
style={SIPCStyles.commentImage} />
</TouchableWithoutFeedback>

<TouchableWithoutFeedback onPress={() => {
setRadioChecked('second');
}}>
<Image source={require('../assets/img.png')}
style={SIPCStyles.commentImage} />
</TouchableWithoutFeedback>
</>
}

</View>


</View>
{RadioChecked == "second" ?

<View style={{ marginHorizontal: 19, }}>

<TextInput
mode="text"
//  label="Outlined input"
placeholder="Enter Your Comment"
numberOfLines={8}
multiline={true}
underlineColor="transparent"
theme={{ colors: { primary: '#cccccc' } }}
style={SIPCStyles.TextInput1}

/>

<View style={{ borderWidth: 1, paddingBottom: 10, borderColor: '#ccc', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
<Card style={SIPCStyles.CameraImageCard}>
<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
<TouchableWithoutFeedback onPress={() => CameraSubImage()}>
<Image source={require('../assets/camera.png')} style={SIPCStyles.cameraImage} />
</TouchableWithoutFeedback>

<View style={{ borderWidth: 1, borderColor: '#e6e6e6' }} />

<TouchableWithoutFeedback onPress={() => selectSubImage()}>
<Image source={require('../assets/gallery.png')} style={SIPCStyles.cameraImage} />
</TouchableWithoutFeedback>


</View>
</Card>

<View style={{ marginTop: 10, flexDirection: 'row', flexWrap: deviceWidth > 500 ? 'wrap' : 'wrap', flex: 1 }}>

<ScrollView nestedScrollEnabled={true} horizontal={true}>
<FlatList
        numColumns={numColumns}
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={{ position: 'relative' }}>
            <Image source={{ uri: item.path }} style={SIPCStyles.CameraClickImage} />
            <TouchableOpacity
              style={SIPCStyles.crossImage}
              onPress={() => deleteImage(index)}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
</ScrollView>
</View>
</View>

</View>
: null}

</View>
</View>
</View>
</Surface>
: null}
{/* sub Active Finish */}
</>
: null}
</Surface>
{/* ============================================================ */}
</ScrollView>
{/* ================================MODAL=================================== */}
<Modal visible={visible} style={{}}
transparent={true}
animationType='slide'>
<View style={{ justifyContent: 'center', backgroundColor: '#e2e0eb', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, paddingBottom: 20, top: hp('11%') }}>

<View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#e2e0eb', paddingTop: 15, paddingHorizontal: 15, }}>

<TouchableWithoutFeedback onPress={hideModal}>
<Text style={[SIPCStyles.NormalFont, {}]}>Cancel</Text>
</TouchableWithoutFeedback>
<TouchableWithoutFeedback onPress={hideModal}>
<Text style={[SIPCStyles.NormalFont, { color: '#199be2' }]}>Done</Text>
</TouchableWithoutFeedback>

</View>

<Surface elevation={4} style={{ padding: 15, backgroundColor: 'white', borderRadius: 10, marginTop: 10, marginHorizontal: 30, }}>

<View style={SIPCStyles.healthImageView}>
<Image source={require('../assets/save.png')} style={SIPCStyles.MainBuilding} />
<TouchableOpacity>
<Text style={[SIPCStyles.NormalFont, { paddingLeft: 10 }]}>Save</Text>
</TouchableOpacity>
</View>
<Divider bold={true} style={{ marginLeft: 30, marginTop: 10 }} />

{/* <TouchableWithoutFeedback> */}
<View style={[SIPCStyles.healthImageView, { marginTop: 25 }]}>
<Image source={require('../assets/submit.png')} style={SIPCStyles.MainBuilding} />
<TouchableOpacity>
<Text style={[SIPCStyles.NormalFont, { paddingLeft: 10 }]}>Submit Survey </Text>
</TouchableOpacity>
</View>
{/* </TouchableWithoutFeedback> */}

<Divider bold={true} style={{ marginLeft: 30, marginTop: 10 }} />

</Surface>


</View>
</Modal>
</View>
)
}

export default SaveSurvey