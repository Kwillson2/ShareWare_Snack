
import { AsyncStorage } from 'react-native';
import * as Setup from '../Setup';
import Qr from "../models/Qr"


/**
 * @brief Creates a new code manifest with the given name as a storage key.
 * Typically used to create the different categories manifests
 * @param {string} manName_ The storage they that this manifest will be stored with
 */
export async function CreateCodeManifest(manName_) {
    console.log(`QrCodeLocalStorageManager.CreateCodeManifest: Trying to create manifest: ${manName_}`);
    try {
        var manifest = {
            // testField: {
            //     data: "404040404",
            // },
        };
        // console.log(`QrCodeLocalStorageManager.CreateCodeManifest: manifest:  ${manifest}`);

        // var manifestStr = JSON.stringify(manifest);
        // await AsyncStorage.setItem(manName_, manifestStr);
        // console.log(`QrCodeLocalStorageManager.CreateCodeManifest: saved:  ${manifestStr}`);
    } catch (error) {
        // Error saving data
        console.log(`QrCodeLocalStorageManager.CreateCodeManifest: ERROR:  ${error}`);
    }

}


export async function StoreData(storageKey_, storageVal_) {
    // try {
    //     var valJson = JSON.stringify(storageVal_);
    //     await AsyncStorage.setItem(storageKey_, valJson)
    // } catch (e) {
    //     // saving error
    //     console.log(`QrCodeLocalStorageManager.StoreData(): ERROR:  ${e}`);
    // }
}

export async function ReadData(storageKey_) {
    // try {
    //     const value = await AsyncStorage.getItem(storageKey_)
    //     if (value !== null) {
    //         let obj = JSON.parse(value);
    //         // console.log(`QrCodeLocalStorageManager.ReadData(): objStr:  ${obj}`);

    //         return obj;
    //     }
    // } catch (e) {
    //     // error reading value
    //     console.log(`QrCodeLocalStorageManager.ReadData(): ERROR:  ${e}`);
    // }
}

export async function DeleteQrCode(storageKey_, storageVal_) {
    try {

        // console.log(`QrCodeLocalStorageManager.DeleteQrCode(): Trying to Delete the code:  ${storageKey_}`);
        // // Load the manifest
        // var manifestJson = await AsyncStorage.getItem(STORAGE_KEYS.CODE_MANIFEST);
        // if (manifestJson !== null) {
        //     // console.log(`QrCodeLocalStorageManager.DeleteQrCode(): Successfully retreieved the manifest:  ${manifestJson}`);
        //     var manifestObj = JSON.parse(manifestJson);
        //     // console.log(`QrCodeLocalStorageManager.DeleteQrCode(): ManifestObj:  ${manifestObj}`);

        //     // Adds the new code to the manifest object
        //     // Object.defineProperty(manifestObj, storageKey_, {value: storageVal_});
        //     delete manifestObj[storageKey_]

        //     if (manifestObj.hasOwnProperty(storageKey_)) {
        //         alert("yes, i have that property");
        //     }
        //     else {
        //         // console.log(`QrCodeLocalStorageManager.DeleteQrCode(): Successfully DELETED the code to the manifest:  ${manifestObj[storageKey_]}`);
        //     }
        //     // Get the JSON serialization
        //     var updatedManifestJson = JSON.stringify(manifestObj);
        //     // console.log(`QrCodeLocalStorageManager.DeleteQrCode(): Updated the manifest:  ${updatedManifestJson}`);

        //     // Stores the actual Qr Code
        //     await AsyncStorage.setItem(STORAGE_KEYS.CODE_MANIFEST, updatedManifestJson);
        //     // console.log(`QrCodeLocalStorageManager.DeleteQrCode(): Successfully stored the code:  ${storageKey_}`);
        //     // ReadData(STORAGE_KEYS.CODE_MANIFEST);

        // }
        // else {

        //     console.log(`QrCodeLocalStorageManager.DeleteQrCode(): ERROR: Unable to find Code Manifest, creating one...`);
        //     CreateCodeManifest(STORAGE_KEYS.CODE_MANIFEST);
        // }

    } catch (e) {
        // saving error
        console.log(`QrCodeLocalStorageManager.DeleteQrCode(): ERROR:  ${e}`);
    }
}


