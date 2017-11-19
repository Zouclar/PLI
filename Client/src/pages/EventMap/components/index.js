/**
 * Created by Florian on 08/10/2017.
 */
import React, {Component} from 'react';
import {Container, Header, Content, Form, Item, Input, Label, Fab, Button, Text, H1, View} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'
var ImagePicker = require('react-native-image-picker');

import {
    AppRegistry,
} from 'react-native'
import styles from '../styles/eventmap.js';
import CustomStyle from '../../PostsMap/assets/map-style.json';
import APIWrapper from '../../../api/APIWrapper.js';


export default class EventMap extends Component {

    constructor(props) {
        super(props);
        this.apiDatas = [];

        this.defaultLocation = {
            latitude: 48,
            longitude: 2,
            latitudeDelta: 30.115,
            longitudeDelta: 30.1121
        };
        this.enableSnap = true;
        this.state = {
            location: this.defaultLocation,
            active: false,
            markers: [],
            didStartCreation: false
        }
        this.map = {};
        this.latitudeDelta = 0;
        this.longitudeDelta = 0;
        this.postList = {};
        this.selectedPostIndex = 0;
    }

    openEventEditView (index) {
        this.props.navigator.push({
            screen: 'page.EventEditView',
            title: 'Création d\'un évènement',
            passProps: {markerPosition: this.state.x, navigator: this.props.navigator},
        });
    }

    //Permet de choisir de la position de l'event à créer
    //Fab avec Valider
    renderCreation() {
        return (
            <Container>
                <MapView
                    ref={map => this.map = map}
                    style={styles.map}
                    customMapStyle={CustomStyle}
                    showsUserLocation={true}
                    initialRegion={this.state.location}>
                    <MapView.Marker draggable
                                    ref={marker => this.marker = marker}
                                    coordinate={this.defaultLocation}
                                    onDragEnd={(e) => this.setState({x: e.nativeEvent.coordinate})}
                    />
                </MapView>
                <Fab
                    active={this.state.active}
                    direction="right"
                    containerStyle={{}}
                    style={{backgroundColor: '#41a85f'}}
                    position="bottomRight"
                    onPress={() => this.openEventEditView()}>
                    <Icon name="check"/>
                </Fab>
                <Fab
                    active={this.state.active}
                    direction="right"
                    containerStyle={{}}
                    style={{backgroundColor: '#BF3030'}}
                    position="bottomLeft"
                    onPress={() => {this.setState({didStartCreation: false})}}>
                    <Icon name="close"/>
                </Fab>
            </Container>
        );
    }

    //Affiche tous les events
    //Fab avec plus
    renderDisplay() {
        return (
            <Container>
                <MapView
                    ref={map => this.map = map}
                    style={styles.map}
                    customMapStyle={CustomStyle}
                    showsUserLocation={true}
                    initialRegion={this.state.location}>
                </MapView>

                <Fab
                    active={this.state.active}
                    direction="right"
                    containerStyle={{}}
                    style={{backgroundColor: '#41a85f'}}
                    position="bottomRight"
                    onPress={() => {this.setState({didStartCreation: true})}}>
                    <Icon name="add"/>
                </Fab>
            </Container>
        );
    }

    setCreation() {
        this.setState({didStartCreation: false})
    }

    render() {
        if (this.state.didStartCreation) {
           return this.renderCreation()
        } else {
           return this.renderDisplay()
        }
    }
}

AppRegistry.registerComponent('EventMap', () => EventMap);
module.exports = EventMap;