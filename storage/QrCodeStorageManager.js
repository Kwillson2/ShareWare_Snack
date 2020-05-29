//
// QrCode: {
//     id: "some-aws-nonesense-string"
//     code: "scanned-qr-bar-code"
//     data: "scanned-qr-bar-code"
//     label: "scanned-qr-bar-code"
//     key: "scanned-qr-bar-code"
//     name: "stringName"
//     type: 42
//     category: "CATEGORY_TYPE"
//     description: "Some description from the user"
//     dateStr: "1/1/2020 12:32:50"
//     assignedToo: ["parentCode1, parentCode2, parentCode3, parentCode4"]
//     assignees: ["childCode1, childCode2, childCode3, childCode4"]
// }
// "id":"aed3bf00-7dbb-4c5b-a4c3-9fdb78eb29e2","code":"071610500280_test","data":"071610500280_test","type":512,"category":"INVENTORY","name":null,"description":null,"dateStr":null
// import AsyncStorage from '@react-native-community/async-storage';


import { AsyncStorage } from 'react-native';
import * as Setup from '../Setup';
import Amplify, { API, graphqlOperation } from "aws-amplify"
import config from "../aws-exports"
import * as Mutation from "../src/graphql/mutations"
import * as Queries from "../src/graphql/queries"
import * as QrUtils from "../utilities/QrUtilities"
import * as QrCodeCloudStorageManager from './QrCodeCloudStorageManager';
import * as QrCodeLocalStorageManager from './QrCodeLocalStorageManager';
import * as FirebaseManager from './FirebaseManager';
import Qr from "../models/Qr"

Amplify.configure(config)

export const STORAGE_KEYS = {
    SAVED_QR_CODE_LIST: 'SAVED_QR_CODE_LIST',
    CODE_MANIFEST: 'CODE_MANIFEST',
}


/**
 * 
 * @param {string} storageKey_ The Qr.code key that is used for storing the code
 * @param {Qr} storageVal_ The Qr code object
 */
export async function DeleteQrCode(storageKey_, storageVal_) {
    try {
        console.log(`QrCodeStorageManager.DeleteQrCode(): Trying to delete:  ${storageKey_}`);

        QrCodeCloudStorageManager.RemoveCodeFromCloud(storageKey_);


    } catch (e) {
        // saving error
        console.log(`QrCodeStorageManager.DeleteQrCode(): ERROR:  ${e.message}`);
    }
}

/**
 *
 * @param {string} storageKey_ The Qr.code key that is used for storing the code
 * @param {Qr} storageVal_ The Qr code object
 * @param {event} event_ The UI Button event  
 */
export async function StoreQrCode(storageKey_, storageVal_, event_) {
    try {

        console.log(`QrCodeStorageManager.StoreQrCode(): Trying to save the code:  ${storageKey_}`);

        // QrCodeCloudStorageManager.StoreQrCodeInCloud(storageKey_, storageVal_, event_);
        FirebaseManager.StoreQrCodeInCloud(null, storageVal_);
        console.log(`QrCodeStorageManager.StoreQrCode(): Saved the code:  ${storageKey_}`);

    } catch (e) {
        // saving error
        console.log(`QrCodeStorageManager.StoreQrCode(): ERROR:  ${e}`);
    }
}

/**
 *  Updates the passed in QR code in the cloud
 * @param {string} storageKey_ The Qr.code key that is used for storing the code
 * @param {Qr} storageVal_ The Qr code object
 * @param {event} event_ The UI Button event  
 */
export async function UpdateQrCode(storageKey_, storageVal_, event_) {
    try {

        console.log(`QrCodeStorageManager.UpdateQrCode(): Trying to save the code:  ${storageKey_}`);

        QrCodeCloudStorageManager.UpdateQrCodeInCloud(storageKey_, storageVal_, event_);

    } catch (e) {
        // saving error
        console.log(`QrCodeStorageManager.UpdateQrCode(): ERROR:  ${e}`);
    }
}


/**
 * Removes a QR entry from its category manifest.  This is needed when changing a category
 * @param {string} storageKey_ The Qr.code key that is used for storing the code
 * @param {Qr} storageVal_ The Qr code object
 * @param {[{"label" = "AUDIO", "value" = "AUDIO"}]}} category_ The Qr code object
 */
export async function UpdateQrCategoryManifest(storageKey_, storageVal_, category_) {
    try {


        if (category_.length > 0) {
            if (storageVal_.category != null) {
                console.log(`QrCodeStorageManager.UpdateQrCategoryManifest(): DeRegistering the QR:  ${storageKey_} from the CATEGORY: ${(storageVal_.category.name)}`);
                // Check if the val's category matches the passed in category_,
                // If it does, do nothing. If it does NOT then decouple it 
                if (storageVal_.category.CATEGORY != category_[0].value) {
                    storageVal_.category.RemoveFromManifest(storageKey_);
                }
            }

            console.log(`QrCodeStorageManager.UpdateQrCategoryManifest(): Adding the QR:  ${storageKey_} to the CATEGORY: ${(category_[0].value)}`);

            // Add it
            storageVal_.category = Setup.CATEGORIES[category_[0].value];
            storageVal_.category.AddToManifest(storageKey_);
            console.log(`QrCodeStorageManager.UpdateQrCategoryManifest(): Qr.category: ${storageVal_.category}`);

        }
        else {
            console.log(`QrCodeStorageManager.UpdateQrCategoryManifest(): category_.length <= 0`);
            console.log(`QrCodeStorageManager.UpdateQrCategoryManifest(): Qr.category: ${storageVal_.category}`);
            if (storageVal_.category != null) {
                console.log(`QrCodeStorageManager.UpdateQrCategoryManifest(): DeRegistering the QR:  ${storageKey_} from the CATEGORY: ${(storageVal_.category.name)}`);
                // Check if the val's category matches the passed in category_,
                // If it does, do nothing. If it does NOT then decouple it 
                if (storageVal_.category.CATEGORY != category_[0].value) {
                    storageVal_.category.RemoveFromManifest(storageKey_);
                }
            }

        }


    } catch (e) {
        // saving error
        console.log(`QrCodeStorageManager.RemoveQrFromCategoryManifest(): ERROR:  ${e}`);
    }
}

/**
 * Gets a list of all the stored QR codes
 */
export async function GetStoredKeyList() {
    return QrCodeCloudStorageManager.GetCloudKeyList();
}


/**
 * Removes all the keys from the Cloud database by
 * calling GetCloudKeyList and then RemoveCodeFromCloud
 * with each key it returns
 */
export async function RemoveAllCodes() {
    QrCodeCloudStorageManager.RemoveAllCodesFromCloud();
    ClearManifest();
}

/**
 * @brief Loads the cloud data into into the Setup CATEGORIES
 * - Pulls down the latest cloud storage list.
 * - Iterates through the list, looking for categories
 * - If it finds a non null one, it will attempt to place it into 
 * the Setup.CATEGORIES manifest using that name
 */
export async function LoadData() {
    FirebaseManager.LoadCloudData();
    // QrCodeCloudStorageManager.LoadCloudData();
}


/**
 * Clears each of the CATEGORIES manifests by = {}
 */
export async function ClearManifest() {
    for (let CAT in Setup.CATEGORIES) {
        console.log(`QrCodeStorageManager.ClearManifest(): Clearing ${e}'s manifest`)
        CAT.ClearManifest();
    }
}
