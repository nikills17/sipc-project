import {
  View,
  Alert,
  Image,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  StatusBar,TouchableOpacity
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
import SIPCStyles from './styles';
import Icon2 from 'react-native-vector-icons/Entypo';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {Col, Grid} from 'react-native-easy-grid';
import SurveyViewAllBox from '../component/surveyviewallbox';
import API from '../utility/api';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../component/activityindicator';




const Reports = ({navigation}) => {

  const Width = Dimensions.get('window').width;
  const Height = Dimensions.get('window').height;

  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);

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
          <Image source={require('../assets/man.png')} style={[SIPCStyles.headerManImage,{borderRadius:100,width:Width/10,height:Height/20}]}/>
      {/* } */}

        <Searchbar
          placeholder="Search Survey"
          placeholderTextColor="grey"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={SIPCStyles.searchBar}
          icon={() => (
            <SimpleLineIcons
              name="magnifier"
              size={20}
              style={{color: 'grey'}}
            />
          )}
        />

        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Surveys')}>
          <Image
            source={require('../assets/start-inspection.png')}
            style={SIPCStyles.headerManImage}
          />
        </TouchableWithoutFeedback>
      </Surface>
      <Divider bold={true} />



      {/* ====================================================================== */}
    </View>
  )
}

export default Reports