import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Fab } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'
import APIWrapper from '../../../api/APIWrapper.js';

import {
    AppRegistry,
} from 'react-native'

export default class PhotoEditView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            uri: props.uri,
            coordinate: "",
        }

    }

    openErrorNotification(title, error) {
        this.props.navigator.showInAppNotification({
            screen: "notification.error",
            passProps: {title: title, message: error},
            autoDismissTimerSec: 3
        });
    }

    openSuccessNotification(title, message) {
        this.props.navigator.showInAppNotification({
            screen: "notification.success",
            passProps: {title: title, message: message},
            autoDismissTimerSec: 3
        });
    }

    sendPost() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("success !!")


                console.log("sending post with image ",  this)
                let formdata = new FormData();

                console.log(formdata)
                formdata.append("title", this.state.title)
                formdata.append("description", this.state.description)
                formdata.append("latitude", position.coords.latitude);
                formdata.append("longitude", position.coords.longitude);

                formdata.append("image", {uri: this.state.uri, type: 'image/jpeg', name: this.state.uri.split(/[\\/]/).pop()})


                APIWrapper.postMultiPart('/posts/create', formdata,
                    response => {
                        console.log("image uploaded : ", response)
                        this.openSuccessNotification("Succès", "Votre post a bien été enregistré :)")
                    },
                    err => {
                        console.log("image upload", err.message)
                        this.openErrorNotification("Erreur", "Une erreur est survenue, veuillez réessayer plus tard :(")
                    }
                );
            },
            (error) => console.warn(error.message),
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 }
        )



    }

    sendTest() {
        console.log("sending -> title is : ", this.state.title)
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Titre</Label>
                            <Input onChangeText={(text) => this.setState({title: text})}/>
                        </Item>
                        <Item floatingLabel last>
                            <Label>Description</Label>
                            <Input multiline={true} style={{
                               height: 100
                            }} onChangeText={(text) => this.setState({description: text})}/>
                        </Item>
                    </Form>
                </Content>
                <Fab
                    active={false}
                    direction="right"
                    containerStyle={{ }}
                    style={{ backgroundColor: '#2196F3' }}
                    position="bottomRight"
                    onPress={() => this.sendPost()}>
                    <Icon name="send" />
                </Fab>
            </Container>
        );
    }
}


AppRegistry.registerComponent('PhotoEditView', () => PhotoEditView);
module.exports = PhotoEditView;