import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
    Image,
    Text,
    AppRegistry
} from 'react-native';
import Camera from 'react-native-camera';
import styles from '../styles/details.js';
import { Container, Header, Content, Card, CardItem, Thumbnail, Button, Icon, Left, Right, InputGroup, Body, H1, H2, H3, Form, Item, Label, Input } from 'native-base'

class PhotoView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            path: null,
            cameraType : 'back',
            mirrorMode: false
        };
    }

    takePicture() {
        this.camera.capture()
            .then((data) => {
                console.log(data);
                this.setState({ path: data.path })
            })
            .catch(err => console.error(err));
    }

    renderCamera() {
        return (
            <Camera
                ref={(cam) => {
                    this.camera = cam;
                }}
                style={styles.preview}
                aspect={Camera.constants.Aspect.fill}
                captureTarget={Camera.constants.CaptureTarget.disk}
                type={this.state.cameraType}
                mirrorImage={this.state.mirrorMode}
            >
                <Text style={styles.changeCamera} onPress={this.changeCameraType.bind(this)}>Switch Camera</Text>
                <TouchableHighlight
                    style={styles.capture}
                    onPress={this.takePicture.bind(this)}
                    underlayColor="rgba(255, 255, 255, 0.5)"
                >
                    <View />
                </TouchableHighlight>
            </Camera>
        );
    }

    changeCameraType() {
        if(this.state.cameraType === 'back') {
            this.setState({
                cameraType : 'front',
                mirrorMode : true
            })
        }
        else {
            this.setState({
                cameraType : 'back',
                mirrorMode : false
            })
        }
    }

    renderImage() {
        return (
            <View>
                <Image
                    source={{ uri: this.state.path }}
                    style={styles.preview}
                />
                <Text
                    style={styles.cancel}
                    onPress={() => this.setState({ path: null })}
                >Cancel
                </Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.path ? this.renderImage() : this.renderCamera()}
            </View>
        );
    }

}

AppRegistry.registerComponent('PhotoView', () => PhotoView);
module.exports = PhotoView;