export async function StoreQrCode(storageKey_, storageVal_) {
    try {

        console.log(`QrCodeLocalStorageManager.UpdateCategoryManifest(): Trying to save the code:  ${storageKey_}`);
        // console.log(`QrCodeLocalStorageManager.UpdateCategoryManifest(): Trying to save the Category:  ${storageVal_}`);

        // // StoreQrCodeInCloud(storageKey_, storageVal_);

        // console.log(`QrCodeLocalStorageManager.StoreQrCode(): Trying to save the code:  ${storageKey_}`);
        // console.log(`QrCodeLocalStorageManager.StoreQrCode(): Trying to save the code:  ${storageVal_}`);
        // // Load the manifest
        // var manifestJson = await AsyncStorage.getItem(Setup.CATEGORIES.ALL.manifestName);
        // if (manifestJson !== null) {
        //     console.log(`QrCodeLocalStorageManager.StoreQrCode(): Successfully retreieved the ALL manifest:  ${manifestJson}`);
        //     var manifestObj = JSON.parse(manifestJson);
        //     console.log(`QrCodeLocalStorageManager.StoreQrCode(): ALL ManifestObj:  ${manifestObj}`);

        //     // Adds the new code to the manifest object
        //     // Object.defineProperty(manifestObj, storageKey_, {value: storageVal_});
        //     manifestObj[storageKey_] = storageVal_;
        //     console.log(`QrCodeLocalStorageManager.StoreQrCode(): Successfully added the code to the ALL manifest:  ${manifestObj[storageKey_]}`);

        //     // Get the JSON serialization
        //     var updatedManifestJson = JSON.stringify(manifestObj);
        //     console.log(`QrCodeLocalStorageManager.StoreQrCode(): Updated the ALL manifest:  ${updatedManifestJson}`);

        //     // Stores the actual Qr Code
        //     await AsyncStorage.setItem(Setup.CATEGORIES.ALL.manifestName, updatedManifestJson);
        //     console.log(`QrCodeLocalStorageManager.StoreQrCode(): Successfully stored the code:  ${storageKey_}`);
        //     console.log(`QrCodeLocalStorageManager.StoreQrCode(): Updated ALL Manifest:  ${updatedManifestJson}`);
        //     // ReadData(STORAGE_KEYS.CODE_MANIFEST);


        //     UpdateCategoryManifest(storageKey_, storageVal_);
        // }
        // else {

        //     console.log(`QrCodeLocalStorageManager.StoreQrCode(): ERROR: Unable to find Code Manifest, creating one...`);
        //     CreateCodeManifest(Setup.CATEGORIES.ALL.manifestName);
        //     console.log(`QrCodeLocalStorageManager.StoreQrCode(): Recalling this function...`);
        //     StoreQrCode(storageKey_, storageVal_);
        // }

    } catch (e) {
        // saving error
        console.log(`QrCodeLocalStorageManager.StoreQrCode(): ERROR:  ${e}`);
    }
}


