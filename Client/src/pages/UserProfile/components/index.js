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


class UserProfile extends Component {
    constructor(props) {
        super(props);
    }

    test(item) {
        return {uri: '${AppConfig.get("AssetsBaseUrl")}${this.post.picture.replace("/var/www/html/", "")}'}
    }

    render() {
        return (
            <Container>
            <Tabs tabBarPosition="bottom" locked={true}>
                <Tab heading={ <TabHeading><Icon name="person" /><Text> Profile</Text></TabHeading>}>
                   <ProfileTab user={this.props.user} navigator={this.props.navigator}/>
                </Tab>
                <Tab heading={ <TabHeading><Icon name="people" /><Text> Amis</Text></TabHeading>}>
                    <FriendsTab user={this.props.user}/>
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
