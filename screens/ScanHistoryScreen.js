import React, { Component } from 'react';
import {
    Button,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    FlatList,
    SafeAreaView,
    AsyncStorage,
    Dimensions,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    Container, Content, Card, CardItem, Thumbnail, Segment, Icon, Left, Right, Body
} from 'native-base';

import { createAppContainer } from 'react-navigation';
import { Header } from 'react-navigation-stack';
import CategoryTile from '../components/CategoryTile';
import SwipeList from '../components/SwipeList';
import FlatlistSelectable from '../components/FlatlistSelectable';
import AccordianListComponent from '../components/AccordianListComponent';
import TestNestedAccordianPicker from '../components/TestNestedAccordianPicker';
import SwiperComponent from '../components/SwiperComponent';
import * as QrCodeStorageManager from '../storage/QrCodeStorageManager';
import Swiper from 'react-native-swiper'
import * as Setup from '../Setup';
// import Header_ImageTitleImage from '../components/Header_ImageTitleImage';
// import { createStackNavigator } from 'react-navigation-stack';
// import { RootStack } from '../navigation/MainTabNavigator';
import TitleInfoCard from '../cards/TitleInfoCard';
import CodeBodyCard from '../cards/CodeBodyCard';
var __DEV__ = true;

const DeviceWidth = Dimensions.get('window').width;
const KEY = "TEST_OBJ";

var tempStorage = "";

export default class ScanHistoryScreen extends React.Component {
    constructor(props) {
        console.log("ScanHistoryScreen.constructor(): TOP");

        super(props)
        this.state = {
            myText: 'My Original Text',
            // manifest: null,
            isLoaded: false,
            category2Use: Setup.CATEGORIES,
            category2UseName: "CATEGORIES",
        }

    }
    state = {
        isLoaded: false,
        myText: 'My Original Text',
        category2Use: Setup.CATEGORIES_ARRAY,
    };



    _getKeys = async () => {
        // console.log("ScanHistoryScreen._getKeys: Trying to _getKeys");
        try {
            var value = await AsyncStorage.getAllKeys();
            if (value !== null) {
                // We have data!!
                // console.log("ScanHistoryScreen._getKeys: " + value);
            }
            else {
                // console.log("ScanHistoryScreen._getKeys: keys returned is null");

            }
        } catch (error) {
            // Error saving data
            // console.log("ScanHistoryScreen._getKeys: ERROR: " + error);
        }

    }

    _removeAllCloudData = async () => {
        // console.log("ScanHistoryScreen._removeAllData: Trying to _removeData");
        QrCodeStorageManager.RemoveAllCodes();
    }

    _getCloudKeys = async () => {
        // console.log("ScanHistoryScreen._getCloudKeys(): Trying to all the cloud keys");
        let keys = await QrCodeStorageManager.GetStoredKeyList();
    }

    onOpenQr = (qr) => {
        console.log("ScanHistoryScreen.onOpenQr(): Attempting to OpenQr Screen...");
        this.props.navigation.navigate('OpenQr', { qr: qr })
    }

    render = (props) => {

        // console.log(`ScanHistoryScreen.render(): Navigation: ${JSON.stringify(this.props.navigation)}`);
        // console.log(`ScanHistoryScreen.render(): route: ${JSON.stringify(this.props.route)}`);
        // This allows going into nested menus
        if (this.props != null && this.props.route != null) {
            let category2UseObjStr = Setup.getNestedPropertyFromName(this.props.route, "params", "category2UseObjStr");
            // console.log(`ScanHistoryScreen.render(): category2UseObjStr: ${category2UseObjStr}`);
            if (category2UseObjStr != null) {

                let cat = Setup.getCategoryFromObjString(category2UseObjStr);
                this.state.category2Use = cat.subCategories;
                this.state.category2UseName = cat.name;
                console.log(`ScanHistoryScreen.render(): Passed in Cat: ${Object.getOwnPropertyNames(cat)}`);
            }
        }

        if (this.state.category2Use == null) {
            // this.setState({ category2Use: Setup.CATEGORIES_ARRAY });
            this.state.category2Use = Setup.CATEGORIES;
        }

        return (
            <>
                <SafeAreaView style={styles.container}>
                    <View style={styles.flexTest1}>
                        <Button onPress={this._removeAllCloudData} title="Remove Cloud Data" />
                        <Button onPress={this._getCloudKeys} title="Get Cloud Keys" />
                    </View>
                    <SafeAreaView style={styles.flexTest3}>
                        {this.renderSwiper(this.state.category2Use)}

                        {/* <TestNestedAccordianPicker dataArray={dataArray} nestedVarName="children" titleVarName="name" selectedItems={[[0, 0, 0, 0]]} /> */}

                        {/* <TestNestedAccordianPicker dataArray={items} nestedVarTitleName="title" nestedVarName="children" nestedObjFormatCallback={this.nestedObjFormatCallback} selectedItems={selected} maxSelectAmount={1} /> */}
                    </SafeAreaView>
                </SafeAreaView >
            </>
        );
    }

