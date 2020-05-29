
import * as QrUtils from "../utilities/QrUtilities"


/**
 * THIS CLASS IS NOT USED, IT IS JUST USED FOR CODE HELP LINKS
 * @class Qr
 * @var id "some-aws-nonesense-string"
 * @var code "scanned-qr-bar-code"
 * @var data "scanned-qr-bar-code"
 * @var label "scanned-qr-bar-code"
 * @var key "scanned-qr-bar-code"
 * @var name "stringName"
 * @var type The int given by expo camera - 42
 * @var category "CATEGORY_TYPE"
 * @var description "Some description from the user"
 * @var dateStr "1/1/2020 12:32:50"
 * @var assignedToo ["parentCode1, parentCode2, parentCode3, parentCode4"]
 * @var assignees ["childCode1, childCode2, childCode3, childCode4"]
 * @var 
 */
export default class Qr {
    constructor(qr_) {
        try {
            // console.log(`Qr.constructor(): ---------------------------------------------`);
            this.id = qr_.id;
            this.code = qr_.code;
            this.data = qr_.data;
            this.label = qr_.code;
            this.key = qr_.code;
            this.name = qr_.name;
            this.type = qr_.type;
            this.category = qr_.category;
            this.description = qr_.description;
            this.dateStr = qr_.dateStr;
            // this.assignedToo = QrUtils.GetQrObjArrFromCsv(qr_.assignedToo);
            // this.assignees = QrUtils.GetQrObjArrFromCsv(qr_.assignees);
            this.assignedTooCsv = qr_.assignedToo;
            this.assigneesCsv = qr_.assignees;
            this.quantity = qr_.quantity;
            this.savedInCloud = qr_.savedInCloud;
            this.sharePool = qr_.sharePool;
        } catch (e) {
            // saving error
            console.log(`Qr.constructor(): ERROR with Code: ${qr_.code} ==> ${e.message}`);
        }

    }

    ToggleSharePool = () => {
        this.sharePool = !this.sharePool;
    }

    // #region ASSIGNMENT

    /**
     * Couples the passed in QR with this one
     * @param {Qr} qr
     */
    CoupleQrs = (qr) => {
        this.AssignQrToThis(qr);
        this.AssignThisQrToo(qr);
    }
    /**
     * DeCouples the passed in QR with this one
     * @param {Qr} qr
     */
    DeCoupleQrs = (qr) => {
        this.UnassignQrToThis(qr);
        this.UnassignThisQrFrom(qr);
    }

    /**
     * Assigns the passed in QR to this's assignees, and updates the csv
     * @param {Qr} qr
     */
    AssignQrToThis = (qr) => {
        // If its null, then assign it
        if (this.assignees[qr.code] == null) {
            this.assignees[qr.code] = qr;
            this.assigneesCsv = QrUtils.GetCsvStringFromQrObjDict(this.assignees);
        }
    }

    /**
     * Unassigns the passed in QR to this's unassignees, and updates the csv
     * @param {Qr} qr
     */
    UnassignQrToThis = (qr) => {
        // If it is null, then remove it
        if (this.assignees[qr.code] != null) {
            delete this.assignees[qr.code];
            this.assigneesCsv = QrUtils.GetCsvStringFromQrObjDict(this.assignees);
        }
    }

    /**
     * Assigns the passed in QR to this's assignees, and updates the csv
     * @param {Qr} qr
     */
    AssignThisQrFrom = (qr) => {
        // If its null, then assign it
        if (this.assignedToo[qr.code] == null) {
            this.assignedToo[qr.code] = qr;
            this.assignedTooCsv = QrUtils.GetCsvStringFromQrObjDict(this.assignedToo);
        }
    }


    /**
     * Unassigns the passed in QR to this's unassignees, and updates the csv
     * @param {Qr} qr
     */
    UnassignThisQrFrom = (qr) => {
        // If it is null, then remove it
        if (this.assignedToo[qr.code] != null) {
            delete this.assignedToo[qr.code];
            this.assignedTooCsv = Get
        }
    }

    //#endregion

    /**
     * Prints out data about this QR
     */
    ToString = () => {
        let result = `${this.name != null ? `${this.name}: ` : ""}`;  // Name or nothing
        result += `${this.code}[${this.category}]`; // Code
        result += ` @ ${this.dateStr},`;  // Time and Date captured
        result += ` Assignees: ${this.assigneesCsv},`; // Qrs this one is a assigned too
        result += ` AssignedToo: ${this.assignedTooCsv}`; // Qrs assigned to this one
        result += ` Quantity: ${this.quantity}`; // Qrs assigned to this one
        return result;
    }



}