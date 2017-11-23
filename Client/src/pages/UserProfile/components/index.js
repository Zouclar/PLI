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
import ProfileTab from './profile.js'
import RecentPostsTab from './recent.js'
import FriendsTab from './friendsTab.js'
import APIWrapper from '../../../api/APIWrapper.js';


class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user
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

    componentWillMount() {
        if (!this.state.user.friends) {
            APIWrapper.get('/users/' + this.state.user.id,
                (user) => {
                    console.log("updating user datas ..")
                    console.log(user)
                    this.setState({user})
                    console.log('refreshed')
                },
                (error) => {
                    console.error("ERROR !!!", error);
                }
            );
        }
    }

    render() {
        return (
            <Container>
            <Tabs tabBarPosition="bottom" locked={true}>
                <Tab heading={ <TabHeading><Icon name="person" /><Text> Profile</Text></TabHeading>}>
                   <ProfileTab user={this.state.user} navigator={this.props.navigator}/>
                </Tab>
                <Tab heading={ <TabHeading><Icon name="people" /><Text> Amis</Text></TabHeading>}>
                    <FriendsTab user={this.state.user}/>
                </Tab>
                <Tab heading={ <TabHeading><Icon name="apps" /><Text> Récents</Text></TabHeading>}>
                <RecentPostsTab/>
                </Tab>
            </Tabs>
        </Container>
        );
    }

}

AppRegistry.registerComponent('UserProfile', () => UserProfile);
module.exports = UserProfile;
