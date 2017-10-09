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
import { View, Card, CardItem, Left, DeckSwiper, Container, Content, Fab, Icon, Thumbnail, Body} from 'native-base';
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
];

class RecentPostsTab extends Component {
    constructor(props) {
        super(props);
    }

    test(item) {
        return {uri: '${AppConfig.get("AssetsBaseUrl")}${this.post.picture.replace("/var/www/html/", "")}'}
    }

    render() {
        console.log(AppConfig.get("AssetsBaseUrl") + "/" + cards[0].picture.replace("/var/www/html/", ""))
        return (
            <Container>
                <Content>
                    <View>
                        <DeckSwiper
                            ref={(c) => this._deckSwiper = c}
                            dataSource={cards}
                            renderEmpty={() =>
                                <View style={{ alignSelf: "center" }}>
                                    <Text>Over</Text>
                                </View>
                            }
                            renderItem={item =>
                                <Card style={{ elevation: 3 }}>
                                    <CardItem>
                                        <Left>
                                            <Body>
                                            <Text>{item.title}</Text>
                                            <Text note>date ...</Text>
                                            </Body>
                                        </Left>
                                    </CardItem>
                                    <CardItem cardBody>
                                        <Image style={{ height: 300, flex: 1 }} source={{uri: AppConfig.get("AssetsBaseUrl") + "/" + item.picture.replace("/var/www/html/", "")}} />
                                    </CardItem>
                                    <CardItem>
                                        <Icon name="heart" style={{ color: '#ED4A6A' }} />
                                        <Text>{item.description}</Text>
                                    </CardItem>
                                </Card>
                            }
                        />
                    </View>
                </Content>
            </Container>
        );
    }

}

AppRegistry.registerComponent('UserProfile', () => RecentPostsTab);
module.exports = RecentPostsTab;
