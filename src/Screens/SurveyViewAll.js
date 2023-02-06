import { View, Alert, Image, ScrollView, Dimensions, TouchableWithoutFeedback, StatusBar } from 'react-native'
import React, { useState, } from 'react'
import { Button, Card, Searchbar, TextInput, Surface, Divider, Text, } from 'react-native-paper';
import SIPCStyles from './styles';
import Icon2 from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Col, Grid } from 'react-native-easy-grid';




const SurveyViewAll = ({ navigation }) => {

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

const [searchQuery, setSearchQuery] = React.useState('');
const onChangeSearch = query => setSearchQuery(query);

const [Tab, setTab] = useState(1);
const [Active, setActive] = useState(0)
const [Pending, setPending] = useState(0)

const switch_tab = (x) => {
if (x == Active) {
setActive(0);
} else {
setActive(x);
}
};

const switch_pen = (x) => {
if (x == Pending) {
setPending(0);
} else {
setPending(x);
}
};


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
placeholder="Search Survey"
placeholderTextColor="grey"
onChangeText={onChangeSearch}
value={searchQuery}
style={SIPCStyles.searchBar}
icon={() => <SimpleLineIcons name="magnifier" size={20} style={{ color: 'grey', }} />}
/>

<TouchableWithoutFeedback onPress={() => navigation.navigate('Surveys')}>
<Image
source={require('../assets/start-inspection.png')}
style={SIPCStyles.headerManImage} />
</TouchableWithoutFeedback>
</Surface>
<Divider bold={true} />
{/* ================TABS============================== */}


<View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-around', }} >
<Card elevation={0} style={{
paddingVertical: 15, paddingHorizontal: 20, backgroundColor: 'white', borderBottomWidth: Tab == 1 ? 1 : 0, borderColor: Tab == 1 ? '#1485cc' : 'transparent', width: Width / 2
}} onPress={() => setTab(1)}>
<Text style={[SIPCStyles.NormalFont, { textAlign: 'center', color: Tab == 1 ? '#1485cc' : '#525252' }]}>Completed</Text>
</Card>

<Card elevation={0} style={{ paddingVertical: 15, paddingHorizontal: 20, backgroundColor: 'white', borderBottomWidth: Tab == 2 ? 1 : 0, borderColor: Tab == 2 ? '#1485cc' : 'transparent', width: Width / 2 }} onPress={() => setTab(2)}>
<Text style={[SIPCStyles.NormalFont, { color: Tab == 2 ? '#1485cc' : '#525252', textAlign: 'center' }]}>Pending</Text>
</Card>
</View>
<Divider bold={true} />


{/* ==================================COMPLETED ==================================== */}
{Tab == 1 ?

<>
<Surface style={{ padding: 15, marginTop: 20, backgroundColor: Active == 1 ? '#fffcf8' : 'white' }}>
<Grid>
<Col size={70} style={{ justifyContent: 'center', paddingRight: 10, }}>
<View style={{ flexDirection: 'column' }}>

<View style={SIPCStyles.ViewRowAlign} >
<TouchableWithoutFeedback onPress={() => { switch_tab(1) }}>
{Active == 1 ?

<Image source={require('../assets/minus.png')} style={SIPCStyles.PlusMinusImage} />
:
<Image source={require('../assets/plus.png')} style={SIPCStyles.PlusMinusImage} />

}
</TouchableWithoutFeedback>
<Text style={SIPCStyles.SurfaceTitle}>Test Survey</Text>
</View>

<View style={SIPCStyles.healthImageView}>
<Image source={require('../assets/building.png')} style={SIPCStyles.healthImage} />
<Text style={SIPCStyles.SurfaceType}>Carbondale High School</Text>
</View>

</View>
</Col>

<Col size={30} style={{ }}>

<View style={{flexDirection:'row',justifyContent:'space-around'}}>

<View style={{flexDirection:'column'}}>
<TouchableWithoutFeedback >
<Image source={require('../assets/eye.png')} style={SIPCStyles.playImage} />
</TouchableWithoutFeedback>
<Text style={SIPCStyles.SurfacePlayImageText}>View</Text>
</View>

<View style={{flexDirection:'column'}}>
<TouchableWithoutFeedback >
<Image source={require('../assets/print.png')} style={SIPCStyles.playImage} />
</TouchableWithoutFeedback>
<Text style={SIPCStyles.SurfacePlayImageText}>  Download</Text>
</View>
</View>
</Col>
</Grid>
</Surface>
<Divider bold={true} />

{Active == 1 ?
<>
<Surface style={{ backgroundColor: 'white', }}>
{/* ================ */}
<View style={{ flexDirection: 'row', padding: 15 }}>
<Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>ORGANIZATION:</Text>
<Text style={[SIPCStyles.ValueFont, { flex: 1 }]}>Township High School District 214</Text>
</View>
<Divider bold={true} />
{/* ============ */}
<View style={{ flexDirection: 'row', padding: 15 }}>
<Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>Survey Created:</Text>
<Text style={SIPCStyles.ValueFont}> Feb 15, 2022 - 06:15 AM</Text>
</View>
<Divider bold={true} />
{/* ================ */}
<View style={{ flexDirection: 'row', padding: 15 }}>
<Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>Survey Submitted:</Text>
<Text style={SIPCStyles.ValueFont}>Jan 04, 2023 - 08:45 AM</Text>
</View>
<Divider bold={true} />

{/* ================ */}
<View style={{ flexDirection: 'row', padding: 15 }}>
<Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>COMPLETED BY:</Text>
<Text style={SIPCStyles.ValueFont}>John Smith</Text>
</View>
<Divider bold={true} />
{/* ================ */}
<View style={{ flexDirection: 'row', padding: 15 }}>
<Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>TOTAL SCORE:</Text>
<Text style={SIPCStyles.ValueFont}>1.00</Text>
</View>
<Divider bold={true} />
{/* ================ */}
<View style={{ flexDirection: 'row', padding: 15 }}>
<Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>SURVEY SCORE:</Text>
<Text style={SIPCStyles.ValueFont}>1.00</Text>
</View>
<Divider bold={true} />

</Surface>
</>
: null}
</>

: null}
{/* ========================Pending===================== */}

{Tab == 2 ?
<>

<Surface style={{ padding: 15, marginTop: 20, backgroundColor: Pending == 1 ? '#fffcf8' : 'white' }}>
<Grid>
<Col size={70} style={{ justifyContent: 'center', paddingRight: 10, }}>
<View style={{ flexDirection: 'column' }}>

<View style={SIPCStyles.ViewRowAlign} >
<TouchableWithoutFeedback onPress={() => { switch_pen(1) }}>
{Pending == 1 ?

<Image source={require('../assets/minus.png')} style={SIPCStyles.PlusMinusImage} />
:
<Image source={require('../assets/plus.png')} style={SIPCStyles.PlusMinusImage} />

}
</TouchableWithoutFeedback>
<Text style={SIPCStyles.SurfaceTitle}>Annual Health Life Safety Survey - ROE</Text>
</View>

<View style={SIPCStyles.healthImageView}>
<Image source={require('../assets/building.png')} style={SIPCStyles.healthImage} />
<Text style={SIPCStyles.SurfaceType}>SIPC Test Elementary Building</Text>
</View>

</View>
</Col>

<Col size={30} style={{ }}>

<View style={{flexDirection:'row',justifyContent:'space-around'}}>

<View style={{flexDirection:'column'}}>
<TouchableWithoutFeedback >
<Image source={require('../assets/continue.png')} style={SIPCStyles.playImage} />
</TouchableWithoutFeedback>
<Text style={SIPCStyles.SurfacePlayImageText}>Continue</Text>
</View>

<View style={{flexDirection:'column'}}>
<TouchableWithoutFeedback >
<Image source={require('../assets/delete.png')} style={SIPCStyles.playImage} />
</TouchableWithoutFeedback>
<Text style={SIPCStyles.SurfacePlayImageText}>  Delete</Text>
</View>
</View>
</Col>
</Grid>
</Surface>
<Divider bold={true} />

{Pending == 1 ?
<>

<Surface style={{ backgroundColor: 'white', }}>
{/* ================ */}
<View style={{ flexDirection: 'row', padding: 15 }}>
<Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>ORGANIZATION:</Text>
<Text style={[SIPCStyles.ValueFont, { flex: 1 }]}>SIPC</Text>
</View>
<Divider bold={true} />
{/* =========== */}
<View style={{ flexDirection: 'row', padding: 15 }}>
<Text style={[SIPCStyles.BoldFont, { paddingRight: 10 }]}>Survey Created:</Text>
<Text style={SIPCStyles.ValueFont}> Feb 15, 2022 - 06:15 AM</Text>
</View>
<Divider bold={true} />

{/* ================ */}
</Surface>
</>
: null}




</>
: null}

{/* ==================================================== */}
</ScrollView>
</View>
)
}

export default SurveyViewAll