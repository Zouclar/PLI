import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    Text,
    ListView,
    AppRegistry
} from 'react-native';
import { View, Thumbnail, Icon, Button, Card, CardItem, Right, Left, Body, DeckSwiper, Container, Content, H1, Header, List, Separator, ListItem } from 'native-base';
import styles from '../styles/details.js';
import APIWrapper from '../../../api/APIWrapper'

const datas = [
    'Simon Mignolet',
    'Nathaniel Clyne',
];

const datas_bis = [
    'Dejan Lovren',
    'Mama Sakho',
    'Alberto Moreno',
]

export default class FriendsTab extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            basic: true,
            listViewData: this.props.user.friends_waiting,
            listViewDataBis: this.props.user.friends,
        };
    }

    deleteRow(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        this.setState({ listViewData: newData });
    }

    acceptFriend(id) {
            APIWrapper.put('/users/friends/accept/' + id,
            (responseJson) => {
                console.log("C BON C SEND")
                this.parent.openSuccessNotification("Succès", "Vous avez un nouvel ami !")
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

    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return (
            <Container>
                <Content>
                    {this.state.listViewData &&
                    <View style={{margin: 5}}><Text style={{textAlign: "center"}}>Demandes d'amis</Text></View>}

                    {this.state.listViewData &&
                    <List
                        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                        renderRow={data =>
                            <ListItem>
                                <Thumbnail style={{marginLeft: 5}} square small size={80} source={{ uri: 'https://s-media-cache-ak0.pinimg.com/originals/f1/5a/7d/f15a7da85cea390e793cf2bb05f2bc69.jpg' }} />
                                <Body>
                                <Text> {data.id_friend} </Text>
                                <Text style={{marginLeft: 5}} note>user bio . .</Text>
                                </Body>
                            </ListItem>}
                        renderLeftHiddenRow={data =>
                            <Button full success onPress={() => {this.acceptFriend(data.id_friend)}}>
                                <Icon active name="add" />
                            </Button>}
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                                <Icon active name="close" />
                            </Button>}
                        leftOpenValue={75}
                        rightOpenValue={-75}
                    />
                    }

                    {this.state.listViewDataBis &&
                    <View style={{margin: 5, marginTop: 15}}><Text style={{textAlign: "center"}}>Amis</Text></View>}

                    {this.state.listViewDataBis &&
                    <List
                        dataSource={this.ds.cloneWithRows(this.state.listViewDataBis)}
                        renderRow={data =>
                            <ListItem>
                                <Thumbnail style={{marginLeft: 5}} square small size={80} source={{ uri: 'https://s-media-cache-ak0.pinimg.com/originals/f1/5a/7d/f15a7da85cea390e793cf2bb05f2bc69.jpg' }} />
                                <Body>
                                <Text> {data.id} </Text>
                                <Text style={{marginLeft: 5}} note>user bio . .</Text>
                                </Body>
                            </ListItem>}
                        renderLeftHiddenRow={data =>
                            <Button full onPress={() => alert(data)}>
                                <Icon active name="person" />
                            </Button>}
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            <Button full success onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                                <Icon active name="chatbubbles" />
                            </Button>}
                        leftOpenValue={75}
                        rightOpenValue={-75}
                    />}
                </Content>
            </Container>
        );
    }
}

AppRegistry.registerComponent('FriendsTab', () => FriendsTab);
module.exports = FriendsTab;

