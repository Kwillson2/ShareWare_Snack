import Setup, { CATEGORIES } from '../Setup';
import {
    View,
    Picker,
    Text,
    StyleSheet,
} from 'react-native';
import React, { Component } from 'react';

/**
 * @brief Generic picker wheel
 * props.list = the list to populate the picker
 * props.initItem = the starting picker value
 * 
 */
export default class PickerWheelComponent extends Component {
    constructor(props) {
        super(props);
        console.log(`PickerWheelComponent.constructor(): Init Item: ${props.initItem}`);
        this.state.list = props.list;
        this.state.item = props.initItem;

    }

    state = { item: '' }
    updateItem = (item, ) => {
        this.setState({ item: item })
        this.props.onPicked(item);
    }


    render() {
        return (
            <View>
                <Picker selectedValue={this.state.item} onValueChange={this.updateItem}>
                    <Picker.Item label={"None"} value={"None"} key={"None"} />
                    {console.log(`Swiper: state category: ${this.state.item} `),
                        Object.keys(this.state.list).map(function (val, index) {
                            console.log(`Swiper: item: ${val}  ${val}`)
                            return (
                                <Picker.Item label={val} value={val} key={val} />
                            )
                        })}
                </Picker>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        alignSelf: 'center',
        color: 'red'
    }
})