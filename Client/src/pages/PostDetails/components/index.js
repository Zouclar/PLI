import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Dimensions,
    Animated,
    Image,
    View,
    ScrollView
} from 'react-native';

import styles from '../styles/details.js';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, InputGroup, Body, H1, H2, H3, Form, Item, Label, Input } from 'native-base'
class PostDetails extends Component {
    constructor(props){
        super(props);
        this.post = props.post;
    }



    componentWillMount() {}
    render() {
        return ( <Container>
            <Content>
                <Card style={{flex: 0}}>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{uri: 'https://s-media-cache-ak0.pinimg.com/originals/f1/5a/7d/f15a7da85cea390e793cf2bb05f2bc69.jpg'}} />
                            <Body>
                            <Text>{this.post.title}</Text>
                            <Text note>Par John Doe</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Body>
                        <Image source={{uri: this.post.image}} style={{height: 200, width: 340, flex: 1}}/>
                        <CardItem>
                            <H3>Description</H3>
                        </CardItem>
                        <Text>
                            {this.post.description}
                        </Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Button transparent>
                                <Icon active name="thumbs-up" />
                                <Text>12 Likes</Text>
                            </Button>
                        </Left>
                        <Body>
                        <Button transparent>
                            <Icon active name="chatbubbles" />
                            <Text>Comments</Text>
                        </Button>
                        </Body>
                        <Right>
                            <Text>10 minutes</Text>
                        </Right>
                    </CardItem>
                </Card>



                <Text style={styles.titleComment}>Commentaires : </Text>
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{uri: 'https://s-media-cache-ak0.pinimg.com/originals/f1/5a/7d/f15a7da85cea390e793cf2bb05f2bc69.jpg'}} />
                            <Body>
                            <Text>Jean-Jacques Bernard</Text>
                            <Text note>dit</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Body>
                            <Text>
                                Gros grave stylé la photo, t'as pris avec quel appareil ? moi aussi j'm'entraine à prendre d photo :))
                            </Text>
                            </Body>
                        </Left>
                        <Right>
                            <Body>
                            <Icon active name="thumbs-up" />
                            </Body>
                        </Right>
                    </CardItem>
                </Card>


                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{uri: 'https://s-media-cache-ak0.pinimg.com/originals/f1/5a/7d/f15a7da85cea390e793cf2bb05f2bc69.jpg'}} />
                            <Body>
                            <Text>Patrick Sweyz</Text>
                            <Text note>dit</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Left>
                            <Body>
                            <Text>
                                La photo est naze ...
                            </Text>
                            </Body>
                        </Left>
                        <Right>
                            <Body>
                            <Icon active name="thumbs-down" />
                            </Body>
                        </Right>
                    </CardItem>
                </Card>

                <View style={{flex: 1}}>
                    <Form>
                        <Item floatingLabel>
                            <Label>Exprimez-vous !</Label>
                            <Input />
                        </Item>
                        <Button style={{margin: 10}}  block>
                            <Text>Commenter</Text>
                        </Button>
                    </Form>
                </View>
            </Content>
        </Container>);
    }
}

//AppRegistry.registerComponent('PostDetails', () => PostDetails);
module.exports = PostDetails;
