import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
// import SettingsScreen from '../screens/SettingsScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
// import HomeExpoScreen from '../screens/HomeScreenExpo';
import TestScreen from '../screens/TestScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
// import QrBuilderScreen from '../screens/QrBuilderScreen';
import ScanHistoryScreen from '../screens/ScanHistoryScreen';
import PairQrScreen from '../screens/PairQrScreen';
import SaveQrScreen from '../screens/SaveQrScreen';
import OpenQrScreen from '../screens/OpenQrScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ScannerScreen from '../screens/ScannerScreen';
import ChatScreen from '../screens/ChatScreen';
import TextRecogScreen from '../screens/TextRecognitionScreen';
import UserProfileSettingsScreen from '../screens/rn-user-profile/Profile3/Profile';
import UserProfileOptionsScreen from '../screens/rn-user-profile/Profile3/Options';
import LoginAuthLoadingScreen from '../screens/firebase-login/screens/AuthLoadingScreen';
import LoginHomeScreen from '../screens/firebase-login/screens/HomeScreen';
import LoginLoginScreen from '../screens/firebase-login/screens/LoginScreen';
import LoginRegisterScreen from '../screens/firebase-login/screens/RegisterScreen';
import LoginForgotPwScreen from '../screens/firebase-login/screens/ForgotPasswordScreen';

import * as Setup from '../Setup';
import { Header } from 'react-native-elements'
import BasicButton from '../components/buttons/BasicButton';
import UserProfileButton from '../components/buttons/UserProfileButton';
import HeaderMultipleIcon from '../components/headers/HeaderMultipleIcon';
import { NavigationEvents } from 'react-navigation';
const homeStackNavigator = createStackNavigator();
const scanHistoryStackNavigator = createStackNavigator();
const loginStackNavigator = createStackNavigator();
const chatStackNavigator = createStackNavigator();



export function MyLoginStack() {
    return (
        <loginStackNavigator.Navigator
            screenOptions={{
                headerShown: false,
                initialRouteName: "AuthLoading",
            }}
        >

            <loginStackNavigator.Screen
                name="AuthLoading"
                component={LoginAuthLoadingScreen} />

            <loginStackNavigator.Screen
                name="LoginHome"
                component={LoginHomeScreen}
            />

            <loginStackNavigator.Screen
                name="Login"
                component={LoginLoginScreen}
                options={{
                    headerShown: true,

                }}
            />

            <loginStackNavigator.Screen
                name="Register"
                component={LoginRegisterScreen} />

            <loginStackNavigator.Screen
                name="ForgotPassword"
                component={LoginForgotPwScreen} />

        </loginStackNavigator.Navigator>
    );
}


export function MyChatStack() {
    return (
        <chatStackNavigator.Navigator
            screenOptions={{
                headerShown: true,
                initialRouteName: "Chat",
            }}
        >
            <chatStackNavigator.Screen
                name="Chat"
                component={ChatScreen}
            />

        </chatStackNavigator.Navigator>
    );
}

export function MyHomeScreenStack() {
    return (
        <homeStackNavigator.Navigator
            screenOptions={{
                headerShown: false
            }}
        >

            <homeStackNavigator.Screen
                name="Home"
                component={HomeScreen}
            />

            <homeStackNavigator.Screen
                name="TextRecog"
                component={TextRecogScreen}
                options={{
                    headerShown: true,
                }}
            />

            <homeStackNavigator.Screen
                name="OpenQr"
                component={OpenQrScreen}
                options={{
                    headerShown: true,

                }}
            />

            <homeStackNavigator.Screen
                name="ScanHistory"
                component={ScanHistoryScreen} />

            <homeStackNavigator.Screen
                name="Profile"
                component={UserProfileSettingsScreen} />

        </homeStackNavigator.Navigator>
    );
}



export function MyScanHistoryScreenStack() {
    return (
        <scanHistoryStackNavigator.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <scanHistoryStackNavigator.Screen
                name="ScanHistory"
                component={ScanHistoryScreen}
                options={{
                    headerShown: false,
                }} />

            <scanHistoryStackNavigator.Screen
                name="Home"
                component={HomeScreen}
            />

            <scanHistoryStackNavigator.Screen
                name="OpenQr"
                component={OpenQrScreen}
                options={{
                    headerShown: true,
                }}
            />

            <scanHistoryStackNavigator.Screen
                name="Profile"
                component={UserProfileSettingsScreen}
                options={{
                    headerShown: false,
                }} />

        </scanHistoryStackNavigator.Navigator>
    );
}

export function MyProfileScreenStack() {
    return (
        <scanHistoryStackNavigator.Navigator
            screenOptions={{
                headerShown: false
            }}
        >

            <scanHistoryStackNavigator.Screen
                name="Profile"
                component={UserProfileSettingsScreen}
                options={{
                    headerShown: false,
                }} />

            <scanHistoryStackNavigator.Screen
                name="Options"
                component={UserProfileOptionsScreen}
                options={({ route }) => ({
                    headerShown: true,
                    title: route.params.title
                })}

            // options={{
            //     headerShown: true,
            // }}
            />

            <scanHistoryStackNavigator.Screen
                name="ScanHistory"
                component={ScanHistoryScreen}
                options={{
                    headerShown: true,
                }} />

            <scanHistoryStackNavigator.Screen
                name="Home"
                component={HomeScreen}
            />

            <scanHistoryStackNavigator.Screen
                name="OpenQr"
                component={OpenQrScreen}
                options={{
                    headerShown: true,
                }}
            />

        </scanHistoryStackNavigator.Navigator>
    );
}