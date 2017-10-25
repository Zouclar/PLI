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
import APIWrapper from '../../../api/APIWrapper'

class ProfileTab extends Component {
    constructor(props) {
        super(props);
        this.user = {

        }

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
                                    <Text style={styles.name}>{this.props.user.name} {this.props.user.lastname}</Text>
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
                                        <CardItem >
                                            <Icon active name="chatbubbles" />
                                            <Text>23 Posts</Text>
                                        </CardItem>
                                        </Body>
                                        <Right>
                                            <Button transparent>
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

AppRegistry.registerComponent('ProfileTab', () => ProfileTab);
module.exports = ProfileTab;
