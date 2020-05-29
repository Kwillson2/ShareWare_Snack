import Setup, { CATEGORIES } from '../Setup';
import {
    View,
    Picker,
    Text,
    StyleSheet,
} from 'react-native';
import React, { Component } from 'react';
import { MultipleSelectPicker } from 'react-native-multi-select-picker'

/**
 * @param initCategory The initial category to set the picker too
 */
export default class CategoryPicker extends Component {
    constructor(props) {
        super(props);
        console.log(`CategoryPicker.constructor(): Init Category: ${props.initCategory}`);
        this.state.category = CATEGORIES[props.initCategory];
    }

    state = { category: '' }
    updateCategory = (category, ) => {
        this.setState({ category: category })
        this.props.onPicked(category);
    }




    render() {
        return (
            <View>
                <Picker selectedValue={this.state.category} onValueChange={this.updateCategory}>
                    {console.log(`Swiper: state category: ${this.state.category} `),
                        Object.values(CATEGORIES).map(function (val, index) {
                            console.log(`Swiper: item: ${val.name}  ${val.nameCaps}`)
                            return (
                                <Picker.Item label={val.name} value={val} key={val.name} />
                            )
                        })}
                </Picker>
            </View>
        );
    }

    renderMultPicker() {
        return (
            <View>
                <MultipleSelectPicker
                    items={this.state.items}
                    onSelectionsChange={(ele) => { this.setState({ selectectedItems: ele }) }}
                    selectedItems={this.state.selectectedItems}
                    buttonStyle={{ height: 100, justifyContent: 'center', alignItems: 'center' }}
                    buttonText='hello'
                    checkboxStyle={{ height: 20, width: 20 }}
                />
                {this.props.displayAfter}
            </View>

        )

    }
}




const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        alignSelf: 'center',
        color: 'red'
    }
})