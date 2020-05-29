import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text,
    Image, FlatList, StyleSheet
} from "react-native";
import { Colors } from '../../Colors';
import Icon from "react-native-vector-icons/MaterialIcons";

export default class AccordionPane extends Component {

    constructor(props) {
        
        super(props);
        this.state = {
            data: props.data,
            expanded: false,
        }
    }

    render() {
        return (
            <View>
                <TouchableOpacity style={styles.row} onPress={() => this.toggleExpand()}>
                    <Text style={[styles.title]}>{this.props.title}</Text>
                    <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={Colors.DARKGRAY} />
                </TouchableOpacity>
                <View style={styles.parentHr} />
                {
                    this.state.expanded &&
                    <View style={{}}>
                        <FlatList
                            data={this.state.data}
                            numColumns={1}
                            scrollEnabled={true}
                            renderItem={({ item, index }) =>
                                <View>
                                    { item.value.children }
                                    <TouchableOpacity style={[styles.childRow, styles.button, item.value.isActive ? styles.btnInActive : styles.btnActive]} onPress={() => this.onClick(index)}>

                                        <Image source={item.value.imgSrc} />
                                        <Text style={[styles.font, styles.itemInActive]} >{item.key}</Text>
                                        <Icon name={'check-circle'} size={24} color={!item.value.isActive ? Colors.LIGHTGRAY : Colors.GREEN} />
                                    </TouchableOpacity>
                                    <View style={styles.childHr} />
                                </View>
                            } />
                    </View>
                }

            </View>
        )
    }

    onClick = (index) => {
        const temp = this.state.data.slice()
        console.log("AccordionPane.onClick(): Selected: ", temp[index].value.id);
        temp[index].value.isActive = !temp[index].value.isActive
        temp[index].value.callback(temp[index]);
        this.setState({ data: temp })
    }

    toggleExpand = () => {
        this.setState({ expanded: !this.state.expanded })
    }

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: '100%',
        height: 54,
        alignItems: 'center',
        paddingLeft: 35,
        paddingRight: 35,
        fontSize: 12,
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.DARKGRAY,
    },
    itemActive: {
        fontSize: 12,
        color: Colors.GREEN,
    },
    itemInActive: {
        fontSize: 12,
        color: Colors.DARKGRAY,
    },
    btnActive: {
        borderColor: Colors.GREEN,
    },
    btnInActive: {
        borderColor: Colors.DARKGRAY,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 56,
        paddingLeft: 25,
        paddingRight: 18,
        alignItems: 'center',
        backgroundColor: Colors.CGRAY,
    },
    childRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.GRAY,
    },
    parentHr: {
        height: 1,
        color: Colors.WHITE,
        width: '100%'
    },
    childHr: {
        height: 1,
        backgroundColor: Colors.LIGHTGRAY,
        width: '100%',
    },
    colorActive: {
        borderColor: Colors.GREEN,
    },
    colorInActive: {
        borderColor: Colors.DARKGRAY,
    }

});