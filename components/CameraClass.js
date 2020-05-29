// src/camera.page.js file
import React, { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import { PinchGestureHandler } from 'react-native-gesture-handler';
import { View, TouchableOpacity, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { Container, Header, Content, Button, Icon } from 'native-base';
import * as FileSystem from 'expo-file-system';
// import { CameraRoll } from 'react-native-cameraroll';
import * as MediaLibrary from 'expo-media-library';
import * as Setup from '../Setup';
const { width: winWidth, height: winHeight } = Dimensions.get('window');
import { withNavigationFocus } from 'react-navigation';
// import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';

async function checkMultiPermissions() {
    const { status, expires, permissions } = await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.CAMERA_ROLL,
        Permissions.AUDIO_RECORDING,
    );
    if (status !== 'granted') {
        alert('Hey! You heve not enabled selected permissions: ' + permissions);
    }
}

export default class CameraClass extends React.Component {

    self = this;
    state = {
        // camera: null,
        hasCameraPermission: null,
        cameraRollUri: null,
        qrInfo: null,

    };


    constructor(props) {
        super(props);
    }

    camera = null;


    async componentDidMount() {
        console.log("CameraClass.componentDidMount(): TOP: ");
        this.ResumePreview();
        // this.props.navigation.addListener('focus', this.componentDidFocus);
        // this.props.navigation.addListener('blur', this.componentDidBlur);

        checkMultiPermissions();

        const camera = await Camera.requestPermissionsAsync(); // await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission = (camera.status === 'granted'); // && audio.status === 'granted');

        this.setState({ hasCameraPermission });
    };

    componentDidFocus = () => {
        console.log("CameraClass.componentDidFocus(): TOP: ");
        this.ResumePreview();
    };

    componentDidBlur = () => {
        console.log("CameraClass.componentDidBlur(): TOP: ");
        this.PausePreview();
    };

    // TODO: Implement pinch zoom for camera window
    onPinchGestureEvent = event => {
        // console.log(event.nativeEvent.scale);
    }

    onQrScanned = (qr_) => {
        console.log("CameraClass.onQrScanned(): Qr Scanned");
        if (this.props.onQrScannedCb != null) {
            this.props.onQrScannedCb(qr_);
        }
    }


    ResumePreview() {
        console.log("CameraClass.ResumePreview(): Resuming the camera preview: ");

        if (this.camera != null) {
            this.camera.resumePreview();
        }
    }

    PausePreview() {
        console.log("CameraClass.PausePreview(): Pausing the camera preview: ");
        if (this.camera != null) {
            this.camera.pausePreview();
        }
    }

    onPicSavedCallback = async (photo) => {

        console.log("CameraClass.onPicSavedCallback(): Successfully took a picture saved too: " + photo.uri);

        // Save the picture to the camera roll
        MediaLibrary.saveToLibraryAsync(photo.uri);
        console.log("CameraClass.onPicSavedCallback(): Picture saved to camera roll");

        if (this.props.onPicTakenCb != null) {
            this.props.onPicTakenCb(photo);
        }
    };


    /// This takes the picture
    snap = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync({ onPictureSaved: this.onPicSavedCallback });

        }
    };

    render() {
        const { hasCameraPermission } = this.state;
        // BarCodeScanner.Constants.BarCodeType
        console.log(`CameraClass.render(): IsFocused: ${this.props.isFocused}`)
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }
        return (
            <PinchGestureHandler
                onGestureEvent={this.onPinchGestureEvent}
            >
                <View style={{ flex: 1 }}>

                    <Camera
                        style={{ flex: 1 }}
                        ref={camera => this.camera = camera}
                        onBarCodeScanned={this.onQrScanned} >
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'column',
                                // alignSelf: 'flex-end',
                            }}>
                            <View
                                style={{
                                    flex: 1,
                                    alignSelf: 'flex-end',
                                }} />

                            {/* Camera Switch container */}
                            <View
                                style={{
                                    flex: 1,
                                    alignSelf: 'flex-end',
                                }}>

                                <Button large transparent onPress={() => {
                                    setType(
                                        type === Camera.Constants.Type.back
                                            ? Camera.Constants.Type.front
                                            : Camera.Constants.Type.back
                                    );
                                }}>
                                    <Icon large name='md-reverse-camera' style={{
                                        fontSize: 40,
                                        color: 'white',
                                    }} />
                                </Button>
                            </View>

                            {/* Spacing container */}
                            <View
                                style={{
                                    flex: 10,
                                }}>
                            </View>

                            {/* Camera take picture button container */}
                            <View
                                style={{
                                    flex: 2,
                                    // backgroundColor: 'yellow',
                                    alignSelf: 'center',
                                    // width: 100,
                                    // resizeMode: 'contain',
                                }}>
                                <Button transparent onPress={this.snap}>
                                    <Icon name='ios-radio-button-on' style={{
                                        fontSize: 75,
                                        color: 'white',
                                    }} />
                                </Button>
                            </View>
                        </View>
                    </Camera>
                </View>
            </PinchGestureHandler >
        );
    };
};
StyleSheet.create({
    preview: {
        height: winHeight,
        width: winWidth,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
});


// export default withNavigationFocus(CameraClass);

// Wrap and export
// export default function (props) {
//     const navigation = useNavigation();

//     return <CameraClass {...props} navigation={navigation} />;
// }


// export default function (props) {
//     const navigation = useNavigation();
//     const isFocused = useIsFocused();

//     return <CameraClass {...props} isFocused={isFocused} />;
// }