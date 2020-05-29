import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import * as FirebaseManager from '../storage/FirebaseManager';


export default class ChatScreen extends React.Component {

    constructor(props) {
        super(props);
    }
    static navigationOptions = ({ navigation }) => ({
        title: (navigation.state.params || {}).name || 'Scv Chat!',
    });

    state = {
        messages: [],
    };

    get user() {
        return {
            name: FirebaseManager.GetCurUser().name,
            email: FirebaseManager.GetCurUser().email,
            avatar: FirebaseManager.GetCurUser().photoUrl,
            _id: FirebaseManager.GetCurUser().UID,
        };
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={FirebaseManager.Send}
                user={this.user}
            />
        );
    }

    componentDidMount() {
        FirebaseManager.refOn(message =>
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),
            }))
        );
    }
    componentWillUnmount() {
        FirebaseManager.refOff();
    }
}