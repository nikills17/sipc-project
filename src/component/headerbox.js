import {
  View,
  Alert,
  Image,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  Button,
  Card,
  Searchbar,
  TextInput,
  Surface,
  Divider,
  Text,
} from 'react-native-paper';
import SIPCStyles from '../screens/styles';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {MMKV} from 'react-native-mmkv';
export const storage = new MMKV();

const HeaderBox = ({navigation}) => {
  const jsonUser = storage.getString('user');
  const user = JSON.parse(jsonUser);

  const Width = Dimensions.get('window').width;
  const Height = Dimensions.get('window').height;

  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = query => setSearchQuery(query);

  return (
    <View>
      <Surface style={SIPCStyles.headerSurface}>
        {user.profile_picture != '' ? (
          <TouchableOpacity>
            <Image
              source={{uri: user.profile_picture}}
              style={[
                SIPCStyles.headerManImage,
                {borderRadius: 100, width: Width / 10, height: Height / 20},
              ]}
            />
          </TouchableOpacity>
        ) : (
          <Image
            source={require('../assets/man.png')}
            style={[
              SIPCStyles.headerManImage,
              {borderRadius: 100, width: Width / 10, height: Height / 20},
            ]}
          />
        )}
        <Searchbar
          placeholder="Search Inspection"
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
          onPress={() => navigation.navigate('StartInspections')}>
          <Image
            source={require('../assets/start-inspection.png')}
            style={SIPCStyles.headerManImage}
          />
        </TouchableWithoutFeedback>
      </Surface>
      <Divider bold={true} />
    </View>
  );
};

export default HeaderBox;
