// import * as FirebaseManager from "../storage/FirebaseManager";

/**
 * This will be the main object for all the users public facing data and actions.
 * Like for name, location, and share pool updates
 */
export default class UserInfo {
    constructor(user_, cloudManager_) {
        try {
            // console.log(`UserInfo.constructor(): ---------------------------------------------`);
            this.id = user_.id;
            this.name = this.getNameFromUserObj(user_);
            this.email = this.getEmailFromUserObj(user_);
            this.photoUrl = this.getPhotoUrlFromUserObj(user_);
            this.cloudManager = cloudManager_;
            // this.OnLocationUpdatedCallback = locationUpdaterCallback;
            this.sharePoolManifest = {};
            this.locations = [];
            this.UID = user_.uid;

        } catch (e) {
            // saving error
            console.log(`UserInfo.constructor(): ERROR with User: ${user_.name} ==> ${e.message}`);
        }

    }


    getName = () => {
        return this.name;
    }

    getPhotoUrl = () => {
        return this.photoUrl;
    }

    /**
     * Auth User objects contain a lot of data, and federated auth
     * can provide a different data structure
     * 
       Object {
        "apiKey": "AIzaSyDYlMqaqpBGcujQ4DDx_ELBb_-BCu0LLOg",
        "appName": "[DEFAULT]",
        "authDomain": "shareware-fffa8.firebaseapp.com",
        "createdAt": "1587693805983",
        "displayName": "undefined",
        "email": null,
        "emailVerified": false,
        "isAnonymous": false,
        "lastLoginAt": "1587915742034",
        "phoneNumber": null,
        "photoURL": "https://graph.facebook.com/2985590808154346/picture",
        "providerData": Array [
            Object {
            "displayName": "Kyle Willson",
            "email": "goofywhiteguy34@aim.com",
            "phoneNumber": null,
            "photoURL": "https://graph.facebook.com/2985590808154346/picture",
            "providerId": "facebook.com",
            "uid": "2985590808154346",
            },
        ],
     */
    getNameFromUserObj = (user_) => {
        let name = "NULL"
        if (user_.providerData != null && user_.providerData.length > 0) {
            name = user_.providerData[0].displayName;
        }
        return name;
    }

    getEmailFromUserObj = (user_) => {
        let email = "NULL"
        if (user_.providerData != null && user_.providerData.length > 0) {
            email = user_.providerData[0].email;
        }
        return email;
    }

    /**
     * Auth User objects contain a lot of data, and federated auth
     * can provide a different data structure
     * 
       Object {
        "apiKey": "AIzaSyDYlMqaqpBGcujQ4DDx_ELBb_-BCu0LLOg",
        "appName": "[DEFAULT]",
        "authDomain": "shareware-fffa8.firebaseapp.com",
        "createdAt": "1587693805983",
        "displayName": "undefined",
        "email": null,
        "emailVerified": false,
        "isAnonymous": false,
        "lastLoginAt": "1587915742034",
        "phoneNumber": null,
        "photoURL": "https://graph.facebook.com/2985590808154346/picture",
        "providerData": Array [
            Object {
            "displayName": "Kyle Willson",
            "email": "goofywhiteguy34@aim.com",
            "phoneNumber": null,
            "photoURL": "https://graph.facebook.com/2985590808154346/picture",
            "providerId": "facebook.com",
            "uid": "2985590808154346",
            },
        ],
     */
    getPhotoUrlFromUserObj = (user_) => {
        return user_.photoURL;
    }

    /**
     * Updates this User's location position
     */
    OnLocationUpdated = (locations) => {
        console.log(`UserInfo.OnLocationUpdated(): Received updated locations: ${locations}`);
        this.locations = locations;
    }

    GetSharePooledManifest = () => {
        console.log(`UserInfo.GetSharePooledManifest(): Top`);
        return this.sharePoolManifest;
    }

    /**
     * Sets this User's sharePool manifest to all the items selected with 
     * 'sharePool = true' in their inventory.  
     */
    SyncSharePooledManifestWithInventory = (sharedInventoryObj) => {
        console.log(`UserInfo.GetSharePooledManifest(): Setting `);

        // Compare whats different and update the differences
        // to reduce on cloud usage and user data transmissions
        let curCloudSharedItems = this.cloudManager.GetUserSharedInventory();
        let tmpItm = null;
        for (let iCld in Object.values(curCloudSharedItems)) {
            tmpItm = curCloudSharedItems[iCld];
            // If the sharedInventoryObj does not contain this item, remove it
            if (tmpItem != null && sharedInventoryObj[tmpItem] == null) {

            }
        }
        let diff = arr1.filter(x => !arr2.includes(x));


    }
}