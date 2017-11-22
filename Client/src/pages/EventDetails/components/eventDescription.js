/**
 * Created by Florian on 21/11/2017.
 */
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

class EventDescription extends Component {
    constructor(props) {
        props.event = {
            id: 2,
            title: 'efrget',
            coordinates: {
            x: 456,
                y: 123
        },
            description: 'dfghjkhgfddfghj',
            date_pub: '2017-11-19T23:00:00.000Z',
            dateStart: '0000-00-00',
            dateEnd: '0000-00-00',
            picture: '/var/www/html/upload_10a4544787b00f3357a04b433158081a',
            countLikes: 0,
            countParticipate: 0,
            countComments: 0,
            users: [
            {
                id: 1,
                name: 'sylvain',
                lastname: 'lasjunies',
                surname: 'megasyl',
                mail: 'sylvai@lasjunies.fr',
                password: 'abcdef',
                link_photo: 'https://i.pinimg.com/736x/dd/45/96/dd4596b601062eb491ea9bb8e3a78062--two-faces-baby-faces.jpg'
            }
        ]
        };
        super(props);
    }

    openPrivateChatView () {
        console.log("TARGET USER !!!");
        console.log(this.props.event);
        this.props.navigator.push({
            screen: 'page.PrivateChat',
            title: `${this.props.event.title}`,
            passProps: {target: this.props.event.id},
        });
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
                        <Thumbnail large style={styles.thumbnail} source={{uri: 'https://s-media-cache-ak0.pinimg.com/originals/f1/5a/7d/f15a7da85cea390e793cf2bb05f2bc69.jpg'}} />
                        <Text style={styles.name}>{this.props.event.title}</Text>
                        <Button transparent style={styles.friendAddButton}>
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
                            <CardItem>
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
                    <View style={{marginTop: 300}}><Text>Réseaux sociaux</Text></View>
                </Content>
            </Container>
        );
    }
}

AppRegistry.registerComponent('EventDescription', () => EventDescription);
module.exports = EventDescription;
