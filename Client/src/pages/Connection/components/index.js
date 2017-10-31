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
} from 'react-native'

export default class Connection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
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

    login() {
        APIWrapper.login(this.state.login, this.state.password,
            (responseJson) => {
                console.log("okokok")
                responseJson.json().then((response) => {
                    if (response.token) {
                        console.log("TOKEN SETTTT")
                        AppConfig.put("Token", response.token)
                        this.openPostMapView();
                    }
                    else {
                        console.log("WRONT ACCOUNT !!")
                    }
                })

            },
            (error) => {
                console.error("ERROR", error);
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