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

export default class Header_ImageTitleImage extends React.Component {

    constructor(props) {
        super(props);
    }

    onLeftImgPress = () => {
        this.props.onLeftImgPress?.();
    }

    onRightImgPress = () => {
        this.props.onRightImgPress?.();
    }

    render(props) {
        return (
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <TouchableOpacity onPress={this.onLeftImgPress}>
                        <Image
                            source={this.props.leftImgSrc}
                            style={styles.leftImage}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.midContainer}>
                    <Text style={styles.titleText}>{this.props.title}</Text>
                </View>

                <View style={styles.rightContainer}>
                    <TouchableOpacity onPress={this.onRightImgPress}>
                        <Image
                            source={this.props.rightImgSrc}
                            style={styles.rightImage}
                        />
                    </TouchableOpacity>
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'row',
        // backgroundColor: 'green',
    },
    leftContainer:
    {
        flex: 2,
        // backgroundColor: 'red',
    },
    midContainer:
    {
        flex: 5,
        backgroundColor: 'white',
    },
    rightContainer:
    {
        flex: 2,
        backgroundColor: 'blue',
    },
    leftImage: {
        alignSelf: 'center',
        // flex: 1,
        width: DeviceWidth * 0.25,
        height: DeviceWidth * 0.25,
        // backgroundColor: 'yellow',
    },
    titleText: {
        textAlign: "center",

    },
    rightImage: {
        alignSelf: 'center',
        // flex: 1,
        width: DeviceWidth * 0.25,
        height: DeviceWidth * 0.25,
        // backgroundColor: 'yellow',
    },
});
