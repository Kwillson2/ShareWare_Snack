import { AccordionList } from "accordion-collapse-react-native";
import { Separator, Accordion } from 'native-base';
import { View, Text } from 'react-native';
import React, { Component } from 'react';
// import TitleInfoCard from '../cards/TitleInfoCard';
// import CodeBodyCard from '../cards/CodeBodyCard';

export default class AccordianListComponent extends Component {
    constructor(props) {
        // console.log(`AccordianListComponent.constructor(): TOP props: ${props}`);
        super(props);
        let didSetValidList = false;
        let dictVals = null;

        this.state = {
            dict: props.dict,
            list: props.list,
            head: props.head,
            body: props.body,
            headRender: props.headRender,
            bodyRender: props.bodyRender,
        }



        if (props.list != null) {
            // console.log(`AccordianListComponent.constructor(): Num in List: ${props.list}`);

            this.state = {
                list: props.list,
            }
            didSetValidList = true;
        }
        else {
            // console.log(`AccordianListComponent.constructor(): props.list = null`);

        }
        if (props.dict != null) {
            dictVals = Object.values(props.dict);
            // console.log(`AccordianListComponent.constructor(): Num Dict.Values: ${dictVals.length}`);

            this.state = {
                dict: props.dict,
                list: dictVals,
            }
            // console.log(`AccordianListComponent.constructor(): Num in List: ${this.state.list.length}`);
            didSetValidList = true;
        }
        else {
            // console.log(`AccordianListComponent.constructor(): props.dict = null`);

        }
        if (props.head != null) {
            // console.log(`AccordianListComponent.constructor(): Head object was found to use`);
            this.state = {
                head: props.head,
            }
        }
        if (props.body != null) {
            // console.log(`AccordianListComponent.constructor(): Body object was found to use`);
            this.state = {
                body: props.body,
            }
        }

        if (dictVals == null && !didSetValidList) {
            // console.log(`AccordianListComponent.constructor(): List was null, using default example`);
            this.state = {
                list: [
                    {
                        title: 'Getting Started',
                        body: 'React native Accordion/Collapse component, very good to use in toggles & show/hide content'
                    },
                    {
                        title: 'Components',
                        body: 'AccordionList,Collapse,CollapseHeader & CollapseBody'
                    }
                ],
            }
        }
    }

    state = {
        list: null,
        dict: null,
        head: null,
        body: null,

    }

    _head = (item) => {
        // console.log(`AccordianListComponent._head():  Rendering the head`);
        if (this.props.headRender != null) {
            return (
                this.props.headRender(item)
            );
        }
        else if (this.props.head != null) {
            // console.log(`AccordianListComponent._head():  Attempting to return the HEAD of item: ${item.code}`);
            return (
                this.props.head
                // <TitleInfoCard qr={item} />
            );
        }
        else {
            // console.log(`AccordianListComponent._head():  Head == null, using default display`);
            return (
                <View style={{ padding: 10 }}>
                    {/* <TitleInfoCard qr={item} /> */}
                    <Text style={{ textAlign: 'center' }}>Empty Header</Text>
                </View>
            );

        }
    }

    _body = (item) => {
        // console.log(`AccordianListComponent._body():  Rendering the body`);

        if (this.props.bodyRender != null) {
            return (
                this.props.bodyRender(item)
            );
        }
        else if (this.props.body != null) {
            // console.log(`AccordianListComponent._body(): Attempting to return the body of item: ${item.ToString()}`);
            return (
                this.props.body({ value: item })
                // <CodeBodyCard qr={item} />
            );
        }
        else {
            // console.log(`AccordianListComponent._body():  Body == null, using default display`);
            return (
                <View style={{ padding: 10 }}>
                    <Text style={{ textAlign: 'center' }}>Empty Body</Text>
                </View>
            );

        }
    }

    render() {
        let list = this.props.list;
        if (list == null) {
            list = Object.values(this.props.dict);
        }


        return (
            <Accordion
                style={{ persistentScrollbar: true, nestedScrollEnabled: true }}
                dataArray={list}
                animation={true}
                renderHeader={this._head}
                renderContent={this._body}
                contentStyle={{ persistentScrollbar: true }}
            />

        )

        return (
            <AccordionList
                list={list}
                header={this._head}
                body={this._body}
            />
        );
    }
}