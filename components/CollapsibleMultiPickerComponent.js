import { AccordionList } from "accordion-collapse-react-native";
import { Container, Header, Separator, Content, Accordion } from "native-base";
import { View, StyleSheet, TouchableWithoutFeedback, Image, Text } from 'react-native';
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import * as Setup from '../Setup'
// CollapsibleMultiPickerComponent

function mergeStyles(defaultStyle, newStyle?, selectedItemStyle?) {
    return Array.prototype.concat.apply([], arguments)
}


const itemType = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ label: PropTypes.any, value: PropTypes.any })
])

const styleType = PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array
])

const ImageAssets = {
    ic_checkbox: require('../assets/images/icCheckbox.png'),
    ic_checked_checkbox: require('../assets/images/icCheckboxChecked.png')
}
const sourceType = PropTypes.oneOfType([PropTypes.object, PropTypes.number])

/**
 * @param items The items to display with 'label', 'value', 'labelStyle', 'checkBoxStyle' props
 * @param selectedItems The currently selected items
 * @param displayAfterExpanded A GUI object to display at the bottom of the picker when its expanded
 * @param displayAfterCollapsed A GUI object to display at the bottom of the picker when its Collapsed
 * @param displayAfter A GUI object to display at the bottom of the picker always
 * @param buttonLabel The text label that will be placed on the picker button
 * commonly used for buttons
 * @param onPress The callback that gets called when done selecting. [OPTIONAL]
 * @param maxSelectAmount The max number of items allowed to be selected, negative values are all to all (default)
 * @param buttonColor The color to use for the button, defaults to 'grey'
 * @param touchStyle The styling to use for the button
 * @param head The object for Accordian.head
 * @param renderHead A callback function for rendering Accordian.head
 * @param body The object for Accordian.body
 * @param renderBody A callback function for rendering Accordian.body
 *  
 */
export default class CollapsibleMultiPickerComponent extends React.Component {
    constructor(props) {
        super(props);
        console.log(`CollapsibleMultiPickerComponent.constructor(): Init Item: ${props.items}`);

        this.state = {
            items: props.items,
            selectedItems: props.initItems,
            dataArray: [],
            toggle: true,
        }

        this._toggleOff = this._toggleOff.bind(this)
        this._toggleOn = this._toggleOn.bind(this)
        this.onItemPress = this.onItemPress.bind(this)
        this.renderLabel = this.renderLabel.bind(this)
        // this.renderItemRow = this.renderItemRow.bind(this)
        this.getRowData = this.getRowData.bind(this)

        if (props.maxSelectAmount != null) {
            this.state.maxSelectAmount = props.maxSelectAmount;
        }

        if (props.buttonColor != null) {
            this.state.buttonColor = props.buttonColor;
        }

        if (props.touchStyle != null) {
            this.state.touchStyle = props.touchStyle;
        }

        if (props.head != null) {
            this.state.head = props.head;
        }

        if (props.body != null) {
            this.state.body = props.body;
        }
        else {

        }
    }
    state = {
        isShownPicker: false,
        lastSelect: null,
        maxSelectAmount: -1,
        buttonColor: '#dadde3',
        touchStyle: styles.touchStyle,
    }


    static propTypes = {
        items: PropTypes.arrayOf(itemType).isRequired,
        selectedItems: PropTypes.arrayOf(itemType),

        onSelectionsChange: PropTypes.func.isRequired,
        keyExtractor: PropTypes.func,

        checkboxSource: sourceType,
        selectedCheckboxSource: sourceType,
        renderLabel: PropTypes.func,
        flatListProps: PropTypes.any,
        style: styleType,
        rowStyle: styleType,
        checkboxStyle: styleType,
        labelStyle: styleType,

        selectedRowStyle: styleType,
        selectedCheckboxStyle: styleType,
        selectedLabelStyle: styleType,

        buttonText: PropTypes.string,
        buttonStyle: styleType
    }

    static defaultProps = {
        selectedItems: [],
        style: {},
        rowStyle: {},
        checkboxStyle: {},
        checkboxCheckedStyle: {},
        labelStyle: {},
        checkboxSource: ImageAssets.ic_checkbox,
        selectedCheckboxSource: ImageAssets.ic_checked_checkbox,
        renderLabel: null,
        buttonStyle: {}
    }

    componentDidMount() {
        const rows = this.getRowData(this.props)
        this.setState({ dataArray: rows })
    }

