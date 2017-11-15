    import React, { Component } from 'react';
    import {
        StyleSheet,
        Dimensions,
        TouchableHighlight,
        Image,
        Text,
        AppRegistry,
    } from 'react-native';

    import { Container, Content, View } from 'native-base'


    class PhotoZoomView extends Component {
        constructor(props) {
            super(props);
            this.imagePath = props.path;
        }

        render() {
            console.log("RENDER ZOOM PAGE, ", this.imagePath)
            return (
                <Container>
                    <Content>
                        <View>
                            <Image source={{uri: this.imagePath}} style={{
                                flex: 1,
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                height: Dimensions.get('window').height,
                                width: Dimensions.get('window').width
                            }}/>
                        </View>
                    </Content>
                </Container>
            );
        }

    }

    AppRegistry.registerComponent('PhotoZoomView', () => PhotoZoomView);
    module.exports = PhotoZoomView;
