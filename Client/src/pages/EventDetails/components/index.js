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
import { Icon, Container, Tabs, Tab, TabHeading } from 'native-base';
import EventDescription from './eventDescription'
import Participants from './participants'


class EventDetails extends Component {
    constructor(props) {
        super(props);
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

    render() {
        return (
            <Container>
                <Tabs tabBarPosition="bottom" locked={true}>
                    <Tab heading={ <TabHeading><Icon name="person" /><Text>Informations</Text></TabHeading>}>
                        <EventDescription event={this.props.event} navigator={this.props.navigator}/>
                    </Tab>
                    <Tab heading={ <TabHeading><Icon name="people" /><Text>Participants</Text></TabHeading>}>
                        <Participants event={this.props.event} navigator={this.props.navigator}/>
                    </Tab>
                </Tabs>
            </Container>
        );
    }

}

AppRegistry.registerComponent('EventDetails', () => EventDetails);
module.exports = EventDetails;
