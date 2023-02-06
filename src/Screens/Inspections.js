import { View, Alert, Image, ScrollView,Dimensions,TouchableWithoutFeedback,StatusBar } from 'react-native'
import React, { useState,  } from 'react'
import { Button, Card, Searchbar, TextInput, Surface, Divider ,Text, } from 'react-native-paper';
import SIPCStyles from './styles';
import Icon2 from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';


const Inspections = ({navigation}) => {

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const [Active, setActive] = useState(1);
  
  const [Plus, setPlus] = useState(0);
  const [Complete,setComplete] = useState(0);
  const [Pending,setPending] = useState(0);

  const switch_tab = (x) => {
    if (x == Plus) {
    setPlus(0);
    } else {
    setPlus(x);
    }
    };

    const switch_com = (x) =>{
      if (x == Complete) {
        setComplete(0);
        } else {
        setComplete(x);
        }
    }
    const switch_pen = (x) =>{
      if (x == Pending) {
        setPending(0);
        } else {
        setPending(x);
        }
    }

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
placeholder="Search Inspection"
placeholderTextColor="grey"
onChangeText={onChangeSearch}
value={searchQuery}
style={SIPCStyles.searchBar}
icon={() => <SimpleLineIcons name="magnifier" size={20} style={{ color: 'grey', }} />}
/>

<TouchableWithoutFeedback onPress={() => navigation.navigate('StartInspections')}>
<Image 
source={require('../assets/start-inspection.png')}
style={SIPCStyles.headerManImage} />
</TouchableWithoutFeedback>
</Surface> 
<Divider bold={true} />
{/* ================TABS============================== */}


<View style= {{backgroundColor:'white',flexDirection:'row',justifyContent:'space-around',}} >
<Card elevation={0} style={{paddingVertical:15, 
paddingHorizontal:20, backgroundColor:'white',borderBottomWidth:Active==1 ? 1 : 0,borderColor:Active==1 ? '#1485cc' : 'transparent'}} onPress={() => setActive(1)}>
<Text style={[SIPCStyles.NormalFont,{color:Active==1 ? '#1485cc': '#525252'}]}>Inspections</Text>
</Card>

<Card elevation={0}style={{paddingVertical:15,paddingHorizontal:20, backgroundColor:'white',borderBottomWidth:Active==2 ? 1 : 0,borderColor:Active==2 ? '#1485cc' : 'transparent'}} onPress={() => setActive(2)}> 
<Text style={[SIPCStyles.NormalFont,{color:Active==2 ? '#1485cc': '#525252'}]}>Completed</Text>
</Card>

<Card elevation={0}style={{  paddingHorizontal:20,paddingVertical:15,backgroundColor:'white',borderBottomWidth:Active==3 ? 1 : 0,borderColor:Active==3 ? '#1485cc' : 'transparent'}} onPress={() => setActive(3)}>
<Text style={[SIPCStyles.NormalFont,{color:Active==3 ? '#1485cc': '#525252'}]}>Pending</Text>
</Card>
 
</View>


{/* ==========INSPECTIONS ==================================== */}
{Active == 1 ?
<>
<Surface style={{marginTop:20,padding:15,backgroundColor:Plus == 1 ? '#fffcf8' :'white'}}>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>

<View style={{flexDirection:'column'}}>

<View style={SIPCStyles.ViewRowAlign} >
<TouchableWithoutFeedback  onPress={() => { switch_tab(1) }}>
{Plus == 1 ? 

<Image source={require('../assets/minus.png')} style={SIPCStyles.PlusMinusImage} />
:
<Image source={require('../assets/plus.png')} style={SIPCStyles.PlusMinusImage} />

}
</TouchableWithoutFeedback>
<Text style={SIPCStyles.SurfaceTitle}> Dec 27,2022</Text>
</View>

<View style={SIPCStyles.healthImageView}>
<Image source={require('../assets/building.png')} style={SIPCStyles.MainBuilding}/>
<Text style={SIPCStyles.SurfaceType}>Main Building sector</Text>
</View>
</View>

<View style={{justifyContent:'center',alignItems:'flex-end',}}>
 <TouchableWithoutFeedback>
<Image source={require('../assets/continue.png')} style={SIPCStyles.playImage} />
</TouchableWithoutFeedback>
<Text style={[SIPCStyles.SurfacePlayImageText,{}]}>Continue</Text>
</View>
</View>
</Surface>
{/* ======================================== */}
{Plus ==1 ?
<>
<Surface style={{backgroundColor:'white',padding:15}}>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<View style={{flexDirection:'row'}}>
<Text style={[SIPCStyles.BoldFont,{paddingRight:10}]}>Rooms:</Text>
<Text style={SIPCStyles.ValueFont}>120</Text>
</View>
<Text style={[SIPCStyles.ValueFont,{color:'#1485cc'}]}>View Rooms</Text>
</View>
</Surface>

<Surface style={{backgroundColor:'white',padding:15}}>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<View style={{flexDirection:'row'}}>
<Text style={[SIPCStyles.BoldFont,{paddingRight:10}]}>Score:</Text>
<Text style={SIPCStyles.GreenColor}>99.99%</Text>
</View>

<View style={{flexDirection:'row'}}>
<Text style={[SIPCStyles.BoldFont,{paddingRight:10}]}>Status:</Text>
<Text style={SIPCStyles.OrangeColor}>In Progress</Text>
</View>
</View>
</Surface>

<Surface style={{backgroundColor:'white',padding:15}}>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<View style={{flexDirection:'row'}}>
<Text style={[SIPCStyles.BoldFont,{paddingRight:10}]}>Inspector:</Text>
<Text style={SIPCStyles.ValueFont}>Ken Rolland</Text>
</View>
</View>
</Surface>
</>
:null}
{/* /------------------============2nd========------------------------------------------ */}



<Surface style={{marginTop:20,padding:15,backgroundColor:Plus == 2 ? '#fffcf8' : 'white'}}>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>

<View style={{flexDirection:'column'}}>
<View style={SIPCStyles.ViewRowAlign} >
<TouchableWithoutFeedback  onPress={() => { switch_tab(2) }}>
{Plus == 2 ? 

<Image source={require('../assets/minus.png')} style={SIPCStyles.PlusMinusImage} />
:
<Image source={require('../assets/plus.png')} style={SIPCStyles.PlusMinusImage} />

}
</TouchableWithoutFeedback>
<Text style={SIPCStyles.SurfaceTitle}> Dec 22,2022</Text>
</View>
<View style={SIPCStyles.healthImageView}>
<Image source={require('../assets/building.png')} style={SIPCStyles.MainBuilding}/>
<Text style={SIPCStyles.SurfaceType}>Entrance Building Sector III</Text>
</View>
</View>

<View style={{alignItems:'flex-end',justifyContent:'center'}}>
 <TouchableWithoutFeedback>
<Image source={require('../assets/share.png')} style={SIPCStyles.playImage} />
</TouchableWithoutFeedback>
<Text style={[SIPCStyles.SurfacePlayImageText,{}]}>View </Text>
</View>

</View>
</Surface>
{/* ======================================== */}
{Plus == 2 ? 
<>
<Surface style={{backgroundColor:'white',padding:15}}>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<View style={{flexDirection:'row'}}>
<Text style={[SIPCStyles.BoldFont,{paddingRight:10}]}>Rooms:</Text>
<Text style={SIPCStyles.ValueFont}>120</Text>
</View>
<Text style={[SIPCStyles.ValueFont,{color:'#1485cc'}]}>View Rooms</Text>
</View>
</Surface>

<Surface style={{backgroundColor:'white',padding:15}}>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<View style={{flexDirection:'row'}}>
<Text style={[SIPCStyles.BoldFont,{paddingRight:10}]}>Score:</Text>
<Text style={SIPCStyles.OrangeColor}>82.99%</Text>
</View>

<View style={{flexDirection:'row'}}>
<Text style={[SIPCStyles.BoldFont,{paddingRight:10}]}>Status:</Text>
<Text style={SIPCStyles.GreenColor}>Completed</Text>
</View>
</View>
</Surface>

<Surface style={{backgroundColor:'white',padding:15}}>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<View style={{flexDirection:'row'}}>
<Text style={[SIPCStyles.BoldFont,{paddingRight:10}]}>Inspector:</Text>
<Text style={SIPCStyles.ValueFont}>Ken Rolland</Text>
</View>
</View>
</Surface>
</>
:null}
</>
:null}

{/* ==========Completed ==================================== */}
{Active == 2 ?
<>
<Surface style={{marginTop:20,padding:15,backgroundColor:Complete == 1 ? '#fffcf8':'white'}}>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>

<View style={{flexDirection:'column'}}>
<View style={SIPCStyles.ViewRowAlign} >
<TouchableWithoutFeedback  onPress={() => { switch_com(1) }}>
{Complete == 1 ? 

<Image source={require('../assets/minus.png')} style={SIPCStyles.PlusMinusImage} />
:
<Image source={require('../assets/plus.png')} style={SIPCStyles.PlusMinusImage} />

}
</TouchableWithoutFeedback>
<Text style={SIPCStyles.SurfaceTitle}> Dec 05,2023</Text>
</View>
<View style={SIPCStyles.healthImageView}>
<Image source={require('../assets/building.png')} style={SIPCStyles.MainBuilding}/>
<Text style={SIPCStyles.SurfaceType}>Entrance Building Sector III</Text>
</View>
</View>

<View style={{alignItems:'flex-end',justifyContent:'center'}}>
 <TouchableWithoutFeedback>
<Image source={require('../assets/continue.png')} style={SIPCStyles.playImage} />
</TouchableWithoutFeedback>
<Text style={[SIPCStyles.SurfacePlayImageText,{}]}>Continue</Text>
</View>

</View>
</Surface>
{/* ======================================== */}
{Complete == 1 ? 
<>
<Surface style={{backgroundColor:'white',padding:15}}>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<View style={{flexDirection:'row'}}>
<Text style={[SIPCStyles.BoldFont,{paddingRight:10}]}>Rooms:</Text>
<Text style={SIPCStyles.ValueFont}>120</Text>
</View>
<Text style={[SIPCStyles.ValueFont,{color:'#1485cc'}]}>View Rooms</Text>
</View>
</Surface>

<Surface style={{backgroundColor:'white',padding:15}}>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<View style={{flexDirection:'row'}}>
<Text style={[SIPCStyles.BoldFont,{paddingRight:10}]}>Score:</Text>
<Text style={SIPCStyles.GreenColor}>99.99%</Text>
</View>

<View style={{flexDirection:'row'}}>
<Text style={[SIPCStyles.BoldFont,{paddingRight:10}]}>Status:</Text>
<Text style={SIPCStyles.GreenColor}>Completed</Text>
</View>
</View>
</Surface>

<Surface style={{backgroundColor:'white',padding:15}}>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<View style={{flexDirection:'row'}}>
<Text style={[SIPCStyles.BoldFont,{paddingRight:10}]}>Inspector:</Text>
<Text style={SIPCStyles.ValueFont}>Ken Rolland</Text>
</View>
</View>
</Surface>
</>
:null}
{/* /------------------============2nd========------------------------------------------ */}

<Surface style={{marginTop:20,padding:15,backgroundColor:Complete == 2 ? '#fffcf8':'white'}}>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>

<View style={{flexDirection:'column'}}>
<View style={SIPCStyles.ViewRowAlign} >
<TouchableWithoutFeedback  onPress={() => { switch_com(2) }}>
{Complete == 2 ? 

<Image source={require('../assets/minus.png')} style={SIPCStyles.PlusMinusImage} />
:
<Image source={require('../assets/plus.png')} style={SIPCStyles.PlusMinusImage} />

}
</TouchableWithoutFeedback>
<Text style={SIPCStyles.SurfaceTitle}> Dec 08,2023</Text>
</View>
<View style={SIPCStyles.healthImageView}>
<Image source={require('../assets/building.png')} style={SIPCStyles.MainBuilding}/>
<Text style={SIPCStyles.SurfaceType}>Entrance Building Sector III</Text>
</View>
</View>

<View style={{alignItems:'flex-end',justifyContent:'center'}}>
 <TouchableWithoutFeedback>
<Image source={require('../assets/share.png')} style={SIPCStyles.playImage} />
</TouchableWithoutFeedback>
<Text style={[SIPCStyles.SurfacePlayImageText,{}]}>View </Text>
</View>

</View>
</Surface>
{/* ======================================== */}
{Complete == 2 ? 
<>
<Surface style={{backgroundColor:'white',padding:15}}>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<View style={{flexDirection:'row'}}>
<Text style={[SIPCStyles.BoldFont,{paddingRight:10}]}>Rooms:</Text>
<Text style={SIPCStyles.ValueFont}>120</Text>
</View>
<Text style={[SIPCStyles.ValueFont,{color:'#1485cc'}]}>View Rooms</Text>
</View>
</Surface>

<Surface style={{backgroundColor:'white',padding:15}}>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<View style={{flexDirection:'row'}}>
<Text style={[SIPCStyles.BoldFont,{paddingRight:10}]}>Score:</Text>
<Text style={SIPCStyles.GreenColor}>99.99%</Text>
</View>

<View style={{flexDirection:'row'}}>
<Text style={[SIPCStyles.BoldFont,{paddingRight:10}]}>Status:</Text>
<Text style={SIPCStyles.GreenColor}>Completed</Text>
</View>
</View>
</Surface>

<Surface style={{backgroundColor:'white',padding:15}}>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<View style={{flexDirection:'row'}}>
<Text style={[SIPCStyles.BoldFont,{paddingRight:10}]}>Inspector:</Text>
<Text style={SIPCStyles.ValueFont}>Ken Rolland</Text>
</View>
</View>
</Surface>
</>
:null}
</>
:null}
{/* ==========Pending ==================================== */}
{Active == 3 ?
<>
<Surface style={{marginTop:20,padding:15,backgroundColor:Pending == 1 ?'#fffcf8':'white'}}>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>

<View style={{flexDirection:'column'}}>
<View style={SIPCStyles.ViewRowAlign} >
<TouchableWithoutFeedback  onPress={() => { switch_pen(1) }}>
{Pending == 1 ? 

<Image source={require('../assets/minus.png')} style={SIPCStyles.PlusMinusImage} />
:
<Image source={require('../assets/plus.png')} style={SIPCStyles.PlusMinusImage} />

}
</TouchableWithoutFeedback>
<Text style={SIPCStyles.SurfaceTitle}> Jan 10,2023</Text>
</View>
<View style={SIPCStyles.healthImageView}>
<Image source={require('../assets/building.png')} style={SIPCStyles.MainBuilding}/>
<Text style={SIPCStyles.SurfaceType}>Entrance Building Sector III</Text>
</View>
</View>

<View style={{alignItems:'flex-end',justifyContent:'center'}}>
 <TouchableWithoutFeedback>
<Image source={require('../assets/continue.png')} style={SIPCStyles.playImage} />
</TouchableWithoutFeedback>
<Text style={[SIPCStyles.SurfacePlayImageText,{}]}>Continue</Text>
</View>

</View>
</Surface>
{/* ======================================== */}
{Pending == 1 ?
<>
<Surface style={{backgroundColor:'white',padding:15}}>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<View style={{flexDirection:'row'}}>
<Text style={[SIPCStyles.BoldFont,{paddingRight:10}]}>Rooms:</Text>
<Text style={SIPCStyles.ValueFont}>120</Text>
</View>
<Text style={[SIPCStyles.ValueFont,{color:'#1485cc'}]}>View Rooms</Text>
</View>
</Surface>

<Surface style={{backgroundColor:'white',padding:15}}>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<View style={{flexDirection:'row'}}>
<Text style={[SIPCStyles.BoldFont,{paddingRight:10}]}>Score:</Text>
<Text style={SIPCStyles.GreenColor}>99.99%</Text>
</View>

<View style={{flexDirection:'row'}}>
<Text style={[SIPCStyles.BoldFont,{paddingRight:10}]}>Status:</Text>
<Text style={SIPCStyles.OrangeColor}>In Progress</Text>
</View>
</View>
</Surface>

<Surface style={{backgroundColor:'white',padding:15}}>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<View style={{flexDirection:'row'}}>
<Text style={[SIPCStyles.BoldFont,{paddingRight:10}]}>Inspector:</Text>
<Text style={SIPCStyles.ValueFont}>Ken Rolland</Text>
</View>
</View>
</Surface>
</>
:null}
{/* /------------------============2nd========------------------------------------------ */}

<Surface style={{marginTop:20,padding:15,backgroundColor:Pending == 2 ?'#fffcf8':'white'}}>

<View style={{flexDirection:'row',justifyContent:'space-between'}}>

<View style={{flexDirection:'column'}}>
<View style={SIPCStyles.ViewRowAlign} >
<TouchableWithoutFeedback  onPress={() => { switch_pen(2) }}>
{Pending == 2 ? 

<Image source={require('../assets/minus.png')} style={SIPCStyles.PlusMinusImage} />
:
<Image source={require('../assets/plus.png')} style={SIPCStyles.PlusMinusImage} />

}
</TouchableWithoutFeedback>
<Text style={SIPCStyles.SurfaceTitle}> Jan 14,2023</Text>
</View>
<View style={SIPCStyles.healthImageView}>
<Image source={require('../assets/building.png')} style={SIPCStyles.MainBuilding}/>
<Text style={SIPCStyles.SurfaceType}>Entrance Building Sector III</Text>
</View>
</View>

<View style={{alignItems:'flex-end',justifyContent:'center'}}>
 <TouchableWithoutFeedback>
<Image source={require('../assets/share.png')} style={SIPCStyles.playImage} />
</TouchableWithoutFeedback>
<Text style={[SIPCStyles.SurfacePlayImageText,{}]}>View </Text>
</View>

</View>
</Surface>
{/* ======================================== */}
{Pending == 2 ?
<>
<Surface style={{backgroundColor:'white',padding:15}}>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<View style={{flexDirection:'row'}}>
<Text style={[SIPCStyles.BoldFont,{paddingRight:10}]}>Rooms:</Text>
<Text style={SIPCStyles.ValueFont}>120</Text>
</View>
<Text style={[SIPCStyles.ValueFont,{color:'#1485cc'}]}>View Rooms</Text>
</View>
</Surface>

<Surface style={{backgroundColor:'white',padding:15}}>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<View style={{flexDirection:'row'}}>
<Text style={[SIPCStyles.BoldFont,{paddingRight:10}]}>Score:</Text>
<Text style={SIPCStyles.OrangeColor}>82.99%</Text>
</View>

<View style={{flexDirection:'row'}}>
<Text style={[SIPCStyles.BoldFont,{paddingRight:10}]}>Status:</Text>
<Text style={SIPCStyles.OrangeColor}>In Progress</Text>
</View>
</View>
</Surface>

<Surface style={{backgroundColor:'white',padding:15}}>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<View style={{flexDirection:'row'}}>
<Text style={[SIPCStyles.BoldFont,{paddingRight:10}]}>Inspector:</Text>
<Text style={SIPCStyles.ValueFont}>Ken Rolland</Text>
</View>
</View>
</Surface>
</>
:null}
</>
:null}


{/* ========================================== */}
</ScrollView>
    </View>
  )
}

export default Inspections