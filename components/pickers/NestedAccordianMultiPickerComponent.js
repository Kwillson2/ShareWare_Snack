import React, { Component } from "react";
import { Container, Header, Content, CheckBox, Icon, Accordion, Text, View } from "native-base";
import { StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'



/**
 * 
 * 
 * @param nestedVarName The name of the variable that will 
 * result in a new nested accoridian.  This allows dynamic 
 * object passing, while still nesting on the correct variable.
 * Ex: "children", where an object with the property 'children'
 * would contain all the children objects OF THE SAME TYPE. 
 * Default: "children"
 * @param nestedVarTitleName The name of variable that contains
 *  the nested obejct's name or title.  Used to pull from nested 
 * objects.  Enables dyncamicness
 * @param nestedObjFormatCallback The callback to format a 
 * nested object into a 'dataArray', before creating another nested 
 * accordian
 * @param dataArray The data array that will be used int he accordian.
 * Each element has the following: 
 *  - {String} title 
 *  - {any} value
 *     - value.NESTED_VAR_NAME required to nest
 * @param {String} expandedIconName The icon name to be used 
 * whenever the accordian is expanded. Default: "remove-circle"
 * @param {String} collapsedIconName The icon name to be used
 * whenever the accordian is collapsed. Default: "add-circle"
 * @param {props} headerTextStyle Optional props for the 
 * the header title text.  Typically useful for indentation
 * @param {function} onSelectionChanged Callback for whenever 
 * a selection change has occured. (changedItem, selectedItems) 
 * @param {Array} selectedItems The currently selected items to 
 * start off with
 * @param {Int} maxSelectAmount The maximum amount that can be 
 * selected at once.  Defaults to -1, meaning: no limit
 * 
 */
export default class NestedAccordianMultiPickerComponent extends Component {
    constructor(props) {
        super(props);
        this.state.dataArray = props.dataArray;
        this.state.ogArray = props.dataArray;

        if (props.expandedIconName != null) {
            this.state.expandedIconName = props.expandedIconName;
        }

        if (props.collapsedIconName != null) {
            this.state.collapsedIconName = props.collapsedIconName;
        }

        if (props.nestedVarName != null) {
            this.state.nestedVarName = props.nestedVarName;
        }

        if (props.nestedVarTitleName != null) {
            this.state.nestedVarTitleName = props.nestedVarTitleName;
        }

        if (props.maxSelectAmount != null) {
            this.state.maxSelectAmount = props.maxSelectAmount;
        }

        if (props.buttonColor != null) {
            this.state.buttonColor = props.buttonColor;
        }

        if (props.touchStyle != null) {
            this.state.touchStyle = props.touchStyle;
        }


        if (props.selectedItems != null) {
            this.state.selectedItems = props.selectedItems;

            // Set all the selected items 
            for (let iItems in this.state.selectedItems) {
                let itemIndices = this.state.selectedItems[iItems];
                this.getItemFromIndex(itemIndices, true);
            }
        }
        console.log(`NestedAccordianMultiPickerComponent.constructor(): `);
    }



    state = {
        dataArray: [],
        ogArray: [],
        selectedItems: [],
        buttonColor: '#dadde3',
        lastSelected: null,
        nestedVarName: "children",
        nestedVarTitleName: "title",
        collapsedIconName: "add-circle",
        expandedIconName: "remove-circle",
        checkboxBlankSource: "checkbox-blank-outline",
        checkboxIntermediateSource: "checkbox-intermediate",
        checkboxCheckedSource: "checkbox-marked-outline",
        checkboxTypeSource: "MaterialCommunityIcons",
        maxSelectAmount: -1,
        touchStyle: styles.touchStyle,
    }

    /**
     * This gets an item from the dataArray by using the passed
     * in index.  Where each index in the array is the item in the 
     * array nested under nestedVarName.
     * @param {Int[]} indicesArr An array of nested indices to an item 
     * @param {Bool} isSelected Bool flag if this item is currently selected.
     * If true, then it will also set all its parents isIntermediate = true;
     */
    getItemFromIndex = (indicesArr, isSelected) => {
        console.log(`NestedAccordianMultiPickerComponent.getItemFromIndex(): Trying to get item from index: ${indicesArr}`);
        let tmpObjArr = this.state.dataArray;
        let objChildren = null;
        let item = null;
        let curIndex;
        let name = "";
        // let cat = this.state.dataArray[2].name;
        // console.log(`NestedAccordianMultiPickerComponent.getItemFromIndex(): this.state.dataArray: ${Object.keys(this.state.dataArray)}`);

        for (let iIndices in indicesArr) {
            curIndex = indicesArr[iIndices];
            tmpObjArr = tmpObjArr[curIndex];

            if (tmpObjArr != null && tmpObjArr[this.state.nestedVarTitleName] != null) {
                name = tmpObjArr[this.state.nestedVarTitleName]
            }
            else {
                // Bullshit coding 
                if (tmpObjArr != null && tmpObjArr.name != null) {
                    name = tmpObjArr.name;
                }
                else if (tmpObjArr != null && tmpObjArr.title != null) {
                    name = tmpObjArr.title;
                }
                else {
                    name = "NULL"
                }
            }

            console.log(`NestedAccordianMultiPickerComponent.getItemFromIndex(): ITEM: Obj[${curIndex}]: ${name}`);

            // Get the next object in the array
            if (tmpObjArr != null) {

                objChildren = tmpObjArr[this.state.nestedVarName];

                // if (isSelected) {
                tmpObjArr.isIntermediate = isSelected;
                // }

                // There is another level to go into
                if (objChildren != null && objChildren.length > 0) {
                    console.log(`NestedAccordianMultiPickerComponent.getItemFromIndex(): cur Item: Obj[${curIndex}]: ${name}`);
                    // Set our tmp obj to the chilren for the next loop
                    tmpObjArr = objChildren;
                }
                // If there arent children, then this is a leaf
                else {
                    console.log(`NestedAccordianMultiPickerComponent.getItemFromIndex(): ITEM FOUND: Obj[${curIndex}]: ${name}`);
                    item = tmpObjArr;


                    // if (isSelected) {
                    //     item.isSelected = true;
                    //     item.isIntermediate = false;
                    // }
                    item.isSelected = isSelected;
                    item.isIntermediate = false;

                    // Break out of the loop once its found.
                    break;
                }
            }
            else {
                console.log(`NestedAccordianMultiPickerComponent.getItemFromIndex(): Obj[${curIndex}]: tmpObjArr == null`);

            }

        }
        // console.log(`NestedAccordianMultiPickerComponent.getItemFromIndex(): FOUND Item: ${name}`);
        return item;
    }

    /**
     *  Gets called whenever an item's checkbox has been selected   
    */
    onItemSelectedHandler = (item) => {
        if (item.isSelected == null) {
            item.isSelected = false;
        }

        item.isSelected = !item.isSelected;
        let parent = item.parent;
        console.log(`NestedAccordianMultiPickerComponent.onItemSelectedHandler(): Selected Item: ${item[this.state.nestedVarTitleName]} isSelected: ${item.isSelected} hasParent: ${parent != null}`);

        if (item.isSelected) {
            // Remove the first element if we are over the max select amount
            if (this.state.maxSelectAmount > 0 && this.state.selectedItems.length == this.state.maxSelectAmount) {
                console.log(`NestedAccordianMultiPickerComponent.onItemSelectedHandler(): ${item[this.state.nestedVarTitleName]} Exceeded MAX select amount of ${this.state.maxSelectAmount}.  Unselecting: ${this.state.selectedItems[0]}`);
                this.getItemFromIndex(this.state.selectedItems[0], false);
            }

            while (parent != null) {
                console.log(`NestedAccordianMultiPickerComponent.onItemSelectedHandler(): Setting Parent: ${parent[this.state.nestedVarTitleName]} isIntermediate = true`);
                parent.isIntermediate = true;
                parent = parent.parent;
            }
            this.state.selectedItems.push(item);

            this.setState({ selectedItems: this.state.selectedItems });
        }
        else {
            while (parent != null) {
                console.log(`NestedAccordianMultiPickerComponent.onItemSelectedHandler(): Setting Parent: ${parent[this.state.nestedVarTitleName]} isIntermediate = false`);
                parent.isIntermediate = false;
                parent = parent.parent;
            }
            let selectedItems = this.state.selectedItems.filter(itm => itm != item);


            // Must re render all the selected objects again, 
            // since removing one can remove a parent's intermediate 
            // if in the same tree
            selectedItems.forEach(item => {
                this.getItemFromIndex(item, true);
            });

            this.setState({ selectedItems: selectedItems });
        }

        this.setState({ lastSelected: item });
        if (this.props.onSelectionChanged != null) {
            this.props.onSelectionChanged(item, this.state.selectedItems);
        }
    }


    /**
     * Render
     */
    _renderHeader = (item, expanded) => {
        if (item != null) {
            // console.log(`NestedAccordianMultiPickerComponent._renderHeader(): ${item[this.state.nestedVarTitleName]} isSelected: ${item.isSelected}`)
            // console.log(`NestedAccordianMultiPickerComponent._renderHeader(): Item: ${JSON.stringify(item)}`)
            let iconSource = this.state.checkboxBlankSource;
            let checkBoxStyle = styles.checkBoxStyle;
            let headerTextStyle = mergeStyles(styles.headerTextStyle, this.props.headerTextStyle);
            if (item["checkBoxStyle"] != null) {
                checkBoxStyle = mergeStyles(checkBoxStyle, item["checkBoxStyle"]);
            }
            // Check for any properties in the item, in the data array itself
            if (item["headerTextStyle"] != null) {
                headerTextStyle = mergeStyles(headerTextStyle, item["headerTextStyle"]);
            }
            if (item.checkBoxStyle != null) {
                // console.log(`NestedAccordianMultiPickerComponent._renderHeader(): Item: ${item[this.state.nestedVarTitleName]} CheckBoxStyle: ${JSON.stringify(item.checkBoxStyle)}`)
                // checkBoxStyle = item.checkBoxStyle;
                // checkBoxStyle = mergeStyles(checkBoxStyle, item.checkBoxStyle);
            }


            if (item.isSelected == null) {
                item.isSelected = false;
            }

            if (item.isIntermediate == null) {
                item.isIntermediate = false;
            }

            if (item.isIntermediate) {
                iconSource = this.state.checkboxIntermediateSource;
                console.log(`NestedAccordianMultiPickerComponent._renderHeader(): ${item[this.state.nestedVarTitleName]} Setting INTERMEDIATE`)
            }
            else if (item.isSelected) {
                iconSource = this.state.checkboxCheckedSource;
                console.log(`NestedAccordianMultiPickerComponent._renderHeader(): ${item[this.state.nestedVarTitleName]} Setting CHECKED`)

            }

            // console.log(`NestedAccordianMultiPickerComponent._renderHeader(): ${item[this.state.nestedVarTitleName]} checkBoxStyle: ${JSON.stringify(checkBoxStyle)}`)

            return (
                <View style={styles.headerRowStyle}>
                    <Icon style={checkBoxStyle} type="MaterialCommunityIcons" name={iconSource} onPress={() => this.onItemSelectedHandler(item)} />
                    <Text style={headerTextStyle}>
                        {" "}{item[this.state.nestedVarTitleName]}
                    </Text>
                    {expanded
                        ? <Icon style={styles.headerIconStyle} name={this.state.expandedIconName} />
                        : <Icon style={styles.headerIconStyle} name={this.state.collapsedIconName} />}
                </View>
            );
        }
        else {
            console.log(`NestedAccordianMultiPickerComponent._renderHeader(): ERROR Item was NULL`)

        }
    }
    _renderContent = (item) => {

        console.log(`NestedAccordianMultiPickerComponent._renderContent(): Top ${item[this.state.nestedVarTitleName]}`);
        if (item != null && item[this.state.nestedVarName] != null) {
            let itemsChildren = item[this.state.nestedVarName];
            // let dataArr = itemsChildren;
            for (let iChild in itemsChildren) {
                let child = itemsChildren[iChild];
                child.parent = item;
                console.log(`NestedAccordianMultiPickerComponent._renderContent(): Child: ${child[this.state.nestedVarTitleName]} Parent: ${item[this.state.nestedVarTitleName]}`);
            }

            //
            if (this.props.nestedObjFormatCallback != null) {
                // dataArr = this.props.nestedObjFormatCallback(dataArr);
                // itemsChildren = this.props.nestedObjFormatCallback(item, itemsChildren);
                this.props.nestedObjFormatCallback(item, itemsChildren);

                // // Set the newly formatted array back to the dataArray's children.
                // item[this.state.nestedVarName] = itemsChildren;
            }
            console.log(`NestedAccordianMultiPickerComponent._renderContent(): Rendering Accordian for children of: ${item[this.state.nestedVarTitleName]}`);

            return (
                this.renderAccordian(itemsChildren)
                // this.renderAccordian(dataArr)
            )

        }
        else {
            console.log(`NestedAccordianMultiPickerComponent._renderContent(): ${item[this.state.nestedVarTitleName]}`);

            return (
                <Text
                    style={this.state.contentTextStyle}
                >
                    {item[this.state.nestedVarTitleName]} Should be leaf
                </Text>

            );
        }
    }

    render = () => {
        if (this.state.dataArray != null) {
            // this.printEntireDataArray(this.state.dataArray);
            // console.log(`NestedAccordianMultiPickerComponent.render(): Rendering this.state.dataArray: ${this.state.dataArray}`);


            return (
                // this.renderAccordian(this.state.dataArray)
                < SafeAreaView >
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ isShownPicker: !this.state.isShownPicker })
                        }}
                        style={[this.state.buttonColor, this.state.touchStyle]} // legenedary color backgroundColor: '#dadde3
                    >
                        <Text>{this.props.buttonLabel != null ? this.props.buttonLabel : "Picker"}</Text>
                    </TouchableOpacity>
                    {
                        this.state.isShownPicker ? this.renderAccordian(this.state.dataArray)

                            : null
                    }

                    {
                        (this.state.selectedItems || []).map((item: any, index) => {
                            return <Text key={index}>
                                {item.name}
                            </Text>
                        })
                    }
                    {this.props.displayAfter}
                </SafeAreaView >
            );

            // return (

            //     <ScrollView style={{ height: 300, width: "80%", paddingVertical: 5, nestedScrollEnabled: true, persistentScrollbar: true }}>
            //         {this.renderAccordian(this.state.dataArray)}
            //     </ScrollView>
            // );
            // return (
            //     <Container>
            //         <Header />
            //         <Content padder scroll style={{ backgroundColor: "white" }}>
            //             {this.renderAccordian(this.state.dataArray)}
            //         </Content>
            //     </Container>
            // );
        }
        else {
            console.log(`NestedAccordianMultiPickerComponent.render(): Rendering this.state.dataArray: NULL`);
            return null
        }
    }

    renderAccordian = (dataArr) => {
        console.log(`NestedAccordianMultiPickerComponent.renderAccordian(): dataArr: ${dataArr}`);
        this.printDataArray(dataArr);

        return (
            <View>
                <Accordion
                    style={{ persistentScrollbar: true, nestedScrollEnabled: true }}
                    dataArray={dataArr}
                    animation={true}
                    expanded={true}
                    renderHeader={this._renderHeader}
                    renderContent={this._renderContent}
                    contentStyle={{ persistentScrollbar: true, nestedScrollEnabled: true }}
                />

                {this.props.displayAfterExpanded}
            </View>
        )
    }


    printDataArray = (dataArr) => {
        let resultStr = "";
        for (let i in dataArr) {
            let item = dataArr[i];
            resultStr += `${item[this.state.nestedVarTitleName]}, `;
        }
        console.log(`NestedAccordianMultiPickerComponent.printDataArray(): Arr: ${resultStr}`);
    }


    printEntireDataArray = (dataArr) => {
        let resultStr = "";
        for (let i in dataArr) {
            let item = dataArr[i];
            this.printItemsSubArray(item);
        }
        console.log(`NestedAccordianMultiPickerComponent.printEntireDataArray(): Arr: ${resultStr}`);
    }

    printItemsSubArray = (item) => {
        if (item[this.state.nestedVarName] != null) { // && item[this.state.nestedVarName].length > 0) {
            let resultStr = `Item: ${item[this.state.nestedVarTitleName]} Sub Arr: `;
            for (let i in item[this.state.nestedVarName]) {
                let subItem = item[this.state.nestedVarName][i];
                this.printItemsSubArray(subItem);
                resultStr += `${subItem[this.state.nestedVarTitleName]}, `;
            }
            console.log(`NestedAccordianMultiPickerComponent.printItemsSubArray(): Arr: ${resultStr}`);

            for (let i in item[this.state.nestedVarName]) {
                let subItem = item[this.state.nestedVarName][i];
                this.printItemsSubArray(subItem);
            }
        }
        else {
            console.log(`NestedAccordianMultiPickerComponent.printItemsSubArray(): item: ${item[this.state.nestedVarTitleName]} has NO sub array`);

            console.log(`NestedAccordianMultiPickerComponent.printItemsSubArray(): item: ${Object.keys(item)} has NO sub array`);
        }
    }

}

