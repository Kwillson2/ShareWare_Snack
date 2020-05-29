import React, { Component, useState } from "react";
import { Button, Overlay, Icon } from 'react-native-elements';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableHighlight,
    Image,
    View,
} from 'react-native';


/**
 * 
 * @param {Object} content The content to display within this overlay
 * @param {bool} useSubmitButton True to use the default submit button to close the menu
 * @param {bool} submitButtonCb The submit button callback
 * @param {callback} onBackdropPressCb Callback for whever the background has been pressed, closing the overlay
 */
export default class OverlayComponent extends React.Component {

    constructor(props) {
        console.log(`Overlay.constructor(): Top props: ${props.useSubmitButton}`);
        super(props);

    }

    state = {
        visible: false,
    }

    toggleOverlay = () => {
        this.setState({ visible: !this.state.visible });
    };

    onBackdropPressHandler = () => {
        console.log(`Overlay.onBackdropPressHandler(): Background pressed`);
        this.toggleOverlay();
        if (this.props.onBackdropPressCb) {
            this.props.onBackdropPressCb();
        }
    }

    render() {
        return (
            <View
                style={styles.container} >

                <Button title="Open Overlay" onPress={this.toggleOverlay} />

                <Overlay isVisible={this.state.visible}
                    onBackdropPress={this.onBackdropPressHandler}
                    overlayStyle={styles.overlay}>
                    {this.props.content}
                    {this.renderSubmitButton()}
                </Overlay>
            </View>
        );
    }

    renderSubmitButton = () => {
        console.log(`Overlay.renderSubmitButton(): top`);
        if (this.props.useSubmitButton) {
            console.log(`Overlay.renderSubmitButton(): rendering button`);
            return (
                <View
                    style={styles.submitButtonContainer} >
                    <Button
                        containerStyle={styles.submitButton}
                        type="clear"
                        icon={
                            < Icon
                                containerStyle={{
                                    margin: 0,
                                    backgroundColor: "purple",
                                }}
                                type='ionicon'
                                name="md-checkmark-circle"
                                size={60}
                                color="green"
                            />

                        } onPress={this.onSubmitButtonPress} />
                </View>
            )
        }
        else {
            console.log(`Overlay.renderSubmitButton(): NOT rendering button`);

        }
    }

    onSubmitButtonPress = () => {
        console.log(`Overlay.onSubmitButtonPress(): TOP`);
        this.toggleOverlay();
        if (this.props.submitButtonCb != null) {
            this.props.submitButtonCb();
        }
    }
};

const styles = StyleSheet.create({
    imageContainer: {
        flex: 9,
        // position: 'absolute',
        backgroundColor: 'yellow',
        // justifyContent: 'center',
        // alignItems: 'stretch',
    },
    container: {
        flex: 1,
        // position: 'absolute',
        backgroundColor: 'yellow',
        // justifyContent: 'center',
        // alignItems: 'stretch',
    },
    image: {
        flex: 1,
        backgroundColor: 'red',
        // justifyContent: 'center',
        // alignItems: 'stretch',
        width: "100%",
    },
    submitButtonContainer: {
        backgroundColor: 'orange',
        margin: 0,
        borderWidth: 0,
        height: 50,
        // justifyContent: "flex-end",
        alignItems: "center",
    },
    submitButton: {
        backgroundColor: 'red',
        margin: 0,
        borderWidth: 0,
        width: 65,
        height: 65,

    },
    overlay: {
        width: "66%",
        height: '90%',
    },
});