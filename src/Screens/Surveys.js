import { View, Alert, Image, ScrollView, Dimensions, TouchableOpacity, StatusBar, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, Card, Searchbar, TextInput, Surface, Divider, Text, } from 'react-native-paper';
import SIPCStyles from './styles';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import SurveyBox from '../component/surveybox';
import axios from 'axios';

const Surveys = ({ navigation }) => {

    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = query => setSearchQuery(query);

    const [Active, setActive] = useState(0)

    const switch_tab = (x) => {
        if (x == Active) {
            setActive(0);
        } else {
            setActive(x);
        }
    };

    const [data, setData] = useState([]);
    // const params = JSON.stringify({
    //   "pageSize": "25",
    //   "pageNumber": "1",
    //   "appKey": "f9285c6c2d6a6b531ae1f70d2853f612",
    //   "device_id": "68d41abf-31bb-4bc8-95dc-bb835f1bc7a1",
    //   "userId": "1",
    //   "orgId": "1"
    // });

    useEffect(() => {
        setData([
            {
                "type": "Health Life Safety",
                "id": "18",
                "title": "Annual Health Life Safety Survey - ROE",
                "description": "This is the required annual HLS survey required by the Illinois State Board of Education and conducted by the Regional Office of Education",
                "type_id": "5",
                "is_scored": "0",
                "user_id": "4",
                "org_id": "1",
                "role_id": "1",
                "is_modified": "0",
                "feedback_type": "0",
                "status": "1",
                "date_created": "2022-12-15 21:07:13.0"
            },
            {
                "type": "Demo Type",
                "id": "16",
                "title": "Demo Survey",
                "description": "Demo",
                "type_id": "2",
                "is_scored": "1",
                "user_id": "1",
                "org_id": "1",
                "role_id": "1",
                "is_modified": "0",
                "feedback_type": "0",
                "status": "1",
                "date_created": "2022-12-15 20:35:38.0"
            },
            {
                "type": "Master Facility Reopening Checklist",
                "id": "15",
                "title": "Test Survey",
                "description": "Test Survey",
                "type_id": "1",
                "is_scored": "1",
                "user_id": "1",
                "org_id": "1",
                "role_id": "1",
                "is_modified": "0",
                "feedback_type": "0",
                "status": "1",
                "date_created": "2022-02-15 06:15:39.0"
            },
            {
                "type": "Master Facility Reopening Checklist",
                "id": "1",
                "title": "Entrances and Hallways Checklist",
                "description": "Entrances and Hallways Checklist",
                "type_id": "1",
                "is_scored": "1",
                "user_id": "1",
                "org_id": "1",
                "role_id": "1",
                "is_modified": "0",
                "feedback_type": "0",
                "status": "1",
                "date_created": "2022-02-11 07:56:21.0"
            },
            {
                "type": "Master Facility Reopening Checklist",
                "id": "14",
                "title": "Classroom Checklist",
                "description": "Classroom Checklist",
                "type_id": "1",
                "is_scored": "1",
                "user_id": "30",
                "org_id": "1",
                "role_id": "1",
                "is_modified": "0",
                "feedback_type": "0",
                "status": "1",
                "date_created": "2021-09-22 18:03:41.0"
            }

        ])
        // axios.get('http://sipcsurvey.devuri.com/sipcsurvey/survey-list-device?is_api=true', {request: params}).then((response) => {
        //   console.log(response.data)
        //   // setData(response.data);
        // }, (error) => {
        //   console.error(error);
        // });
    }, [])

    return (

        <View style={SIPCStyles.flex}>
            <StatusBar barStyle={"dark-content"} backgroundColor="white" />
                {/* ====================================== */}
                <Surface style={SIPCStyles.headerSurface}>
                    <TouchableWithoutFeedback>
                        <Image source={require('../assets/man.png')}
                            style={SIPCStyles.headerManImage}
                        />
                    </TouchableWithoutFeedback>
                    <Searchbar
                        placeholder="Search Survey"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        style={SIPCStyles.searchBar}
                        placeholderTextColor="grey"
                        icon={() => <SimpleLineIcons name="magnifier" size={20} style={{ color: 'grey' }} />}
                    />
                </Surface>

            <ScrollView>
                {/* =================Data With====Loop ================ */}
                <View style={{ flex:1,}}>
                    {data.map((item, index) => {
                        return <SurveyBox data={item} key={index} navigation={navigation} />
                    })}
                </View>

                {/* ------------------------------------------------------------ */}
            </ScrollView>
        </View>



    )
}

export default Surveys