    static getDerivedStateFromProps(props, state) {
        let { items, selectedItems } = props
        items = items.map((obj) => {
            if (Object.prototype.toString.call(obj) === '[object String]') {
                return { label: obj, value: obj, checkBoxStyle: obj, labelStyle: obj }
            } else {
                return { label: obj.label, value: obj.value, checkBoxStyle: obj.checkBoxStyle, labelStyle: obj.labelStyle }
            }
        })
        selectedItems = (selectedItems || []).map((obj) => {
            if (Object.prototype.toString.call(obj) === '[object String]') {
                return { label: obj, value: obj, checkBoxStyle: obj, labelStyle: obj }
            } else {
                return { label: obj.label, value: obj.value, checkBoxStyle: obj.checkBoxStyle, labelStyle: obj.labelStyle }
            }
        })

        items.forEach((item) => {
            item.selected = selectedItems.some((i) => i.value === item.value)
        })

        return { dataArray: items }
    }

    getRowData({ items, selectedItems }: any) {

        items = items.map(this.toLabelValueObject)
        selectedItems = (selectedItems || []).map(this.toLabelValueObject)

        items.forEach((item) => {
            item.selected = selectedItems.some((i) => i.value === item.value)
        })

        return items
    }

    render() {
        const { dataArray } = this.state.items
        const { style, flatListProps, keyExtractor } = this.props

        // Check to see if there is prop render for header or body
        let rendHeader = this.props.renderHead != null ? this.props.renderHead : this.renderHeader;
        let rendContent = this.props.renderBody != null ? this.props.renderBody : this.renderContent;

        if (this.state.toggle) {
            console.log(`CollapsibleMultiPickerComponent.render(): Trying to render: ${JSON.stringify(this.state.items)}`);
            return (
                <Accordion
                    dataArray={this.state.items}
                    renderHeader={this.renderHeader}
                    renderContent={this.renderContent}
                    animation={true}
                />
            )

        } else {
            console.log(`CollapsibleMultiPickerComponent.render(): Toggled OFF`);
            return null
        }

    }

    onItemPress(row) {
        console.log(`CollapsibleMultiPickerComponent.onItemPress(): Top`);
        const { label, value, checkBoxStyle, labelStyle } = row
        let { selectedItems } = this.props

        selectedItems = (selectedItems || []).map(this.toLabelValueObject)

        const index = selectedItems.findIndex((selectedItem) => selectedItem.value === value)

        // tslint:disable-next-line: prefer-conditional-expression
        if (index > -1) {
            selectedItems = selectedItems.filter((selectedItem) => selectedItem.value !== value)
        } else {
            selectedItems = selectedItems.concat({ label, value, checkBoxStyle, labelStyle })
        }
        this.props.onSelectionsChange(selectedItems, { label, value, checkBoxStyle, labelStyle })
    }

    toLabelValueObject(obj) {
        console.log(`CollapsibleMultiPickerComponent.toLabelValueObject(): Top`);
        if (Object.prototype.toString.call(obj) === '[object String]') {
            return { label: obj, value: obj, checkBoxStyle: obj, labelStyle: obj }
        } else {
            return { label: obj.label, value: obj.value, checkBoxStyle: obj.checkBoxStyle, labelStyle: obj.labelStyle }
        }
    }

    keyExtractor = (item, index) => `${index}`

    /**
     * The content is the nested accordian. Which requires a new
     * Accordian
     */
    renderContent = (item) => {
        console.log(`CollapsibleMultiPickerComponent.renderContent(): Trying to render: ${item.label}`);
        let catObj = Setup.getCategoryFromObjString(item.label)
        let catObjName = item.label;
        console.log(`CollapsibleMultiPickerComponent.renderContent(): Used label: ${item.label} and got the Object: ${catObj}`);
        if (catObj != null) {
            catObjName = catObj.name;
            console.log(`CollapsibleMultiPickerComponent.renderContent(): ${catObj.name}'s subCategories: ${catObj.GetSubCategoryNames()}`);
            let subCats = catObj.subCategories;

            let items =
                Object.values(subCats).map(function (val, index) {
                    console.log(`CodeBodyCard.renderCategoryAssignment(): Category: ${item.label} Adding subCategory: ${val.name}  ${val}`)
                    return (
                        {
                            label: val.name, value: val.objName,
                            checkBoxStyle: {
                                left: val.GetNestedLevel() * 20,
                            },
                            labelStyle: {
                                left: val.GetNestedLevel() * 20,
                            },
                        }
                    )
                })
            console.log(`CollapsibleMultiPickerComponent.renderContent(): Trying to render: ${item.label} subCategories: ${items}`);

            return (
                <Accordion
                    dataArray={items}
                    renderContent={this.renderContent}
                    renderHeader={this.renderHeader}
                    animation={true}
                />)

        }
        else {
            console.log(`CollapsibleMultiPickerComponent.renderContent(): ERROR: Object from label: ${item.label} is NULL`);
        }

    }

