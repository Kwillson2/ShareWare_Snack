import React, { Component } from 'react';
import { Image, ScrollView, TextInput, SafeAreaView, StyleSheet, KeyboardAvoidingView } from 'react-native';
import NumericInput from 'react-native-numeric-input'
import { Container, Header, Content, Card, CardItem, Switch, Thumbnail, Text, Button, Icon, Left, Right, Body } from 'native-base';
import * as Setup from '../Setup';
import * as WebBrowser from 'expo-web-browser';
import FavoriteStar from '../components/buttons/FavoriteStar';
import * as QrCodeStorageManager from '../storage/QrCodeStorageManager';
import {
    View,
    Picker,
    Share,
} from 'react-native';
import CategoryPicker from '../components/CategoryPicker';
import PickerWheelComponent from '../components/PickerWheelComponent';
import MultiPickerComponent from '../components/MultiPickerComponent';
import NestedAccordianMultiPickerComponent from '../components/pickers/NestedAccordianMultiPickerComponent';
import CollapsibleMultiPickerComponent from '../components/CollapsibleMultiPickerComponent';
import AccordianListComponent from '../components/AccordianListComponent';
import ShareButton from '../components/buttons/ShareButton';
import ShareTest from '../components/ShareTest';
import * as Sharing from 'expo-sharing';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as QrUtils from "../utilities/QrUtilities"

export default class CodeBodyCard extends Component {

    constructor(props) {
        console.log(`CodeBodyCard.constructor(): TOP`);
        if (props.value != null && props.qr == null) {
            props.qr = props.value;
        }

        super(props);

        if (props.qr != null) {
            console.log(`CodeBodyCard.constructor(): Barcode Scanned ToString: ${props.qr.ToString()}`);

            this.state = {
                qr: props.qr,
                descriptionText: props.qr.description,
                nameText: props.qr.name != "null" && props.qr.name != "" ? props.qr.name : "Name",
                // Need to create an object list {label: , value: } from the csv
                selected2Assign2: null,
                // quantityText: qr.quantity,
                quantityValue: props.qr.quantity,
            }
        }
        else {
            console.log(`CodeBodyCard.constructor(): props.qr = null`);

        }
    }
    state = {
        user: '',
        /**
         * @param selected2Assign2 Array of Qr objects that are currently 
         * selected in the Assign too picker
         */
        selected2Assign2: null,
        qr: null,
        descriptionText: "",
        nameText: "Name",
        quantityValue: 1,
    }

    updateUser = (user) => {
        this.setState({ user: user })
    }

    handleCategorySelected = (category) => {
        console.log(`CodeBodyCard.handleCategorySelected: Category Selected: ${category}`);
        // Check if there was a category change, if there was deregister the old one
        if (this.props.qr != null && this.props.qr.category != category) {

            console.log(`CodeBodyCard.handleCategorySelected: New Category Selected: ${category}, deregestering the old one`);
            QrCodeStorageManager.UpdateQrCategoryManifest(this.state.qr.data, this.state.qr, category);
            console.log(`CodeBodyCard.handleCategorySelected: Qr After update: ${this.state.qr.ToString()} After update`);
        }

        // this.state.qr.category = category.CATEGORY;
        console.log(`CodeBodyCard.handleCategorySelected: Qr After update: ${this.state.qr.ToString()} END`);
        // this.handleSavePress();
    }

    /**
     * @param selectedAssignQrs_ Array of QR objects of what was selected in the assignment picker
     */
    handleAssign2Code = (selectedAssignQrs_, newAssignQr_, didAdd_) => {
        console.log(`CodeBodyCard.handleAssign2Code: ${didAdd_ ? "Assign" : "Remove"} ${this.props.qr.data} ${didAdd_ ? "too" : "from"} ${selectedAssignQrs_}`);

        // The passed in selectedAssignQrs are in the form of [{label: 'CODE', value: QR}]
        const items =
            selectedAssignQrs_.map(entry => entry.value);

        console.log(`CodeBodyCard.handleAssign2Code: ${items}`)
        this.setState({ selected2Assign2: selectedAssignQrs_ });
        QrUtils.UpdateQrAssignment(this.props.qr, items, newAssignQr_.value, didAdd_);
    }

    handleCodeWebLookup = () => {
        console.log("======== handleCodeWebLookup ========")
        WebBrowser.openBrowserAsync(
            'https://www.google.com/search?q=' + this.props.qr.data
        );
    }

