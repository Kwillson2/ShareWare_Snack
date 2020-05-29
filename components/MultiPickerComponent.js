import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, ScrollView } from 'react-native'
import { MultipleSelectPicker } from 'react-native-multi-select-picker'

/**
 * 
 * @param list List of objects with 'label' and 'value' props
 * @param initItems List of object to initialize the picker too
 * @param displayAfterExpanded A GUI object to display at the bottom of the picker when its expanded
 * @param displayAfterCollapsed A GUI object to display at the bottom of the picker when its Collapsed
 * @param displayAfter A GUI object to display at the bottom of the picker always
 * @param buttonLabel The text label that will be placed on the picker button
 * commonly used for buttons
 * @param onPress The callback that gets called when done selecting. [OPTIONAL]
 * @param maxSelectAmount The max number of items allowed to be selected, negative values are all to all (default)
 * @param buttonColor The color to use for the button, defaults to 'grey'
 * @param touchStyle The styling to use for the button
 * 
 * Pass in a props 'list' like: 
 * 
 * // Tihs is function that iterates through some OBJ_LIST 
 * pulling out the correct variables
 * const items = 
    Object.values(OBJ_LIST).map(function (val, index) {
        console.log(`Swiper: item: ${val}  ${val}`)
        return (
            {label: val.name, value: val }
        )
    })
    
    // Or just make a list
    [
        { label: 'itachi', value: '1' },
        { label: 'kakashi', value: '2' },
        { label: 'madara', value: '3' },
        { label: 'menato', value: '4' },
        { label: 'naruto', value: '5' },
        { label: 'hinata', value: '6' },
        { label: 'jiraya', value: '7' },
        { label: 'tsunade', value: '8' },
        { label: 'naruto', value: '9' },
        { label: 'sasuke', value: '10' },
        { label: 'hashirama', value: '11' },
        { label: 'tobirama', value: '12' },
        { label: 'pain', value: '13' },
        { label: 'sarada', value: '14' },
        { label: 'sakura', value: '15' },
        { label: 'asura', value: '16' },
        { label: 'indra', value: '17' }
    ]
 */
export default class MultiPickerComponent extends React.Component {
    constructor(props) {
        super(props);
        console.log(`MultiPickerComponent.constructor(): Init Item: ${props.initItem}`);
        this.state.items = props.items;
        this.state.selectedItems = props.initItems;

        if (props.maxSelectAmount != null) {
            this.state.maxSelectAmount = props.maxSelectAmount;
        }

        if (props.buttonColor != null) {
            this.state.buttonColor = props.buttonColor;
        }

        if (props.touchStyle != null) {
            this.state.touchStyle = props.touchStyle;
        }
    }

    state = {
        isShownPicker: false,
        lastSelect: null,
        maxSelectAmount: -1,
        buttonColor: '#dadde3',
        touchStyle: styles.touchStyle,
    }
    multiSelect

    handleChangeSelection = (selection_, newlySelected_) => {
        // Remove the first element if we are over the max select amount
        if (this.state.maxSelectAmount > 0 && selection_.length > this.state.maxSelectAmount) {
            selection_.splice(0, 1);
        }

        let didAdd = this.state.selectedItems == null || this.state.selectedItems.length < selection_.length;
        console.log(`MultiPickerComponent.handleChangeSelection(): ${didAdd ? "Selected" : "Deselected"}  ${newlySelected_.label}`);
        this.setState({ selectedItems: selection_ });
        if (this.props.onPress != null) {
            console.log(`MultiPickerComponent.handleChangeSelection(): Calling callback}`);

            this.props.onPress(selection_, newlySelected_, didAdd);
        }
    }


    render() {
        return (
            <SafeAreaView>
                <TouchableOpacity
                    onPress={() => {
                        this.setState({ isShownPicker: !this.state.isShownPicker })
                    }}
                    style={[this.state.buttonColor, this.state.touchStyle]} // legenedary color backgroundColor: '#dadde3
                >
                    <Text>{this.props.buttonLabel != null ? this.props.buttonLabel : "Picker"}</Text>
                </TouchableOpacity>
                {this.state.isShownPicker ? this.renderPickerBox()

                    : null
                }

                {(this.state.selectedItems || []).map((item: any, index) => {
                    return <Text key={index}>
                        {item.label}
                    </Text>
                })}
                {this.props.displayAfter}
            </SafeAreaView >
        )
    }

    renderPickerBox() {
        return (
            <SafeAreaView>
                <MultipleSelectPicker
                    items={this.state.items}
                    onSelectionsChange={this.handleChangeSelection}
                    selectedItems={this.state.selectedItems}
                    buttonStyle={{ height: 100, justifyContent: 'center', alignItems: 'center' }}
                    buttonText='hello'
                    checkboxStyle={{ height: 20, width: 20 }}
                />
                {this.props.displayAfterExpanded}
            </SafeAreaView>

        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: 'row',
        // backgroundColor: 'green',
    },
    touchStyle: {
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dadde3'
    }

})