    renderLabel = (label, style, selected) => {
        if (this.props.renderLabel) {
            return this.props.renderLabel(label, style, selected)
        }
        return (
            <Text style={style}>{label}</Text>
        )
    }

    renderHeader = (item, expanded) => {
        console.log(`CollapsibleMultiPickerComponent.render(): Rendering header for: ${item.label}`);
        let catObj = Setup.getCategoryFromObjString(item.label);
        let catObjName = item.label;
        console.log(`CollapsibleMultiPickerComponent.renderHeader(): Used label: ${item.label} and got the Object: ${catObj}`);
        if (catObj == null) {
            console.log(`CollapsibleMultiPickerComponent.renderHeader(): ERROR: Object from label: ${item.label} is NULL`);
        }
        else {
            catObjName = catObj.name;
        }

        let {
            checkboxSource,
            rowStyle,
            labelStyle,
            checkboxStyle
        } = this.props

        const {
            selectedCheckboxSource,
            selectedRowStyle,
            selectedCheckboxStyle,
            selectedLabelStyle
        } = this.props

        if (item.selected) {
            checkboxSource = selectedCheckboxSource
            rowStyle = mergeStyles(styles.row, rowStyle, selectedRowStyle)
            checkboxStyle = mergeStyles(styles.checkbox, checkboxStyle, selectedCheckboxStyle)
            checkboxStyle = mergeStyles(item.checkBoxStyle, checkboxStyle)
            labelStyle = mergeStyles(styles.label, labelStyle, selectedLabelStyle)
            labelStyle = mergeStyles(item.labelStyle, labelStyle)
        } else {
            rowStyle = mergeStyles(styles.row, rowStyle, item.style)
            // rowStyle = mergeStyles({ left: 30, }, rowStyle)
            checkboxStyle = mergeStyles(styles.checkbox, checkboxStyle)
            checkboxStyle = mergeStyles(item.checkBoxStyle, checkboxStyle)
            labelStyle = mergeStyles(styles.label, labelStyle)
            labelStyle = mergeStyles(item.labelStyle, labelStyle)
        }

        if (this.props.head != null) {
            console.log(`CollapsibleMultiPickerComponent.renderHeader(): Using Header object for: ${catObjName}`);
            return this.props.head;
        }
        else if (this.props.renderHead != null) {
            console.log(`CollapsibleMultiPickerComponent.renderHeader(): Calling header renderer for: ${catObjName}`);
            return this.props.renderHead(item, expanded, rowStyle, checkboxStyle, checkboxSource, labelStyle, this.renderLabel, this.onItemPress)
        }
        else {
            console.log(`CollapsibleMultiPickerComponent.renderHeader(): Rendering default header for: ${catObjName}`);
            if (catObj != null) {
                console.log(`CollapsibleMultiPickerComponent.renderHeader(): ${item.label}'s subCategories: ${catObj.GetSubCategoryNames()}`);
            }
            else {
                console.log(`CollapsibleMultiPickerComponent.renderHeader(): ERROR: Object from label: ${item.label} is NULL`);
            }

            return (
                <View style={rowStyle}>
                    <TouchableWithoutFeedback onPress={() => this.onItemPress(item)}>
                        <Image style={checkboxStyle} source={checkboxSource} />
                    </TouchableWithoutFeedback>
                    {this.renderLabel(item.label, labelStyle, item.selected)}
                </View>
            )
        }
    }

    _toggleOn() {
        this.setState({ toggle: true })
    }

    _toggleOff() {
        this.setState({ toggle: false })
    }

}

const styles = StyleSheet.create(
    {
        row: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#cccccc',
            backgroundColor: '#ffffff'
        },
        rowStyle: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#cccccc',
            backgroundColor: '#ffffff'
        },
        checkbox: {
            width: 24,
            height: 24,
            marginRight: 5
        },
        label: {},

        buttonStyle: {
            height: 40, width: '100%',
            backgroundColor: 'red'
        }
    }
)