    handleShareCodePress = async () => {
        let qrStr = "TODO CANT STRINGIFY CYCLICAL STRUCTS"; //this.props.qr.ToString();
        console.log(`CodeBodyCard.handleShareCodePress: Sharing Code: ${qrStr}`);
        if (!(await Sharing.isAvailableAsync())) {
            alert(`Uh oh, sharing isn't available on your platform`);
            return;
        }

        Sharing.shareAsync(qrStr);

    }

    /** 
     * Saves the passed in Qr Code to the AWS DB
     */
    handleSavePress = async event => {

        console.log("CodeBodyCard.handleSavePress(): Trying to store data with key: " + this.props.qr.data);
        // QrCodeStorageManager.StoreQrCode(this.props.qr.data, this.props.qr);
        const result = await QrCodeStorageManager.StoreQrCode(this.props.qr.code, this.props.qr, event);

        console.log("CodeBodyCard.handleSavePress(): Stored data with key: " + this.props.qr.data);
    }

    /** 
     * Updates the passed in Qr Code to the AWS DB
     */
    handleUpdatePress = async event => {

        console.log("CodeBodyCard.handleUpdatePress(): Trying to store data with key: " + this.props.qr.data);
        // QrCodeStorageManager.StoreQrCode(this.props.qr.data, this.props.qr);
        // const result = await QrCodeStorageManager.UpdateQrCode(this.props.qr.code, this.props.qr, event);
        const result = await QrCodeStorageManager.StoreQrCode(this.props.qr.code, this.props.qr, event);

        console.log("CodeBodyCard.handleUpdatePress(): Stored data with key: " + this.props.qr.data);
    }

    render() {
        if (this.props.qr != null) {
            // console.log(`CodeBodyCard.render: QR: ${this.props.qr.ToString()}`);
            // let qrStr = this.props.qr.ToString();
            let barcodeTypeIcon = QrUtils.getBarCodeTypeImg(this.props.qr.type);
            return (
                <>
                    {/* <Card style={{}}> */}
                    <CardItem style={styles.card} bordered>
                        <Body>
                            <Text>Name: {this.state.qr.name}</Text>
                            <Text>ID: </Text>
                            <Text>  {this.props.code}</Text>
                        </Body>
                    </CardItem>
                    <CardItem style={styles.card} bordered>
                        <Left>
                            <Button onPress={this.handleCodeWebLookup} textStyle={{ color: '#87838B' }}>
                                <Icon type="MaterialCommunityIcons" name="search-web" />
                                <Text>Web Search</Text>
                            </Button>
                        </Left>
                    </CardItem>
                    <CardItem style={styles.card} bordered>
                        <Left>
                            <Body>
                            </Body>
                        </Left>
                    </CardItem>
                    {this.renderUserDefinedDataCardItem()}
                    {/* {this.renderSaveCardItem()} */}
                    {this.renderUpdateCardItem()}
                    {/* </Card> */}
                </>
            );
        }
        else {

            return (
                <Card style={{}}>
                    <CardItem header style={styles.card} bordered>
                    </CardItem>
                </Card>
            )
        }
    }

    renderTitleCard() {

    }

    items = () => {
        return Object.values(Setup.CATEGORIES.ALL.manifest).map(function (val, index) {
            console.log(`CodeBodyCard: item: ${val.data}  ${val}`)
            return (
                { label: val.data, value: val }
            )
        })
    }

    /**
     * @brief Renders the card for creating a new QR Code in the cloud,
     * which contains user input on the card 
     * 
     */
    renderUserDefinedDataCardItem() {
        return (
            <CardItem style={styles.card} bordered>
                <Left>
                    <Body>
                        <Text>User Defined Data:</Text>
                        {this.renderCategoryAssignment(Setup.CATEGORIES_ARRAY)}
                        {this.renderNameField()}
                        {this.renderQuantityField()}
                        {this.renderDescriptionField()}
                        {this.renderSharePoolSwitch()}
                        {/* {this.renderCodeAssignment2Code()} */}

                    </Body>
                </Left>
            </CardItem>
        );
    }

    renderSharePoolSwitch = () => {
        return (
            this.wrapWithTextLabel(
                <Switch
                    onValueChange={this.state.qr.ToggleSharePool()}
                    value={this.state.qr.sharePool}
                />, "Share Pool", 3, 9)

        );
    }



