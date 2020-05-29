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

export default function UserProfileButton() { //extends React.Component {
    const navigation = useNavigation();

    // constructor(props) {
    //     super(props);
    //     console.log("UserProfileButton(): Nav: " + props.nav);
    // }

    const onLeftImgPress = () => {
    // this.props.onLeftImgPress?.();
        // this.props.nav('UserProfile');
    }


    // render(props) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("UserProfile")}
                style={styles.touch}>
                <Image
                    source={require('../../assets/images/appImages/profile_icon.png')}
                    style={styles.rightImage}
                />
            </TouchableOpacity>
        </View >
        
    );
}
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    touch: {
        flex: 1,

    },
    rightImage: {
        flex: 1,
        resizeMode: 'contain',
    },
});
