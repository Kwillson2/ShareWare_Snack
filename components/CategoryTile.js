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

const DeviceWidth = Dimensions.get('window').width;

export default class CategoryTile extends React.Component {
    render(props) {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.image}
                    onPress={this.props.onPressAction}>

                    <Image
                        source={this.props.imgSrc}
                        style={styles.image}
                    />
                    <Text style={styles.lowerText}>{this.props.tileName}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        bottom: 0,
        backgroundColor: 'green',
        width: DeviceWidth * 0.3,
        height: DeviceWidth * 0.3,
        marginBottom: 1,
        marginLeft: 1,
    },
    image: {
        alignSelf: 'center',
        flex: 1,
        width: DeviceWidth * 0.25,
        height: DeviceWidth * 0.25,
        backgroundColor: 'yellow',
    },
    lowerText: {
        textAlign: "center",

    },
});
