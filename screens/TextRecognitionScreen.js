import React, { Component, useState } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    Dimensions,
    TouchableHighlight,
    Image,
    View
} from "react-native";
import * as FirebaseManager from '../storage/FirebaseManager';
import * as GoogleCloudManager from '../services/GoogleCloudManager';
import * as GeneralUtilities from '../utilities/GeneralUtilities';
import * as UpcItemLookupDbManager from '../services/UpcItemLookupDbManager';
import SwipeDeleteList from '../components/lists/SwipeToDeleteList';
import Qr from "../models/Qr";
import OverlayComponent from '../components/OverlayComponent';
import * as Setup from '../Setup';
import * as QrUtils from "../utilities/QrUtilities"

const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;

const ImageHeight = Dimensions.get('window').height;
const ImageWidth = Dimensions.get('window').width;


const IMAGE_WIDTH = 200;
const IMAGE_HEIGHT = 400;

/**
 * @param {String} imageUri The path to the image to display
 * @param {String} image The image to display
 */
export default class TextRecognitionScreen extends React.Component {

    /**
     * 
     * @param {qr} props.imageUri 
     */
    constructor(props) {
        console.log(`TextRecognitionScreen.constructor(): Top`);
        super(props);
        // Image.getSize(this.props.route.params.image.uri, this.imageSizeHandler, this.imageSizeErrorHandler)
        this.state = {
            isRecogLoaded: false,
        };
    }

    state = {
        recognizedUpcCodes: [],
        responseJson: "",
        isRecogLoaded: false,
        recognizedUpcObjs: [],
    }

    imageSizeHandler = (width, height) => {
        ImageHeight = height;
        ImageWidth = width;
        console.log(`TextRecognitionScreen.imageSizeHandler(): Image Size: ${ImageWidth} x ${ImageHeight}`);
    }

    imageSizeErrorHandler = (error) => {
        console.log(`TextRecognitionScreen.imageSizeErrorHandler(): ERROR: Failed to get pic size:  ${JSON.stringify(error)}`);
    }

    onImageLayoutHandler = (event) => {
        ImageHeight = event.layout.height;
        ImageWidth = event.layout.width;
        console.log(`TextRecognitionScreen.onImageLayoutHandler(): Image Size: ${ImageWidth} x ${ImageHeight}`);

    }

    render() {
        console.log(`TextRecognitionScreen.render(): Top image: `); // ${JSON.stringify(this.props.route.params.image)}||`);
        // Image.getSize(this.props.route.params.image.uri, this.imageSizeHandler, this.imageSizeErrorHandler)

        // console.log(`TextRecognitionScreen.render(): rendering....`);
        if (this.state.isRecogLoaded) {
            // console.log(`TextRecognitionScreen.render(): recogedCodes: ${JSON.stringify(this.state.recognizedUpcCodes)}`);
            let listData = this.state.recognizedUpcObjs.map((item, index) => {
                console.log(`SwipeDeleteListScreen.render(): Item: ${item.code} `);
                let text = `${String(index)}.   ${item.code} - ${item.name}`;
                return ({ text: text, key: index })
            })
            return (
                <View style={styles.container}>
                    <Image
                        style={styles.image}
                        source={{ uri: this.props.route.params.image.uri }}
                        onLayout={this.onImageLayoutHandler}
                    />
                    <View style={styles.recogFrameContainer}>
                        <OverlayComponent content={this.renderOverlayContent(listData)} useSubmitButton={true} submitButtonCb={this.OnReceiptUpcConfirmation} />
                        {/* <ImageObjectOverlayer imageWidth={RECEIPT_IMAGE_WIDTH} imageHeight={RECEIPT_IMAGE_HEIGHT} imageUri={this.props.route.params.image.uri} googleCloudResp={this.state.recognizedUpcCodes} /> */}
                    </View>
                    {/* {
                        Object.values(this.state.recognizedUpcCodes).map(async (recogCode, index) => {
                            return (await this.renderRecognizedTextFrame(recogCode));
                        })} */}
                </View>
            )
        } else {
            let visionResponse = this.RecognizeImageText(this.props.route.params.image);
            return (
                <View style={styles.container}>
                    <Image
                        style={styles.image}
                        source={{ uri: this.props.route.params.image.uri }}
                    />
                </View>
            )
        }
    }


