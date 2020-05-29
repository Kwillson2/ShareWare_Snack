import * as React from 'react';
import {
    Button,
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    createAppContainer,
    Header,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { MonoText } from '../components/StyledText';
import Amplify, { API, graphqlOperation } from "aws-amplify"
import config from "../aws-exports"
import { createTodo, createScannedCode } from "../src/graphql/mutations"
import { listTodos, listScannedCodes } from "../src/graphql/queries"
import * as QrCodeStorageManager from "../storage/QrCodeStorageManager"

Amplify.configure(config)
var __DEV__ = true;

export default class UserProfileScreen extends React.Component {

    state = {
        name: "",
        todos: [],
        scannedCodes: [],
    }
    async componentDidMount() {
        try {
            const todos = await API.graphql(graphqlOperation(listTodos))
            console.log("todos: ", todos)
            this.setState({ todos: todos.data.listTodos.items })

            const scannedCodes = await API.graphql(graphqlOperation(listScannedCodes))
            console.log("ScannedCodes: ", scannedCodes)
            this.setState({ scannedCodes: scannedCodes.data.listScannedCodes.items })
        } catch (err) {
            console.log("error: ", err)
        }
    }

    onChangeText = (key, val) => {

        this.setState({ [key]: val })
    }

    addTodo = () => { }

    addNote = async event => {
        console.log(`UserProfileScreen.addNote(): Event: ${Object.keys(event)}`);

        const { name, todos } = this.state

        event.preventDefault()

        const input = {
            name
        }

        const result = await API.graphql(graphqlOperation(createTodo, { input }))

        const newTodo = result.data.createTodo
        const updatedTodo = [newTodo, ...todos]
        this.setState({ todos: updatedTodo, name: "" })
    }

    AddNoteViaManager = async event => {
        console.log(`UserProfileScreen.AddNoteViaManager(): Event: ${Object.keys(event)}`);

        // event.preventDefault();
        // QrCodeStorageManager.StoreQrCodeInCloud

    }

    addCode = async event => {

        try {
            console.log(`UserProfileScreen.StoreQrCodeInCloud.addCode(): Scanned Code top: Event: ${Object.keys(event)}`);
            event.preventDefault()
            console.log(`UserProfileScreen.StoreQrCodeInCloud.addCode(): 1`);

            data = "testSetData_1";
            type = 501;
            category = "TEST_1";
            code = "testSetData_1"
            console.log(`UserProfileScreen.StoreQrCodeInCloud.addCode(): Data: ${data} Code: ${code}`);
            const input = {
                code,
                data,
                type,
                category,
            }
            console.log(`UserProfileScreen.StoreQrCodeInCloud.addCode(): 2`);

            const result = QrCodeStorageManager.StoreQrCode(code, input, event);
            // const result = await API.graphql(graphqlOperation(createScannedCode, { input }))

            console.log(`UserProfileScreen.StoreQrCodeInCloud.addCode(): 3`);

            const newScannedCode = result.data.createScannedCode;
            const updatedTodo = [newScannedCode, ...scannedCodes]
            // this.setState({ todos: updatedTodo, name: "" })

            // console.log(`UserProfileScreen.StoreQrCodeInCloud.addCode(): Scanned Code: ${newScannedCode}`);
        } catch (e) {
            // saving error
            console.log(`UserProfileScreen.StoreQrCodeInCloud.addCode(): ERROR:  ${e.message}`);
        }
    }

    render() {
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.flexTest1}>
                        <Text style={styles.titleText}>
                            PROFILE
                        </Text>
                    </View>
                    <View style={styles.flexTest2}>
                        <TextInput
                            style={styles.input}
                            value={this.state.name}
                            onChangeText={val => this.onChangeText("name", val)}
                            placeholder='Add a Todo'
                        />
                        <TouchableOpacity onPress={this.addCode} style={styles.buttonContainer}>
                            <Text style={styles.buttonText}>Add +</Text>
                        </TouchableOpacity>
                        {this.state.todos.map((todo, index) => (
                            <View key={index} style={styles.todo}>
                                <Text style={styles.name}>{todo.name}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.flexTest3}>
                        {this.state.scannedCodes.map((scannedCode, index) => (
                            <View key={index} style={styles.todo}>
                                <Text style={styles.name}>{scannedCode.code}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </>
        );
    }
}

// UserProfileScreen.navigationOptions = {
//     header: null,
//   };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    flexTest1: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'blue',
        alignItems: 'center',
    },
    flexTest2: {
        flexDirection: 'row',
        flex: 2,
        backgroundColor: 'red',
    },
    flexTest3: {
        flexDirection: 'row',
        flex: 3,
        backgroundColor: '#00ccff',
    },
    titleText: {
        flex: 1,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 20,
        lineHeight: 19,
        textAlign: 'center',
        marginTop: '15%',
    },
    input: {
        height: 50,
        borderBottomWidth: 2,
        borderBottomColor: "blue",
        marginVertical: 10
    },
    buttonContainer: {
        backgroundColor: "#34495e",
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        alignItems: "center"
    },
    buttonText: {
        color: "#fff",
        fontSize: 24
    },
    todo: {
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        paddingVertical: 10
    },
    name: { fontSize: 16 },
});