const styles = StyleSheet.create({
    headerRowStyle: {
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#A9DAD6"
    },
    headerTextStyle: {
        fontWeight: "600"
    },
    headerIconStyle: {
        fontSize: 18

    },
    checkBoxStyle: {
        left: 0,
        fontSize: 30
    },
    contentTextStyle: {
        backgroundColor: "#e3f1f1",
        padding: 10,
        fontStyle: "italic",
    },
    touchStyle: {
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#dadde3'
    }
})

function mergeStyles(defaultStyle, newStyle?, selectedItemStyle?) {
    return Array.prototype.concat.apply([], arguments)
}

// const dataArray = [
//     {
//         title: "1.0", content: "1.0", name: "1.0", children:
//             [{
//                 name: "1.1", title: "1.1", children:
//                     [{
//                         name: "1.1.1", title: "1.1.1", children:
//                             [{
//                                 name: "1.1.1.1"
//                             }, {
//                                 name: "1.1.1.2"
//                             }]
//                     }, {
//                         name: "1.1.2", title: "1.1.2", children:
//                             [{
//                                 name: "1.1.2.1"
//                             }]
//                     }]
//             }, {
//                 name: "1.2", title: "1.2", children:
//                     [{
//                         name: "1.2.1", title: "1.2.1", children:
//                             [{
//                                 name: "1.2.1.1"
//                             }]
//                     }]
//             }]
//     },
//     {
//         title: "2.0", content: "2.0", name: "2.0", children:
//             [{
//                 name: "2.1", title: "2.1", children:
//                     [{
//                         name: "2.1.1", title: "2.1.1", children:
//                             [{
//                                 name: "2.1.1.1", title: "2.1.1.1"
//                             }]
//                     }]
//             }]
//     },

//     {
//         title: "3.0", content: "3.0", name: "3.0", children:
//             [{
//                 name: "3.1", title: "3.1", children:
//                     [{
//                         name: "3.1.1", title: "3.1.1", children:
//                             [{
//                                 name: "3.1.1.1", title: "3.1.1.1"
//                             }]
//                     }]

//             }]
//     }
// ];