    renderOverlayContent = (listData) => {
        return (<SwipeDeleteList listData={listData} onDataChangedCb={this.OnReceiptUpcsChanged} />)
    }

    renderRecognizedText = (codes) => {
        console.log(`TextRecognitionScreen.renderRecognizedText(): recogedCodes: `); //${JSON.stringify(this.state.recognizedUpcCodes)}`);

        return (
            <ImageObjectOverlayer imageWidth={RECEIPT_IMAGE_WIDTH} imageHeight={RECEIPT_IMAGE_HEIGHT} imageUri={IMAGES.RECEIPT2} googleCloudResp={this.state.recognizedUpcCodes} />
        )
    }

    renderRecognizedTextFrame = (code) => {
        if (code == null) {
            return (

                <View style={styles.textRecogBox}>

                </View>
            )
        }
        let keyName = `${code.description} (${code.boundingPoly.vertices[0].x}, ${code.boundingPoly.vertices[0].y}), (${code.boundingPoly.vertices[1].x}, ${code.boundingPoly.vertices[1].y}), (${code.boundingPoly.vertices[2].x}, ${code.boundingPoly.vertices[2].y}), (${code.boundingPoly.vertices[3].x}, ${code.boundingPoly.vertices[3].y})`
        console.log(`TextRecognitionScreen.renderRecognizedTextFrame(): code: ${keyName}`);
        return (
            <View
                key={keyName}
                style={styles.textRecogBox, {
                    left: code.position.left,
                    top: code.position.top,
                    height: code.position.height,
                    width: code.position.width,
                    backgroundColor: GeneralUtilities.getRandomColor(),
                    opacity: .7,
                }}>
                <Text
                    style={{
                        // left: code.position.left,
                        // top: code.position.top,
                        // height: code.position.height,
                        // width: code.position.width,
                        opacity: .2,
                    }}>
                    {code.description}
                </Text>
            </View>
        )
    }

    OnReceiptUpcsChanged = (upcs, indexRemoved) => {
        console.log(`TextRecognitionScreen.OnReceiptUpcsChanged(): Removed:  recognizedUpcObjs[${indexRemoved}]: ${this.state.recognizedUpcObjs[indexRemoved].code}`);

        this.setState({ recognizedUpcObjs: this.state.recognizedUpcObjs.splice(indexRemoved - 1, 1), recognizedUpcCodes: this.state.recognizedUpcCodes.splice(indexRemoved - 1, 1) });

    }

    OnReceiptUpcConfirmation = () => {
        console.log(`TextRecognitionScreen.OnReceiptUpcConfirmation(): CONFIRMED `);
        this.state.recognizedUpcObjs.forEach(recogCode => {
            console.log(`TextRecognitionScreen.OnReceiptUpcConfirmation(): Storing ${JSON.stringify(recogCode)} in the cloud...`);
            FirebaseManager.StoreQrCodeInCloud(null, recogCode);
        });

    }

    /**
     * Calls Vision serives to identify the text that passed in the image
     */
    RecognizeImageText = async (pic) => {
        this.state.isRecogLoaded = false;
        // this.setState({ isRecogLoaded: false });

        if (pic == null) {
            return;
        }
        console.log(`TextRecognitionScreen.RecognizeImageText(): Top `); //${JSON.stringify(pic)}||`);
        let cloudPicUri = await FirebaseManager.UploadImageAsync(pic.uri);
        console.log(`TextRecognitionScreen.RecognizeImageText(): Cloud URI: ${cloudPicUri}, trying to recognize...`);

        let response = await GoogleCloudManager.submitToGoogle(cloudPicUri, this.OnTextRecognizedCallback);
        console.log(`TextRecognitionScreen.RecognizeImageText(): Recognition Response:0 `); //${JSON.stringify(response)}`);
        // console.log(response);
    }

