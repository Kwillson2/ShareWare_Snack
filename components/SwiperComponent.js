import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View } from 'react-native'

import Swiper from 'react-native-swiper'
import { createIconSetFromFontello } from '@expo/vector-icons'
import SwipeList from '../components/SwipeList';
import { TouchableOpacity } from 'react-native-gesture-handler';



const styles = StyleSheet.create({
    slide1: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#9DD6EB',
        flexDirection: 'column',
    },

    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },

    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },

    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    contentContainer: {
        flex: 9,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'lightblue'

    },
    dot: {
        backgroundColor: 'rgba(0,0,0,.2)',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
    },
})

export default class SwiperComponent extends Component {
    constructor(props) {
        console.log(`SwiperComponent.contructor(): TOP`)
        super(props)
        this.state = {
            items: props.items,
            manifest: props.manifest,
        }
        props.openQrCallback();
    }
    componentDidMount() {
        // this.setState({
        //     items: [
        //         { title: 'Hello Swiper', css: styles.slide1 },
        //         { title: 'Beautiful', css: styles.slide2 },
        //         { title: 'And simple', css: styles.slide3 }
        //     ]
        // })
    }

    render() {
        // This gives a Category Manifest
        if (this.state.items != null) {
            console.log("SwiperComponent.render: MANIFEST VALID ");
            return (
                <Swiper showsButtons
                    onIndexChanged={this.handleOnIndexChanged}
                >

                    {Object.values(this.state.items).map(function (val, index) {
                        console.log(`SwiperComponent: item: ${val.name}`)
                        console.log(`SwiperComponent: item: ${val.name} category: ${val}`)
                        return (
                            <View key={val} style={styles.slide1}>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.text}>{val.name}</Text>
                                </View>
                                <View style={styles.contentContainer}>
                                    <SwipeList manifest={val.manifest} style={{ width: '100%' }} category={val} openQrCallback={this.props.openQrCallback} />
                                </View>
                            </View>
                        )
                    }, this)}
                </Swiper>
            )
        }
        // This gives the master manifest
        else if (this.state.manifest != null) {
            console.log("SwiperComponent.render: MANIFEST VALID ");
            return (
                <Swiper showsButtons
                    onIndexChanged={this.handleOnIndexChanged}
                >

                    {Object.values(this.state.items).map(function (val, index) {
                        console.log(`SwiperComponent: item: ${val.name}`)
                        console.log(`SwiperComponent: item: ${val.name} category: ${val}`)
                        return (
                            <View key={val} style={styles.slide1}>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.text}>{val.name}</Text>
                                </View>
                                <View style={styles.contentContainer}>
                                    <SwipeList manifest={this.state.manifest} style={{ width: '100%' }} category={val} openQrCallback={this.props.openQrCallback} />
                                </View>
                            </View>
                        )
                    }, this)}
                </Swiper>
            )
        }
        else {
            console.log("SwiperComponent.render: MANIFEST NULL ");
            return (
                <Swiper showsButtons
                    onIndexChanged={this.handleOnIndexChanged}
                >

                    {Object.values(this.state.items).map(function (val, index) {
                        console.log(`Swiper: item: ${val.name}`)
                        return (
                            <View key={val} style={styles.slide1}>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.text}>{val.name}</Text>
                                </View>
                                <View style={styles.contentContainer}>
                                    <Text style={styles.text}>{val.name}</Text>
                                </View>
                            </View>
                        )
                    })}
                </Swiper>
            )

        }
    }

    handleOnIndexChanged = (index_) => {
        console.log(`SwiperComponent.handleOnIndexChanged(): ${Object.values(this.state.items)[index_].name}`)

    }
}

AppRegistry.registerComponent('myproject', () => SwiperComponent)