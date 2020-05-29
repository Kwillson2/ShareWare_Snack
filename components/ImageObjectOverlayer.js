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
import * as GeneralUtilities from '../utilities/GeneralUtilities';
import { useHeaderHeight } from '@react-navigation/stack';

var HEADER_HEIGHT = 0;

const DEFAULT_FOOTER_HEIGHT = 49;
const COMPACT_FOOTER_HEIGHT = 29;

const IMAGES = {
    RECEIPT1: require("../assets/Walmart_Receipt1.jpg"),
    RECEIPT2: require("../assets/Walmart_Receipt2.jpg"),
}

const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;

const ImageHeight = Dimensions.get('window').height;
const ImageWidth = Dimensions.get('window').width;

export default function ImageObjectOverlayer_Entry(props) {
    HEADER_HEIGHT = useHeaderHeight();
    console.log(`ImageObjectOverlayer.ImageObjectOverlayer_Entry(): HEADER_HEIGHT = ${HEADER_HEIGHT}`);
    return (<ImageObjectOverlayer {...props} />)
}

/**
 * @param {String} imageUri The path to the image to display
 * @param {String} image The image to display
 * @param {Float} imageWidth The width of the image
 * @param {Float} imageHeight The Height of the image
 * @param {String} googleCloudResp The google cloud vision response that contains:
 * { "description": "003000006083", "boundingPoly": { "vertices": [{ "x": 1238, "y": 2589 }, { "x": 1906, "y": 2569 }, { "x": 1910, "y": 2695 }, { "x": 1242, "y": 2715 }] } },
 * @param {Object[]} overlayObjects An object array that contains text and 4 vertices.  
 * Typically used to overlay recognized text on the image it was recognized.  Contains
 * the properties: {text, vertices}
 */
export class ImageObjectOverlayer extends React.Component {
    /**
     * 
     * @param {qr} props.imageUri 
     */
    constructor(props) {
        super(props);
        this.state.googleCloudResp = props.googleCloudResp;
        this.state.overlayObjects = props.overlayObjects;
        console.log(`ImageObjectOverlayer.constructor(): Top props: ${JSON.stringify(props)} googleCloudResp: ${this.state.googleCloudResp}||`);
    }


    componentDidMount() {
        console.log(`ImageObjectOverlayer.componentWillMount(): IS LOADED = TRUE`);
        this.setState({ isRecogLoaded: true });
    }


    state = {
        // overlayObjects: [],
        responseJson: "",
        isRecogLoaded: false,
    }

    imageSizeHandler = (width, height) => {
        //ImageHeight = height;
        //  ImageWidth = width;
        console.log(`ImageObjectOverlayer.imageSizeHandler(): Image Size: ${ImageWidth} x ${ImageHeight}`);
    }

    imageSizeErrorHandler = (error) => {
        console.log(`ImageObjectOverlayer.imageSizeErrorHandler(): ERROR: Failed to get pic size:  ${JSON.stringify(error)}`);
    }

    onImageLayoutHandler = (event) => {
        // ImageHeight = event.layout.height;
        // ImageWidth = event.layout.width;
        console.log(`ImageObjectOverlayer.onImageLayoutHandler(): Image Size: ${ImageWidth} x ${ImageHeight}`);

    }

    render() {
        console.log(`ImageObjectOverlayer.render(): Top image: `); // ${JSON.stringify(this.props.route.params.image)}||`);
        // Image.getSize(this.props.route.params.image.uri, this.imageSizeHandler, this.imageSizeErrorHandler)

        if (this.state.isRecogLoaded) {
            console.log(`ImageObjectOverlayer.render(): LOADED = TRUE `);
            return (
                <View style={styles.container}>
                    <Image
                        style={styles.image}
                        source={this.props.imageUri}
                    // onLayout={this.onImageLayoutHandler}
                    />
                    <View style={styles.recogFrameContainer}>
                        {this.renderRecognizedText(this.state.googleCloudResp)}
                    </View>
                </View>
            )
        } else {
            console.log(`ImageObjectOverlayer.render(): LOADED = FALSE `);
            return (
                <View style={styles.container}>
                    <Image
                        style={styles.image}
                        source={this.props.imageUri}
                    />
                </View>
            )
        }
    }

