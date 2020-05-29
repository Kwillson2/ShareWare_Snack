
import React, { useState, useEffect, Component } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

import * as Setup from '../../Setup';

export default function FavoriteStar() {
    const navigation = useNavigation();


    return (
        <Container style={styles.container}>
            <Button onPress={this.handleCodeWebLookup} textStyle={{ color: '#87838B' }}>
                <Icon type="Fontisto" name="star" style={{color: 'white'}}/>
                <Text>Search</Text>
            </Button>
        </Container >

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