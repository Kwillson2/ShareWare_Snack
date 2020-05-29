import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, KeyboardAvoidingView, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Setup from './Setup'
import { createStackNavigator } from '@react-navigation/stack';
import AppNavigator from './navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import * as QrCodeStorageManager from './storage/QrCodeStorageManager';
import MyMainTabNavigator from './navigation/MyMainTabNavigator';
import MainTabNavigator from './navigation/MainTabNavigator';
import MainStackNavigator from './navigation/MainStackNavigator';
import * as MyMainStackNavigator from './navigation/MyMainStackNavigator';
import * as FirebaseManager from './storage/FirebaseManager';
// import AuthService from './services/Auth';

import { decode, encode } from 'base-64'

if (!global.btoa) { global.btoa = encode }

if (!global.atob) { global.atob = decode }

const AppStackNavigator = createStackNavigator();


export default function App(props) {
  console.log(`App(): Top`);

  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [user, setUser] = useState();

  // console.log(`App(): About to create categories...`);
  // await Setup.CreateCategoriesDB();

  componentWillMount();
  if (!isLoadingComplete && !props.skipLoadingScreen) {
    console.log(`App(): Loading Incomplete`);
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    console.log(`App(): Loading Complete`);
    return (
      // <View style={styles.container}>
      //   {Platform.OS === 'ios' && <StatusBar barStyle="default" />}

      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        enabled={true}
      >
        <NavigationContainer>

          {/* <MyMainStackNavigator.MyLoginStack name="LoginNav" >
            <MyMainTabNavigator name="TabNav" />
          </MyMainStackNavigator.MyLoginStack > */}

          <AppStackNavigator.Navigator>
            <AppStackNavigator.Screen name="LoginNav" component={MyMainStackNavigator.MyLoginStack} />
            <AppStackNavigator.Screen name="TabNav" component={MyMainTabNavigator}
              screenOptions={{
                headerShown: false,
              }}
              options={{
                headerShown: false,
              }} />
          </AppStackNavigator.Navigator>

        </NavigationContainer>
      </KeyboardAvoidingView>
    );
  }
}

async function componentWillMount() {
  console.log(`App.componentWillMount(): Top`);
  await Font.loadAsync({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
  });

  console.log(`App.componentWillMount(): End`);

}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
    // FirebaseManager.subscribeAuthChange(user => setUser(user)),
    Setup.CreateCategoriesDB(),
    FirebaseManager.GetUserFacebookData(),
    Setup.StartBackgroundLocation(onLocationUpdated),
    // FirebaseManager.RenderLoginUi(),
    // QrCodeStorageManager.LoadData(),

  ]);
}

function onLocationUpdated(locations) {
  // console.log(`App.onLocationUpdated(): ${JSON.stringify(locations)}`);
  FirebaseManager.updateUserPosition(locations);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});