    renderSaveCardItem() {
        return (
            <CardItem footer style={styles.card} bordered>
                <Button onPress={this.handleSavePress} style={{ width: '100%', }} textStyle={{ color: '#87838B' }}>
                    <Icon type="FontAwesome" name="save" />
                    <Text>Save</Text>
                </Button>
            </CardItem>

        );
    }
    renderUpdateCardItem() {
        return (
            <CardItem footer style={styles.card} bordered>
                <Button onPress={this.handleUpdatePress} style={{ width: '100%', }} textStyle={{ color: '#87838B' }}>
                    <Icon type="FontAwesome" name="save" />
                    <Text>Update</Text>
                </Button>
            </CardItem>

        );
    }


    /**
     * Renders the nested Category picker.  Where:
     *   - The Sub Category List is an Accordian
     *   - Each Sub Category Name / Label is Accordian.head
     *   - Each Sub Category List is Accordian.body.
     *     - Needs only to be rendered when selected, otherwise thousands will
     */
    renderCategoryAssignment(manifest) {
        let qrCat = Setup.getCategoryFromObjString(this.props.qr.category);

        console.log(`CodeBodyCard.renderCategoryAssignment(): Cur Item: ${this.props.qr.name} cat: ${this.props.qr.category}`);
        let selected = null;
        if (qrCat != null) {
            [qrCat.GetNestedCategoryArrayIndex()]; //[[2, 1, 0, 0]]
        }
        console.log(`CodeBodyCard.renderCategoryAssignment(): Selected Items: ${selected}`);

        return (
            <View style={{ flexDirection: 'row' }}>
                {/* <Text style={{ flex: 1, textAlignVertical: 'center' }}>Category: </Text> */}
                <View style={{ flex: 1, paddingVertical: 5, nestedScrollEnabled: true, }}>
                    {/* <CategoryPicker onPicked={this.handleCategorySelected} initCategory={this.props.qr.category} /> */}
                    {/* <MultiPickerComponent items={items} buttonLabel={"Categories"} buttonColor={"grey"} maxSelectAmount={1} onPress={this.handleCategorySelected} /> */}
                    {/* <CollapsibleMultiPickerComponent items={items} buttonLabel={"Categories"} buttonColor={"grey"} maxSelectAmount={1} onPress={this.handleCategorySelected} renderHead={this.renderCategoryAccordianHeader} renderBody={this.renderCategoryAccordianBody} /> */}

                    {/* <CollapsibleMultiPickerComponent items={items} buttonLabel={"Categories"} buttonColor={"grey"} maxSelectAmount={1} onPress={this.handleCategorySelected} /> */}
                    <ScrollView >
                        <NestedAccordianMultiPickerComponent dataArray={manifest} nestedVarTitleName="title" nestedVarName="children" nestedObjFormatCallback={this.nestedObjFormatCallback} selectedItems={selected} maxSelectAmount={1} />
                    </ScrollView>
                </View>
            </View>
        );
    }


    nestedObjFormatCallback = (item, dataArr) => {
        if (dataArr == null) {

            console.log(`CodeBodyCard.nestedObjFormatCallback(): ERROR: Passed in values were null.  returning...`);
            return;
        }

        for (let iArr in dataArr) {
            let val = dataArr[iArr];
            let objKeys = [];
            let nestedLvl = 0;
            let subCats = [];
            let objSubCatNames = [];
            let name = "";
            if (val.value == null) {
                if (val.objName != null) {
                    nestedLvl = val.GetNestedLevel();
                    objKeys = Object.keys(val);
                    objSubCatNames = Object.keys(val.subCategories);
                    name = val.name;
                    subCats = val.subCategories;
                }
                else {
                    console.log(`CodeBodyCard.nestedObjFormatCallback(): ERROR: name: ${val.name} .value = NULL`);
                    console.log(`CodeBodyCard.nestedObjFormatCallback(): ERROR: Title: ${val.title} .value = NULL`);
                    console.log(`CodeBodyCard.nestedObjFormatCallback(): ERROR: val: ${Object.keys(val)}`);
                    return;
                }

            }
            else {
                subCats = val.value.subCategories;
                nestedLvl = val.value.GetNestedLevel();
                objKeys = Object.keys(val.value);
                objSubCatNames = Object.keys(val.value.subCategories);
                name = val.value.name;
            }

            val.title = name;
            // val.parent = item;
            // val.subCategories = subCats;
            // val.isSelected = false;
            // val.isIntermediate = false;
            val.checkBoxStyle = {
                left: nestedLvl * 20,
            };
            val.labelStyle = {
                left: nestedLvl * 20,
            };


        };
        return dataArr;
    }

