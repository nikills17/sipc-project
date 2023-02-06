import { StyleSheet, Text, TouchableWithoutFeedback, View, Image } from 'react-native';
import React, { useState } from 'react';
import { Surface, Divider } from 'react-native-paper';
import { Col, Grid } from 'react-native-easy-grid';
import SIPCStyles from '../Screens/styles';

const SurveyBox = ({ data,navigation }) => {
  
  const [Show, setShow] = useState(false);

  // const switch_tab = (x) => {
  //   if (x == Show) {
  //   setShow(false);
  //   } else {
  //   setShow(x);
  //   }
  //   };

  return (
    <>
      <Surface style={{ padding: 15, marginTop: 20, backgroundColor:Show == true ? '#fffcf8': 'white',}}>
        <Grid>
          <Col size={85} style={{ justifyContent: 'center', paddingRight: 10, }}>
            <View style={{ flexDirection: 'column' }}>

              <View style={SIPCStyles.ViewRowAlign} >
                <TouchableWithoutFeedback onPress={() => { setShow(!Show) }}>
                  {Show == true ?

                    <Image source={require('../assets/minus.png')} style={SIPCStyles.PlusMinusImage} />
                    :
                    <Image source={require('../assets/plus.png')} style={SIPCStyles.PlusMinusImage} />

                  }
                </TouchableWithoutFeedback>
                <Text style={SIPCStyles.SurfaceTitle}>{data.title}</Text>
              </View>

              <View style={SIPCStyles.healthImageView}>
                <Image source={require('../assets/ii.png')} style={SIPCStyles.healthImage} />
                <Text style={SIPCStyles.SurfaceType}>{data.type}</Text>
              </View>

            </View>
          </Col>

          <Col size={15} style={{ alignItems: 'center', }}>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('StartSurveys')}>
              <Image source={require('../assets/plays.png')} style={SIPCStyles.playImage} />
            </TouchableWithoutFeedback>
            <Text style={SIPCStyles.SurfacePlayImageText}>START</Text>
          </Col>
        </Grid>
      </Surface>
      <Divider bold={true} />

      {/* ---------Show == 1--------------------- */}
      {Show == true ?
        <>
          <Surface style={{ backgroundColor: 'white', }}>
            <View style={{ flexDirection: 'row', display: 'flex', padding: 15, }}>
              <Text style={SIPCStyles.DescriptionHeading}>Description :</Text>
              <Text style={SIPCStyles.DescriptionDetails}>{data.description}</Text>
            </View>
            <Divider bold={true} />
            <View style={{ flexDirection: 'row', display: 'flex', padding: 15, }}>
              <Text style={SIPCStyles.DescriptionHeading}>Date Created :</Text>
              <Text style={SIPCStyles.DescriptionDetails}>{data.date_created}</Text>
            </View>
          </Surface>
        </>
        : null}




    </>
  )
}

export default SurveyBox;

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    marginLeft: 20,
  }
})


{/* <TouchableOpacity onPress={() => {
  setShow(!show)
}} style={{ backgroundColor: '#fff', backgroundColor: show ? '#d0d0d0' : '000000', marginBottom: 20, elevation: 16, height: 100, width: 300, padding: 16 }}>
  <View style={{ flexDirection: 'row' }}>
    <Text style={styles.text}>{show ? '-' : '+'}</Text>
    <Text style={styles.text}>{data.title}</Text>
  </View>
  <View style={{ flexDirection: 'row' }}>
    <Text style={styles.text}>+</Text>
    <Text style={styles.text}>{data.type}</Text>
  </View>
</TouchableOpacity>
  {show && <TouchableOpacity style={{ backgroundColor: '#2d6cdf', marginTop: -20, elevation: 16, height: 100, width: 300, padding: 16 }}>
    <View style={{ flexDirection: 'row' }}>
      <Text style={styles.text}>+</Text>
      <Text style={styles.text}>{data.description}</Text>
    </View>
  </TouchableOpacity>} */}