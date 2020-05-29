import * as React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    createAppContainer,
    Header,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { MonoText } from '../components/StyledText';
import LookedUpQrCodeCard from '../cards/LookedUpQrCodeCard';
import CodeBodyCard from '../cards/CodeBodyCard';
import * as WebBrowser from 'expo-web-browser';
import { Text, Button, Icon, } from 'native-base';
import * as QrCodeStorageManager from '../storage/QrCodeStorageManager';

var __DEV__ = true;

// const { qr } = route.params;

export default class OpenQrScreen extends React.Component {

    /**
     * 
     * @param {qr} props.qr Qr Code with data, code, dateStr, type
     */
    constructor(props) {
        console.log(`OpenQrScreen.constructor(): Top`);
        super(props);
        if (this.props.route != null && this.props.route.params != null && this.props.route.params.qr != null) {
            this.state = {
                qr: this.props.route.params.qr,
            }
            console.log(`OpenQrScreen.constructor(): qr ToString: ${this.state.qr.ToString()}`);
        }
        else if (this.props.qr != null) {
            this.state = {
                qr: this.props.qr,
            }
            console.log(`OpenQrScreen.constructor(): qr ToString: ${this.state.qr.ToString()}`);
        }
        else {
            this.state = {
                qr: null,
            }
            console.log(`OpenQrScreen.constructor(): qr NULL`);

        }
    }



    handleSavePress = () => {
        if (this.state.qr != null) {
            QrCodeStorageManager.StoreQrCode(this.state.qr.code, this.state.qr)
            // QrCodeStorageManager.StoreQrCode(newQr.data, newQr)

            console.log("OpenQrScreen.handleSavePress(): Stored data with key: " + this.state.qr.data);
        }
    }

    handleCodeWebLookup = () => {
        if (this.state.qr != null) {
            console.log("OpenQrScreen.handleCodeWebLookup ========")
            WebBrowser.openBrowserAsync(
                'https://www.google.com/search?q=' + this.state.qr.data
            );
        }
    }

    render() {
        if (this.state.qr != null) {
            console.log(`OpenQrScreen.render(): Rendering QR LookUp Card: ${this.state.qr.ToString()}`);
            return (
                <>
                    <View style={styles.container}>
                        <ScrollView>
                            <CodeBodyCard qr={this.state.qr} />
                            {/* <LookedUpQrCodeCard
                            textBody={"Barcode Scanned: " + this.state.qr.type + " - " + this.state.qr.data}
                            searchCallback={this.handleCodeWebLookup}
                            qr={this.state.qr}
                        /> */}
                        </ScrollView>
                    </View>
                </>
            );

        }
        else {
            return (
                <>
                    <View style={styles.container}>

                        <LookedUpQrCodeCard
                            title={"NOT IMPLEMENTED"}
                            timeNDate={"NOT IMPLEMENTED"}
                            textBody={"Barcode Scanned: NOT IMPLEMENTED"}
                            type={"BARCODE"}
                            data={"NOT REAL"}
                            searchCallback={this.handleCodeWebLookup}
                        />
                    </View>
                </>
            )
        }
    }
}

OpenQrScreen.navigationOptions = {
    header: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'stretch',
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