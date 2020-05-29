import Qr from "../models/Qr";

/**
 * Theres some weird issue where pressing a UI button results in
 * what appears multiple calls.  This is just a simple time lock
 * to limit multiple bursts
 */
var lastLookupTime = 0;

/**
 * Theres some weird issue where pressing a UI button results in
 * what appears multiple calls.  This is just a simple time lock
 * to limit multiple bursts
 */
const MAX_UPC_LOOKUP_RESET_TIME = .75 * 1000;

/**
 * The lookup queue to place UPC codes.  By having a Q I think, 
 * I can skirt around Burst limits, with a sleep time
 */
const LOOKUP_QUEUE = []

var IsQueueActive = false;
var OnQueueCompleteCB = null;

/**
 * Places the passed in code into a queue to be looked up
 * @param {Qr} code_ The string UPC code of the item being looked up
 */
export async function AddTooLookupQueue(code_, cb_) {
    OnQueueCompleteCB = cb_;
    LOOKUP_QUEUE.push(code_);

    if (!IsQueueActive) {
        LookupUpcQueue();
    }
}

/**
 * Looks up a passed in UPC codes, and returns information on it
 * 
 */
export async function LookupUpcQueue() {
    IsQueueActive = true;
    try {
        let attemptNum = 0;
        while (LOOKUP_QUEUE.length > 0) {
            let curDate = new Date();
            let curTime = curDate.getTime();
            if (Math.abs(curTime - lastLookupTime) > MAX_UPC_LOOKUP_RESET_TIME) {
                let code = LOOKUP_QUEUE.shift();
                await LookupUpc(code);
                attemptNum = 0;
            }
            else {
                console.log(`UpcItemLookupDbManager.LookupUpc(): TIME LOCKED Attempt: ${attemptNum}`);
                setTimeout(() => { console.log(`Waiting to lookup: ${code.code} Attempt: ${attemptNum}...`); }, MAX_UPC_LOOKUP_RESET_TIME);
                attemptNum++;
            }
        }
    } catch (error) {
        console.log(`UpcItemLookupDbManager.LookupUpc(): ERROR: ${error}`);
    }
    IsQueueActive = false;
}

/**
 * Looks up a passed in UPC code, and returns information on it
 * @param {Qr} code_ The string UPC code of the item being looked up
 */
export async function LookupUpc(code_) {
    try {
        let curDate = new Date();
        // let curTime = curDate.getTime();

        // if (Math.abs(curTime - lastLookupTime) > MAX_UPC_LOOKUP_RESET_TIME) {
        // lastLookupTime = curTime;
        let response = await fetch(`https://api.upcitemdb.com/prod/trial/lookup?upc=${code_.code}`);
        let responseJson = await response.json();
        console.log(`UpcItemLookupDbManager.LookupUpc(): Items: ${JSON.stringify(responseJson)}`);
        if (responseJson.items.length > 0) {
            code_.name = responseJson.items[0].title;
            code_.upcInfo = new Object();
            code_.upcInfo.category = responseJson.items[0].category;
            // Grab the first image url
            if (responseJson.items[0].images.length > 0) {
                code_.upcInfo.imgSrc = responseJson.items[0].images[0];
            }
            let curTime = curDate.getTime();
            lastLookupTime = curTime;
            console.log(`UpcItemLookupDbManager.LookupUpc(): Code: ${code_.code} name: ${code_.name}`);


            if (OnQueueCompleteCB != null) {
                OnQueueCompleteCB();
            }
        }

        return responseJson.movies;
        // }
        // else {
        //     console.log(`UpcItemLookupDbManager.LookupUpc(): TIME LOCKED`);
        // }
    } catch (error) {
        console.log(`UpcItemLookupDbManager.LookupUpc(): ERROR: ${error}`);
    }
}