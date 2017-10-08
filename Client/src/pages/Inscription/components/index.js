/**
 * Created by Florian on 08/10/2017.
 */
import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Fab, Input } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'

import {
    AppRegistry,
} from 'react-native'

export default class Inscription extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email,
        }
    }

    render() {
        return (
            <Container>
                <Header />
                <Content>
                    <Form>
                        <Item>
                            <Input placeholder="Pseudonyme" />
                        </Item>
                        <Item last>
                            <Input placeholder="Mot de passe" />
                        </Item>
                        <Item last>
                            <Input placeholder="Adresse Mail" />
                        </Item>
                        <Item last>
                            <Input placeholder="Nom - Prénom" />
                        </Item>
                        <Button style={{margin: 10}}  block>
                            <Text>S'inscrire</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}


AppRegistry.registerComponent('Inscription', () => Inscription);
module.exports = Inscription;