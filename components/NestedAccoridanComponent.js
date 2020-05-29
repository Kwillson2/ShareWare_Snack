import React, { Component } from "react";
import { Container, Header, Content, Icon, Accordion, Text, View } from "native-base";
import { StyleSheet } from 'react-native'



/**
 * 
 * 
 * @param nestedVarName The name of the variable that will 
 * result in a new nested accoridian.  This allows dynamic 
 * object passing, while still nesting on the correct variable.
 * Ex: "children", where an object with the property 'children'
 * would contain all the children objects OF THE SAME TYPE. 
 * Default: "children"
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
 * 
 */
export default class NestedAccordianComponent extends Component {
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
        console.log(`NestedAccordianComponent.constructor(): `)
    }

    state = {
        dataArray: null,
        ogArray: null,
        nestedVarName: "children",
        collapsedIconName: "add-circle",
        expandedIconName: "remove-circle",
    }


    _renderHeader = (item, expanded) => {
        if (item != null) {
            // console.log(`NestedAccordianComponent._renderHeader(): Item: ${JSON.stringify(item)}`)
            let headerTextStyle = mergeStyles(styles.headerTextStyle, this.props.headerTextStyle);

            // Check for any properties in the item, in the data array itself
            if (item["headerTextStyle"] != null) {
                headerTextStyle = mergeStyles(headerTextStyle, item["headerTextStyle"]);
            }

            return (
                <View style={styles.headerRowStyle}>
                    <Text style={headerTextStyle}>
                        {" "}{item.title}
                    </Text>
                    {expanded
                        ? <Icon style={styles.headerIconStyle} name={this.state.expandedIconName} />
                        : <Icon style={styles.headerIconStyle} name={this.state.collapsedIconName} />}
                </View>
            );
        }
        else {
            console.log(`NestedAccordianComponent._renderHeader(): ERROR Item was NULL`)

        }
    }

    /**
     * Renders the content section of the Accordian
     */
    _renderContent = (item) => {

        console.log(`NestedAccordianComponent._renderContent(): Top`);
        if (item != null && item[this.state.nestedVarName] != null) {
            let itemsChildren = item[this.state.nestedVarName];

            return (
                this.renderAccordian(itemsChildren)
            )

        }
        else {

            return (
                <Text
                    style={this.state.contentTextStyle}
                >
                    {item.title} Should be leaf
                </Text>

            );
        }
    }

    render = () => {
        if (this.state.dataArray != null) {
            console.log(`NestedAccordianComponent.render(): Rendering this.state.dataArray: ${JSON.stringify(this.state.dataArray)}`);
            return (
                <Container>
                    <Header />
                    <Content padder style={{ backgroundColor: "white" }}>
                        {this.renderAccordian(this.state.dataArray)}
                    </Content>
                </Container>
            );
        }
        else {
            console.log(`NestedAccordianComponent.render(): Rendering this.state.dataArray: NULL`);
            return null
        }
    }

    renderAccordian = (dataArr) => {
        console.log(`NestedAccordianComponent.renderAccordian(): dataArr: ${JSON.stringify(dataArr)}`);
        return (
            <Accordion
                dataArray={dataArr}
                animation={true}
                expanded={true}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
            />

        )
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
    contentTextStyle: {
        backgroundColor: "#e3f1f1",
        padding: 10,
        fontStyle: "italic",
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