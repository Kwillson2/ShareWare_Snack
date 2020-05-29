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
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
// const navigation = useNavigation();


const DeviceWidth = Dimensions.get('window').width;

function Item({ id, title, qr, selected, onSelect, props }) {



    // const navigation = useNavigation();
    let barcodeTypeIcon = null;
    console.log(`SwipeList.Item(): Creating Item: id: ${JSON.stringify(qr)} `);
    console.log(`SwipeList.Item(): Calling Callback...`);
    // console.log(`SwipeList.Item(): Creating Item: id: ${id}, title: ${title} QrData: ${qr.type} iconType: ${barcodeTypeIcon} `);
    props.openQrCallback();
    return (

        <View style={styles.itemContainer}>

            <View style={styles.leftButtonContainer}>
                <Icon type="material-community" name="barcode" style={styles.leftButton} />
            </View>

            <View style={styles.textContainer}>

                <View style={{ flex: 1, height: 50 }}>
                    {/* <Text>{qr.data}  -  {Setup.CATEGORIES[qr.category] != null ? Setup.CATEGORIES[qr.category].name : "NULL"}</Text> */}
                    <Text>{title}</Text>
                </View>
                <View style={{ flex: 1, height: 50, }}>
                    <Text>{qr.dateStr}</Text>
                </View>
            </View>

            <View style={styles.rightButtonContainer}>

                <TouchableOpacity
                    // onPress={() => navigation.navigate('OpenQr', { qr: qr })}
                    onPress={() => { console.log(`SwipeList.render(): Calling callback`), props.openQrCallback(qr) }} // () => navigation.navigate
                    style={styles.rightButton}>
                    <Icon type="material-community" name="arrow-right" style={styles.rightButton} />
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
    const onSelect = React.useCallback(
        id => {
            const newSelected = new Map(selected);
            newSelected.set(id, !selected.get(id));

            setSelected(newSelected);
        },
        [selected],
    );


    console.log(`SwipeList.SwipeList(): Calling callback: `);
    props.openQrCallback();
    let tmpCallback = props.openQrCallback;

    return (
        // <ScrollView style={styles.container}>
        <SwipeListView
            data={Object.keys(props.manifest)}
            renderItem={({ item }, data, rowMap) => (

                console.log(`SwipeList.SwipeList(): Item: ${item.description}`),
                console.log(`SwipeList.SwipeList(): props: ${props}`),
                <View style={styles.rowFront}>
                    <Item
                        id={props.manifest[item].description}
                        title={props.manifest[item].description}
                        qr={props.manifest[item]}
                        selected={!!selected.get(data.item)}
                        onSelect={onSelect}
                        // openCallback={tmpCallback} //props.openQrCallback}
                        props={props}
                    />
                </View>
            )}
            renderHiddenItem={({ item }, data, rowMap) => (
                <View style={styles.rowBack}>
                    <Text>Left</Text>
                    {/* <Text>Right</Text> */}

                    <TouchableOpacity onPress={() => console.log(`PRESS`)}>
                        <Icon type="MaterialCommunity" name="delete" style={{ right: 15 }} />
                    </TouchableOpacity>
                </View>
            )}
            leftOpenValue={75}
            rightOpenValue={-75}
            keyExtractor={item => item.description + String(Math.random())}
            extraData={selected}

        />
        // </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink',
        marginTop: Constants.statusBarHeight,
        // width: '100%',

    },
    itemContainer: {
        backgroundColor: 'purple',
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
        backgroundColor: 'skyblue',
        flexDirection: 'column',
        flex: 5,
        height: 50,
        // width: 280,
    },
    rightButtonContainer: {
        backgroundColor: 'red',
        flex: 1,
        height: 50,

    },
    leftButtonContainer: {
        backgroundColor: 'pink',
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
