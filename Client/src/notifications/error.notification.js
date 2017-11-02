import React from 'react';
import {StyleSheet, View, Text, Dimensions, Button} from 'react-native';
import Styles from './notification.style';

class ErrorNotification extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={Styles.errorContainer}>
                <Text style={Styles.title}>{this.props.title}</Text>
                <Text style={Styles.content}>{this.props.message}</Text>
            </View>
        );
    }
}

export default ErrorNotification;