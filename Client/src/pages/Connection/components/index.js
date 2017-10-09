/**
 * Created by Florian on 08/10/2017.
 */
import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Fab, Button, Text, H1 } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'

import {
    AppRegistry,
} from 'react-native'

export default class Connection extends Component {

    constructor(props) {
        super(props);
        /*this.state = {
            username: "",
            password: "",
            email,
        }*/
    }

    render() {
        return (
            <Container>
                <H1 style={{textAlign: 'center', marginTop: 10}}>Se connecter
                </H1>
                <Content>
                    <Form>
                        <Item>
                            <Input placeholder="Login" />
                        </Item>
                        <Item last>
                            <Input secureTextEntry={true} placeholder="Mot de passe" />
                        </Item>
                        <Button style={{margin: 10}} block>
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