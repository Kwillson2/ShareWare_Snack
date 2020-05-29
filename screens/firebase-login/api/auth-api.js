import * as firebase from "firebase/app";
import "firebase/auth";

import { Facebook } from "expo";


/**
 * Register a subscription callback for changes of the currently authenticated user
 * 
 * @param callback Called with the current authenticated user as first argument
 */
export async function subscribeAuthChange(callback: (user: firebase.User | null) => void) {
  firebase.auth().onAuthStateChanged(callback);
}

export async function LoginWithFacebook() {
  const { type, token } = await Facebook.logInWithReadPermissionsAsync(
    config.facebook.appId,
    { permissions: ['public_profile'] },
  );

  if (type === 'success' && token) {
    // Build firebase credential with the Facebook access token.
    const credential = firebase.auth.FacebookAuthProvider.credential(token);

    // Sign in with credential from the Facebook user.
    await firebase
      .auth()
      .signInAndRetrieveDataWithCredential(credential);
  }
}

export async function FacebookLogin() {
  const { type, token } = await
    Facebook.logInWithReadPermissionsAsync(
      "342823069910303", {
      permission: "public_profile"
    }
    );
}

export const logoutUser = () => {
  firebase.auth().signOut();
};

export const signInUser = async ({ name, email, password }) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    firebase.auth().currentUser.updateProfile({
      displayName: name
    });

    return {};
  } catch (error) {
    switch (error.code) {
      case "auth/email-already-in-use":
        return {
          error: "E-mail already in use."
        };
      case "auth/invalid-email":
        return {
          error: "Invalid e-mail address format."
        };
      case "auth/weak-password":
        return {
          error: "Password is too weak."
        };
      case "auth/too-many-requests":
        return {
          error: "Too many request. Try again in a minute."
        };
      default:
        return {
          error: "Check your internet connection."
        };
    }
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    return {};
  } catch (error) {
    switch (error.code) {
      case "auth/invalid-email":
        return {
          error: "Invalid email address format."
        };
      case "auth/user-not-found":
      case "auth/wrong-password":
        return {
          error: "Invalid email address or password."
        };
      case "auth/too-many-requests":
        return {
          error: "Too many request. Try again in a minute."
        };
      default:
        return {
          error: "Check your internet connection."
        };
    }
  }
};

export const sendEmailWithPassword = async email => {
  try {
    await firebase.auth().sendPasswordResetEmail(email);
    return {};
  } catch (error) {
    switch (error.code) {
      case "auth/invalid-email":
        return {
          error: "Invalid email address format."
        };
      case "auth/user-not-found":
        return {
          error: "User with this email does not exist."
        };
      case "auth/too-many-requests":
        return {
          error: "Too many request. Try again in a minute."
        };
      default:
        return {
          error: "Check your internet connection."
        };
    }
  }
};
