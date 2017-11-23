import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    Text,
    AppRegistry
} from 'react-native';
import { View, Thumbnail, Icon, Button, Card, CardItem, Right, Left, Body, DeckSwiper, Container, Content} from 'native-base';
import styles from '../styles/details.js';
import { Navigation } from 'react-native-navigation';
import APIWrapper from '../../../api/APIWrapper'

class ProfileTab extends Component {
    constructor(props) {
        super(props);
        this.user = {

        }

    }

    openPrivateChatView () {
        console.log("TARGET USER !!!")
        console.log(this.props.user)
        this.props.navigator.push({
            screen: 'page.PrivateChat',
            title: `${this.props.user.name} ${this.props.user.lastname}`,
            passProps: {target: this.props.user.id},
        });
    }

    askFriend() {
        APIWrapper.put('/users/friends/ask/' + this.props.user.id, {},
            (responseJson) => {
                console.log("C BON C SEND")
                this.parent.openSuccessNotification("Succès", "Votre demande a été transmise")
                this.forceUpdate();
                console.log('refreshed')
            },
            (error) => {
                this.parent.openErrorNotification("Erreur", "Une erreur est survenue !");
                console.error("RATE LE SEND ", error);
                console.log("RATE LE SEND ", error);
            }
        );

    }



    test(item) {
        return {uri: '${AppConfig.get("AssetsBaseUrl")}${this.post.picture.replace("/var/www/html/", "")}'}
    }

    render() {
        return (
                        <Container>
                            <Content>
                                <View style={styles.head}>
                                    <Image style={styles.cover} source={{uri: 'https://www.newsweed.fr/wp-content/uploads/2016/08/skate-750x400.jpg'}} />
                                    <Thumbnail large style={styles.thumbnail} source={{uri: this.props.user.link_photo}} />
                                    <Text style={styles.name}>{this.props.user.name} {this.props.user.lastname}</Text>
                                    <Button onPress={() => {
                                        this.askFriend();
                                    }} transparent style={styles.friendAddButton}>
                                        <Icon active name="add" />
                                        <Text>Ajouter en ami</Text>
                                    </Button>
                                    <CardItem>
                                        <Left>
                                            <CardItem >
                                                <Icon active name="people" />
                                                <Text>75 Amis</Text>
                                            </CardItem>
                                        </Left>
                                        <Body>
                                        <CardItem >
                                            <Icon active name="chatbubbles" />
                                            <Text>23 Posts</Text>
                                        </CardItem>
                                        </Body>
                                        <Right>
                                            <Button onPress={() => this.openPrivateChatView()} transparent>
                                                <Icon active name="chatbubbles" />
                                                <Text>Discuter</Text>
                                            </Button>
                                        </Right>
                                    </CardItem>
                                </View>
                            </Content>
                        </Container>
        );
    }
}

AppRegistry.registerComponent('ProfileTab', () => ProfileTab);
module.exports = ProfileTab;
