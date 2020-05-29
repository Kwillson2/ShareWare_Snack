import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
// import { createBottomTabNavigator } from 'react-navigation-tabs'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ScanHistoryScreen from '../screens/ScanHistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';
import UserProfileSettingsScreen from '../screens/rn-user-profile/Profile3/Profile';
import OpenQrScreen from '../screens/OpenQrScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import { Ionicons } from '@expo/vector-icons';
import MainStackNavigator from './MainStackNavigator';
import * as MyMainStackNavigator from './MyMainStackNavigator';

console.log(`MyMainTabNavigator(): Top`);




console.log(`MyMainTabNavigator(): Before creating createBottomTabNavigator `);
const Tab = createBottomTabNavigator();
export default function MyTabs() {
    let homeScreenVar = null;
    console.log(`MyMainTabNavigator.MyTabs(): Top`);
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false

            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}
        >
            <Tab.Screen
                name="Home"
                component={MyMainStackNavigator.MyHomeScreenStack}
                options={{
                    unmountOnBlur: true,
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon
                            focused={focused}
                            name={
                                Platform.OS === 'ios'
                                    ? `ios-camera${focused ? '' : '-outline'}`
                                    : 'md-camera'
                            }
                        />
                    ),
                }}
            />


            <Tab.Screen
                name="ScanHistory"
                component={MyMainStackNavigator.MyScanHistoryScreenStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
                    ),
                }}
            />

            {/* <Tab.Screen
                name="Chat"
                // component={UserProfileSettingsScreen}
                component={MyMainStackNavigator.MyChatStack}
                options={{
                    headerShown: true,
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-chatboxes' : 'md-chatboxes'} />
                    ),
                }}
            /> */}

            <Tab.Screen
                name="Profile"
                // component={UserProfileSettingsScreen}
                component={MyMainStackNavigator.MyProfileScreenStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
                    ),
                }}
            />

        </Tab.Navigator>
    );
}
// const config = Platform.select({
//     web: { headerMode: 'screen' },
//     default: {},
// });

// const HomeStack = createStackNavigator(
//     {
//         Home: HomeScreen,
//         ScanHistory: ScanHistoryScreen,
//         OpenQr: OpenQrScreen,
//     },
//     config
// );


// HomeStack.navigationOptions = {
//     tabBarLabel: 'Home',
//     name: 'Home',
//     tabPress: HomeScreen.OnHomeTabPress,
//     unmountOnBlur: true,
//     tabBarIcon: ({ focused }) => (
//         <TabBarIcon
//             focused={focused}
//             name={
//                 Platform.OS === 'ios'
//                     ? `ios-information-circle${focused ? '' : '-outline'}`
//                     : 'md-information-circle'
//             }
//         />
//     ),
// };

// HomeStack.path = '';

// const ScanHistoryStack = createStackNavigator(
//     {
//         ScanHistory: ScanHistoryScreen,
//         Home: HomeScreen,
//         OpenQr: OpenQrScreen,
//     },
//     config
// );

// ScanHistoryStack.navigationOptions = {
//     tabBarLabel: 'ScanHistory',
//     name: 'ScanHistory',

//     tabBarIcon: ({ focused }) => (
//         <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
//     ),
// };

// ScanHistoryStack.path = '';

// const SettingsStack = createStackNavigator(
//     {
//         Settings: SettingsScreen,
//     },
//     config
// );

// SettingsStack.navigationOptions = {
//     tabBarLabel: 'Settings',
//     name: 'Settings',

//     tabBarIcon: ({ focused }) => (
//         <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
//     ),
// };

// SettingsStack.path = '';

// const OpenQrStack = createStackNavigator(
//     {
//         OpenQr: OpenQrScreen,
//     },
//     config
// );

// OpenQrStack.navigationOptions = {
//     tabBarLabel: 'OpenQr',
//     name: 'OpenQr',
//     tabBarButtonComponent: null,
//     // tabBarIcon: null, //({ focused }) =>   (
//     //   <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
//     // ),
// };

// OpenQrStack.tabBarOptions = {
//     showLabel: false,
//     showIcon: false,
// }

// OpenQrStack.path = '';

// const tabNavigator = createBottomTabNavigator({
//     HomeStack,
//     ScanHistoryStack,
//     SettingsStack,
//     // OpenQrStack,
// });

// tabNavigator.path = '';


// export default tabNavigator;



console.log(`MyMainTabNavigator(): END`);