    nestedObjFormatCallback = (item, dataArr) => {
        if (dataArr == null) {

            console.log(`ScanHistoryScreen.nestedObjFormatCallback(): ERROR: Passed in values were null.  returning...`);
            return;
        }

        for (let iArr in dataArr) {
            let val = dataArr[iArr];
            let objKeys = [];
            let nestedLvl = 0;
            let subCats = [];
            let objSubCatNames = [];
            let name = "";
            if (val.value == null) {
                if (val.objName != null) {
                    nestedLvl = val.GetNestedLevel();
                    objKeys = Object.keys(val);
                    objSubCatNames = Object.keys(val.subCategories);
                    name = val.name;
                    subCats = val.subCategories;
                }
                else {
                    console.log(`ScanHistoryScreen.nestedObjFormatCallback(): ERROR: name: ${val.name} .value = NULL`);
                    console.log(`ScanHistoryScreen.nestedObjFormatCallback(): ERROR: Title: ${val.title} .value = NULL`);
                    console.log(`ScanHistoryScreen.nestedObjFormatCallback(): ERROR: val: ${Object.keys(val)}`);
                    return;

                }

            }
            else {
                subCats = val.value.subCategories;
                nestedLvl = val.value.GetNestedLevel();
                objKeys = Object.keys(val.value);
                objSubCatNames = Object.keys(val.value.subCategories);
                name = val.value.name;
            }

            val.title = name;
            // val.parent = item;
            // val.subCategories = subCats;
            // val.isSelected = false;
            // val.isIntermediate = false;
            val.checkBoxStyle = {
                left: nestedLvl * 20,
            };
            val.labelStyle = {
                left: nestedLvl * 20,
            };


        };
        return dataArr;
    }

    renderSwiper = (category_) => {
        console.log(`ScanHistoryScreen.renderSwiper(): Rendering Swiper for:  ${category_.name != null ? category_.name : "NULL NAME"}`);
        return (

            <SafeAreaView style={styles.container}>
                <Swiper showsButtons>
                    {Object.values(category_).map((cat, index) => {
                        return (this.renderSwiperPageContent(cat));
                    })}

                </Swiper>
            </SafeAreaView>
        )
    }

    renderSubCategorySwiper = (category_) => {
        if (category_.value != null) {
            category_ = category_.value;
        }

        console.log(`ScanHistoryScreen.renderSubCategorySwiper(): Rendering Swiper for: ${category_.name != null ? category_.name : "NULL NAME"}`);
        return (
            <SafeAreaView style={styles.container}>
                <Swiper showsButtons>
                    {Object.values(category_.subCategories).map((cat, index) => {
                        return (this.renderSwiperPageContent(cat));
                    })}
                </Swiper>
            </SafeAreaView >
        )
    }

