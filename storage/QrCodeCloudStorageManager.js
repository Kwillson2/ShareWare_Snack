//
// QrCode: {
//     id: "some-aws-nonesense-string"
//     code: "scanned-qr-bar-code"
//     data: "scanned-qr-bar-code"
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
import firebaseConfig from "../firebaseConfig"
import * as Mutation from "../src/graphql/mutations"
import * as Queries from "../src/graphql/queries"
import * as QrUtils from "../utilities/QrUtilities"
import Qr from "../models/Qr"


Amplify.configure(config)

/**
 * The current UserInfo.  Allows syncing of pooled inventory
 */
const CurUser = null;

export async function SetCurUser(user) {
    console.log(`QrCodeCloudStorageManager.SetCurUser(): Setting User: ${user.name}`);
    CurUser = user;
}

/**
 * Need to make sure that the scanned QR codes in the user's inventory 
 * are in sync with the sharePooled QR codes.  Example:
 *  - User has item in inventory, not shared, therefore doesnt exist in the sharePool DB
 *  - User checks the 'SharePool' option on the UI. 
 *  - This sets 'Qr.sharePool = true', and updates the invetory DB
 *  - This funciton gets called to either Add or Remove that Qr to the SharePool DB,
 *    based on that boolean value
 *  - 
 * @param {{Qr}} qr An object containing all the Qr code object defs shared
 */
export async function SharePoolCheck(qr) {
    console.log(`QrCodeCloudStorageManager.SharePoolCheck(): Top`);

}


/**
 * @brief Loads the cloud data into into the Setup CATEGORIES
 * - Pulls down the latest cloud storage list.
 * - Iterates through the list, looking for categories
 * - If it finds a non null one, it will attempt to place it into 
 * the Setup.CATEGORIES manifest using that name
 */
export async function LoadCloudData() {
    // console.log(`QrCodeCloudStorageManager.LoadCloudData(): Loading cloud data...`);

    try {
        let cloudList = await GetCloudKeyList();
        let sharePooledQrs = {};

        // let numCodes = length(cloudList.data.listScannedCodes.items);
        for (let iCodes = 0; iCodes < cloudList.data.listScannedCodes.items.length; iCodes++) {
            let code = new Qr(cloudList.data.listScannedCodes.items[iCodes]);
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

                if (code.sharePool == true) {
                    sharePooledQrs[code.data] = code;
                }

            }

        }



        console.log(`QrCodeCloudStorageManager.LoadCloudData(): Successfully Loaded AWS DB`);

    } catch (e) {
        // saving error
        console.log(`QrCodeCloudStorageManager.LoadCloudData(): ERROR:  ${e.message}`);
    }
}


export async function StoreQrCodeInCloud(storageKey_, storageVal_, event_) {
    try {
        // console.log(`QrCodeCloudStorageManager.StoreQrCodeInCloud(): Stroing: ${storageVal_.ToString()}`);

        event_.preventDefault()

        // const { data, code, category, type } = storageVal_;

        let inputCategory = null;
        if (storageVal_.category == null || storageVal_.category.CATEGORY == null) {
            inputCategory = Setup.CATEGORIES.NONE.CATEGORY;
        }
        else {
            inputCategory = storageVal_.category.CATEGORY;
        }
        // console.log(`QrCodeCloudStorageManager.StoreQrCodeInCloud(): Stroing Category: ${inputCategory}`);

        // This is what gets stored in the AWS DB
        const input = {
            id: storageVal_.data,
            code: storageVal_.data,
            name: storageVal_.name,
            data: storageVal_.data,
            category: inputCategory,
            type: storageVal_.type,
            dateStr: storageVal_.dateStr,
            assignees: QrUtils.GetCsvStringFromQrObjDict(storageVal_.assignees),
            assignedToo: QrUtils.GetCsvStringFromQrObjDict(storageVal_.assignedToo),
            description: storageVal_.description,
            quantity: storageVal_.quantity != null ? storageVal_.quantity : 1,
            sharePool: storageVal_.sharePool,
        }

        // If its a 
        if (input.sharePool)


            console.log(`QrCodeCloudStorageManager.StoreQrCodeInCloud(): Input: ${JSON.stringify(input)}`);
        const result = await API.graphql(graphqlOperation(Mutation.createScannedCode, { input }));

        console.log(`QrCodeCloudStorageManager.StoreQrCodeInCloud(): Successfully saved ${JSON.stringify(input)} in the AWS DB`);
        code.savedInCloud = true;

        const newScannedCode = result.data.createScannedCode;

        // console.log(`QrCodeCloudStorageManager.StoreQrCodeInCloud(): Scanned Code: ${newScannedCode}`);
    } catch (e) {
        // saving error
        console.log(`QrCodeCloudStorageManager.StoreQrCodeInCloud(): ERROR:  ${e.message}`);
    }
    // console.log(`QrCodeCloudStorageManager.StoreQrCodeInCloud(): end`);
}



