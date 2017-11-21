/**
 * Created by Florian on 19/11/2017.
 */
import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Fab, Button, Text, View} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'
import APIWrapper from '../../../api/APIWrapper.js';
import ImagePicker from 'react-native-image-picker';
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
            avatarSource:""
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
        ImagePicker.launchImageLibrary(this.options, (response)  => {
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

    sendEvent() {
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
                formdata.append("dateStart", this.state.dateStart);
                formdata.append("dateEnd", this.state.dateEnd);

                console.log("eventImage")
                console.log(this.state.avatarSource)


                formdata.append("image", {uri: this.state.uri, type: 'image/jpeg', name: this.state.avatarSource.uri.split(/[\\/]/).pop()})


                APIWrapper.postMultiPart('/events/create', formdata,
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
                        <View style={{marginTop: 30}}>
                            <Label>Plannification</Label>
                            <DatePicker
                                style={style.datePicker}
                                date={this.state.dateStart}
                                mode="datetime"
                                placeholder="Date de début"
                                format="YYYY-MM-DD hh-mm-ss"
                                showIcon={false}
                                confirmBtnText="Valider"
                                cancelBtnText="Annuler"
                                customStyles={{
                                    dateInput: style.datePicker
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => {this.setState({dateStart: date})}}
                            />
                            <DatePicker
                                style={style.datePicker}
                                date={this.state.dateEnd}
                                mode="datetime"
                                placeholder="Date de début"
                                format="YYYY-MM-DD hh-mm-ss"
                                showIcon={false}
                                confirmBtnText="Valider"
                                cancelBtnText="Annuler"
                                customStyles={{
                                    dateInput: style.datePicker
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => {this.setState({dateEnd: date})}}
                            />
                        </View>
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
                    onPress={() => this.sendEvent()}>
                    <Icon name="send" />
                </Fab>
            </Container>
        );
    }
}


AppRegistry.registerComponent('EventEditView', () => EventEditView);
module.exports = EventEditView;