import * as WebBrowser from 'expo-web-browser';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import React, { useState, useEffect, Component } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import MenuBar from '../components/MenuBar';
import CameraComponent from '../components/CameraComponent';
import CameraClass from '../components/CameraClass';
import * as UpcItemLookupDbManager from '../services/UpcItemLookupDbManager';
import { MonoText } from '../components/StyledText';
import * as Setup from '../Setup';
import * as QrCodeStorageManager from '../storage/QrCodeStorageManager';
import * as FirebaseManager from '../storage/FirebaseManager';
import * as GoogleCloudManager from '../services/GoogleCloudManager';
import TextRecogModal from './TextRecognitionScreen';
import Qr from '../models/Qr';
import { useIsFocused } from '@react-navigation/native';
import * as QrUtils from "../utilities/QrUtilities"


export function IsFocused() {
    const isFocused = useIsFocused();
    console.log(`HomeScreen.IsFocused(): isFocused: ${isFocused}`);
    return <HomeScreen {...props} isFocused={isFocused} />;;
}


var __DEV__ = true;
export default class HomeScreen extends React.Component {
    constructor(props) {
        console.log(`HomeScreen.constructor(): TOP`);
        super(props);
        this.state = { loading: true };
        this.onQrScannedCallback = this.onQrScannedCallback.bind(this);
    }
    state = {
        camera: null,
    };


    componentDidMount() {
        // console.log(`HomeScreen.componentDidMount(): isFocused: ${IsFocused()}`);

        // const unsubscribe = this.props.navigation.addListener('tabPress', e => {
        //     // Prevent default action
        //     e.preventDefault();
        //     this.componentDidBlur();
        // });
        // this._unsubscribe = this.props.navigation.addListener('focus', () => {
        //     // do something
        //     this.componentDidBlur();
        // });

        // console.log("HomeScreen.componentDidMount(): TOP: ");
        // this.props.navigation.addListener('focus', this.componentDidFocus);
        // this.props.navigation.addListener('blur', this.componentDidBlur);

        // const unsubscribe = this.props.navigation.addListener('tabPress', e => {
        //     // Prevent default action
        //     e.preventDefault();
        // });
    }

    componentWillUnmount() {
        console.log("HomeScreen.componentWillUnmount(): TOP: ");
        if (this.state.camera != null) {
            console.log("HomeScreen.componentWillUnmount(): Camera NOT null: ");
            this.state.camera.PausePreview();
        }
        // this._unsubscribe(); componentWillUnmount
    }

    componentDidFocus = () => {
        // console.log("HomeScreen.componentDidFocus(): TOP: ");

    }

    OnHomeTabPress = (nav, defaultHandler) => {
        console.log("HomeScreen.OnHomeTabPress(): TOP: ");

    }

    componentDidBlur = () => {
        // console.log("HomeScreen.componentDidBlur(): TOP: ");
        // this.state.camera.
    }

    isFocused() {
        // console.log("HomeScreen.isFocused(): TOP: ");
    }

    onQrScannedCallback(qr_) {
        console.log("HomeScreen.onQrScannedCallback(): Successfully scanned QR Code: " + qr_.data);
        // console.log("HomeScreen.onQrScannedCallback(): Trying to go to OpenQr Screen");


        // Set all the fields prior to creating the Qr object
        qr_.code = qr_.data;
        QrUtils.SetDefaultQrValues(qr_);

        // Check if this Code exists already
        let existingCode = Setup.CATEGORIES.ALL.manifest[qr_.code];
        let qr = null;
        if (existingCode != null) {
            console.log(`HomeScreen.onQrScannedCallback(): FOUND existing Code for: ${qr_.code}`);
            qr = existingCode;
        }
        else {

            console.log(`HomeScreen.onQrScannedCallback(): Creating NEW Code for: ${qr_.code}`);
            // Officially create the Qr object
            qr = new Qr(qr_);
        }

        console.log(`HomeScreen.onQrScannedCallback(): Calling UpcItemLookupDbManager.LookupUpc(${qr.code})`);

        // Attempt to name the item
        if (qr.name == null || qr.name == "") {
            UpcItemLookupDbManager.LookupUpc(qr);
        }
        console.log(`HomeScreen.onQrScannedCallback(): Successfully scanned QR Code: ${qr.ToString()}`);
        this.handleOpenQr(qr);
    }

    /**
     * Sends the given Expo Pic to google cloud vision, which then returns 
     * @param {String} The Expo Camera Pic object:
     *    Returns a Promise that resolves to an object: { uri, width, height, exif, base64 }
     *    https://docs.expo.io/versions/latest/sdk/camera/#returns
     */
    onPicTaken = async (pic) => {
        console.log(`HomeScreen.onPicTaken(): Successfully Took Pic: ${pic.uri}, storing it in cloud storage... ${JSON.stringify(pic)}||`);
        this.props.navigation.navigate('TextRecog', { image: pic });

    }


