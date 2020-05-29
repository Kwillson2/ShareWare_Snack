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

export default class TitleInfoCard extends Component {

    constructor(props) {
        console.log(`TitleInfoCard.constructor(): TOP`);

        if (props.value != null && props.qr == null) {
            props.qr = props.value;
        }

        super(props);
        if (props.qr != null) {
            console.log(`TitleInfoCard.constructor(): Barcode Scanned ToString: ${props.qr.ToString()}`);

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
            console.log(`TitleInfoCard.constructor(): props.qr = null`);

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

    handleShareCodePress = async () => {
        let qrStr = "TODO CANT STRINGIFY CYCLICAL STRUCTS"; //this.props.qr.ToString();
        console.log(`TitleInfoCard.handleShareCodePress: Sharing Code: ${qrStr}`);
        if (!(await Sharing.isAvailableAsync())) {
            alert(`Uh oh, sharing isn't available on your platform`);
            return;
        }

        Sharing.shareAsync(qrStr);

    }


    render() {
        if (this.props.qr != null) {
            // console.log(`TitleInfoCard.render: QR: ${this.props.qr.ToString()}`);
            // let qrStr = this.props.qr.ToString();
            let barcodeTypeIcon = QrUtils.getBarCodeTypeImg(this.props.qr.type);
            let quantity = this.props.qr.quantity != null ? this.props.qr.quantity : 1;
            let dateStr = this.props.qr.dateStr != null ? this.props.qr.dateStr.split(' ')[1] : "";
            return (
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
                                        <Text note>{dateStr} {this.state.qr.category}  #{quantity}</Text>
                                    </View>
                                    <View style={{ flex: 1, alignSelf: 'center', textAlignVertical: 'center', }}>
                                        <ShareButton msg={"qrStr"} onPress={this.handleShareCodePress} />
                                    </View>
                                </View>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
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
}