    OnTextRecognizedCallback = async (response_) => {
        let upcs = [];
        let qrs = [];
        console.log(`TextRecognitionScreen.OnTextRecognizedCallback(): Top: `); //${JSON.stringify(response_)}`);
        console.log(`TextRecognitionScreen.OnTextRecognizedCallback(): mapVisionRespToScreen `); //${JSON.stringify(this.props.route.params.image)}||`);

        for (let i = 0; i < response_.responses[0].textAnnotations.length; i++) {
            const recogObj = response_.responses[0].textAnnotations[i];
            const recogText = recogObj.description;

            // console.log(`TextRecognitionScreen.RecognizeImageText(): Recognized Text: ${recogText}`);

            let upcNum = await this.extractUpcFromReceiptText(recogText);
            if (upcNum != null) {
                console.log(`TextRecognitionScreen.OnTextRecognizedCallback(): FOUND UPC: ${JSON.stringify(recogObj)}`);
                upcs.push(recogObj);
                let tmpQr = new Qr({ type: 42, data: recogObj.description, code: recogObj.description, });
                QrUtils.SetDefaultQrValues(tmpQr);
                qrs.push(tmpQr);
                UpcItemLookupDbManager.AddTooLookupQueue(tmpQr, this.OnUpcServiceCallback);
            }
        }

        // Create QrCodes objects for each upc
        let mappedResponses = await this.mapRecoginzedTextToScreen(upcs, this.props.route.params.image);
        // await this.mapVisionRespToScreen(response_, this.props.route.params.image); 

        this.setState({ recognizedUpcCodes: mappedResponses, isRecogLoaded: true, recognizedUpcObjs: qrs });
        return mappedResponses

    }

    OnUpcServiceCallback = async () => {
        console.log(`TextRecognitionScreen.OnUpcServiceCallback(): Top...`);
        this.setState({ recognizedUpcObjs: this.state.recognizedUpcObjs });


    }

    /**
     * Attempts to extract the UPC number off of the receipt.
     * There are some attempts for smarter processing:
     *   1. Some UPC are 13 chars, and end in a alph char.  If previous 12 
     *      chars are numbers, and the last is alpha, assume this is a UPC
     */
    extractUpcFromReceiptText = async (recText) => {
        if (recText == null) {
            console.log(`TextRecognitionScreen.extractUpcFromReceiptText(): returning...`);
            return
        }
        const UPC_LENGTH = 12;
        let upc = null;

        if (recText.length == UPC_LENGTH) {
            if (!recText.includes(".") && !isNaN(recText)) {
                upc = recText;
            }
        }
        // 085081700613H
        else if (recText.length == UPC_LENGTH + 1) {
            let upcChar = recText.substring(recText.length - 1);
            let upcNum = recText.substring(0, recText.length - 1);

            if (!upcNum.includes(".") && !isNaN(upcNum)) {
                upc = upcNum;
            }
        }

        return upc;
    }

    isAlphaChar = (ch) => {
        return /^[A-Z]$/i.test(ch);
    }





    /**
   * mapVisionRespToScreen
   *
   * Converts Google Cloud Vision API response in representable form for
   * device's screen in accordance with the dimensions of image
   * used to processing.
   *
   * @param {array}  visionResp       Response from Google Cloud Vision API
   * @param {object} imageProperties  Other properties of image to be processed
   * @memberof App
   *
   *  https://heartbeat.fritz.ai/building-text-detection-apps-for-ios-and-android-using-react-native-42fe3c7e339
    {
        "description": "068113128540",
        "boundingPoly": {
            "vertices": [
                {
                    "x": 1172,
                    "y": 1160
                },
                {
                    "x": 1830,
                    "y": 1167
                },
                {
                    "x": 1829,
                    "y": 1262
                },
                {
                    "x": 1171,
                    "y": 1255
                }
            ]
        }
    },
   */
    mapVisionRespToScreen = async (visionResp, imageProperties) => {
        console.log(`TextRecognitionScreen.mapVisionRespToScreen(): Top ${JSON.stringify(visionResp)} ${JSON.stringify(imageProperties)} =============`);
        // console.log(JSON.stringify(visionResp));

        if (visionResp == null) {
            console.log(`TextRecognitionScreen.mapVisionRespToScreen(): returning...`);
            return
        }
        // let scaledHeight = Image.getSize()

        const IMAGE_TO_SCREEN_Y = DeviceHeight / imageProperties.height;
        const IMAGE_TO_SCREEN_X = DeviceWidth / imageProperties.width;

        // const IMAGE_TO_SCREEN_Y = imageProperties.height;
        // const IMAGE_TO_SCREEN_X = imageProperties.width;

        // const IMAGE_TO_SCREEN_Y = 1;
        // const IMAGE_TO_SCREEN_X = 1;

        console.log(`TextRecognitionScreen.mapVisionRespToScreen(): Image2Screen Ratio: ${IMAGE_TO_SCREEN_X}, ${IMAGE_TO_SCREEN_Y}`);
        return visionResp.map(item => {
            return {
                ...item,
                position: {
                    width: Math.abs(item.boundingPoly.vertices[0].x - item.boundingPoly.vertices[1].x) * IMAGE_TO_SCREEN_X,
                    left: item.boundingPoly.vertices[1].x * IMAGE_TO_SCREEN_X,
                    height: Math.abs(item.boundingPoly.vertices[1].y - item.boundingPoly.vertices[2].y) * IMAGE_TO_SCREEN_Y,
                    top: (item.boundingPoly.vertices[0].y) * IMAGE_TO_SCREEN_Y
                }
            };
        });
    };

