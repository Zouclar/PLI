import React from 'react';
import { View, Text, AsyncStorage, Container, AppRegistry } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import AppConfig from '../../../config'


const USER_ID = 'userId';

export default class GeneralChat extends React.Component {

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
        this.socket.on('chat message', this.onReceivedMessage);
        this.determineUser();

        this.props.navigator.setDrawerEnabled({
            side: 'right',
            enabled: true
        });
    }

    componentWillUnmount() {
        this.props.navigator.setDrawerEnabled({
            side: 'right',
            enabled: false,
        });
    }

    determineUser() {
        AsyncStorage.getItem(USER_ID)
            .then((userId) => {
                userId = parseInt(userId);
                    console.log("fetching user_id", userId)
                    this.socket.emit('userJoined', userId);
                    this.setState({ userId });
            })
            .catch((e) => alert(e));
    }


    onReceivedMessage(messages) {
        console.log(messages)
        this._storeMessages(messages);
    }

    onSend(messages=[]) {
        console.log("sending")
        this.socket.emit('chat message', messages[0]);
        this._storeMessages(messages);
    }

    displayName(props) {

    }

    renderBubble(props) {
        console.log("rendering bubble !!!")
        console.log(props)

        let name= '';

        if (props.currentMessage.user)  {
            console.log("not a server message")
            console.log(props.currentMessage.user._id)
            console.log(AppConfig.get("ID"))

            if ( props.currentMessage.user._id != AppConfig.get("ID"))
                name = props.currentMessage.user.name
        }


        return (

            <View>
                <Text >{name}</Text>
                <Bubble
                {...props}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#f0f0f0',
                    }
                }}
            /></View>
    );
    }

    onLoadEarlier() {
        let isLoading = true;
        this.setState({ isLoading });
    }

    render() {
        var user = { _id: this.state.userId || -1,
            name: 'React Native',
            avatar: 'https://i.pinimg.com/736x/dd/45/96/dd4596b601062eb491ea9bb8e3a78062--two-faces-baby-faces.jpg',
        };
        let trueVal = true;

        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={this.onSend}
                user={user}
                renderBubble={this.renderBubble}
                loadEarlier={trueVal}
                onLoadEarlier={this.onLoadEarlier}
                isLoadingEarlier={this.isLoading}
            />
        );
    }

    toggleDrawer = () => {
        console.log("TOGGLE DRAWER")
        this.props.navigator.toggleDrawer({
            side: 'left',
            animated: true
        });
    };

    // Helper functions
    _storeMessages(messages) {
        this.setState((previousState) => {
            return {
                messages: GiftedChat.append(previousState.messages, messages),
            };
        });
    }
}

AppRegistry.registerComponent('page.Chat', () => GeneralChat);
module.exports = GeneralChat;