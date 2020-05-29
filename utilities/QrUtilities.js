import * as Setup from '../Setup';

export function SetDefaultQrValues(qr_) {
    // Attempting to store the Item: 887480110722[NONE] @20: 52: 54 5 - 27 - 2020, Assignees: undefined, AssignedToo: undefined Quantity: 1 as category: null
    // Add the current date and time to the qr object
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
    var dateTime = time + ' ' + date;
    console.log(`HomeScreen.onQrScannedCallback(): at time: ${dateTime}`);

    // Set all the fields prior to creating the Qr object
    qr_.dateStr = dateTime;
    qr_.category = Setup.CATEGORIES.NONE.name;
    qr_.quantity = 1;
    qr_.savedInCloud = false;
    qr_.assignees = "none";
    qr_.assignedToo = "none";
    qr_.assigneesCsv = "none";
    qr_.assignedTooCsv = "none";
    qr_.name = "none";
    qr_.sharePool = false;
}

/**
 * @brief This assigns the qrAssignee_ to the assignTooQr_, by setting 
 * qrAssignee_.assignedToo.append(assignTooQr_) and assignTooQr_.assignees.append(qrAssignee_)
 * @param {Qr} qrAssignee_ the QR object to be assigned too assignTooQrs_
 * @param {[Qr]} assignTooQrs_ Array of QR's to assign qrAssignee_ too
 * @param {Qr} assignChangeQr_ The new Qr assigment that.  Typically what was just selected or
 * deselected in the assignment picker 
 */
export function UpdateQrAssignment(qrAssignee_, assignTooQrs_, assignChangeQr_, didAdd_) {
    console.log(`QrCodeStorageManager.UpdateQrAssignment: Trying to ${didAdd_ ? "Assign" : "Remove"} : ${qrAssignee_.code} ${didAdd_ ? "too" : "from"}  ${assignTooQrs_} last changed: ${assignChangeQr_.code} ===== BEFORE`);

    // Couple the assignChangeQr to qrAssignee
    if (didAdd_) {
        qrAssignee_.CoupleQrs(assignChangeQr_);
        assignChangeQr_.CoupleQrs(qrAssignee_);
    }
    // Decouple the assignChangeQr to qrAssignee
    else {
        qrAssignee_.DeCoupleQrs(assignChangeQr_);
        assignChangeQr_.DeCoupleQrs(qrAssignee_);
    }
}

export const BARCODE_SCAN_TYPES = {
    QR: 256,
    UPC: 512,
}


/**
 * @brief Returns the correct native base icon name for the type
 * 
 * @param numVal The type number given from the camera library
 */
export function getBarCodeTypeImg(numVal) {

    switch (numVal) {
        case BARCODE_SCAN_TYPES.QR:
            return "qrcode"
            break;

        default:
            return "barcode"
            break;
    }
    console.log(`QrCodeStorageManager.CreateCodeManifest: Type: ${numVal}`);
}


/**
 * 
 * @param {Qr} qr_ What is to be removed from qArr_
 * @param {[Qr]} qArr_ An array of QRs to remove qr_ from 
 */
export function RemoveQrFromQrArray(qr_, qArr_) {
    console.log(`QrCodeStorageManager.RemoveQrFromQrArray():Removing: ${qr_.code} Qr List: ${qArr_}`);
    if (qArr_ != null) {
        return qArr_.filter(function (ele) { return ele != qr_; });
    }
    else {
        return null
    }
}


/**
 * Returns a string csv of all the QR in the given list, using 'code'
 * @param {[Qr]} qrList_
 *  @returns String csv of all the QRs in the list
 */
export function GetCsvStringFromQrObjArr(qrList_) {
    console.log(`QrCodeStorageManager.GetCsvStringFromQrObjArr(): Qr List: ${qrList_}`);
    let csv = "";
    if (qrList_.length > 0) {
        csv = qrList_[0].code;
        for (let qr in qrList_) {
            csv += `, ${qr.code}`;
        }
    }
    return csv;
}

/**
 * Returns a list of QR objects from the given csv string
 * @param {string} csv_ CSV string of QR codes 
 * @returns {[Qr]} List of QR objects
 */
export function GetQrObjArrFromCsv(csv_) {
    console.log(`QrCodeStorageManager.GetQrObjArrFromCsv(): Ripping CSV: ${csv_}`);
    let qrs = []
    if (csv_ != null) {
        // split on ', ' to get arr of codes
        let qrStrs = csv_.split(", ");
        for (let qrStr in qrStrs) {
            // Check if the qr is in the ALL manifest, and get it
            if (Setup.CATEGORIES.ALL.manifest[qrStr] != null) {
                qrs.push(Setup.CATEGORIES.ALL.manifest[qrStr]);
            }
            else {
                console.log(`QrCodeStorageManager.GetQrObjArrFromCsv(): ERROR: COULD NOT FIND: ${qrStr} in CATEGORIES`);
            }
        }
    }
    return qrs;
}


/**
 * Returns a string csv of all the QR in the given list, using 'code'
 * @param {[Qr]} qrDict_
 *  @returns String csv of all the QRs in the list
 */
export function GetCsvStringFromQrObjDict(qrDict_) {
    console.log(`QrCodeStorageManager.GetCsvStringFromQrObjDict(): Qr Dict: ${qrDict_}`);
    let csv = "";
    if (qrDict_.length > 0) {
        csv = qrDict_[0].code;
        for (let qr in qrDict_) {
            csv += `, ${qr.code}`;
        }
    }
    return csv;
}

/**
 * Returns a list of QR objects from the given csv string
 * @param {string} csv_ CSV string of QR codes 
 * @returns {[Qr]} List of QR objects
 */
export function GetQrObjDictFromCsv(csv_) {
    console.log(`QrCodeStorageManager.GetQrObjDictFromCsv(): Ripping CSV: ${csv_}`);
    let qrs = {};
    if (csv_ != null) {
        // split on ', ' to get arr of codes
        let qrStrs = csv_.split(", ");
        for (let qrStr in qrStrs) {
            // Check if the qr is in the ALL manifest, and get it
            if (Setup.CATEGORIES.ALL.manifest[qrStr] != null) {
                qrs[qrStr] = Setup.CATEGORIES.ALL.manifest[qrStr];
            }
            else {
                console.log(`QrCodeStorageManager.GetQrObjDictFromCsv(): ERROR: COULD NOT FIND: ${qrStr} in CATEGORIES`);
            }
        }
    }
    return qrs;
}

/**
 * Mergest all the passed in objects with eachother
 */
export function mergeStyles() {
    return Array.prototype.concat.apply([], arguments)
}