import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import React from 'react';
import {
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Dimensions,
    Text,
    View,
} from 'react-native';
import Constants from 'expo-constants';
import { Icon } from 'native-base';
import * as QrCodeStorageManager from '../storage/QrCodeStorageManager';
import { useNavigation } from '@react-navigation/native';
import * as Setup from '../Setup';
import * as QrUtils from "../utilities/QrUtilities"


const DeviceWidth = Dimensions.get('window').width;

function Item({ id, title, qr, selected, onSelect }) {



    const navigation = useNavigation();
    let barcodeTypeIcon = QrUtils.getBarCodeTypeImg(qr.type);
    console.log(`SwipeList.Item(): Creating Item: id: ${id}, title: ${title} QrData: ${qr.type} iconType: ${barcodeTypeIcon} `);

    return (

        <View style={styles.itemContainer}>

            <View style={styles.leftButtonContainer}>
                <Icon type="MaterialCommunityIcons" name={barcodeTypeIcon} style={styles.leftButton} />
            </View>

            <View style={styles.textContainer}>

                <View style={{ flex: 1, height: 50 }}>
                    <Text>{qr.data}  -  {Setup.CATEGORIES[qr.category] != null ? Setup.CATEGORIES[qr.category].name : "NULL"}</Text>
                </View>
                <View style={{ flex: 1, height: 50, }}>
                    <Text>{qr.time}</Text>
                </View>
            </View>

            <View style={styles.rightButtonContainer}>

                <TouchableOpacity
                    onPress={() => navigation.navigate('OpenQr', { qr: qr })}
                    style={styles.rightButton}>
                    <Icon type="MaterialCommunityIcons" name="arrow-right" style={styles.rightButton} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default function SwipeList(props) {
    console.log("SwipeList.SwipeList(): Top");
    if (props.manifest == null) {
        console.log("SwipeList.SwipeList(): Manifest is null, returning...");
        return null;
    }
    const [selected, setSelected] = React.useState(new Map());
    console.log(`SwipeList(): category: ${props.category}`)
    const onSelect = React.useCallback(
        id => {
            const newSelected = new Map(selected);
            newSelected.set(id, !selected.get(id));

            setSelected(newSelected);
        },
        [selected],
    );

    const listViewData = Array(20).fill('').map((_, i) => `item #${i}`);

    return (
        <SwipeListView
            data={Object.keys(props.manifest)}
            renderItem={({ item }, data, rowMap) => (

                console.log(`SwipeList.SwipeList(): Item: ${props.manifest[item].data}`),
                <View style={styles.rowFront}>
                    <Item
                        id={props.manifest[item].data}
                        title={props.manifest[item].data}
                        qr={props.manifest[item]}
                        selected={!!selected.get(data.item)}
                        onSelect={onSelect}
                    />
                </View>
            )}
            renderHiddenItem={({ item }, data, rowMap) => (
                <View style={styles.rowBack}>
                    <Text>Left</Text>
                    {/* <Text>Right</Text> */}

                    <TouchableOpacity onPress={() => QrCodeStorageManager.DeleteQrCode(props.manifest[item].data)}>
                        <Icon type="MaterialCommunityIcons" name="delete" style={{ right: 15 }} />
                    </TouchableOpacity>
                </View>
            )}
            leftOpenValue={75}
            rightOpenValue={-75}
            keyExtractor={item => props.manifest[item].data}
            extraData={selected}

        />
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: 'white',
        marginTop: Constants.statusBarHeight,
        width: '100%',

    },
    itemContainer: {
        // backgroundColor: 'purple',
        // padding: 10,
        // marginVertical: 2,
        // marginHorizontal: 8,
        flexDirection: 'row',
        // width: '100%',
        flex: 1,
        // alignSelf: 'center',
        // justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',

        // height: 50,
        // flex: 1,
    },
    title: {
        fontSize: 10,
        // backgroundColor: 'green',
        flex: 1,
        height: 50,
    },
    contentText: {
        fontSize: 8,
        // backgroundColor: 'lightblue',
        flex: 1,
        height: 50,
    },
    leftButton: {
        alignSelf: 'center',
        textAlignVertical: 'center',
        flex: 1,

    },
    rightButton: {
        alignSelf: 'center',
        textAlignVertical: 'center',
        flex: 1,
    },
    textContainer: {
        // backgroundColor: 'skyblue',
        flexDirection: 'column',
        flex: 5,
        height: 50,

    },
    rightButtonContainer: {
        // backgroundColor: 'red',
        flex: 1,
        height: 50,

    },
    leftButtonContainer: {
        // backgroundColor: 'pink',
        flex: 1,
        height: 50,

    },


    rowFront: {
        alignItems: 'center',
        backgroundColor: 'lightblue',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 60,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },

});
