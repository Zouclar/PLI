/**
 * Created by Florian on 08/10/2017.
 */
import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Fab, Button, Text, H1, View } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'

import {
    AppRegistry,
} from 'react-native'
import styles from '../styles/inscription.js';

export default class Inscription extends Component {

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

            /*
             <Item error>
             <Input placeholder='Textbox with Error Input'/>
             <Icon name='close-circle' />
             </Item>
            */
            <Container>
                <H1 style={{textAlign: 'center', marginTop: 10}}>S'inscrire
                </H1>
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
                            <Input placeholder="Nom" />
                        </Item>
                        <Item last>
                            <Input placeholder="Prénom" />
                        </Item>
                    </Form>
                </Content>
                <Button style={styles.submitButton}  block>
                    <Text>S'inscrire</Text>
                </Button>
            </Container>
        );
    }
}


AppRegistry.registerComponent('Inscription', () => Inscription);
module.exports = Inscription;