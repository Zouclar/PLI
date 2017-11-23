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
    ListView,
    AppRegistry
} from 'react-native';
import { View, Thumbnail, Icon, Button, Card, CardItem, Right, Left, Body, DeckSwiper, Container, Content, H1, Header, List, Separator, ListItem } from 'native-base';
import styles from '../styles/details.js';
import APIWrapper from '../../../api/APIWrapper'
import AppConfig from '../../../config'

const datas = [
    'Simon Mignolet',
    'Nathaniel Clyne',
];

const datas_bis = [
    'Dejan Lovren',
    'Mama Sakho',
    'Alberto Moreno',
]

export default class Participants extends Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            basic: true,
            listViewData: this.props.event.users,
        };
        console.log("PARTICIPANTS ")
        console.log(this.props.event.users)
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
                this.forceUpdate();
                console.log('refreshed')
            },
            (error) => {
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
                    <List
                        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                        renderRow={data =>
                            <ListItem>
                                <Thumbnail style={{marginLeft: 5}} square small size={80} source={{uri: data.link_photo}} />
                                <Body>
                                <Text> {data.name} {data.lastname} </Text>
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
                    />
                </Content>
            </Container>
        );
    }
}

AppRegistry.registerComponent('Participants', () => Participants);
module.exports = Participants;

