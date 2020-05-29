import React, { memo, useState } from "react";
import { TouchableOpacity, StyleSheet, Alert, Text, View } from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { emailValidator, passwordValidator } from "../core/utils";
import { loginUser } from "../api/auth-api";
import Toast from "../components/Toast";
import * as Facebook from "expo-facebook";
import * as firebase from "firebase/app";



export async function FacebookLogin() {
  const { type, token } = await
    Facebook.logInWithReadPermissionsAsync(
      "342823069910303", {
      permission: "public_profile"
    }
    );
}


async function logInFacebook({ navigation }) {
  console.log(`LoginScreen.logInFacebook(): Attempting to login through Facebook`);
  try {
    await Facebook.initializeAsync('742622269598316');
    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions,
    } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile',
        'email',
        // 'groups_access_member_info',
        // 'publish_to_groups',
        'user_age_range',
        'user_birthday',
        'user_friends',
        'user_gender',
        'user_hometown',
        'user_likes',
        'user_link',
        'user_location',
        'user_photos',
        'user_posts',
        'user_videos',
      ],
    });
    if (type === 'success') {
      console.log(`LoginScreen.logInFacebook(): SUCCESSFUL LOGIN`);

      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);

      // var googleToken = null;
      // firebase.auth().getRedirectResult().then(function (result) {
      //   if (result.credential) {
      //     // This gives you a Google Access Token.
      //     var token = result.credential.accessToken;
      //     googleToken = result.credential.accessToken;
      //   }
      //   var user = result.user;
      //   console.log(`LoginScreen.GetUserFaceblogInFacebookookData(): User: ${user}`);
      //   const credential =
      //     firebase
      //       .auth
      //       .FacebookAuthProvider
      //       .credential(googleToken);
      //   firebase
      //     .auth().signInWithCredential(credential).catch(error => {
      //       console.log(error);
      //     });
      // })

      const credential =
        firebase
          .auth
          .FacebookAuthProvider
          .credential(token);
      firebase
        .auth().signInWithCredential(credential)
        .then(() => console.log(`LoginScreen.logInFacebook(): Successfully logged into Firebase!`))
        .catch(error => {
          console.log(error);
        });

      Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);

      var currentUser = firebase.auth().currentUser;
      currentUser.updateProfile({
        displayName: `${(await response.json()).name}`,
      });

      // navigation.navigate('TabNav', { screen: 'Home' });
      navigation.navigate('Home');

    } else {
      console.log(`LoginScreen.logInFacebook(): ERROR: UNSUCCESSFUL LOGIN`);
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
    console.log(`LoginScreen.logInFacebook(): ERROR:  ${message}`);
  }
}


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const _onLoginPressed = async () => {
    if (loading) return;

    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    setLoading(true);

    const response = await loginUser({
      email: email.value,
      password: password.value
    });

    if (response.error) {
      setError(response.error);
    }

    setLoading(false);
  };


  return (
    <Background>
      <BackButton goBack={() => navigation.navigate("Home")} />

      <Logo />

      <Header>Welcome back.</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        autoCapitalize="none"
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button loading={loading} mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      <Button loading={loading} mode="contained" onPress={logInFacebook}>
        Login with Facebook
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>

      <Toast message={error} onDismiss={() => setError("")} />
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24
  },
  row: {
    flexDirection: "row",
    marginTop: 4
  },
  label: {
    color: theme.colors.secondary
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary
  }
});

export default memo(LoginScreen);
