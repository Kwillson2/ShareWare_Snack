// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
import {
    Alert,
    Animated,
    InteractionManager,
    Platform,
    StyleSheet,
    Text,
    View,
} from "react-native";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
// import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
// import "firebase/database";
//import "firebase/functions";
import "firebase/storage";

// import firestore from '@react-native-firebase/firestore';
import { Facebook } from "expo";
import firebaseConfig from "../firebaseConfig"
// import { useNavigation } from '@react-navigation/native';
import * as Setup from "../Setup"
import UserInfo from "../models/UserInfo"
import * as QrUtils from "../utilities/QrUtilities"
import Qr from "../models/Qr"


console.log(`FirebaseManager(): Initing firebase....`);



if (!firebase.apps.length) { //avoid re-initializing
    firebase.initializeApp(firebaseConfig);
}

let db = firebase.firestore();

let UID = null;
let curUser = null;
let usersCollection = null;




export const logoutUser = () => {
    firebase.auth().signOut();
};


export function GetCurUser() {
    return curUser;
}

export async function GetUserFacebookData() {
    console.log(`FirebaseManager.GetUserFacebookData(): Trying to get User data...`);
    // const navigation = useNavigation();
    firebase.auth().onAuthStateChanged(user => {
        if (user != null) {
            console.log(`FirebaseManager.GetUserFacebookData(): User logged in: ${user}`);
            console.log(user);
            curUser = new UserInfo(user, this);
            console.log(`FirebaseManager.GetUserFacebookData(): UID logged in: ${user.uid} UserInfo: ${curUser.UID}`);
            UID = user.uid;
            // navigation.navigate('TabNav', { screen: 'Home' });

            storeUserInfo(curUser);
            LoadCloudData();
            // updateUserInfo(CurUser);
        }
        else {
            // No user is signed in.
            UID = null;
            curUser = null;
            console.log(`FirebaseManager.GetUserFacebookData(): NO USER`);
        }
    });
}


