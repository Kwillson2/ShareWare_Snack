import React from 'react';
import {
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Constants from 'expo-constants';
import { Icon } from 'native-base';
import * as QrCodeStorageManager from '../storage/QrCodeStorageManager';
import { useNavigation } from '@react-navigation/native';
import * as QrUtils from "../utilities/QrUtilities"



function Item({ id, title, qr, selected, onSelect }) {



    const navigation = useNavigation();
    let barcodeTypeIcon = QrUtils.getBarCodeTypeImg(qr.type);
    console.log(`FlatlistSelectable.Item(): Creating Item: id: ${id}, title: ${title} QrData: ${qr.type} iconType: ${barcodeTypeIcon}`);
    return (

        <View style={styles.itemContainer}>

            <View style={styles.leftButtonContainer}>
                <Icon type="MaterialCommunityIcons" name={barcodeTypeIcon} style={styles.leftButton} />
            </View>

            <View style={styles.textContainer}>

                <View style={{ flex: 1, height: 50, backgroundColor: 'yellow' }}>
                    <Text>{qr.data}</Text>
                </View>
                <View style={{ flex: 1, height: 50, backgroundColor: 'orange' }}>
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


        // <View style={{ flex: 1, height: 50, flexDirection: 'row' }}>

        //     <View style={{ flex: 1, height: 50, backgroundColor: 'powderblue' }}>
        //         <Icon type="MaterialCommunityIcons" name={barcodeTypeIcon} style={styles.leftButton} />
        //     </View>

        //     <View style={{ flex: 5, height: 50, backgroundColor: 'skyblue', flexDirection: 'column' }}>

        //         <View style={{ flex: 1, height: 50, backgroundColor: 'yellow' }}>
        //             <Text>{qr.data}</Text>
        //         </View>
        //         <View style={{ flex: 1, height: 50, backgroundColor: 'orange' }}>
        //             <Text>{qr.time}</Text>
        //         </View>
        //     </View>

        //     <View style={{ flex: 1, height: 50, backgroundColor: 'steelblue' }}>
        //         <Icon type="MaterialCommunityIcons" name="menu" style={styles.rightButton} />
        //     </View>
        // </View>


        // <View styles={styles.itemContainer}>
        //     <TouchableOpacity
        //         onPress={() => onSelect(id)}
        //         style={[
        //             styles.item,
        //             { backgroundColor: selected ? '#6e3b6e' : '#f9c2ff' },
        //         ]}
        //     >
        //         <View style={styles.leftButtonContainer}>
        //             <Icon type="MaterialCommunityIcons" name={barcodeTypeIcon} style={styles.leftButton} />

        //         </View>
        //         <View style={styles.textContainer}>
        //             <Text style={styles.title}>{qr.data}</Text>
        //             <Text style={styles.contentText}>{qr.time}</Text>
        //         </View>
        //         <View style={styles.rightButtonContainer}>
        //             <Icon type="MaterialCommunityIcons" name="menu" style={styles.rightButton} />

        //         </View>
        //     </TouchableOpacity>
        // </View>
    )
}

export default function FlatlistSelectable(props) {
    if (props.manifest == null) {
        console.log("FlatlistSelectable.FlatlistSelectable(): Manifest is null, returning...");
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

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={Object.keys(props.manifest)}
                renderItem={({ item }) => (
                    console.log(`FlatlistSelectable.FlatlistSelectable(): Item: ${item}`),
                    <Item
                        id={props.manifest[item].data}
                        title={props.manifest[item].data}
                        qr={props.manifest[item]}
                        selected={!!selected.get(props.manifest[item].data)}
                        onSelect={onSelect}
                    />
                )}
                keyExtractor={item => props.manifest[item].data}
                extraData={selected}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: 'white',
        marginTop: Constants.statusBarHeight,
        width: '100%',

    },
    itemContainer: {
        backgroundColor: 'purple',
        padding: 10,
        marginVertical: 2,
        marginHorizontal: 8,
        flexDirection: 'row',
        // width: '100%',
        flex: 1,
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
        fontSize: 20,
        // backgroundColor: 'green',
        flex: 1,
        height: 50,
    },
    contentText: {
        fontSize: 12,
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
});
