/**
 * Created by Florian on 08/10/2017.
 */
import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Fab, Button, Text, H1, View } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';
const SocketIOClient = require('socket.io-client');
import AppConfig from '../../../config'
import Icon from 'react-native-vector-icons/MaterialIcons'


import {
    AppRegistry,
} from 'react-native'
import styles from '../styles/chat.js';

export default class Chat extends Component {

    state = {
        messages: [],
    };

    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hello developer',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'React Native',
                        avatar: 'https://facebook.github.io/react/img/logo_og.png',
                    },
                },
            ],
        });
    }


    onSend(messages = []) {
        console.log(messages)
        let user_id = AppConfig.get("ID");

        for (message in messages) {
            message.user._id = user_id;
            this.socket.emit('chat message', message);
        }
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }

    constructor(props) {
        super(props);
        console.log(`${AppConfig.get("ChatBaseUrl")}`)
        //this.socket = SocketIOClient(`${AppConfig.get("ChatBaseUrl")}`);
        this.socket = SocketIOClient("http://server.lasjunies.fr:2222", {
            transports: ['websocket']
        });
        this.socket.on('connect_error', function(err) {
            console.log('Connection failed', err);
        });

        console.log(this.socket)
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={(messages) => this.onSend(messages)}
                user={{
                    _id: 1,
                }}
            />
        );
    }
}


AppRegistry.registerComponent('Chat', () => Chat);
module.exports = Chat;