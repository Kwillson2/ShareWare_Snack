import React from 'react';
import { Image, StyleSheet, Text, Share, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import * as Setup from '../../Setup';
import { Icon, } from 'native-base';

export default function ShareButton(props) {
    let [selectedImage, setSelectedImage] = React.useState(null);

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
            return;
        }

        setSelectedImage({ localUri: pickerResult.uri });
    };

    let openShareDialogAsync = async () => {
        if (!(await Sharing.isAvailableAsync())) {
            alert(`Uh oh, sharing isn't available on your platform`);
            return;
        }

        Sharing.shareAsync(selectedImage.localUri);
    };


    let onShare = async () => {
        try {
            const result = await Share.share({
                message: props.msg,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <TouchableOpacity onPress={onShare} >
            <Icon type="MaterialCommunityIcons" name={"share-variant"} style={{ marginRight: 8, alignSelf: 'center', textAlignVertical: 'center' }} />
        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
});
