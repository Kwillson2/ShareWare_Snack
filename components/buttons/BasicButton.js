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
import { useNavigation } from '@react-navigation/native';

const DeviceWidth = Dimensions.get('window').width;
const DeviceHeight = Dimensions.get('window').height;

export default function BasicButton(props) { 
    const navigation = useNavigation();

    


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate(props.nav)}
                style={styles.touch}>
                <Image
                    source={props.img}
                    style={styles.rightImage}
                />
            </TouchableOpacity>
        </View >
        
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        resizeMode: 'contain',
        // backgroundColor: 'magenta',
    },
    touch: {
        alignSelf: 'center',
        // flex: 1,
        resizeMode: 'contain',
        width: 56,
        height: 56,
        // backgroundColor: 'pink',

    },
    rightImage: {
        flex: 1,
        alignSelf: 'center',
        resizeMode: 'contain',
        // width: 56,
        // height: 56,
        // backgroundColor: 'red',
    },
});
