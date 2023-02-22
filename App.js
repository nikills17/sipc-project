import {Alert, Image, Dimensions} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SurveysScreen from './src/screens/Surveys';
import InspectionsScreen from './src/screens/Inspections';
import WorkOrdersScreen from './src/screens/WorkOrders';
import ReportsScreen from './src/screens/Reports';
import DashboardScreen from './src/screens/Dashboard';
import AddWorkOrdersScreen from './src/screens/AddWorkOrders';
import StartInspectionsScreen from './src/screens/StartInspections';
import CleaningInspectionsScreen from './src/screens/CleaningInspections';
import StartSurveysScreen from './src/screens/StartSurveys';
import SurveyViewAllScreen from './src/screens/SurveyViewAll';
import SaveSurveyScreen from './src/screens/SaveSurvey';
import SavePendingSurveyScreen from './src/screens/SavePendingSurvey';
import AssignmentScreen from './src/screens/Assignment';
import InspectionViewRoomScreen from './src/screens/InspectionViewRoom';
import {responsiveScreenFontSize} from 'react-native-responsive-dimensions';
import SIPCStyles from './src/screens/styles';

import {QueryClientProvider, QueryClient} from 'react-query';

const queryClient = new QueryClient();

const Height = Dimensions.get('window').height;

const Tab = createBottomTabNavigator();
const MyTabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        // tabBarShowLabel:false,
        headerShown: false,
        tabBarLabelPosition: 'below-icon',
        tabBarActiveTintColor: '#3a7fc4',
        tabBarInactiveTintColor: '#78a1aa',
        tabBarLabelStyle: [{fontSize: responsiveScreenFontSize(1.2)}],
        tabBarPosition: 'bottom',
        tabBarStyle: [
          {
            elevation: 0,
            height: Height * 0.08,
            // overflow:'hidden',
            // ...styles.shadow
            paddingBottom: 5,
          },
        ],
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({color, focused}) => (
            <Image
              source={require('./src/assets/dashboard.png')}
              style={[
                SIPCStyles.BottomImage,
                {tintColor: focused ? '#3a7fc4' : '#acbcc6'},
              ]}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Inspections"
        component={InspectionsScreen}
        options={{
          tabBarLabel: 'Inspections',
          tabBarIcon: ({color, focused}) => (
            <Image
              source={require('./src/assets/inspection.png')}
              style={[
                SIPCStyles.BottomImage,
                {tintColor: focused ? '#3a7fc4' : '#acbcc6'},
              ]}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Work Orders"
        component={WorkOrdersScreen}
        options={{
          tabBarLabel: 'Work Orders',
          tabBarIcon: ({color, focused}) => (
            <Image
              source={require('./src/assets/orders.png')}
              style={[
                SIPCStyles.BottomImage,
                {tintColor: focused ? '#3a7fc4' : '#acbcc6'},
              ]}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Survey"
        component={SurveyViewAllScreen}
        options={{
          tabBarLabel: 'Surveys',
          tabBarIcon: ({color, focused}) => (
            <Image
              source={require('./src/assets/survey.png')}
              style={[
                SIPCStyles.BottomImage,
                {tintColor: focused ? '#3a7fc4' : '#acbcc6'},
              ]}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Report"
        component={ReportsScreen}
        options={{
          tabBarLabel: 'Reports',
          tabBarIcon: ({color, focused}) => (
            <Image
              source={require('./src/assets/reports.png')}
              style={[
                SIPCStyles.BottomImage,
                {tintColor: focused ? '#3a7fc4' : '#acbcc6'},
              ]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="SurveyViewAll" component={MyTabScreen} />
          <Stack.Screen name="Surveys" component={SurveysScreen} />
          <Stack.Screen name="AddWorkOrders" component={AddWorkOrdersScreen} />
          <Stack.Screen
            name="StartInspections"
            component={StartInspectionsScreen}
          />
          <Stack.Screen
            name="CleaningInspections"
            component={CleaningInspectionsScreen}
          />
          <Stack.Screen name="StartSurveys" component={StartSurveysScreen} />
          <Stack.Screen name="SaveSurvey" component={SaveSurveyScreen} />
          <Stack.Screen name="SavePendingSurvey" component={SavePendingSurveyScreen} />
          <Stack.Screen name="Assignment" component={AssignmentScreen} />
          <Stack.Screen
            name="InspectionViewRoom"
            component={InspectionViewRoomScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
