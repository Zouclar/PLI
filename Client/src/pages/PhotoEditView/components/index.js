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
        let photo = { uri: source.uri}
        let formdata = new FormData();

        formdata.append("product[title]", 'uploadtest')
        formdata.append("product[description]", 'test description blabla')
        formdata.append("product[description]", '12dsadadsa')
        formdata.append("product[images_attributes[0][file]]", {uri: this.props.uri, type: 'multipart/form-data'})


        fetch('http://192.168.1.101:3000/posts/',{
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formdata
        }).then(response => {
            console.log("image uploaded")
        }).catch(err => {
            console.log(err)
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
                    onPress={() => this.sendTest()}>
                    <Icon name="send" />
                </Fab>
            </Container>
        );
    }
}


AppRegistry.registerComponent('PhotoEditView', () => PhotoEditView);
module.exports = PhotoEditView;