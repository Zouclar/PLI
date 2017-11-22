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
import { Container, Content, List, ListItem, View, Left, Body, Thumbnail, Right} from 'native-base';
import AppConfig from '../config'

export default class SideMenu extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            user: AppConfig.get("connectedUser")
        };

        this.routes = [
            {title: "Posts", action: () => {
            console.log("Going to posts")
                this.props.navigator.resetTo({
                    screen: 'Client',
                    title: 'Map',
                });
            }},
            {title: "Events", action: () => {
                this.props.navigator.resetTo({
                    screen: 'page.EventMap',
                    title: 'Evenements',
                });
            }},
            {title: "Deconnexion", action: () => {
                AppConfig.reset();
                this.props.navigator.resetTo({
                    screen: 'page.Connection',
                    title: 'Map',
                });
            }}

        ]

        console.log("SIDEMENU BUILD")
    }

    goToProfile () {
        this.props.navigator.push({
            screen: 'page.UserProfileView',
            title: 'Votre profile',
            passProps: {user: this.state.user},
        });
    }

    setUser (user) {
        this.setState({user});
    }


    render() {
        let user = this.state.user ? this.state.user : {name: "undefined", lastname: "undefined"}
        closeDrawer = () => {
            this.drawer._root.close()
        };
        openDrawer = () => {
            this.drawer._root.open()
        };
        return (
            <Container style={{backgroundColor: "white"}}>
                <Content>
                    <View>
                        <TouchableOpacity onPress={() => {
                            this.goToProfile();
                        }}>
                        <Left>
                            <Thumbnail source={{ uri: user.link_photo }} />
                        </Left>
                        <Body>
                        <Text>{user.name} {user.lastname}</Text>
                        </Body>
                        </TouchableOpacity>
                    </View>
                    <List
                        dataArray={this.routes}
                        renderRow={data => {
                            return (
                                <ListItem
                                    button
                                    onPress={data.action}>
                                    <Text>{data.title}</Text>
                                </ListItem>
                            );
                        }}
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


AppRegistry.registerComponent('page.SideMenu', () => SideMenu);
module.exports = SideMenu;