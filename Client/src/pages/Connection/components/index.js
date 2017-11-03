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
            this.openPostMapView();
        }

    }

    openPostMapView() {
        //AppConfig.put("Token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MDk0ODcxODEsInVzZXJuYW1lIjoic3lsdmFpbiIsImlhdCI6MTUwOTQwMDc4MX0.eFt6uGvzaM_0ogrLbGyVrud-ZD9sPXlrAhfAbrMtDmw");
        console.log("hello");
        this.props.navigator.resetTo({
            label: 'Map',
            screen: 'Client',
            title: 'Map'
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
                        console.log("TOKEN SETTTT and id is", response.user_id)
                        AppConfig.put("Token", response.token)
                        AppConfig.put("ID", response.user_id)
                        AsyncStorage.setItem("Token", response.token);
                        AsyncStorage.setItem("userId", response.user_id);
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
                    </Form>
                </Content>
            </Container>
        );
    }
}


AppRegistry.registerComponent('Connection', () => Connection);
module.exports = Connection;