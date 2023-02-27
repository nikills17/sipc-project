import {
  View,
  Alert,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  TouchableWithoutFeedback,
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
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import SurveyBox from '../component/surveybox';
import API from '../utility/api';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../component/activityindicator';

const Surveys = ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const onChangeSearch = query => setSearchQuery(query);
  const Width = Dimensions.get('window').width;
  const Height = Dimensions.get('window').height;

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const params = JSON.stringify({
    pageSize: '10',
    pageNumber: '1',
    appKey: 'f9285c6c2d6a6b531ae1f70d2853f612',
    device_id: '68d41abf-31bb-4bc8-95dc-bb835f1bc7a1',
    userId: '1',
    orgId: '1',
  });

  // useEffect(() => {
  //   API.instance
  //     .post(
  //       'http://sipcsurvey.devuri.com/sipcsurvey/survey-list-device?is_api=true',
  //       params,
  //     )
  //     .then(
  //       response => {
  //         setData(response.data);
  //       },
  //       error => {
  //         console.error(error);
  //       },
  //     );
  // }, []);
  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      API.instance
        .post(
          'http://sipcsurvey.devuri.com/sipcsurvey/survey-list-device?is_api=true',
          params,
        )
        .then(
          response => {
            setIsLoading(false);
            setData(response.data);
          },
          error => {
            console.error(error);
            setIsLoading(false);
          },
        );
    }, []),
  );

  return (
    <View style={SIPCStyles.flex}>
      <StatusBar barStyle={'dark-content'} backgroundColor="white" />
      {/* ====================================== */}
      <Surface style={SIPCStyles.headerSurface}>
        <TouchableWithoutFeedback>
          <Image
            source={require('../assets/man.png')}
            style={[SIPCStyles.headerManImage,{borderRadius:100,width:Width/10,height:Height/20}]}
          />
        </TouchableWithoutFeedback>
        <Searchbar
          placeholder="Search Survey"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={SIPCStyles.searchBar}
          placeholderTextColor="grey"
          icon={() => (
            <SimpleLineIcons
              name="magnifier"
              size={20}
              style={{color: 'grey'}}
            />
          )}
        />
      </Surface>

      <ScrollView>
        {/* =================Data With====Loop ================ */}
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {data.map((item, index) => {
              return (
                <SurveyBox data={item} key={index} navigation={navigation} />
              );
            })}
          </>
        )}
        {/* ------------------------------------------------------------ */}
      </ScrollView>
    </View>
  );
};

export default Surveys;