    renderSwiperPageContent = (category_) => {
        if (category_.value != null) {
            category_ = category_.value;
        }
        console.log(`ScanHistoryScreen.renderSwiperPageContent(): Rendering Category: ${category_.name != null ? category_.name : "NULL NAME"} `);
        let subCats = category_.GetSubCategoryNames();
        // console.log(`ScanHistoryScreen.renderSwiperPageContent(): Rendering Category: ${category_.name} with ${subCats} subCategories`);
        let manifestValues = Object.values(category_.manifest);
        console.log(`ScanHistoryScreen.renderSwiperPageContent(): Object.values(category_.manifest) = ${JSON.stringify(manifestValues)}`);
        console.log(`ScanHistoryScreen.renderSwiperPageContent(): category_.manifest = ${JSON.stringify(category_.manifest)}`);
        return (
            < Container key={category_.name} >
                {/* <View key={category_.name}> */}
                {/* <ScrollView style={{ nestedScrollEnabled: true, persistentScrollbar: true }}> */}
                <Text style={styles.text}>{category_.name}</Text>
                <SafeAreaView style={styles.container}>
                    <FlatList
                        keyExtractor={item => item.id}
                        data={manifestValues}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this.onOpenQr(item)}>
                                <TitleInfoCard key={item.code} qr={item} />
                            </TouchableOpacity >
                        )}

                    />
                    {/* <AccordianListComponent dict={category_.manifest} headRender={(item) => <TitleInfoCard qr={item} />} bodyRender={(item) => <CodeBodyCard qr={item} />} /> */}
                </SafeAreaView >
                {this.renderSubCategoryButtons(category_)}
                {/* </ScrollView> */}
                {/* </View> */}
            </Container>
        )
    }

    renderSubCategoryButtons = (cat_) => {
        // console.log(`ScanHistoryScreen.renderSubCategoryButtons(): Rendering Category: ${cat_.name} `);
        let subCats = cat_.GetSubCategoryNames();
        // console.log(`ScanHistoryScreen.renderSubCategoryButtons(): Rendering Category: ${cat_.name} with ${subCats} subCategories`);

        return (

            Object.values(cat_.subCategories).map((val_, index) => {
                return (
                    <Button onPress={() => this.onSubCategoryButtonPress(val_)} key={val_.name} title={val_.name} />
                )
            })

        )

    }

    onSubCategoryButtonPress = (subCat_) => {
        // console.log(`ScanHistoryScreen.onSubCategoryButtonPress(): Trying to navigate too ScanHistoryScreen Category: ${subCat_.name} navigation: ${JSON.stringify(this.props.navigation)}`);
        // this.props.navigation.navigate('ScanHistory', { category2UseObjStr: subCat_.objName })
        // this.props.navigation.push('ScanHistory', { category2Use: subCat_.subCategories })
        // this.props.navigation.jumpTo('ScanHistory', { category2UseObjStr: subCat_.objName })
        // this.props.navigation.jumpTo('Home', { category2UseObjStr: subCat_.objName })

        this.props.navigation.push('ScanHistory', {
            screen: 'ScanHistory',
            params: {
                category2UseObjStr: subCat_.objName,
                headerShown: true,
            },
            screenOptions: {
                headerShown: true,
            },
            options: {
                headerShown: true,
            },
            screenProps: {
                headerShown: true,
            },
        });

        // this.props.navigation.navigate({
        //     routeName: 'ScanHistory',
        //     params: {
        //         category2UseObjStr: subCat_.objName,
        //     },
        //     key: 'ScanHistory'
        // })
        // this.renderSubCategorySwiper(subCat_)
    }

}






const styles = StyleSheet.create({
    wrapper: {},
    contentContainer: {
        flex: 9,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'lightblue'

    },

    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
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
    text: {
        // color: '#fff',
        fontSize: 28,
        textAlign: 'center',
        // justifyContent: 'center',
        // alignItems: 'center',
        fontWeight: 'bold'
    },
    bodyTypeScrollView: {
        flexDirection: 'column',
        // flexWrap: 'wrap',
        backgroundColor: 'teal',

        // justifyContent: 'center',
    },
    categoryButtonScrollView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'teal',

        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: 'purple',
    },
    flexTest1: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'blue',
        alignItems: 'center',
        top: 0,
    },
    flexTest2: {
        flex: 0,
        backgroundColor: 'red',
    },
    flexTest3: {
        flex: 6,
        backgroundColor: 'yellow',
    },
    flexTest4: {
        flex: 1,
        backgroundColor: 'orange',
    },
    titleText: {
        flex: 1,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 20,
        lineHeight: 19,
        textAlign: 'center',
        // marginTop: '15%',
    },
    image: {
        alignSelf: 'center',
        flex: 1,
        // width: DeviceWidth * 0.25,
        // height: DeviceWidth * 0.25,
        backgroundColor: 'yellow',
    },
});

/**
 * Meant to be practice for the CATEGORIES
 * CATEGORIES.Food.FoodSub1.FoodSub2.FoodSub3
 */
const dataArray = [
    {
        title: "1.0", content: "1.0", name: "1.0", children:
            [{
                name: "1.1", title: "1.1", children:
                    [{
                        name: "1.1.1", title: "1.1.1", children:
                            [{
                                name: "1.1.1.1", title: "1.1.1.1"
                            }, {
                                name: "1.1.1.2", title: "1.1.1.2"
                            }]
                    }, {
                        name: "1.1.2", title: "1.1.2", children:
                            [{
                                name: "1.1.2.1", title: "1.1.2.1"
                            }]
                    }]
            }, {
                name: "1.2", title: "1.2", children:
                    [{
                        name: "1.2.1", title: "1.2.1", children:
                            [{
                                name: "1.2.1.1", title: "1.1.2.1"
                            }]
                    }]
            }]
    },
    {
        title: "2.0", content: "2.0", name: "2.0", children:
            [{
                name: "2.1", title: "2.1", children:
                    [{
                        name: "2.1.1", title: "2.1.1", children:
                            [{
                                name: "2.1.1.1", title: "2.1.1.1"
                            }]
                    }]
            }]
    },

    {
        title: "3.0", content: "3.0", name: "3.0", children:
            [{
                name: "3.1", title: "3.1", children:
                    [{
                        name: "3.1.1", title: "3.1.1", children:
                            [{
                                name: "3.1.1.1", title: "3.1.1.1"
                            }]
                    }]

            }]
    }
];