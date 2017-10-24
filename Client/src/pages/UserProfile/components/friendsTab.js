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
            listViewData: datas,
            listViewDataBis: datas_bis,
        };
    }

    deleteRow(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        this.setState({ listViewData: newData });
    }

    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return (
            <Container>
                <Content>
                    <View style={{margin: 5}}><Text style={{textAlign: "center"}}>Demandes d'amis</Text></View>
                    <List
                        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                        renderRow={data =>
                            <ListItem>
                                <Thumbnail style={{marginLeft: 5}} square small size={80} source={{ uri: 'https://s-media-cache-ak0.pinimg.com/originals/f1/5a/7d/f15a7da85cea390e793cf2bb05f2bc69.jpg' }} />
                                <Body>
                                <Text> {data} </Text>
                                <Text style={{marginLeft: 5}} note>Its time to build a difference . .</Text>
                                </Body>
                            </ListItem>}
                        renderLeftHiddenRow={data =>
                            <Button full success onPress={() => alert(data)}>
                                <Icon active name="add" />
                            </Button>}
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                                <Icon active name="close" />
                            </Button>}
                        leftOpenValue={75}
                        rightOpenValue={-75}
                    />

                    <View style={{margin: 5, marginTop: 15}}><Text style={{textAlign: "center"}}>Amis</Text></View>

                    <List
                        dataSource={this.ds.cloneWithRows(this.state.listViewDataBis)}
                        renderRow={data =>
                            <ListItem>
                                <Thumbnail style={{marginLeft: 5}} square small size={80} source={{ uri: 'https://s-media-cache-ak0.pinimg.com/originals/f1/5a/7d/f15a7da85cea390e793cf2bb05f2bc69.jpg' }} />
                                <Body>
                                <Text> {data} </Text>
                                <Text style={{marginLeft: 5}} note>Its time to build a difference . .</Text>
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
                    />
                </Content>
            </Container>
        );
    }
}

AppRegistry.registerComponent('FriendsTab', () => FriendsTab);
module.exports = FriendsTab;

