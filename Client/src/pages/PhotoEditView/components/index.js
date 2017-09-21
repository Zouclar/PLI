import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Fab } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'

import {
    AppRegistry,
} from 'react-native'

export default class PhotoEditView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            uri: props.uri,
            coordinates: "",
        }

    }

    sendPost() {
        console.log("sending post with image ",  this.state.uri)
        let formdata = new FormData();

        console.log(formdata)
        formdata.append("title", 'uploadtest')

        formdata.append("image", {uri: this.state.uri, type: 'image/jpeg', name: this.state.uri.split(/[\\/]/).pop()})


        fetch('https://server.lasjunies.fr:8443/posts/create',{
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formdata
        }).then(response => {
            console.log("image uploaded : ", response)
        }).catch(err => {
            console.log("image upload", err.message)
        })
    }

    sendTest() {
        console.log("sending -> title is : ", this.state.title)
    }

    render() {
        return (
            <Container>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>Titre</Label>
                            <Input onChangeText={(text) => this.setState({title: text})}/>
                        </Item>
                        <Item floatingLabel last>
                            <Label>Description</Label>
                            <Input multiline={true} style={{
                               height: 100
                            }} onChangeText={(text) => this.setState({description: text})}/>
                        </Item>
                    </Form>
                </Content>
                <Fab
                    active={false}
                    direction="right"
                    containerStyle={{ }}
                    style={{ backgroundColor: '#2196F3' }}
                    position="bottomRight"
                    onPress={() => this.sendPost()}>
                    <Icon name="send" />
                </Fab>
            </Container>
        );
    }
}


AppRegistry.registerComponent('PhotoEditView', () => PhotoEditView);
module.exports = PhotoEditView;