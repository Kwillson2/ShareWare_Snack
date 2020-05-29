/**
 *
 * @var {string} CATEGORY
 * @var {string} imgSrc
 * @var {string} manifestName
 * @var {string} manifest The object that contains all the Qr Code objects. 
 * @var {string} nameCaps
 * @var {string} nameLower
 * @var {string} name
 * @var {string} cardCategoryRender
 */
export default class QrCategory {

    // constructor(CATEGORY_, imgSrc_, manifestName_, manifest_, nameCaps_, nameLower_, name_, cardCategoryRender_) {
    //     this.CATEGORY = CATEGORY_;
    //     this.imgSrc = imgSrc_;
    //     this.manifestName = manifestName_;
    //     this.manifest = manifest_;
    //     this.nameCaps = nameCaps_;
    //     this.nameLower = nameLower_;
    //     this.name = name_;
    //     this.cardCategoryRender = cardCategoryRender_;
    //     this.subCategories = {};
    //     this.parentCategory = {};
    // }


    constructor(catID_, name_, formalName_, objName_, parent_) {
        this.fullName = formalName_;
        this.name = name_;
        this.catID = catID_;
        this.objName = objName_;
        // this.CATEGORY = name_.toUpperCase();
        this.imgSrc = null;
        this.manifestName = name_;
        this.manifest = {};
        // this.nameCaps = name_.toUpperCase();
        // this.nameLower = name_.toLowerCase();
        this.cardCategoryRender = null;
        this.subCategories = {};
        this.parentCategory = parent_;

        this.Initialize();
    }

    /**
     * Performs any initializations.  
     * Like adding this to its parent
     */
    Initialize = () => {
        if (this.parentCategory != null && this.parentCategory.AddSubCategory != null) {
            this.parentCategory.AddSubCategory(this);
        }
    }

    AddSubCategory = (subCat) => {
        this.subCategories[subCat.objName] = subCat;
    }

    ClearManifest = () => {
        console.log(`QrCategory.ClearManifest(): Clearing ${this.CATEGORY} manifest`);
        this.manifest = {};
    }

    GetSubCategoryNames = () => {
        return Object.getOwnPropertyNames(this.subCategories);
    }

    /**
     * Adds the passed in QR code to the this.state.manifest
     * @param {string} qrKey_ Qr.code
     * @param {Qr} qrVal_ The Qr Code object
     *
     */
    RemoveFromManifest(qrKey_) {
        delete this.manifest[qrKey_];
        console.log(`QrCategory.ClearManifest(): Removed: ${qrKey_} from the ${this.CATEGORY} manifest`);
    }

    /**
     * Adds the passed in QR code to the this.state.manifest
     * @param {string} qrKey_ Qr.code 
     * @param {Qr} qrVal_ The Qr Code object
     * 
     */
    AddToManifest(qrKey_, qrVal_) {
        this.manifest[qrKey_] = qrVal_;
        console.log(`QrCategory.ClearManifest(): Added: ${qrKey_} to the ${this.CATEGORY} manifest`);
    }

    /**
     * Returns how many sub levels this Category is down.  
     * Does this by splitting the ObjectStrName with "."
     */
    GetNestedLevel = () => {
        if (this.objName != null && this.objName.includes(".")) {
            return this.objName.split(".").length - 1
        }
        else {
            return 0;
        }
    }

    /**
     * This iterates up its parent tree, and gets each node's
     * array index.(If the object was changed into an array)
     * Arrays are used for accordians and list components, where
     * this index can make lookups easier
     */
    GetNestedCategoryArrayIndex = () => {
        // console.log(`QrCategory.GetNestedCategoryArrayIndex(): Getting ${this.name}'s array index...`);
        if (this.name == "NONE") {
            return [1];
        }


        let indicesArr = [];
        try {
            let tmpParent = this.parentCategory;
            let tmpCat = this;
            let lastCatName = this.name;
            let parentSubCats = null;

            while (tmpParent != null && tmpParent.subCategories != null) {
                parentSubCats = Object.keys(tmpParent.subCategories);
                // console.log(`QrCategory.GetNestedCategoryArrayIndex(): Getting ${tmpCat.name}'s parent: ${tmpParent.name}. subCats: ${parentSubCats}`);
                if (tmpCat != null) {
                    indicesArr.unshift(parentSubCats.indexOf(tmpCat.objName));
                }
                tmpCat = tmpParent;
                tmpParent = tmpParent.parentCategory;
            }

            // CRITICAL. Increment the first index by two to account for ALL and NONE
            if (indicesArr.length > 0) {
                // console.log(`QrCategory.GetNestedCategoryArrayIndex(): Incrementing  ${this.name}'s arr`);
                indicesArr[0] += 2;
            }
        }
        catch (e) {
            console.log(`QrCategory.GetNestedCategoryArrayIndex(): ERROR: ${e.message}`);
        }
        return indicesArr;
    }

}