    renderCodeAssignment2Code() {
        let items =
            Object.values(Setup.CATEGORIES.ALL.manifest).map(function (val, index) {
                // console.log(`CodeBodyCard.renderCodeAssignment2Code(): item: ${val.data}  ${val}`)
                return (
                    { label: val.data, value: val }
                )
            })

        return (
            <View style={{ flexDirection: 'row' }}>
                {/* <Text style={{ flex: 1, textAlignVertical: 'center' }}>Assign Too: </Text> */}
                <View style={{ flex: 1, paddingVertical: 5 }}>
                    <MultiPickerComponent items={items} buttonLabel={"Assign Too"} onPress={this.handleAssign2Code} selectedItems={this.state.selected2Assign2} />
                    {/* <PickerWheelComponent onPicked={this.handleAssign2Code} list={Setup.CATEGORIES.ALL.manifest} /> */}
                </View>
            </View>
        );
    }

    renderQrAssignmentButton() {

        return (

            <Button onPress={this.handleCodeWebLookup} textStyle={{ color: '#87838B' }}>
                <Text>Assign</Text>
                <View style={{ paddingRight: 10, height: 40, width: 40, }} >
                    <Image source={Setup.BUTTON_PATHS.qrBarcodeSaveToQrWhiteTrans}
                        style={{ justifyContent: 'flex-start', width: '100%', height: '100%', resizeMode: 'contain' }} />
                </View>
            </Button>
        );
    }


    onDescriptionFieldChanged = (changedText_) => {
        this.setState({ descriptionText: changedText_ })
        this.state.qr.description = changedText_;
    }


    renderDescriptionField() {
        let text = this.state.qr.description
        return (
            this.wrapWithTextLabel(
                <TextInput style={{
                    borderColor: 'black',
                    borderWidth: 1,
                    textAlignVertical: "top"
                }}
                    // For some reason autoCapitalize does NOT work on samsung keyboards
                    autoCapitalize='sentences'
                    multiline={true}
                    underlineColorAndroid="transparent"
                    placeholder="Description"
                    placeholderTextColor="grey"
                    onChangeText={this.onDescriptionFieldChanged}
                    value={this.state.qr.description}
                />, "Description", 4, 9)
        );
    }



    onNameFieldChanged = (changedText_) => {
        this.setState({ nameText: changedText_ })
        this.state.qr.name = changedText_;
    }

    renderNameField() {

        // console.log(`CodeBodyCard.renderNameField(): Name  ${this.state.qr.name}`)
        return (
            this.wrapWithTextLabel(
                <TextInput style={{
                    borderColor: 'black',
                    borderWidth: 1,
                    textAlignVertical: "top"
                }}
                    // For some reason autoCapitalize does NOT work on samsung keyboards
                    autoCapitalize='sentences'
                    multiline={true}
                    underlineColorAndroid="transparent"
                    placeholder="Name"
                    placeholderTextColor="grey"
                    onChangeText={this.onNameFieldChanged}
                    maxLength={32}
                    value={this.state.qr.name}
                />, "Name", 2, 9)
        );
    }


    onQuantityFieldChanged = (changedText_) => {
        this.setState({ quantityValue: changedText_ })
        this.state.qr.quantity = changedText_;
    }

    renderQuantityField() {

        // console.log(`CodeBodyCard.renderQuantityField(): Name  ${this.state.qr.name}`)
        return (
            this.wrapWithTextLabel(
                <NumericInput
                    value={this.state.quantityValue}
                    minValue={0}
                    onChange={this.onQuantityFieldChanged}
                />, "Quantity", 3, 9)
        );
    }

    wrapWithTextLabel(ui, labelString, flex1, flex2) {

        // console.log(`CodeBodyCard.renderNameField(): Name  ${this.state.qr.name}`)
        return (
            <View style={{ paddingVertical: 5 }} flexDirection='row'>
                <View flex={flex1}>
                    <Text>{labelString}: </Text>
                </View>
                <View flex={flex2}>
                    {ui}
                </View>
            </View>
        );

    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: 'row',
        // backgroundColor: 'green',
    },
    card: {
        backgroundColor: '#97CAE5',
    },
    touchStyle: {
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dadde3'
    }
})