import {
  View,
  Alert,
  Image,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  StatusBar, TouchableOpacity
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  Searchbar,
  TextInput,
  Surface,
  Divider,
  Text,
} from 'react-native-paper';
import SIPCStyles from './styles';
import Icon2 from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Col, Grid } from 'react-native-easy-grid';
import SurveyViewAllBox from '../component/surveyviewallbox';
import API from '../utility/api';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../component/activityindicator';
import ReportBox from '../component/reportsbox';

import { MMKV } from 'react-native-mmkv'
export const storage = new MMKV();


const Reports = ({ navigation }) => {

  const jsonUser = storage.getString('user')
  const user = JSON.parse(jsonUser);

  const Width = Dimensions.get('window').width;
  const Height = Dimensions.get('window').height;

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

  const [Active, setActive] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  return (


    <View style={SIPCStyles.flex}>
      <StatusBar barStyle={'dark-content'} backgroundColor="white" />

      {/* ====================================== */}
      <Surface style={SIPCStyles.headerSurface}>
        {/* {
        user.profile_picture!=''?
          <TouchableOpacity>
            <Image source={{uri: user.profile_picture}} style={[SIPCStyles.headerManImage,{borderRadius:100,width:Width/10,height:Height/20}]}/>
        </TouchableOpacity>
        : */}
        <Image source={require('../assets/man.png')} style={[SIPCStyles.headerManImage, { borderRadius: 100, width: Width / 10, height: Height / 20 }]} />
        {/* } */}

        <Searchbar
          placeholder="Search"
          placeholderTextColor="grey"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={SIPCStyles.searchBar}
          icon={() => (
            <SimpleLineIcons
              name="magnifier"
              size={20}
              style={{ color: 'grey' }}
            />
          )}
        />

        <TouchableWithoutFeedback>
          <Image
            source={require('../assets/print.png')}
            style={[SIPCStyles.playImage, {
              height: Height / 18, width: Width / 10, resizeMode: 'contain',
              alignSelf: 'center', marginTop: 0, marginRight: 10
            }]}
          />
        </TouchableWithoutFeedback>


        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Surveys')}>
          <Image
            source={require('../assets/start-inspection.png')}
            style={SIPCStyles.headerManImage}
          />
        </TouchableWithoutFeedback>
      </Surface>
      <Divider bold={true} />

      {/* ===================TABS==================== */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-around',height:'9%'
        }}>
        <View
          style={{
            paddingVertical: 15,
            paddingHorizontal: 20,
            backgroundColor: 'white',
            borderBottomWidth: Active === 1 ? 1 : 0,
            borderColor: Active === 1 ? '#1485cc' : 'transparent',
            borderRadius:0
          }}
          >
          <Text onPress={() => setActive(1)}
            style={[
              SIPCStyles.NormalFont,
              { color: Active === 1 ? '#1485cc' : '#525252' },
            ]}>
            Building
          </Text>
        </View>

        <View
          style={{
            paddingVertical: 15,
            paddingHorizontal: 20,
            backgroundColor: 'white',
            borderBottomWidth: Active === 2 ? 1 : 0,
            borderColor: Active === 2 ? '#1485cc' : 'transparent', 
            
            borderRadius:0
          }}
          >
          <Text onPress={() => setActive(2)}
            style={[
              SIPCStyles.NormalFont,
              { color: Active === 2 ? '#1485cc' : '#525252' },
            ]}>
            Building Category
          </Text>
        </View>

        <View
          style={{
            paddingHorizontal: 20, paddingVertical: 15,
            backgroundColor: 'white',
            borderBottomWidth: Active === 3 ? 1 : 0,
            borderColor: Active === 3 ? '#1485cc' : 'transparent', 
            
            borderRadius:0
          }}
          >
          <Text onPress={() => setActive(3)} style={[SIPCStyles.NormalFont, { color: Active === 3 ? '#1485cc' : '#525252' },]}>
            Inspection
          </Text>
        </View>

        <View
          style={{
            paddingHorizontal: 20, paddingVertical: 15,
            backgroundColor: 'white',
            borderBottomWidth: Active === 4 ? 1 : 0,
            borderColor: Active === 4 ? '#1485cc' : 'transparent', 
            
            borderRadius:0
          }}
          >
          <Text onPress={() => setActive(4)} style={[SIPCStyles.NormalFont, { color: Active === 4 ? '#1485cc' : '#525252' },]}>
            WorkOrder
          </Text>
        </View>

        <View
          style={{
            paddingHorizontal: 20, 
            paddingVertical: 15,
            backgroundColor: 'white',
            borderBottomWidth: Active === 5 ? 1 : 0,
            borderColor: Active === 5 ? '#1485cc' : 'transparent', 
            
            borderRadius:0
          }}
          >
          <Text onPress={() => setActive(5)} style={[SIPCStyles.NormalFont, { color: Active === 5 ? '#1485cc' : '#525252' },]}>
            KPI
          </Text>
        </View>
      </View>
      </ScrollView>

<ScrollView>

      {/* ====================================================================== */}

      <ReportBox />

      {/* ====================================================================== */}
</ScrollView>
    </View>
  )
}

export default Reports