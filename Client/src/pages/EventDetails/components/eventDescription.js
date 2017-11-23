/**
 * Created by Florian on 21/11/2017.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    TouchableHighlight,
    TouchableOpacity,
    Image,
    Text,
    AppRegistry
} from 'react-native';
import { View, Thumbnail, Icon, Button, Card, CardItem, Right, Left, Body, DeckSwiper, Container, Content} from 'native-base';
import styles from '../styles/details.js';
import { Navigation } from 'react-native-navigation';
import APIWrapper from '../../../api/APIWrapper'
import AppConfig from '../../../config'
import moment from 'moment';
import 'moment/locale/fr';

class EventDescription extends Component {
    constructor(props) {
        super(props);
    }

    openPrivateChatView () {
        console.log("TARGET USER !!!");
        console.log(this.props.event);
        this.props.navigator.push({
            screen: 'page.PrivateChat',
            title: `${this.props.event.title}`,
            passProps: {target: this.props.event.id},
        });
    }

    formatFromDate(date) {
        moment.locale('fr');
        return moment(date, "YYYY-MM-DDTHH:mm:ssZ").fromNow()
    }

    formatDate(date) {
        moment.locale('fr');
        return moment(date, "YYYY-MM-DDTHH:mm:ssZ").format('llll')
    }

    joinEvent() {
        console.log("Joining EVENTS")
        APIWrapper.post("/events/join/" + this.props.event.id, {},
            (responseJson) => {
                if (responseJson.error)
                    this.parent.openErrorNotification("Erreur", "Vous participez déjà");
                else
                    this.parent.openSuccessNotification("Succès", "Participation enregistrée");

            },
            (error) => {
                console.log("ERROR", error);
                this.openErrorNotification("Erreur", "Une erreur réseau est survenue :(" + error);
            }
        );
    }

    render() {
        let hasStarted = moment(this.props.event.dateStart , "YYYY-MM-DDTHH:mm:ssZ").isBefore(moment());
        let isOver = moment(this.props.event.dateEnd , "YYYY-MM-DDTHH:mm:ssZ").isBefore(moment());
        return (
            <Container>
                <Content>
                    <View style={styles.head}>
                        <Image style={styles.cover} source={{uri: AppConfig.get("AssetsBaseUrl") + "/" + this.props.event.picture.replace("/var/www/html", "")}} />
                        <Text style={styles.name}>{this.props.event.title}</Text>
                        <Text>{this.props.event.description}</Text>

                        <View style={styles.datesContainer}>
                            <Text>du</Text>
                            <Text style={styles.date}>{this.formatDate(this.props.event.dateStart)}</Text>
                            <Text>au</Text>
                            <Text style={styles.date}>{this.formatDate(this.props.event.dateEnd)}</Text>
                            { !hasStarted && !isOver && <Text>Evenement à venir</Text> }
                            { hasStarted && !isOver && <Text>Evenement commencé</Text> }
                            { isOver && <Text>Evenement terminé</Text> }
                        </View>

                    </View>
                    {!hasStarted && !isOver && <Button style={{margin: 10}} onPress={()=>{this.joinEvent()}} block info>
                        <Text>Participer</Text>
                    </Button> }
                </Content>
            </Container>
        );
    }
}

AppRegistry.registerComponent('EventDescription', () => EventDescription);
module.exports = EventDescription;
