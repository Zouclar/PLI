import React from 'react';
import { View, Text, AsyncStorage, Container, AppRegistry } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import AppConfig from '../../../config'


const USER_ID = 'userId';

export default class PrivateChat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            userId: null,
            isLoading: false
        };

        this.determineUser = this.determineUser.bind(this);
        this.onReceivedMessage = this.onReceivedMessage.bind(this);
        this.onSend = this.onSend.bind(this);
        this._storeMessages = this._storeMessages.bind(this);
        this.onLoadEarlier = this.onLoadEarlier.bind(this);

        this.socket = SocketIOClient('http://server.lasjunies.fr:2222',
            {
                transports: ['websocket']
            }
        );

        this.socket.emit('join', {id: this.props.target});
        this.socket.on('private message', this.onReceivedMessage);
        console.log("target")
        console.log(this.props.target)
        this.determineUser();
    }


    determineUser(callback) {
        AsyncStorage.getItem(USER_ID)
            .then((userId) => {
                userId = parseInt(userId);
                    console.log("fetching user_id", userId)
                    this.setState({ userId });
            })
            .catch((e) => alert(e));
    }


    onReceivedMessage(messages) {
        console.log("PRIVATE MESSAGE RECIEVED")
        console.log(messages);
        this._storeMessages(messages);
    }

    onSend(messages=[]) {
        console.log("sending");
        this.socket.emit('private message', messages[0]);
        this._storeMessages(messages);
    }

    onLoadEarlier() {
        let isLoading = true;
        this.setState({ isLoading });
    }

    render() {
        var user = { _id: this.state.userId || -1,
            name: 'React Native',
            avatar: 'https://i.pinimg.com/736x/dd/45/96/dd4596b601062eb491ea9bb8e3a78062--two-faces-baby-faces.jpg',
            target: this.props.target
        };
        let trueVal = true;

        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
                user={user}
                loadEarlier={trueVal}
                onLoadEarlier={this.onLoadEarlier}
                isLoadingEarlier={this.isLoading}
                renderAvatar={null}
            />
        );
    }

    _storeMessages(messages) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages),
            };
        });
    }
}

AppRegistry.registerComponent('page.PrivateChat', () => PrivateChat);
module.exports = PrivateChat;