import * as React from 'react';
import {
    Button,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    createAppContainer,
    Header,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { MonoText } from '../components/StyledText';
var __DEV__ = true;

export default class QrLookUpScreen extends React.Component {
    render() {
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.flexTest1}>
                        <Text style={styles.titleText}>
                            QrLookUpScreen
                        </Text>
                    </View>
                    <View style={styles.flexTest2}>
                    </View>
                    <View style={styles.flexTest3}>
                    </View>
                </View>
            </>
        );
    }
}

QrLookUpScreen.navigationOptions = {
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