export async function UpdateQrCodeInCloud(storageKey_, storageVal_, event_) {
    try {
        console.log(`QrCodeCloudStorageManager.UpdateQrCodeInCloud(): Updating: ${storageVal_.ToString()}`);

        event_.preventDefault()

        // const { data, code, category, type } = storageVal_;

        let inputCategory = null;
        if (storageVal_.category == null || storageVal_.category.CATEGORY == null) {
            inputCategory = Setup.CATEGORIES.NONE.CATEGORY;
        }
        else {
            inputCategory = storageVal_.category.CATEGORY;
        }
        console.log(`QrCodeCloudStorageManager.UpdateQrCodeInCloud(): Updating Category: ${inputCategory}`);

        // This is what gets stored in the AWS DB
        const input = {
            id: storageVal_.data,
            code: storageVal_.data,
            name: storageVal_.name,
            data: storageVal_.data,
            category: inputCategory,
            type: storageVal_.type,
            dateStr: storageVal_.dateStr,
            assignees: QrUtils.GetCsvStringFromQrObjDict(storageVal_.assignees),
            assignedToo: QrUtils.GetCsvStringFromQrObjDict(storageVal_.assignedToo),
            description: storageVal_.description,
            quantity: storageVal_.quantity != null ? storageVal_.quantity : 1,
            sharePool: storageVal_.sharePool,
        }


        console.log(`QrCodeCloudStorageManager.UpdateQrCodeInCloud(): Input: ${JSON.stringify(input)}`);
        const result = await API.graphql(graphqlOperation(Mutation.updateScannedCode, { input }));

        console.log(`QrCodeCloudStorageManager.UpdateQrCodeInCloud(): Successfully updated ${JSON.stringify(input)} in the AWS DB`);
        code.savedInCloud = true;

        // const newScannedCode = result.data.createScannedCode;

        // console.log(`QrCodeCloudStorageManager.UpdateQrCodeInCloud(): Scanned Code: ${newScannedCode}`);
    } catch (e) {
        // saving error
        console.log(`QrCodeCloudStorageManager.UpdateQrCodeInCloud(): ERROR:  ${e.message}`);
    }
    // console.log(`QrCodeCloudStorageManager.UpdateQrCodeInCloud(): end`);
}


/// Gets a list of all the stored keys in the AWS
export async function GetCloudKeyList() {
    console.log(`QrCodeCloudStorageManager.GetCloudKeyList(): Getting codes from the cloud...`);
    let storedList = null;
    try {
        storedList = await API.graphql(graphqlOperation(Queries.listScannedCodes));
        console.log(`QrCodeCloudStorageManager.GetCloudKeyList(): Scanned Codes from Cloud: ${storedList}`);
    } catch (e) {
        // saving error
        console.log(`QrCodeCloudStorageManager.GetCloudKeyList(): ERROR:  ${e.message}`);
    }
    return storedList;
}

/// Removes all the keys from the Cloud database by
/// calling GetCloudKeyList and then RemoveCodeFromCloud
/// with each key it returns
export async function RemoveAllCodesFromCloud() {
    let storedList = null;
    try {
        storedList = await GetCloudKeyList();
        console.log(`QrCodeCloudStorageManager.RemoveAllCodesFromCloud(): Trying to remove all this from the Cloud: ${storedList.data.listScannedCodes.items}`);

        // let numCodes = length(storedList.data.listScannedCodes.items);
        for (let iCodes = 0; iCodes < storedList.data.listScannedCodes.items.length; iCodes++) {

            await RemoveCodeFromCloud(storedList.data.listScannedCodes.items[iCodes]);
        }


    } catch (e) {
        // saving error
        console.log(`QrCodeCloudStorageManager.RemoveAllCodesFromCloud(): ERROR:  ${e.message}`);
    }

}

/**
 * Removes the passed in Key from the cloud database        
 * @param {String} key_ 
 */
export async function RemoveCodeFromCloud(key_) {

    try {
        console.log(`QrCodeCloudStorageManager.RemoveCodeFromCloud(): Trying to remove Code from Cloud: ${key_} ID: ${key_.id}`);

        let input = {
            code: key_.code,
        }
        let result = await API.graphql(graphqlOperation(Mutation.deleteScannedCode, { input }));
        console.log(`QrCodeCloudStorageManager.RemoveCodeFromCloud(): Removed ${key_.id} from Cloud`);
    } catch (e) {
        // saving error
        console.log(`QrCodeCloudStorageManager.RemoveCodeFromCloud(): ERROR: ${JSON.stringify(e)} msg: ${e.message}`);
    }
}