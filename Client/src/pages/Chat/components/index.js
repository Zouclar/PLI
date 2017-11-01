/**
 * Created by Florian on 08/10/2017.
 */
import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Fab, Button, Text, H1, View } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';
import SocketIOClient from 'socket.io-client';
import AppConfig from './config.js'
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
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }

    constructor(props) {
        super(props);
        this.socket = SocketIOClient(`${AppConfig.get("AssetsBaseUrl")}:6969`);
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