export async function UpdateMainManifest(storageKey_, storageVal_) {
    try {

        console.log(`QrCodeLocalStorageManager.StoreQrCode(): Trying to save the code:  ${storageKey_}`);
        // console.log(`QrCodeLocalStorageManager.StoreQrCode(): Trying to save the code:  ${storageVal_}`);
        // // Load the manifest
        // var manifestJson = await AsyncStorage.getItem(STORAGE_KEYS.CODE_MANIFEST);
        // if (manifestJson !== null) {
        //     console.log(`QrCodeLocalStorageManager.StoreQrCode(): Successfully retreieved the manifest:  ${manifestJson}`);
        //     var manifestObj = JSON.parse(manifestJson);
        //     console.log(`QrCodeLocalStorageManager.StoreQrCode(): ManifestObj:  ${manifestObj}`);

        //     // Adds the new code to the manifest object
        //     // Object.defineProperty(manifestObj, storageKey_, {value: storageVal_});
        //     manifestObj[storageKey_] = storageVal_;
        //     console.log(`QrCodeLocalStorageManager.StoreQrCode(): Successfully added the code to the manifest:  ${manifestObj[storageKey_]}`);

        //     // Get the JSON serialization
        //     var updatedManifestJson = JSON.stringify(manifestObj);
        //     console.log(`QrCodeLocalStorageManager.StoreQrCode(): Updated the manifest:  ${updatedManifestJson}`);

        //     // Stores the actual Qr Code
        //     await AsyncStorage.setItem(STORAGE_KEYS.CODE_MANIFEST, updatedManifestJson);
        //     console.log(`QrCodeLocalStorageManager.StoreQrCode(): Successfully stored the code:  ${storageKey_}`);
        //     console.log(`QrCodeLocalStorageManager.StoreQrCode(): Updated Manifest:  ${updatedManifestJson}`);
        //     // ReadData(STORAGE_KEYS.CODE_MANIFEST);
        // }
        // else {

        //     console.log(`QrCodeLocalStorageManager.StoreQrCode(): ERROR: Unable to find Code Manifest, creating one...`);
        //     CreateCodeManifest(STORAGE_KEYS.CODE_MANIFEST);
        //     console.log(`QrCodeLocalStorageManager.StoreQrCode(): Recalling this function...`);
        //     StoreQrCode(storageKey_, storageVal_);
        // }

    } catch (e) {
        // saving error
        console.log(`QrCodeLocalStorageManager.StoreQrCode(): ERROR:  ${e}`);
    }
}


export async function UpdateCategoryManifest(storageKey_, storageVal_) {
    try {
        console.log(`QrCodeLocalStorageManager.UpdateCategoryManifest(): storageVal_ : ${storageVal_}`)

        // console.log(`QrCodeLocalStorageManager.UpdateCategoryManifest(): Trying to save the Category:  ${storageVal_.category}`);
        // // let tmpCat = Setup.CATEGORIES[storageKey_.category.nameCaps];
        // // console.log(`QrCodeLocalStorageManager.UpdateCategoryManifest(): Temp Category:  ${tmpCat}`);
        // let catManifest = Setup.CATEGORIES[storageVal_.category];
        // console.log(`QrCodeLocalStorageManager.UpdateCategoryManifest(): ${storageVal_.category} Category Manifest: ${catManifest}`);

        // // Load the manifest
        // var manifestJson = await AsyncStorage.getItem(catManifest.manifestName);
        // if (manifestJson !== null) {
        //     console.log(`QrCodeLocalStorageManager.UpdateCategoryManifest(): ${storageVal_.category} Successfully retreieved the ${storageVal_.category} manifest:  ${manifestJson}`);
        //     var manifestObj = JSON.parse(manifestJson);
        //     console.log(`QrCodeLocalStorageManager.UpdateCategoryManifest(): ${storageVal_.category} ManifestObj:  ${manifestObj}`);

        //     // Adds the new code to the manifest object
        //     // Object.defineProperty(manifestObj, storageKey_, {value: storageVal_});
        //     manifestObj[storageKey_] = storageVal_;
        //     console.log(`QrCodeLocalStorageManager.UpdateCategoryManifest(): Successfully added the code to the ${storageVal_.category} manifest:  ${manifestObj[storageKey_]}`);

        //     // Get the JSON serialization
        //     var updatedManifestJson = JSON.stringify(manifestObj);
        //     console.log(`QrCodeLocalStorageManager.UpdateCategoryManifest(): Updated the ${storageVal_.category} manifest:  ${updatedManifestJson}`);

        //     // Stores the actual Qr Code
        //     await AsyncStorage.setItem(catManifest.manifestName, updatedManifestJson);
        //     console.log(`QrCodeLocalStorageManager.UpdateCategoryManifest(): Successfully stored the code:  ${storageKey_}`);
        //     console.log(`QrCodeLocalStorageManager.UpdateCategoryManifest(): Updated ${storageVal_.category} Manifest:  ${updatedManifestJson}`);
        //     // ReadData(STORAGE_KEYS.CODE_MANIFEST);
        // }
        // else {

        //     console.log(`QrCodeLocalStorageManager.UpdateCategoryManifest(): ERROR: Unable to find Code Manifest, creating one...`);
        //     CreateCodeManifest(catManifest.manifestName);
        //     console.log(`QrCodeLocalStorageManager.UpdateCategoryManifest(): Recalling this function...`);
        //     UpdateCategoryManifest(storageKey_, storageVal_);
        // }

    } catch (e) {
        // saving error
        console.log(`QrCodeLocalStorageManager.UpdateCategoryManifest(): ERROR:  ${e}`);
    }
}