    render() {
        console.log(`HomeScreen.render(): rendering..`)

        if (Platform.OS === 'ios' || Platform.OS === 'android') {

            return (

                <View style={styles.container}>

                    <View style={styles.topButtonContainer}>

                    </View>

                    <View style={styles.middleContainer}>
                        <CameraClass
                            ref={camera => this.state.camera = camera} onPicTakenCb={this.onPicTaken} onQrScannedCb={this.onQrScannedCallback} navigation={this.props.navigation} />
                        {/* <CameraComponent/> */}
                    </View>


                    {/* <View style={styles.bottomContainer}>
                        <MenuBar name='Rexxar' listNav={this.handleScanHistoryPress} openQrNav={this.handleOpenQrPress} saveQrNav={this.saveQrNav} pairQrNav={this.pairQrNav} />
                    </View> */}
                </View>
            );

            if (this.props.navigation.isFocused() && this.state.camera != null) {
                console.log("HomeScreen.render(): Resuming camera... ");
                this.state.camera.ResumePreview();
            }
        }
        else {
            console.log(`HomeScreen.onQrScannedCallback(): COMPUTER MODE`);

            return (

                <View style={styles.container}>

                    <View style={styles.topButtonContainer}>

                    </View>

                    <View style={styles.middleContainer}>
                        <Text>NO CAMERA ALLOWED</Text>
                    </View>


                    <View style={styles.bottomContainer}>
                        <MenuBar name='Rexxar' listNav={this.handleScanHistoryPress} openQrNav={this.handleOpenQrPress} saveQrNav={this.saveQrNav} pairQrNav={this.pairQrNav} />
                    </View>
                </View>
            );
        }
    }


    handleOpenQr = (qr_) => {
        console.log("HomeScreen.handleOpenQr(): Trying to go to OpenQr Screen scanned QR Code: " + qr_.data);
        this.props.navigation.navigate('OpenQr', { qr: qr_ });
        // this.props.navigation.navigate('Home', { screen: 'OpenQr', params: { qr: qr_ } });
    }
    handleUserProfilePress = () => {
        this.props.navigation.navigate('UserProfile');
    }
    handleListsCategoriesPress = () => {
        console.log("HomeScreen.handleListsCategoriesPress(): Here");
        this.props.navigation.navigate('Categories');
    }
    handleOpenQrPress = () => {
        this.props.navigation.navigate('OpenQr', { qr: { type: 404, data: "NOT REAL DATA" } });
    }
    handleSaveQrPress = () => {
        this.props.navigation.navigate('SaveQr');
    }
    handlePairQrPress = () => {
        this.props.navigation.navigate('PairQr');
    }
    handleScanHistoryPress = () => {
        this.props.navigation.navigate('ScanHistory');
    }
}



function DevelopmentModeNotice() {
    if (__DEV__) {
        const learnMoreButton = (
            <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
                Learn more
            </Text>
        );

        return (
            <Text style={styles.developmentModeText}>
                Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
            </Text>
        );
    } else {
        return (
            <Text style={styles.developmentModeText}>
                You are not in development mode: your app will run at full speed.
            </Text>
        );
    }
}



function handleLearnMorePress() {
    WebBrowser.openBrowserAsync(
        'https://docs.expo.io/versions/latest/workflow/development-mode/'
    );
}

function handleHelpPress() {
    WebBrowser.openBrowserAsync(
        'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    topButtonContainer: {
        flexDirection: 'row',
        flex: 0,
        // height: '18%',
        // marginTop: '8%'
    },
    userProfileIconContainer: {
        width: '20%',
        flex: 1,
        // height: '100%',
        backgroundColor: 'powderblue',
    },
    userProfileImage: {
        width: 100,
        flex: 1,
        // height: 80,
        resizeMode: 'contain',
        marginRight: '10%',
    },
    orderImage: {
        flex: 1,
        width: 100,
        resizeMode: 'contain',
    },
    titleContainer: {
        width: '50%',
        backgroundColor: 'skyblue'
    },
    titleText: {
        color: 'rgba(0,0,0,0.4)',
        fontSize: 20,
        lineHeight: 19,
        textAlign: 'center',
        marginTop: '15%',
        marginRight: '20%',
    },
    orderIconContainer: {
        width: '30%',
        backgroundColor: 'steelblue',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    middleContainer: {
        paddingTop: 0,
        backgroundColor: 'yellow',
        flex: 4,
    },
    bottomContainer: {
        backgroundColor: 'green',
        paddingTop: 0,
        flex: 2,
        flexDirection: 'row'
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});
