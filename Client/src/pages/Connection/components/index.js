/**
 * Created by Florian on 08/10/2017.
 */
import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Fab, Button, Text, H1 } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'
import AppConfig from '../../../config.js'
import APIWrapper from '../../../api/APIWrapper.js';

import {
    AppRegistry,
    AsyncStorage
} from 'react-native'

export default class Connection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
        }
        if (AppConfig.get("Token")) {
            console.log("TOKEN WAS FOUND USER HAS CONNECTED EARLIER : ", AppConfig.get("Token"))
            //this.openPostMapView();
        }

        this.props.navigator.setDrawerEnabled({
            side: 'right', // the side of the drawer since you can have two, 'left' / 'right'
            enabled: false // should the drawer be enabled or disabled (locked closed)
        });
        this.props.navigator.setDrawerEnabled({
            side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
            enabled: false // should the drawer be enabled or disabled (locked closed)
        });

    }

    openPostMapView() {
        this.props.navigator.resetTo({
            label: 'Map',
            screen: 'Client',
            title: 'Map'
        });
    }

    openSignUpView() {
        this.props.navigator.resetTo({
            label: 'Inscription',
            screen: 'page.Inscription',
            title: 'Inscription'
        });
    }

    openErrorNotification(title, error) {
        this.props.navigator.showInAppNotification({
            screen: "notification.error",
            passProps: {title: title, message: error},
            autoDismissTimerSec: 3
        });
    }

    login() {
        APIWrapper.login(this.state.login, this.state.password,
            (responseJson) => {
                console.log("okokok", responseJson)
                responseJson.json().then((response) => {
                    if (response.token) {
                        console.log("TOKEN SETTTT and id is", response)
                        AppConfig.put("Token", response.token)
                        AppConfig.put("ID", response.user_id)
                        AsyncStorage.setItem("Token", response.token);
                        AsyncStorage.setItem("userId", response.user_id.toString());
                        this.openPostMapView();
                    }
                    else {
                        console.log("WRONT ACCOUNT !!")
                        this.openErrorNotification("Erreur", "Connexion refusée :(");
                    }
                })

            },
            (error) => {
                console.log("ERROR", error);
                this.openErrorNotification("Erreur", "Une erreur réseau est survenue :(");
            }
        );
    }

    render() {
        return (
            <Container>
                <H1 style={{textAlign: 'center', marginTop: 10}}>Se connecter
                </H1>
                <Content>
                    <Form>
                        <Item>
                            <Input placeholder="Login" onChangeText={(text) => this.setState({login: text})}/>
                        </Item>
                        <Item last>
                            <Input secureTextEntry={true} placeholder="Mot de passe" onChangeText={(text) => this.setState({password: text})}/>
                        </Item>
                        <Button style={{margin: 10}} onPress={()=>{this.login()}} block>
                            <Text>Connexion</Text>
                        </Button>
                        <Button style={{margin: 10}} onPress={() => {this.openSignUpView()}} block light>
                            <Text>S'inscrire</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}


AppRegistry.registerComponent('Connection', () => Connection);
module.exports = Connection;