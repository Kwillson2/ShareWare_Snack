import React, { memo } from "react";
import { ActivityIndicator } from "react-native";
import * as firebase from "firebase/app";
import "firebase/auth";
import Background from "../components/Background";
import { theme } from "../core/theme";
import { FIREBASE_CONFIG } from "../core/config";

console.log(`AuthLoadingScreen(): AUTHORIZATION`);
// Initialize Firebase
// firebase.initializeApp(FIREBASE_CONFIG);
// console.log(`AuthLoadingScreen(): Firebase Initialized`);



const AuthLoadingScreen = ({ navigation }) => {
  console.log(`AuthLoadingScreen(): Registering for on Auth State changed ============`);
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // console.log(`AuthLoadingScreen(): LOGGING IN`);
      // console.log(user);
      console.log(`AuthLoadingScreen(): UID logged in: ${user.uid}`);
      // User is logged in
      // navigation.navigate("Dashboard");
      console.log(`AuthLoadingScreen(): Attempting to Navigate to Home...`);
      // navigation.navigate('Home');
      navigation.navigate('TabNav', { screen: 'Home' });
    } else {
      // User is not logged in
      console.log(`AuthLoadingScreen(): NOT LOGGED`);
      navigation.navigate("LoginHome");
    }
  });

  return (
    <Background>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </Background>
  );
}
// }

export default memo(AuthLoadingScreen);
