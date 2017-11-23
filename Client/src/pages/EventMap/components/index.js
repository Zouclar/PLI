/**
 * Created by Florian on 08/10/2017.
 */
import React, {Component} from 'react';
import {Container, Header, Content, Form, Item, Input, Label, Fab, Button, Text, H1, View, Drawer} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'
import {
    AppRegistry,
} from 'react-native'
import styles from '../styles/eventmap.js';
import CustomStyle from '../../PostsMap/assets/map-style.json';
import APIWrapper from '../../../api/APIWrapper.js';
import  EventsList   from './carousel';
import SideMenu from '../../../menu/sideMenu'
var ImagePicker = require('react-native-image-picker');


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
            didStartCreation: false,
            hasFetchDatas: false
        }
        this.map = {};
        this.latitudeDelta = 0;
        this.longitudeDelta = 0;
        this.eventList = {};
        this.selectedEventIndex = 0;
    }

    componentDidMount() {
        this.getEventsFromApiAsync();
    }

    getEventsFromApiAsync() {
        console.log("FETCHING EVENTS")
        APIWrapper.get('/events/',
            (responseJson) => {
                console.log("okokok")
                console.log(responseJson)
                this.apiDatas = responseJson;
                this.forceUpdate();
                //this.eventList.uptadeProps(responseJson);
                let hasFetchDatas = true;
                this.setState({hasFetchDatas})
                console.log('refreshed')
            },
            (error) => {
                console.error("ERROR !!!", error);
            }
        );
    }

    openDetailPage (index) {
        this.props.navigator.push({
            screen: 'page.EventDetails',
            title: 'Détails de l\'évènement',
            passProps: {event: this.apiDatas[index]},
        });
    }
    openEventEditView (index) {
        this.props.navigator.push({
            screen: 'page.EventEditView',
            title: 'Création d\'un évènement',
            passProps: {markerPosition: this.state.x, navigator: this.props.navigator},
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

    //Permet de choisir de la position de l'event à créer
    //Fab avec Valider
    renderCreation() {
        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<SideMenu ref={(ref) => { this.sideMenu = ref; }} navigator={this.props.navigator} user={this.user}/>}

                side="left"
                panOpenMask={.25} >
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
            </Drawer>
        );
    }

    //Affiche tous les events
    //Fab avec plus
    renderDisplay() {
        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<SideMenu ref={(ref) => { this.sideMenu = ref; }} navigator={this.props.navigator} user={this.user}/>}

                side="left"
                panOpenMask={.25} >
            <Container>
                <MapView
                    ref={map => this.map = map}
                    style={styles.map}
                    customMapStyle={CustomStyle}
                    showsUserLocation={true}
                    initialRegion={this.state.location}>
                    {this.apiDatas.map(event => (
                        <MapView.Marker
                            key={event.picture}
                            coordinate={{longitude: event.coordinates.x, latitude: event.coordinates.y}}
                            title={event.title}
                            description={event.date}
                            pinColor={"#4286f4"}
                        />
                    ))}
                </MapView>
                {this.state.hasFetchDatas && <EventsList ref={eventList => this.eventList = eventList} apiDatas={this.apiDatas} map={this.map} parent={this}/>}

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
            </Drawer>
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