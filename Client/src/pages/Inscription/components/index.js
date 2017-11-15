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
import APIWrapper from '../../../api/APIWrapper.js';


export default class Inscription extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            lastname: "",
            surname: "",
            mail: "",
            password: "",
            link_photo: "",
        }
    }

    openSignInView() {
        this.props.navigator.resetTo({
            label: 'Connection',
            screen: 'page.Connection',
            title: 'Connection'
        });
    }

    openErrorNotification(title, error) {
        this.props.navigator.showInAppNotification({
            screen: "notification.error",
            passProps: {title: title, message: error},
            autoDismissTimerSec: 3
        });
    }

    openSuccessNotification(title, msg) {
        this.props.navigator.showInAppNotification({
            screen: "notification.success",
            passProps: {title: title, message: msg},
            autoDismissTimerSec: 3
        });
    }

    signUp() {
        let data = {
            name: this.state.name,
            lastname: this.state.lastname,
            surname: this.state.surname,
            mail: this.state.mail,
            password: this.state.password,
            link_photo: "",
        }
        APIWrapper.post("/users/create", data,
            (responseJson) => {
                if (responseJson) {
                    this.openSuccessNotification("Succès", "Inscription réussie, bienvenue !");
                }
                else {
                    console.log("WRONT ACCOUNT !!")
                    this.openErrorNotification("Erreur", "Connexion refusée :(");
                }

            },
            (error) => {
                console.log("ERROR", error);
                this.openErrorNotification("Erreur", "Une erreur réseau est survenue :(" + error);
            }
        );
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
                            <Input placeholder="Pseudonyme" onChangeText={(text) => this.setState({surname: text})}/>
                        </Item>
                        <Item last>
                            <Input secureTextEntry={true} placeholder="Mot de passe" onChangeText={(text) => this.setState({password: text})}/>
                        </Item>
                        <Item last>
                            <Input placeholder="Adresse Mail" onChangeText={(text) => this.setState({email: text})}/>
                        </Item>
                        <Item last>
                            <Input placeholder="Nom" onChangeText={(text) => this.setState({lastname: text})}/>
                        </Item>
                        <Item last>
                            <Input placeholder="Prénom" onChangeText={(text) => this.setState({name: text})}/>
                        </Item>
                    </Form>
                    <Button style={{margin: 10}} onPress={() => {this.signUp()}} block>
                        <Text>S'inscrire</Text>
                    </Button>
                    <Button style={{margin: 10}} onPress={() => {this.openSignInView()}} block light>
                        <Text>Se connecter</Text>
                    </Button>
                </Content>

            </Container>
        );
    }
}


AppRegistry.registerComponent('Inscription', () => Inscription);
module.exports = Inscription;