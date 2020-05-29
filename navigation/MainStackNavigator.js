import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
// import HomeExpoScreen from '../screens/HomeScreenExpo';
import TestScreen from '../screens/TestScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
// import QrBuilderScreen from '../screens/QrBuilderScreen';
import ScanHistoryScreen from '../screens/ScanHistoryScreen';
import PairQrScreen from '../screens/PairQrScreen';
import SaveQrScreen from '../screens/SaveQrScreen';
import OpenQrScreen from '../screens/OpenQrScreen';
import ScannerScreen from '../screens/ScannerScreen';

import * as Setup from '../Setup';
import { Header } from 'react-native-elements'
import BasicButton from '../components/buttons/BasicButton';
import UserProfileButton from '../components/buttons/UserProfileButton';
import HeaderMultipleIcon from '../components/headers/HeaderMultipleIcon';
const stackNavigator = createStackNavigator();



export default function MyStack() {
    return (
        <stackNavigator.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#f4511e',
                },
                headerLeftContainerStyle: {

                },
                headerTitleAlign: 'center',
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerRight: props => <BasicButton img={Setup.BUTTON_PATHS.userProfile} nav="UserProfile" style={{}} />,

            }}>

            <stackNavigator.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerLeft: props => <BasicButton img={Setup.BUTTON_PATHS.shoppingCart} nav="UserProfile" style={{}} />,
                    title: 'Share Ware',
                }}
            />

            <stackNavigator.Screen
                name="Links"
                component={LinksScreen} />

            <stackNavigator.Screen
                name="Settings"
                component={SettingsScreen} />

            <stackNavigator.Screen
                name="UserProfile"
                component={UserProfileScreen} />


            <stackNavigator.Screen
                name="Categories"
                component={CategoriesScreen} />

            <stackNavigator.Screen
                name="PairQr"
                component={PairQrScreen} />

            <stackNavigator.Screen
                name="SaveQr"
                component={SaveQrScreen} />

            <stackNavigator.Screen
                name="OpenQr"
                component={OpenQrScreen} />

            <stackNavigator.Screen
                name="ScanHistory"
                component={ScanHistoryScreen} />
        </stackNavigator.Navigator>
    );
}