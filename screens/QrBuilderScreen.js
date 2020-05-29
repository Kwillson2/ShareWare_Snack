import * as React from 'react';
import {
    Button,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Constants from 'expo-constants';
import { createAppContainer, Header } from 'react-navigation';
import CategoryTile from '../components/CategoryTile';
import ContentPane_Accordian from '../components/ContentPanes/ContentPane_Accordian';
import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';
import AccordionPane from '../components/ContentPanes/AccordionPane';
import { Colors } from '../Colors';
import { createStackNavigator } from 'react-navigation-stack';
import { ColorWheel } from 'react-native-color-wheel';
var __DEV__ = true;

const DeviceWidth = Dimensions.get('window').width;

const buttons = {
    ball0: require('../assets/images/qrMonkeyImages/ball0.png'),
    ball1: require('../assets/images/qrMonkeyImages/ball1.png'),
    ball10: require('../assets/images/qrMonkeyImages/ball10.png'),
    ball11: require('../assets/images/qrMonkeyImages/ball11.png'),
    ball12: require('../assets/images/qrMonkeyImages/ball12.png'),
    ball13: require('../assets/images/qrMonkeyImages/ball13.png'),
    ball14: require('../assets/images/qrMonkeyImages/ball14.png'),
    ball15: require('../assets/images/qrMonkeyImages/ball15.png'),
    ball16: require('../assets/images/qrMonkeyImages/ball16.png'),
    ball17: require('../assets/images/qrMonkeyImages/ball17.png'),
    ball18: require('../assets/images/qrMonkeyImages/ball18.png'),
    ball19: require('../assets/images/qrMonkeyImages/ball19.png'),
    ball2: require('../assets/images/qrMonkeyImages/ball2.png'),
    ball3: require('../assets/images/qrMonkeyImages/ball3.png'),
    ball5: require('../assets/images/qrMonkeyImages/ball5.png'),
    ball6: require('../assets/images/qrMonkeyImages/ball6.png'),
    ball7: require('../assets/images/qrMonkeyImages/ball7.png'),
    ball8: require('../assets/images/qrMonkeyImages/ball8.png'),
    circle_zebra_vertical: require('../assets/images/qrMonkeyImages/circle_zebra_vertical.png'),
    circle_zebra: require('../assets/images/qrMonkeyImages/circle_zebra.png'),
    circle: require('../assets/images/qrMonkeyImages/circle.png'),
    circular: require('../assets/images/qrMonkeyImages/circular.png'),
    connect_on_rapidapi_light: require('../assets/images/qrMonkeyImages/connect_on_rapidapi_light.png'),
    diamond: require('../assets/images/qrMonkeyImages/diamond.png'),
    dot: require('../assets/images/qrMonkeyImages/dot.png'),
    edge_cut_smooth: require('../assets/images/qrMonkeyImages/edge_cut_smooth.png'),
    edge_cut: require('../assets/images/qrMonkeyImages/edge_cut.png'),
    frame0: require('../assets/images/qrMonkeyImages/frame0.png'),
    frame1: require('../assets/images/qrMonkeyImages/frame1.png'),
    frame10: require('../assets/images/qrMonkeyImages/frame10.png'),
    frame11: require('../assets/images/qrMonkeyImages/frame11.png'),
    frame12: require('../assets/images/qrMonkeyImages/frame12.png'),
    frame13: require('../assets/images/qrMonkeyImages/frame13.png'),
    frame14: require('../assets/images/qrMonkeyImages/frame14.png'),
    frame16: require('../assets/images/qrMonkeyImages/frame16.png'),
    frame2: require('../assets/images/qrMonkeyImages/frame2.png'),
    frame3: require('../assets/images/qrMonkeyImages/frame3.png'),
    frame4: require('../assets/images/qrMonkeyImages/frame4.png'),
    frame5: require('../assets/images/qrMonkeyImages/frame5.png'),
    frame6: require('../assets/images/qrMonkeyImages/frame6.png'),
    frame7: require('../assets/images/qrMonkeyImages/frame7.png'),
    frame8: require('../assets/images/qrMonkeyImages/frame8.png'),
    japnese: require('../assets/images/qrMonkeyImages/japnese.png'),
    leaf: require('../assets/images/qrMonkeyImages/leaf.png'),
    mosaic: require('../assets/images/qrMonkeyImages/mosaic.png'),
    pointed_edge_cut: require('../assets/images/qrMonkeyImages/pointed_edge_cut.png'),
    pointed_in_smooth: require('../assets/images/qrMonkeyImages/pointed_in_smooth.png'),
    pointed_in: require('../assets/images/qrMonkeyImages/pointed_in.png'),
    pointed_smooth: require('../assets/images/qrMonkeyImages/pointed_smooth.png'),
    pointed: require('../assets/images/qrMonkeyImages/pointed.png'),
    round: require('../assets/images/qrMonkeyImages/round.png'),
    rounded_in_smooth: require('../assets/images/qrMonkeyImages/rounded_in_smooth.png'),
    rounded_in: require('../assets/images/qrMonkeyImages/rounded_in.png'),
    rounded_pointed: require('../assets/images/qrMonkeyImages/rounded_pointed.png'),
    square: require('../assets/images/qrMonkeyImages/square.png'),
    star: require('../assets/images/qrMonkeyImages/star.png'),
    transparent_qrcode: require('../assets/images/qrMonkeyImages/transparent_qrcode.png'),

}


const BACON_IPSUM = 'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ';


const Example = ({ onChange }) => (
    <View style={{ flex: 1 }}>
        <ColorWheel
            initialColor="#ee0000"
            onColorChange={color => console.log({ color })}
            onColorChangeComplete={color => onChange(color)}
            style={{ width: Dimensions.get('window').width }}
            thumbStyle={{ height: 30, width: 30, borderRadius: 30 }}
        />
        <ColorWheel
            initialColor="#00ee00"
            style={{ marginLeft: 20, padding: 40, height: 200, width: 200 }}
        />
    </View>
);

const QR_ELEMENT_TYPE = {

}

export default class QrBuilderScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: [
                {
                    title: 'Set Info',
                    data: [
                        { key: 'Chicken Biryani', value: { id: 'Chicken Biryani', callback: this.qrElementPressedHandler, isActive: false, children: Example, } },
                        { key: 'Mutton Biryani', value: { id: 'Mutton Biryani', callback: this.qrElementPressedHandler, isActive: false, } },
                        { key: 'Prawns Biryani', value: { id: 'Prawns Biryani', callback: this.qrElementPressedHandler, isActive: false, } },
                    ]
                },
                {
                    title: 'Set Colors',
                    data: [
                        { key: 'Foreground Color', value: { id: 'Foreground Color', callback: this.qrElementPressedHandler, isActive: false, } },
                        { key: 'Background Color', value: { id: 'Background Color', callback: this.qrElementPressedHandler, isActive: false, } },
                        { key: 'Indie Tandoori Paneer', value: { id: 'Indie Tandoori Paneer', callback: this.qrElementPressedHandler, isActive: false, } },
                        { key: 'Veg Extraveganza', value: { id: 'Veg Extraveganza', callback: this.qrElementPressedHandler, isActive: false, } }
                    ]
                },
                {
                    title: 'Logo Image',
                    data: [
                        { key: 'Facebook', value: { id: 'Facebook', callback: this.qrElementPressedHandler, isActive: false, } },
                        { key: 'Twitter', value: { id: 'Twitter', callback: this.qrElementPressedHandler, isActive: false, } },
                        { key: 'LinkedIn', value: { id: 'LinkedIn', callback: this.qrElementPressedHandler, isActive: false, } },
                        { key: 'Instagram', value: { id: 'Instagram', callback: this.qrElementPressedHandler, isActive: false, } }
                    ]
                },
                {
                    title: 'Body Shape',
                    data: [
                        { key: 'circle_zebra_vertical', value: { id: 'circle_zebra_vertical', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.circle_zebra_vertical, } },
                        { key: 'circle_zebra', value: { id: 'circle_zebra', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.circle_zebra, } },
                        { key: 'circle', value: { id: 'circle', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.circle, } },
                        { key: 'circular', value: { id: 'circular', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.circular, } },
                        { key: 'diamond', value: { id: 'diamond', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.diamond, } },
                        { key: 'dot', value: { id: 'dot', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.dot, } },
                        { key: 'edge_cut_smooth', value: { id: 'edge_cut_smooth', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.edge_cut_smooth, } },
                        { key: 'japnese', value: { id: 'japnese', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.japnese, } },
                        { key: 'leaf', value: { id: 'leaf', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.leaf, } },
                        { key: 'mosaic', value: { id: 'mosaic', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.mosaic, } },
                        { key: 'pointed_edge_cut', value: { id: 'pointed_edge_cut', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.pointed_edge_cut, } },
                        { key: 'pointed_in_smooth', value: { id: 'pointed_in_smooth', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.pointed_in_smooth, } },
                        { key: 'pointed_in', value: { id: 'pointed_in', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.pointed_in, } },
                        { key: 'pointed_smooth', value: { id: 'pointed_smooth', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.pointed_smooth, } },
                        { key: 'pointed', value: { id: 'pointed', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.pointed, } },
                        { key: 'round', value: { id: 'round', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.round, } },
                        { key: 'rounded_in_smooth', value: { id: 'rounded_in_smooth', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.rounded_in_smooth, } },
                        { key: 'rounded_in', value: { id: 'rounded_in', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.rounded_in, } },
                        { key: 'rounded_pointed', value: { id: 'rounded_pointed', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.rounded_pointed, } },
                        { key: 'square', value: { id: 'square', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.square, } },
                        { key: 'star', value: { id: 'star', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.star, } },
                    ]
                },
                {
                    title: 'Eye Frame Shape',
                    data: [
                        { key: 'frame0', value: { id: 'frame0', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.frame0, } },
                        { key: 'frame1', value: { id: 'frame1', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.frame1, } },
                        { key: 'frame10', value: { id: 'frame10', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.frame10, } },
                        { key: 'frame11', value: { id: 'frame11', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.frame11, } },
                        { key: 'frame12', value: { id: 'frame12', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.frame12, } },
                        { key: 'frame13', value: { id: 'frame13', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.frame13, } },
                        { key: 'frame14', value: { id: 'frame14', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.frame14, } },
                        { key: 'frame16', value: { id: 'frame16', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.frame16, } },
                        { key: 'frame2', value: { id: 'frame2', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.frame2, } },
                        { key: 'frame3', value: { id: 'frame3', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.frame3, } },
                        { key: 'frame4', value: { id: 'frame4', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.frame4, } },
                        { key: 'frame5', value: { id: 'frame5', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.frame5, } },
                        { key: 'frame6', value: { id: 'frame6', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.frame6, } },
                        { key: 'frame7', value: { id: 'frame7', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.frame7, } },
                        { key: 'frame8', value: { id: 'frame8', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.frame8, } },
                    ]
                },
                {
                    title: 'Eye Ball Shape',
                    data: [
                        { key: 'ball0', value: { id: 'ball0', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.ball0, } },
                        { key: 'ball1', value: { id: 'ball1', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.ball1, } },
                        { key: 'ball10', value: { id: 'ball10', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.ball10, } },
                        { key: 'ball11', value: { id: 'ball11', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.ball11, } },
                        { key: 'ball12', value: { id: 'ball12', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.ball12, } },
                        { key: 'ball13', value: { id: 'ball13', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.ball13, } },
                        { key: 'ball14', value: { id: 'ball14', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.ball14, } },
                        { key: 'ball15', value: { id: 'ball15', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.ball15, } },
                        { key: 'ball16', value: { id: 'ball16', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.ball16, } },
                        { key: 'ball17', value: { id: 'ball17', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.ball17, } },
                        { key: 'ball18', value: { id: 'ball18', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.ball18, } },
                        { key: 'ball19', value: { id: 'ball19', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.ball19, } },
                        { key: 'ball2', value: { id: 'ball2', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.ball2, } },
                        { key: 'ball3', value: { id: 'ball3', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.ball3, } },
                        { key: 'ball5', value: { id: 'ball5', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.ball5, } },
                        { key: 'ball6', value: { id: 'ball6', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.ball6, } },
                        { key: 'ball7', value: { id: 'ball7', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.ball7, } },
                        { key: 'ball8', value: { id: 'ball8', callback: this.qrElementPressedHandler, isActive: false, imgSrc: buttons.ball8, } },
                    ]
                },
            ]
        }
    }

    qrElementPressedHandler(keyValPair) {
        console.log("QrBuilderScreen.qrElementPressedHandler(): ", keyValPair.value.id, " was pressed");
    }

    render() {
        return (
            <View style={styles.container}>
                {this.renderAccordians()}
            </View>
        );
    }

    renderAccordians = () => {
        const items = [];
        for (var key of this.state.menu) {
            items.push(
                <AccordionPane
                    title={key.title}
                    data={key.data}
                />
            );
        }
        return items;
    }

    // state = {
    //     activeSections: [],
    // };
   

    _renderHeader(section, index, isActive, sections) {
        return (
            <Animatable.View
                duration={300}
                transition="backgroundColor"
                style={{ backgroundColor: (isActive ? 'rgba(255,255,255,1)' : 'rgba(245,252,255,1)') }}>
                <Text style={styles.headerText}>{section.title}</Text>
            </Animatable.View>
        );
    }

    _renderContent(section, i, isActive, sections) {
        return (
            <Animatable.View
                duration={300}
                transition="backgroundColor"
                style={{ backgroundColor: (isActive ? 'rgba(255,255,255,1)' : 'rgba(245,252,255,1)') }}>
                {/* <Animatable.Text
                    duration={300}
                    easing="ease-out"
                    animation={isActive ? 'zoomIn' : false}> */}
                {section.content}
                {/* </Animatable.Text> */}
            </Animatable.View>
        );
    }

    _updateSections = activeSections => {
        this.setState({ activeSections });
    };


    buttonPressCallback(_tileName) {

    }
}

const styles = StyleSheet.create({
    categoryButtonScrollView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'teal',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        paddingTop: 100,
        backgroundColor: Colors.PRIMARY,

    },
    flexTest1: {
        flexDirection: 'row',
        flex: 2,
        backgroundColor: 'blue',
        alignItems: 'center',
    },
    flexTest2: {
        flex: 4,
        backgroundColor: 'red',
    },
    flexTest3: {
        flex: 4,
        backgroundColor: 'yellow',
    },
    flexTest4: {
        flex: 2,
        backgroundColor: 'orange',
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
