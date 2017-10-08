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
import { View, Thumbnail, Icon, Button, Card, CardItem, Right, Left, Body, DeckSwiper, Container, Content } from 'native-base';
import styles from '../styles/details.js';
import AppConfig from '../../../config.js'

const cards = [
    {
        coordinate: {
            x: 2,
            y: 48
        },
        date_pub: "2017-09-20T22:00:00.000Z",
        description: "Description de dingue",
        id: 1,
        number_dislike:0,
        number_like:0,
        picture:"/var/www/html/upload_8d392b800545bfd94c2cc65d62f6978c",
        title:"Premier test"
    },
    {
        coordinate: {
            x: 2,
            y: 48
        },
        date_pub: "2017-09-20T22:00:00.000Z",
        description: "Descriprvrue",
        id: 1,
        number_dislike:0,
        number_like:0,
        picture:"/var/www/html/upload_8d392b800545bfd94c2cc65d62f6978c",
        title:"AUTRE test"
    }
]

class UserProfile extends Component {
    constructor(props) {
        super(props);
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
                    <Text style={styles.name}>{this.props.user.firstName} {this.props.user.lastName}</Text>
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



                <View>
                    <View><Text>Posts récents</Text></View>
                    <DeckSwiper
                        dataSource={cards}
                        renderItem={item =>
                            <Card>
                                <CardItem>
                                    <Left>
                                        <Text>{item.title}</Text>
                                    </Left>
                                </CardItem>
                                <CardItem cardBody>
                                    <Image style={{ height: Dimensions.get('window').height * 0.3, flex: 1 }} source={this.test(item)} />
                                </CardItem>
                                <CardItem>
                                    <Text>{item.description}</Text>
                                </CardItem>
                            </Card>
                        }
                    />
                </View>

                    <View style={{marginTop: 300}}><Text>Réseaux sociaux</Text></View>
                </Content>
            </Container>

        );
    }

}

AppRegistry.registerComponent('UserProfile', () => UserProfile);
module.exports = UserProfile;