    renderRecognizedText = (codes) => {
        console.log(`ImageObjectOverlayer.renderRecognizedText(): recogedCodes: ${JSON.stringify(this.state.googleCloudResp)}`);

        return (
            Object.values(codes).map((recogCode, index) => {
                return (
                    this.renderRecognizedTextFrame(recogCode));
            })

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
        // console.log(`ImageObjectOverlayer.renderRecognizedTextFrame(): `);


        const WIDTH_SCALAR = 1; //1.3;
        const HEIGHT_SCALAR = 1; //1.3;
        const LEFT_SCALAR = 1; //1.3;
        const TOP_SCALAR = 1; //2;
        // const IMAGE_TO_SCREEN_Y = DeviceHeight / imageProperties.height; // * SCALAR;
        // const IMAGE_TO_SCREEN_X = DeviceWidth / imageProperties.width; // * SCALAR;
        const IMAGE_TO_SCREEN_Y = IMAGE_HEIGHT / RECEIPT_IMAGE_HEIGHT; // * SCALAR;
        const IMAGE_TO_SCREEN_X = IMAGE_WIDTH / RECEIPT_IMAGE_WIDTH; // * SCALAR;

        // const IMAGE_TO_SCREEN_Y = imageProperties.height;
        // const IMAGE_TO_SCREEN_X = imageProperties.width;

        // const IMAGE_TO_SCREEN_Y = 1;
        // const IMAGE_TO_SCREEN_X = 1;
        console.log(`ImageObjectOverlayer.renderRecognizedTextFrame(): Body Screen Size: ${IMAGE_TO_SCREEN_X}, ${IMAGE_TO_SCREEN_Y}`);
        console.log(`ImageObjectOverlayer.renderRecognizedTextFrame(): Image2Screen Ratio: ${IMAGE_TO_SCREEN_X}, ${IMAGE_TO_SCREEN_Y} code: ${keyName}`);
        return (
            <View
                key={keyName}
                style={styles.textRecogBox, {
                    width: Math.abs(code.boundingPoly.vertices[0].x - code.boundingPoly.vertices[1].x) * IMAGE_TO_SCREEN_X * WIDTH_SCALAR,
                    left: Math.min(code.boundingPoly.vertices[0].x, code.boundingPoly.vertices[1].x, code.boundingPoly.vertices[2].x, code.boundingPoly.vertices[3].x) * IMAGE_TO_SCREEN_X / LEFT_SCALAR,
                    height: Math.abs(code.boundingPoly.vertices[0].y - code.boundingPoly.vertices[3].y) * IMAGE_TO_SCREEN_Y / HEIGHT_SCALAR,
                    top: Math.min(code.boundingPoly.vertices[0].y, code.boundingPoly.vertices[1].y, code.boundingPoly.vertices[2].y, code.boundingPoly.vertices[3].y) * IMAGE_TO_SCREEN_Y / TOP_SCALAR,
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
}


ImageObjectOverlayer.navigationOptions = {
    header: null,
};
const SCREEN_BODY_WIDTH = DeviceWidth;
const SCREEN_BODY_HEIGHT = DeviceHeight - DEFAULT_FOOTER_HEIGHT - HEADER_HEIGHT;

//const IMAGE_WIDTH = "100%"; //200;
//const IMAGE_HEIGHT = "100%"; //400;

const IMAGE_WIDTH = SCREEN_BODY_WIDTH;
const IMAGE_HEIGHT = SCREEN_BODY_HEIGHT;
// const IMAGE_WIDTH = 200;
// const IMAGE_HEIGHT = 400;

const RECEIPT_IMAGE_WIDTH = 3024;
const RECEIPT_IMAGE_HEIGHT = 4032;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        position: 'absolute',
        backgroundColor: 'yellow',
        justifyContent: 'center',
        // alignItems: 'stretch',
        resizeMode: 'contain',
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
        resizeMode: 'cover',
        // justifyContent: 'center',
        // alignItems: 'stretch',
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