    mapRecoginzedTextToScreen = async (recogText, imageProperties) => {
        console.log(`TextRecognitionScreen.mapRecoginzedTextToScreen(): Top `); //${JSON.stringify(recogText)} ${JSON.stringify(imageProperties)} =============`);
        // console.log(JSON.stringify(recogText));

        if (recogText == null) {
            console.log(`TextRecognitionScreen.mapRecoginzedTextToScreen(): returning...`);
            return
        }

        // The text boxes dont line up correctly
        const WIDTH_SCALAR = 1; //1.3;
        const HEIGHT_SCALAR = 1; //1.3;
        const LEFT_SCALAR = 1; //1.3;
        const TOP_SCALAR = 1; //2;
        // const IMAGE_TO_SCREEN_Y = DeviceHeight / imageProperties.height; // * SCALAR;
        // const IMAGE_TO_SCREEN_X = DeviceWidth / imageProperties.width; // * SCALAR;
        const IMAGE_TO_SCREEN_Y = IMAGE_HEIGHT / imageProperties.height; // * SCALAR;
        const IMAGE_TO_SCREEN_X = IMAGE_WIDTH / imageProperties.width; // * SCALAR;

        // const IMAGE_TO_SCREEN_Y = imageProperties.height;
        // const IMAGE_TO_SCREEN_X = imageProperties.width;

        // const IMAGE_TO_SCREEN_Y = 1;
        // const IMAGE_TO_SCREEN_X = 1;

        console.log(`TextRecognitionScreen.mapRecoginzedTextToScreen(): Image2Screen Ratio: ${IMAGE_TO_SCREEN_X}, ${IMAGE_TO_SCREEN_Y}`);

        return recogText.map(item => {
            // const SCALAR = 1.3;
            return {
                ...item,
                position: {
                    width: Math.abs(item.boundingPoly.vertices[0].x - item.boundingPoly.vertices[1].x) * IMAGE_TO_SCREEN_X * WIDTH_SCALAR,
                    left: Math.min(item.boundingPoly.vertices[0].x, item.boundingPoly.vertices[1].x, item.boundingPoly.vertices[2].x, item.boundingPoly.vertices[3].x) * IMAGE_TO_SCREEN_X / LEFT_SCALAR,
                    height: Math.abs(item.boundingPoly.vertices[0].y - item.boundingPoly.vertices[3].y) * IMAGE_TO_SCREEN_Y / HEIGHT_SCALAR,
                    top: Math.min(item.boundingPoly.vertices[0].y, item.boundingPoly.vertices[1].y, item.boundingPoly.vertices[2].y, item.boundingPoly.vertices[3].y) * IMAGE_TO_SCREEN_Y / TOP_SCALAR
                }
            };
        });
    };

}


TextRecognitionScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        position: 'absolute',
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    image: {
        // flex: 1,
        backgroundColor: 'red',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: IMAGE_HEIGHT,
        width: IMAGE_WIDTH,
        // justifyContent: 'center',
        // alignItems: 'stretch',
        resizeMode: 'contain',
    },
    recogFrameContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // height: IMAGE_HEIGHT,
        // width: IMAGE_WIDTH,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    textRecogBox: {
        borderWidth: 5,
        borderColor: 'red',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    flexTest1: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'blue',
        alignItems: 'center',
    },
    flexTest2: {
        flexDirection: 'row',
        flex: 2,
        backgroundColor: 'red',
    },
    flexTest3: {
        flexDirection: 'row',
        flex: 3,
        backgroundColor: '#00ccff',
    },
    titleText: {
        flex: 1,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 20,
        lineHeight: 19,
        textAlign: 'center',
        marginTop: '15%',
    },
});