// Loops through all the entries in the master manifest and places 
// them in their category's manifest
export async function SyncCategoriesManifest() {
    try {

        console.log(`QrCodeLocalStorageManager.SyncCategoriesManifest(): Trying to save the code:  ${storageKey_}`);
        // // console.log(`QrCodeLocalStorageManager.SyncCategoriesManifest(): Trying to save the code:  ${storageVal_}`);
        // // Load the manifest
        // var manifestJson = await AsyncStorage.getItem(STORAGE_KEYS.CODE_MANIFEST);
        // if (manifestJson !== null) {
        //     console.log(`QrCodeLocalStorageManager.SyncCategoriesManifest(): Successfully retreieved the manifest:  ${manifestJson}`);
        //     var manifestObj = JSON.parse(manifestJson);
        //     console.log(`QrCodeLocalStorageManager.SyncCategoriesManifest(): ManifestObj:  ${manifestObj}`);

        //     for (let [key, qr] of Object.entries(manifestObj)) {
        //         console.log(`QrCodeLocalStorageManager.SyncCategoriesManifest(): ${key}: NAME ${qr.category.nameCaps}`);
        //         if (qr.category.nameCaps != null) {
        //             console.log(`QrCodeLocalStorageManager.SyncCategoriesManifest(): ${key}: ${Setup.CATEGORIES[qr.category.nameCaps]}`);
        //             Setup.CATEGORIES[qr.category.nameCaps].manifest[key] = qr;
        //         }
        //     }

        //     await AsyncStorage.setItem(Setup.CATEGORIES[value.category].manifestName, Setup.CATEGORIES[value.category].manifest);
        // }
        // else {

        //     console.log(`QrCodeLocalStorageManager.SyncCategoriesManifest(): ERROR: Unable to find Code Manifest, creating one...`);
        //     CreateCodeManifest(STORAGE_KEYS.CODE_MANIFEST);

        // }

    } catch (e) {
        // saving error
        console.log(`QrCodeLocalStorageManager.SyncCategoriesManifest(): ERROR:  ${e}`);
    }

}