export async function LoginWithFacebook() {
    console.log(`FirebaseManager.LoginWithFacebook(): Top`);
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        config.facebook.appId,
        {
            permissions: ['public_profile',
                'email',
                'groups_access_member_info',
                'publish_to_groups',
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
                'user_videos',]
        },
    );

    if (type === 'success' && token) {
        // Build Firebase credential with the Facebook access token.
        const credential = firebase.auth.FacebookAuthProvider.credential(token);

        // Sign in with credential from the Facebook user.
        await Firebase
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

export async function GetUsers() {
    const usersCollection = await db
        .collection('users')
        .get();

    return usersCollection;
}

export async function GetUserInfo(userId) {
    // Get user document with an ID of ABC
    const user = await firestore()
        .collection('users')
        .doc(userId)
        .get();

    return user;
}

export async function GetUserInventory(userId) {
    try {
        console.log(`FirebaseManager.GetUserInventory(): Attempting to get Inventory of: ${userId}`);
        // Get user document with an ID of ABC
        // const inventory = await db=
        //     .collection('users/' + userId + '/inventory')
        //     .get()
        //     .then(() => {
        //         // SUCCESSFUL UPDATE
        //         console.log(`FirebaseManager.GetUserInventory(): Successfully loaded user inventory: ${inventory}`);
        //     });

        const snapshot = await db.collection('users')
            .doc(userId)
            .collection('inventory')
            .get()

        console.log(`FirebaseManager.GetUserInventory(): Successfully loaded user inventory: ${snapshot.docs}`);
        let inventory = snapshot.docs.map(doc => doc.data());

        console.log(`FirebaseManager.GetUserInventory(): Successfully loaded user inventory: ${inventory}`);
        console.log(inventory);

        // const inventory = await db.collection('users/' + userId + '/inventory/')

        return inventory;
    }
    catch (e) {
        console.log(`FirebaseManager.GetUserInventory(): ERROR: ${e.message}`);

    }
}

export async function GetUserSharedInventory() {
    // Get user document with an ID of ABC
    const inventory = await db.collection('users/' + userId + '/sharePool/')
        .get();

    return inventory;
}

async function storeHighScore(userId, score) {
    await firebase.database().ref('users/' + userId).set({
        highscore: score
    });
}



export async function StoreQrCodeInCloud(userId, qr) {
    console.log(`FirebaseManager.StoreQrCodeInCloud(): Attempting to store the Item: ${qr.ToString()}`);
    if (userId == null) {
        userId = UID;
    }

    let inputCategory = null;
    if (qr.category == null || qr.category.objName == null) {
        console.log(`FirebaseManager.StoreQrCodeInCloud(): Setting category to NONE`);
        inputCategory = Setup.CATEGORIES.NONE.objName;
    }
    else {
        console.log(`FirebaseManager.StoreQrCodeInCloud(): Setting category to whats passed in`);
        inputCategory = qr.category.objName;
    }
    console.log(`FirebaseManager.StoreQrCodeInCloud(): Attempting to store the Item: ${qr.ToString()} as category: ${inputCategory}`);

    await db.collection('users/' + userId + '/inventory/')
        .doc(qr.code)
        .set({
            // id: qr.data,
            code: qr.data,
            name: qr.name,
            data: qr.data,
            category: inputCategory,
            // type: qr.type,
            // dateStr: qr.dateStr,
            // // assignees: QrUtils.GetCsvStringFromQrObjDict(qr.assignees),
            // // assignedToo: QrUtils.GetCsvStringFromQrObjDict(qr.assignedToo),
            // description: qr.description,
            // quantity: qr.quantity != null ? qr.quantity : 1,
            sharePool: qr.sharePool,
            visibility: qr.sharePool ? 'public' : 'private'

        })
        .then(() => {
            // SUCCESSFUL UPDATE
            console.log(`FirebaseManager.storeInventoryItem(): Successfully stored Item: ${qr.code}`);
        })
}



export async function updateInventoryItem(userId, qr) {

    await db.collection('users/' + userId + '/inventory/')
        .doc(qr.code)
        .update({
            id: qr.data,
            code: qr.data,
            name: qr.name,
            data: qr.data,
            category: inputCategory,
            type: qr.type,
            dateStr: qr.dateStr,
            assignees: QrUtils.GetCsvStringFromQrObjDict(qr.assignees),
            assignedToo: QrUtils.GetCsvStringFromQrObjDict(qr.assignedToo),
            description: qr.description,
            quantity: qr.quantity != null ? qr.quantity : 1,
            sharePool: qr.sharePool,
            visibility: qr.sharePool ? 'public' : 'private'

        })
        .then(() => {
            // SUCCESSFUL UPDATE
            console.log(`FirebaseManager.updateInventoryItem(): Successfully stored Item: ${qr.code}`);
        })
}


export async function removeInventoryItem(userId, qr) {
    await db.collection('userInventory/')
        .doc(qr.code)
        .delete()
        .then(() => {
            // SUCCESSFUL UPDATE
            console.log(`FirebaseManager.removeInventoryItem(): Successfully removed Item: ${qr.code}`);
        })
}

export async function storeSharePoolItem(userId, qr) {
    // db.collection('users/')
    //     .doc(userId)
    //     .collection('sharePool')
    //     .doc(qr.code)
    //     .set({
    //         id: qr.data,
    //         code: qr.data,
    //         name: qr.name,
    //         data: qr.data,
    //         category: inputCategory,
    //         type: qr.type,
    //         dateStr: qr.dateStr,
    //         assignees: QrUtils.GetCsvStringFromQrObjDict(qr.assignees),
    //         assignedToo: QrUtils.GetCsvStringFromQrObjDict(qr.assignedToo),
    //         description: qr.description,
    //         quantity: qr.quantity != null ? qr.quantity : 1,
    //         sharePool: qr.sharePool,

    //     })
    //     .then(() => {
    //         // SUCCESSFUL UPDATE
    //         console.log(`FirebaseManager.storeSharePoolItem(): Successfully stored Item: ${qr.code}`);
    //     })

    // THESE ARE EQUIVALENT

    await firebase.database().ref('users/' + userId + '/inventory/' + qr.code).set({
        id: qr.data,
        code: qr.data,
        name: qr.name,
        data: qr.data,
        category: inputCategory,
        dateStr: qr.dateStr,
        description: qr.description,
        quantity: qr.quantity != null ? qr.quantity : 1,
        visibility: 'private'
    });
}

export async function storeUserInfo(userInfo) {
    console.log(`FirebaseManager.storeUserInfo(): Attempting to store User: ${userInfo.UID}`);

    await db.collection('users/')
        .doc(userInfo.UID)
        .set({
            name: userInfo.name,
            email: userInfo.email,
            photoUrl: userInfo.photoUrl,
            visibility: 'public'
        })
        .then(() => {
            // SUCCESSFUL UPDATE
            console.log(`FirebaseManager.storeUserInfo(): Successfully stored User: ${userInfo.UID}`);
        })
}

export async function updateUserInfo(userInfo) {
    console.log(`FirebaseManager.updateUserInfo(): Successfully stored User: ${userInfo.name} - ${userInfo.UID}`);

    await db.collection('users/')
        .doc(userInfo.UID)
        .update({
            name: userInfo.name,
            email: userInfo.email,
            photoUrl: userInfo.photoUrl,
            visibility: 'public'
            // position: userInfo.position, // new firestore.GeoPoint(userInfo.position.lat, userInfo.position.long),
        })
        .then(() => {
            // SUCCESSFUL UPDATE
            console.log(`FirebaseManager.updateUserInfo(): Successfully stored Item: ${userInfo.name} - ${userInfo.UID}`);
        })
}

export async function updateUserLocationCallback() {

}

export async function updateUserLocation(userId, userInfo) {

    await db.collection('users/')
        .doc(userId)
        .update({
            position: userInfo.position, //new firestore.GeoPoint(userInfo.position.lat, userInfo.position.long),
        })
        .then(() => {
            // SUCCESSFUL UPDATE
            console.log(`FirebaseManager.updateUserLocation(): Successfully stored Item: ${qr.code}`);
        })

}

export async function updateUserPosition(position_) {

    if (UID != null && position_.length > 0) {
        let { latitude, longitude, altitude, heading, speed } = position_[0].coords;

        await db.collection('users/')
            .doc(UID)
            .update({
                position: new firebase.firestore.GeoPoint(latitude, longitude),
            })
            .then(() => {
                // SUCCESSFUL UPDATE
                console.log(`FirebaseManager.updateUserPosition(): Successfully stored position: ${latitude} : ${longitude}`);
            })
    }
}



const _setTimeout = global.setTimeout;
const _clearTimeout = global.clearTimeout;
const MAX_TIMER_DURATION_MS = 60 * 1000;
if (Platform.OS === "android") {
    // Work around issue `Setting a timer for long time`
    // see: https://github.com/firebase/firebase-js-sdk/issues/97
    const timerFix = {};
    const runTask = (id, fn, ttl, args) => {
        const waitingTime = ttl - Date.now();
        if (waitingTime <= 1) {
            InteractionManager.runAfterInteractions(() => {
                if (!timerFix[id]) {
                    return;
                }
                delete timerFix[id];
                fn(...args);
            });
            return;
        }

        const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
        timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
    };

    global.setTimeout = (fn, time, ...args) => {
        if (MAX_TIMER_DURATION_MS < time) {
            const ttl = Date.now() + time;
            const id = "_lt_" + Object.keys(timerFix).length;
            runTask(id, fn, ttl, args);
            return id;
        }
        return _setTimeout(fn, time, ...args);
    };

    global.clearTimeout = id => {
        if (typeof id === "string" && id.startsWith("_lt_")) {
            _clearTimeout(timerFix[id]);
            delete timerFix[id];
            return;
        }
        _clearTimeout(id);
    };
}



/**
 * @brief Loads the cloud data into into the Setup CATEGORIES
 * - Pulls down the latest cloud storage list.
 * - Iterates through the list, looking for categories
 * - If it finds a non null one, it will attempt to place it into 
 * the Setup.CATEGORIES manifest using that name
 */
export async function LoadCloudData() {
    console.log(`FirebaseManager.LoadCloudData(): Loading User Inventory for UID: ${UID}`);

    try {
        let inventory = await GetUserInventory(UID);

        for (let iCodes = 0; iCodes < inventory.length; iCodes++) {
            let code = new Qr(inventory[iCodes]);
            // console.log(`QrCodeCloudStorageManager.LoadCloudData(): Adding: ${code.ToString()} to the local manifest from the cloud`);

            if (Setup.CATEGORIES.ALL.manifest == null) {
                Setup.CATEGORIES.ALL.manifest = {};
            }
            // This is a ref, so any changes in a Category are reflected here, and vice versa
            Setup.CATEGORIES.ALL.manifest[(code.data)] = code;

            if (code.category != null || code.category != "null") {

                if (Setup.CATEGORIES[code.category] != null) {

                    if (Setup.CATEGORIES[code.category].manifest == null) {
                        Setup.CATEGORIES[code.category].manifest = {};
                    }

                    // console.log(`QrCodeCloudStorageManager.LoadCloudData(): Adding ${code.data} to the CATEGORY: ${code.category}`);

                    Setup.CATEGORIES[code.category].manifest[(code.data)] = code;
                    // console.log(`QrCodeCloudStorageManager.LoadCloudData(): Added QR CODE: ${code.ToString()}`);
                }
                else {
                    // console.log(`QrCodeCloudStorageManager.LoadCloudData(): ERROR: Error adding ${code.data} to the CATEGORY: ${code.category} because Setup.CATEGORIES[${code.category}] is NULL.  Adding it to NONE`);

                    if (Setup.CATEGORIES.NONE.manifest == null) {
                        Setup.CATEGORIES.NONE.manifest = {};
                    }
                    Setup.CATEGORIES.NONE.manifest[(code.data)] = code;
                    code.category = Setup.CATEGORIES.NONE.name;

                    // console.log(`QrCodeCloudStorageManager.LoadCloudData(): Added QR CODE: ${code.ToString()} to NONE`);
                }

                // This is a ref, so any changes in ALL Category are reflected here, and vice versa
                code.assignedToo = QrUtils.GetQrObjArrFromCsv(code.assignedToo);
                code.assignees = QrUtils.GetQrObjArrFromCsv(code.assignees);
                if (code.quantity == null) {
                    code.quantity = 1;
                }
                code.savedInCloud = true;


            }

        }



        console.log(`QrCodeCloudStorageManager.LoadCloudData(): Successfully Loaded AWS DB`);

        console.log(`FirebaseManager.LoadCloudData(): Successfully Loaded Firebase DB`);
        // console.log(inventory);

    } catch (e) {
        // saving error
        console.log(`FirebaseManager.LoadCloudData(): ERROR:  ${e.message}`);
    }
}


/**
 * Apart of the messaging system
 * https://medium.com/@phylypo/react-native-simple-chat-with-firebase-and-giftedchat-f7dbdff2883a
 * @param {callback} callback Callback function
 */
export function refOn(callback) {
    this.ref
        .limitToLast(20)
        .on('child_added', snapshot => callback(parseMsg(snapshot)));
}

/**
 * Sends the messages from the user chat
 * @param {String[]} messages List of messages to send
 */
export function Send(messages) {
    for (let i = 0; i < messages.length; i++) {
        const { text, user } = messages[i];
        const message = { text, user, createdAt: this.timestamp, };
        this.ref.push(message);
    }
};

function parseMsg(snapshot) {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = { _id, timestamp, text, user };
    return message;
};


/**
 * Uploads an image to the user's path.
 * 
 * NOT IMPLEMENTED
 * @param {String} uri Path to the image
 */
export async function UploadImageAsync(uri) {
    console.log(`FirebaseManager.UploadImageAsync(): Uploading:  ${uri} to: ${UID}'s Firebase storage`);
    const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
    });

    const ref = firebase
        .storage()
        .ref()
        // .child(uuid.v4());
        .child(UID);
    const snapshot = await ref.put(blob);

    blob.close();

    console.log(`FirebaseManager.UploadImageAsync(): Uploaded:  ${uri} to: ${UID}'s Firebase storage`);
    return await snapshot.ref.getDownloadURL();
}


// TODO: Switch this to object oriented 
//
class FirebaseSvc {
    constructor() {
        if (!firebase.apps.length) { //avoid re-initializing
            firebase.initializeApp({
                apiKey: "<your-api-key>",
                authDomain: "<your-auth-domain>",
                databaseURL: "https://<your-db-url>.firebaseio.com",
                projectId: "<your-project-id>",
                storageBucket: "<your-storage-bucket>.appspot.com",
                messagingSenderId: "<your-sender-id>"
            });
        }
    }
    login = async (user, success_callback, failed_callback) => {
        await firebase.auth()
            .signInWithEmailAndPassword(user.email, user.password)
            .then(success_callback, failed_callback);
    }
}
const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;