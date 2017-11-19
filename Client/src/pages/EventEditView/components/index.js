/**
 * Created by Florian on 19/11/2017.
 */
import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Fab, Button, Text } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'
import APIWrapper from '../../../api/APIWrapper.js';
var ImagePicker = require('react-native-image-picker');
import DatePicker from 'react-native-datepicker'
import {
    AppRegistry,
    StyleSheet,
    Dimensions
} from 'react-native'
var style = StyleSheet.create({
    datePicker: {
    width: Dimensions.get("window").width,
    borderColor: "#ffffff"}});

export default class EventEditView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            uri: props.uri,
            coordinate: "",
            firstDate:"",
            lastDate:"",
        };
        this.options = {
            title: 'Select Avatar',
            customButtons: [
                {name: 'fb', title: 'Choose Photo from Facebook'},
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };
        console.log("SYYYYYYYYYY");
        console.log(this.props.markerPosition)
    }

    openImagePicker() {
        ImagePicker.showImagePicker(this.options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source
                });
            }
        });
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

    openPostMapView() {
        this.props.navigator.resetTo({
            label: 'Map',
            screen: 'Client',
            title: 'Map'
        });
    }

    sendPost() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("success !!");


                console.log("sending post with image ",  this)
                let formdata = new FormData();

                console.log(formdata);
                formdata.append("title", this.state.title)
                formdata.append("description", this.state.description)
                formdata.append("latitude", position.coords.latitude);
                formdata.append("longitude", position.coords.longitude);

                formdata.append("image", {uri: this.state.uri, type: 'image/jpeg', name: this.state.uri.split(/[\\/]/).pop()})


                APIWrapper.postMultiPart('/posts/create', formdata,
                    response => {
                        console.log("image uploaded : ", response);
                        this.openSuccessNotification("Succès", "Votre event a bien été ajouté :)");
                        this.openPostMapView();
                    },
                    err => {
                        console.log("image upload", err.message);
                        this.openErrorNotification("Erreur", "Une erreur est survenue. Veuillez réessayer plus tard :(")
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
                            <Label>Date de début</Label>
                            <DatePicker
                                date={this.state.firstDate}
                                mode="date"
                                placeholder="Sélectionnez une date"
                                format="YYYY-MM-DD"
                                confirmBtnText="Valider"
                                cancelBtnText="Annuler"
                                customStyles={{
                                    dateInput: style.datePicker
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => {this.setState({date: date})}}
                            />
                        <Button style={{margin: 10}} onPress={() => {this.openImagePicker()}} block>
                            <Text>Ajouter une photo</Text>
                        </Button>
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


AppRegistry.registerComponent('EventEditView', () => EventEditView);
module.exports = EventEditView;