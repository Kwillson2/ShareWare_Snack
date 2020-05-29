import React, { Component } from 'react';
import { Image, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native';
import NumericInput from 'react-native-numeric-input'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body } from 'native-base';
import Setup, { CATEGORIES, BUTTON_PATHS } from '../Setup';
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
import ShareButton from '../components/buttons/ShareButton';
import ShareTest from '../components/ShareTest';
import * as Sharing from 'expo-sharing';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as QrUtils from "../utilities/QrUtilities"

export default class LookedUpQrCodeCard extends Component {

    constructor(props) {
        console.log(`LookedUpQrCodeCard.constructor(): TOP`);
        super(props);
        if (props.qr != null) {
            console.log(`LookedUpQrCodeCard.constructor(): Barcode Scanned ToString: ${props.qr.ToString()}`);

            this.state = {
                qr: props.qr,
                descriptionText: props.qr.description,
                nameText: props.qr.name != "null" && props.qr.name != "" ? props.qr.name : "Name",
                // Need to create an object list {label: , value: } from the csv
                selected2Assign2: null,
                // quantityText: qr.quantity,
            }
        }
        else {
            console.log(`LookedUpQrCodeCard.constructor(): props.qr = null`);

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
        console.log(`LookedUpQrCodeCard.handleCategorySelected: Category Selected: ${category}`);
        // Check if there was a category change, if there was deregister the old one
        if (this.props.qr != null && this.props.qr.category != category) {

            console.log(`LookedUpQrCodeCard.handleCategorySelected: New Category Selected: ${category}, deregestering the old one`);
            QrCodeStorageManager.UpdateQrCategoryManifest(this.state.qr.data, this.state.qr, category);
            console.log(`LookedUpQrCodeCard.handleCategorySelected: Qr After update: ${this.state.qr.ToString()} After update`);
        }

        // this.state.qr.category = category.CATEGORY;
        console.log(`LookedUpQrCodeCard.handleCategorySelected: Qr After update: ${this.state.qr.ToString()} END`);
        // this.handleSavePress();
    }

    /**
     * @param selectedAssignQrs_ Array of QR objects of what was selected in the assignment picker
     */
    handleAssign2Code = (selectedAssignQrs_, newAssignQr_, didAdd_) => {
        console.log(`LookedUpQrCodeCard.handleAssign2Code: ${didAdd_ ? "Assign" : "Remove"} ${this.props.qr.data} ${didAdd_ ? "too" : "from"} ${selectedAssignQrs_}`);

        // The passed in selectedAssignQrs are in the form of [{label: 'CODE', value: QR}]
        const items =
            selectedAssignQrs_.map(entry => entry.value);

        console.log(`LookedUpQrCodeCard.handleAssign2Code: ${items}`)
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
        console.log(`LookedUpQrCodeCard.handleShareCodePress: Sharing Code: ${qrStr}`);
        if (!(await Sharing.isAvailableAsync())) {
            alert(`Uh oh, sharing isn't available on your platform`);
            return;
        }

        Sharing.shareAsync(qrStr);

    }


    handleSavePress = async event => {

        console.log("LookedUpQrCodeCard.handleSavePress(): Trying to store data with key: " + this.props.qr.data);
        // QrCodeStorageManager.StoreQrCode(this.props.qr.data, this.props.qr);
        const result = await QrCodeStorageManager.StoreQrCode(this.props.qr.code, this.props.qr, event);

        console.log("LookedUpQrCodeCard.handleSavePress(): Stored data with key: " + this.props.qr.data);
    }

    render() {
        if (this.props.qr != null) {
            // console.log(`LookedUpQrCodeCard.render: QR: ${this.props.qr.ToString()}`);
            // let qrStr = this.props.qr.ToString();
            let barcodeTypeIcon = QrUtils.getBarCodeTypeImg(this.props.qr.type);
            return (
                <Container>
                    <Content padder>
                        <Card style={{}}>
                            <CardItem header bordered>
                                <Left>
                                    <Body>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ flex: 1, alignSelf: 'center', textAlignVertical: 'center', }}>
                                                <Icon type="MaterialCommunityIcons" name={barcodeTypeIcon} style={{ marginRight: 5, alignSelf: 'center', textAlignVertical: 'center', }} />
                                            </View>
                                            <View style={{ flex: 8, flexDirection: 'column' }}>
                                                <Text>{this.state.qr.name}  {this.props.qr.code}</Text>
                                                <Text note>{this.props.qr.dateStr} {this.state.qr.category}</Text>
                                            </View>
                                            <View style={{ flex: 1, alignSelf: 'center', textAlignVertical: 'center', }}>
                                                <ShareButton msg={"qrStr"} onPress={this.handleShareCodePress} />
                                            </View>
                                        </View>
                                    </Body>
                                </Left>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                    <Text>Name: {this.state.qr.name}</Text>
                                    <Text>ID: </Text>
                                    <Text>  {this.props.textBody}</Text>
                                </Body>
                            </CardItem>
                            <CardItem bordered>
                                <Left>
                                    <Button onPress={this.handleCodeWebLookup} textStyle={{ color: '#87838B' }}>
                                        <Icon type="MaterialCommunityIcons" name="search-web" />
                                        <Text>Web Search</Text>
                                    </Button>
                                </Left>
                            </CardItem>
                            <CardItem bordered>
                                <Left>
                                    <Body>
                                    </Body>
                                </Left>
                            </CardItem>
                        </Card>
                        {this.renderCreateCard()}
                    </Content>
                </Container>
            );
        }
        else {

            return (
                <Container>
                    <Content padder>
                        <Card style={{}}>
                            <CardItem header bordered>
                            </CardItem>
                        </Card>
                    </Content>
                </Container>
            )
        }
    }

    renderTitleCard() {

    }

    items = () => {
        return Object.values(CATEGORIES.ALL.manifest).map(function (val, index) {
            console.log(`LookedUpQrCodeCard: item: ${val.data}  ${val}`)
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
    renderCreateCard() {
        return (
            <Card>
                <CardItem bordered>
                    <Left>
                        <Body>
                            <Text>User Defined Data:</Text>
                            {this.renderNameField()}
                            {this.renderQuantityField()}
                            {this.renderCategoryAssignment()}
                            {this.renderCodeAssignment2Code()}
                            {this.renderNotesField()}

                        </Body>
                    </Left>
                </CardItem>
                <CardItem footer bordered>
                    <Button onPress={this.handleSavePress} style={{ width: '100%', }} textStyle={{ color: '#87838B' }}>
                        <Icon type="FontAwesome" name="save" />
                        <Text>Save</Text>
                    </Button>
                </CardItem>
            </Card>
        );
    }

    renderAssignCard() {
        return (
            <Card>
                <CardItem bordered>
                    <Left>
                        <Body>
                            <Text>User Defined Data:</Text>
                            {this.renderCategoryAssignment()}
                        </Body>
                    </Left>
                </CardItem>
                <CardItem footer bordered>
                    <Button onPress={this.handleSavePress} style={{ width: '100%', }} textStyle={{ color: '#87838B' }}>
                        <Icon type="FontAwesome" name="save" />
                        <Text>Save</Text>
                    </Button>
                </CardItem>
            </Card>
        );
    }


    renderCategoryAssignment() {
        let items =
            Object.keys(CATEGORIES).map(function (val, index) {
                // console.log(`LookedUpQrCodeCard.renderCategoryAssignment(): item: ${val.data}  ${val}`)
                return (
                    { label: val, value: val }
                )
            })

        return (
            <View style={{ flexDirection: 'row' }}>
                {/* <Text style={{ flex: 1, textAlignVertical: 'center' }}>Category: </Text> */}
                <View style={{ flex: 1, paddingVertical: 5, }}>
                    {/* <CategoryPicker onPicked={this.handleCategorySelected} initCategory={this.props.qr.category} /> */}
                    <MultiPickerComponent items={items} buttonLabel={"Categories"} buttonColor={"grey"} maxSelectAmount={1} onPress={this.handleCategorySelected} />
                </View>
            </View>
        );
    }

    renderCodeAssignment2Code() {
        let items =
            Object.values(CATEGORIES.ALL.manifest).map(function (val, index) {
                // console.log(`LookedUpQrCodeCard.renderCodeAssignment2Code(): item: ${val.data}  ${val}`)
                return (
                    { label: val.data, value: val }
                )
            })

        return (
            <View style={{ flexDirection: 'row' }}>
                {/* <Text style={{ flex: 1, textAlignVertical: 'center' }}>Assign Too: </Text> */}
                <View style={{ flex: 1, paddingVertical: 5 }}>
                    <MultiPickerComponent items={items} buttonLabel={"Assign Too"} onPress={this.handleAssign2Code} selectedItems={this.state.selected2Assign2} />
                    {/* <PickerWheelComponent onPicked={this.handleAssign2Code} list={CATEGORIES.ALL.manifest} /> */}
                </View>
            </View>
        );
    }

    renderQrAssignmentButton() {

        return (

            <Button onPress={this.handleCodeWebLookup} textStyle={{ color: '#87838B' }}>
                <Text>Assign</Text>
                <View style={{ paddingRight: 10, height: 40, width: 40, }} >
                    <Image source={BUTTON_PATHS.qrBarcodeSaveToQrWhiteTrans}
                        style={{ justifyContent: 'flex-start', width: '100%', height: '100%', resizeMode: 'contain' }} />
                </View>
            </Button>
        );
    }


    onNoteFieldChanged = (changedText_) => {
        this.setState({ descriptionText: changedText_ })
        this.state.qr.description = changedText_;
    }


    renderNotesField() {

        return (
            <View style={{ paddingVertical: 5 }}>
                <TextInput style={{
                    borderColor: 'black',
                    borderWidth: 1,
                    textAlignVertical: "top"
                }}
                    // For some reason autoCapitalize does NOT work on samsung keyboards
                    autoCapitalize='senetences'
                    multiline={true}
                    underlineColorAndroid="transparent"
                    placeholder="Description"
                    placeholderTextColor="grey"
                    autoCapitalize="none"
                    onChangeText={this.onNoteFieldChanged}

                />
            </View>
        );
    }



    onNameFieldChanged = (changedText_) => {
        this.setState({ nameText: changedText_ })
        this.state.qr.name = changedText_;
    }

    renderNameField() {

        console.log(`LookedUpQrCodeCard.renderNameField(): Name  ${this.state.qr.name}`)
        return (
            <View style={{ paddingVertical: 5 }}>
                <TextInput style={{
                    borderColor: 'black',
                    borderWidth: 1,
                    textAlignVertical: "top"
                }}
                    // For some reason autoCapitalize does NOT work on samsung keyboards
                    autoCapitalize='senetences'
                    multiline={true}
                    underlineColorAndroid="transparent"
                    placeholder="Name"
                    placeholderTextColor="grey"
                    autoCapitalize="none"
                    onChangeText={this.onNameFieldChanged}
                    maxLength={32}

                />
            </View>
        );
    }


    onQuantityFieldChanged = (changedText_) => {
        this.setState({ quantityValue: changedText_ })
        this.state.qr.quantity = changedText_;
    }

    renderQuantityField() {

        console.log(`LookedUpQrCodeCard.renderQuantityField(): Name  ${this.state.qr.name}`)
        return (
            <View style={{ paddingVertical: 5 }}>
                <NumericInput
                    value={this.state.quantityValue}
                    minValue={0}
                    onChange={this.onQuantityFieldChanged}
                />
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
})