// Removes a QR entry from its category manifest.  This is needed when changing a category
export async function RemoveQrFromCategoryManifest(storageKey_, storageVal_) {
    try {

        // let catManifest = storageVal_.category.manifest;
        console.log(`QrCodeLocalStorageManager.RemoveQrFromCategoryManifest(): Trying to save the code:  ${storageKey_}`);
        // // Load the manifest
        // var manifestJson = await AsyncStorage.getItem(catManifest);
        // if (manifestJson !== null) {
        //     console.log(`QrCodeLocalStorageManager.RemoveQrFromCategoryManifest(): Successfully retreieved the manifest:  ${manifestJson}`);
        //     var manifestObj = JSON.parse(manifestJson);
        //     console.log(`QrCodeLocalStorageManager.RemoveQrFromCategoryManifest(): ManifestObj:  ${manifestObj}`);

        //     // Adds the new code to the manifest object
        //     // Object.defineProperty(manifestObj, storageKey_, {value: storageVal_});
        //     delete manifestObj[storageKey_]

        //     if (manifestObj.hasOwnProperty(storageKey_)) {
        //         alert("yes, i have that property");
        //     }
        //     else {
        //         console.log(`QrCodeLocalStorageManager.RemoveQrFromCategoryManifest(): UNSuccessfully DELETED the code to the manifest:  ${manifestObj[storageKey_]}`);
        //     }
        //     // Get the JSON serialization
        //     var updatedManifestJson = JSON.stringify(manifestObj);
        //     console.log(`QrCodeLocalStorageManager.RemoveQrFromCategoryManifest(): Updated the manifest:  ${updatedManifestJson}`);

        //     // Stores the actual Qr Code
        //     await AsyncStorage.setItem(catManifest, updatedManifestJson)
        //     console.log(`QrCodeLocalStorageManager.RemoveQrFromCategoryManifest(): Successfully stored the code:  ${storageKey_}`);
        //     // ReadData(STORAGE_KEYS.CODE_MANIFEST);

        // }
        // else {

        //     console.log(`QrCodeLocalStorageManager.RemoveQrFromCategoryManifest(): ERROR: Unable to find Code Manifest, creating one...`);
        //     CreateCodeManifest(catManifest);
        // }

    } catch (e) {
        // saving error
        console.log(`QrCodeLocalStorageManager.RemoveQrFromCategoryManifest(): ERROR:  ${e}`);
    }
}


export async function LoadManifests() {
    console.log(`QrCodeLocalStorageManager.LoadManifests(): Top`);
    for (let category in Setup.CATEGORIES) {
        console.log(`QrCodeLocalStorageManager.LoadManifests(): Category: ${category}`);
        console.log(`QrCodeLocalStorageManager.LoadManifests(): Init Category: ${Setup.CATEGORIES[category]}`);
        try {
            // var manifestJson = await AsyncStorage.getItem(Setup.CATEGORIES[category].manifestName);

            // if (manifestJson !== null) {
            //     // console.log("QrCodeLocalStorageManager.LoadManifests(): Successfully retreieved the manifest: " + manifestJson);
            //     Setup.CATEGORIES[category].manifest = JSON.parse(manifestJson);
            //     console.log(`QrCodeLocalStorageManager.LoadManifests(): Loaded CATEGORIES[${category}].manifest obj: ${Setup.CATEGORIES[category].manifest}`);
            // }
            // else {

            //     console.log("QrCodeLocalStorageManager.LoadManifests(): ERROR: Unable to find Code Manifest, creating one...");
            //     CreateCodeManifest(Setup.CATEGORIES[category].manifestName);
            //     manifestJson = await AsyncStorage.getItem(Setup.CATEGORIES[category].manifestName);
            //     Setup.CATEGORIES[category].manifest = JSON.parse(manifestJson);
            // }

        } catch (e) {
            // saving error
            console.log("QrCodeLocalStorageManager.LoadManifests(): ERROR: " + e);
        }
    }

}

export async function UpdateStoredCodeManifest(desiredKey_) {
    var manifest = ReadData(STORAGE_KEYS.SAVED_QR_CODE_LIST);
    manifest.codes = desiredKey_;
    StoreData(STORAGE_KEYS.SAVED_QR_CODE_LIST, manifest);

    console.log(`QrCodeLocalStorageManager.UpdateStoredCodeManifest(): Manifest:  ${manifest}`);
    try {
    } catch (e) {
        // saving error
    }
}
