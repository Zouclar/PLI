/**
 * Created by sylvainlasjunies on 03/11/17.
 */
import React from 'react';
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
import { View, Thumbnail, Icon, Button, Card, CardItem, Right, Left, Body, DeckSwiper, Container, Content, H1, Header, List, Separator, ListItem } from 'native-base';import APIWrapper from '../../../api/APIWrapper.js';

export default class UserListDrawer extends React.Component {


    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            listViewData: []
        };

        this.getUsersFromApiAsync();
    }

    getUsersFromApiAsync() {
        console.log("get comments :");
        return APIWrapper.get('/users/all', (responseJson) => {
                console.log("get USERS : ", responseJson);
                this.setState({listViewData: responseJson})
               // this.forceUpdate();
                console.log('refreshed')

                console.log("NEWSTATDLMQT ", this.state.listViewData)
            },
            (error) => {
                console.error(error);
            }
        );
    }

    toggleDrawer = () => {
        this.props.navigator.toggleDrawer({
            side: 'left'
        });
    };

    render() {
        console.log("RENDERING USERLIST")
        console.log(this.state)
        console.log(this.ds.cloneWithRows(this.state.listViewData))
        return (
            <Container>
                <View style={{margin: 5, marginTop: 30}}><Text style={{textAlign: "center"}}>Membres de l'instance ({this.state.listViewData.length})</Text></View>
                <Content>
                    <List
                 dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                 renderRow={data =>
                 <ListItem>
                 <Thumbnail style={{marginLeft: 5}} square small size={80} source={{ uri: data.link_photo }} />
                 <Body>
                 <Text> {data.name} </Text>
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
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    button: {
        marginTop: 16
    }
});


AppRegistry.registerComponent('page.userListDrawer', () => UserListDrawer);
module.exports = UserListDrawer;