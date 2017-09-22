import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    TouchableHighlight,
    Image,
    Text,
    AppRegistry
} from 'react-native';
import { View, Fab } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'

import styles from '../styles/details.js';

class PhotoZoomView extends Component {
    constructor(props) {
        super(props);
        this.imagePath = props.path;
    }

    render() {
        console.log("RENDER ZOOM PAGE, ", this.imagePath)
        return (
            <View>
                <Image
                    source={{ uri: this.imagePath }}
                    style={styles.preview}
                />
            </View>
        );
    }

}

AppRegistry.registerComponent('PhotoZoomView', () => PhotoZoomView);
module.exports = PhotoZoomView;
