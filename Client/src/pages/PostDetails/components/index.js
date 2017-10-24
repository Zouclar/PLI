import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Dimensions,
    Animated,
    Image,
    View,
    ScrollView,
    TouchableOpacity
} from 'react-native';

import APIWrapper from '../../../api/APIWrapper.js';
import AppConfig from '../../../config.js'

import styles from '../styles/details.js';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, InputGroup, Body, H1, H2, H3, Form, Item, Label, Input } from 'native-base'
class PostDetails extends Component {
    constructor(props){
        super(props);
        this.post = props.post;
        this.navigator = props.navigator;
        this.state = {
            style: {height: 200, width: 340, flex: 1}
        };
        this.comments = [];
    }

    getCommentsFromApiAsync() {
        console.log("get comments :");
        return APIWrapper.get('/comments/' + this.post.id + '/all', (responseJson) => {
            console.log("get comments : ", responseJson);
            this.comments = responseJson;
            this.forceUpdate();
            console.log('refreshed')
        },
            (error) => {
                console.error(error);
            }
        );
    }

    sendComment() {
        console.log("ALLER ON SEND : " + { comment: this.state.comment });
        APIWrapper.put('/comments/create/' + this.post.id, { comment: this.state.comment },
            (responseJson) => {
                console.log("C BON C SEND")
                this.getCommentsFromApiAsync();
                this.forceUpdate();
                console.log('refreshed')
            },
            (error) => {
                console.error("RATE LE SEND ", error);
                console.log("RATE LE SEND ", error);
            }
        );
    }

    likeThisPost(post) {
        console.log("ALLER ON LIKE : " + { comment: this.state.comment });
        APIWrapper.put('/posts/like/' + this.post.id, {},
            (responseJson) => {
                console.log("C BON C SEND")
                this.post.number_likes ++;
                this.forceUpdate();
                console.log('refreshed')
            },
            (error) => {
                console.error("RATE LE SEND ", error);
                console.log("RATE LE SEND ", error);
            }
        );
    }

    openPhotoZoomView(path) {
        this.navigator.push({
            screen: 'page.PhotoZoomView',
            title: 'Image',
            passProps: {path: path},
        });
    }

    openUserProfileView(user) {
        this.navigator.push({
            screen: 'page.UserProfileView',
            title: user.firstName,
            passProps: {user: user},
        });
    }

    openImage(path) {
        this.parent.openPhotoZoomView(path);
    }

    componentWillMount() {
        this.getCommentsFromApiAsync();
    }

    render() {
        console.log(AppConfig.get("AssetsBaseUrl") + "/" + this.post.picture.replace("/var/www/html/", ""))
        return ( <Container>
            <Content>
                <Card style={{flex: 0}}>
                    <TouchableOpacity onPress={() => {
                        this.openUserProfileView({id: 123, lastName: "Lasjunies", firstName: "Sylvain", username: "SLS", mail: "s@ls.fr", picture:"", cover:""})
                    }}>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{uri: 'https://s-media-cache-ak0.pinimg.com/originals/f1/5a/7d/f15a7da85cea390e793cf2bb05f2bc69.jpg'}} />
                            <Body>
                            <Text>{this.post.title}</Text>
                            <Text note>Par John Doe</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    </TouchableOpacity>
                    <CardItem>
                        <Body>
                        <TouchableOpacity style={{height: 200, width: 340, flex: 1}} onPress={() => {
                            this.openPhotoZoomView(AppConfig.get("AssetsBaseUrl") + "/" + this.post.picture.replace("/var/www/html/", ""))
                        }}>
                        <Image source={{uri: AppConfig.get("AssetsBaseUrl") + "/" + this.post.picture.replace("/var/www/html/", "")}} style={{height: 200, width: 340, flex: 1}}/>
                        </TouchableOpacity>
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
                            <Button transparent onPress={() => {this.likeThisPost()}}>
                                <Icon active name="thumbs-up" />
                                <Text>{this.post.number_like} Likes</Text>
                            </Button>
                        </Left>
                        <Body>
                        <Button transparent>
                            <Icon active name="chatbubbles" />
                            <Text>{this.comments.length} Comments</Text>
                        </Button>
                        </Body>
                        <Right>
                            <Text>10 minutes</Text>
                        </Right>
                    </CardItem>
                </Card>


                {this.comments.map(comment => (
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
                                    {comment.comment}
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
                ))}

                <View style={{flex: 1}}>
                    <Form>
                        <Item floatingLabel>
                            <Label>Exprimez-vous !</Label>
                            <Input onChangeText={(text) => this.setState({comment: text})}/>
                        </Item>
                        <Button onPress={ () => {this.sendComment()} } style={{margin: 10}}  block>
                            <Text>Commenter</Text>
                        </Button>
                    </Form>
                </View>
            </Content>
        </Container>);
    }
}

AppRegistry.registerComponent('PostDetails', () => PostDetails);
module.exports = PostDetails;
