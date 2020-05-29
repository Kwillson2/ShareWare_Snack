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
import SwipeList from '../components/lists/SwipeList';
import Overlay from '../components/OverlayComponent';
import SwipeDeleteList from '../components/lists/SwipeToDeleteList';
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

export default function SwipeDeleteListScreen_Entry() {
    HEADER_HEIGHT = useHeaderHeight();
    console.log(`SwipeDeleteListScreen.SwipeDeleteListScreen_Entry(): HEADER_HEIGHT = ${HEADER_HEIGHT}`);
    return (<SwipeDeleteListScreen />)
}

/**
 * @param {String} imageUri The path to the image to display
 * @param {String} image The image to display
 */
export class SwipeDeleteListScreen extends React.Component {
    /**
     * 
     * @param {qr} props.imageUri 
     */
    constructor(props) {
        console.log(`SwipeDeleteListScreen.constructor(): Top`);
        super(props);

    }


    componentDidMount() {
        console.log(`SwipeDeleteListScreen.componentWillMount(): IS LOADED = TRUE`);
    }


    state = {
        recognizedUpcCodes: [
            { "description": "004488210054", "boundingPoly": { "vertices": [{ "x": 1207, "y": 1018 }, { "x": 1817, "y": 1018 }, { "x": 1817, "y": 1135 }, { "x": 1207, "y": 1135 }] } },
            { "description": "068113128540", "boundingPoly": { "vertices": [{ "x": 1215, "y": 1120 }, { "x": 1812, "y": 1120 }, { "x": 1812, "y": 1227 }, { "x": 1215, "y": 1227 }] } },
            { "description": "085081700613H", "boundingPoly": { "vertices": [{ "x": 1211, "y": 1216 }, { "x": 1868, "y": 1213 }, { "x": 1869, "y": 1321 }, { "x": 1212, "y": 1324 }] } },
            { "description": "068113116177H", "boundingPoly": { "vertices": [{ "x": 1219, "y": 1308 }, { "x": 1880, "y": 1297 }, { "x": 1882, "y": 1413 }, { "x": 1221, "y": 1424 }] } },
            { "description": "009460001707", "boundingPoly": { "vertices": [{ "x": 1219, "y": 1409 }, { "x": 1846, "y": 1396 }, { "x": 1848, "y": 1512 }, { "x": 1221, "y": 1525 }] } },
            { "description": "0071062799382", "boundingPoly": { "vertices": [{ "x": 1225, "y": 1519 }, { "x": 1843, "y": 1508 }, { "x": 1845, "y": 1618 }, { "x": 1227, "y": 1629 }] } },
            { "description": "007874221081", "boundingPoly": { "vertices": [{ "x": 1237, "y": 1620 }, { "x": 1860, "y": 1607 }, { "x": 1862, "y": 1710 }, { "x": 1239, "y": 1723 }] } },
            { "description": "007934065289", "boundingPoly": { "vertices": [{ "x": 1232, "y": 1724 }, { "x": 1858, "y": 1711 }, { "x": 1860, "y": 1811 }, { "x": 1234, "y": 1824 }] } },
            { "description": "007934065289", "boundingPoly": { "vertices": [{ "x": 1231, "y": 1831 }, { "x": 1855, "y": 1817 }, { "x": 1857, "y": 1921 }, { "x": 1233, "y": 1935 }] } },
            { "description": "007934065289", "boundingPoly": { "vertices": [{ "x": 1243, "y": 1930 }, { "x": 1863, "y": 1915 }, { "x": 1865, "y": 2019 }, { "x": 1245, "y": 2034 }] } },
            { "description": "007934065289", "boundingPoly": { "vertices": [{ "x": 1235, "y": 2044 }, { "x": 1878, "y": 2027 }, { "x": 1880, "y": 2119 }, { "x": 1237, "y": 2136 }] } },
            { "description": "007934065289", "boundingPoly": { "vertices": [{ "x": 1236, "y": 2148 }, { "x": 1871, "y": 2132 }, { "x": 1873, "y": 2236 }, { "x": 1239, "y": 2252 }] } },
            { "description": "081682002820", "boundingPoly": { "vertices": [{ "x": 1239, "y": 2369 }, { "x": 1877, "y": 2350 }, { "x": 1880, "y": 2463 }, { "x": 1242, "y": 2482 }] } },
            { "description": "081682002820", "boundingPoly": { "vertices": [{ "x": 1237, "y": 2477 }, { "x": 1883, "y": 2457 }, { "x": 1886, "y": 2573 }, { "x": 1241, "y": 2593 }] } },
            { "description": "003000006083", "boundingPoly": { "vertices": [{ "x": 1238, "y": 2589 }, { "x": 1906, "y": 2569 }, { "x": 1910, "y": 2695 }, { "x": 1242, "y": 2715 }] } },
        ],
        responseJson: "",
        isRecogLoaded: false,
    }


    render() {
        let listData = this.state.recognizedUpcCodes.map((item, index) => {
            console.log(`SwipeDeleteListScreen.render(): Item: ${item.description} `);
            let text = `${String(index)}.   ${item.description}`;
            return ({ text: text, key: index })
        })
        console.log(`SwipeDeleteListScreen.render(): Top image: `); // ${JSON.stringify(this.props.route.params.image)}||`);

        return (
            <View style={styles.container}>
                {/* <SwipeList manifest={this.state.recognizedUpcCodes} openQrCallback={this.onCodeSelectCallback} /> */}
                <Image
                    style={styles.image}
                    source={IMAGES.RECEIPT2}
                />
                <Overlay content={this.renderOverlayContent(listData)} useSubmitButton={true} />

            </View>
        )

    }

    renderOverlayContent = (listData) => {
        return (<SwipeDeleteList listData={listData} />)
    }

    onCodeSelectCallback = () => {

    }

}


SwipeDeleteListScreen.navigationOptions = {
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
        flex: 1,
        // position: 'absolute',
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