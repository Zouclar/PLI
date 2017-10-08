import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  Animated,
  Text
} from 'react-native';

import { Container, Header, View, Button, Fab } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons'

import { Navigation } from 'react-native-navigation';

import APIWrapper from '../../../api/APIWrapper.js';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import CustomStyle from '../assets/map-style.json';
import styles from '../styles/map.js';
import PostsList from './carousel.js';


class PostsMap extends Component {
  constructor(props){
    super(props);
    this.apiDatas = [];
      
    this.defaultLocation = {
            latitude: 48,
            longitude: 2,
            latitudeDelta: 30.115,
            longitudeDelta: 30.1121
        };
    this.enableSnap = true;
    this.state = {
        location: this.defaultLocation,
        active: false
    }
    this.map = {};
    this.latitudeDelta = 0;
    this.longitudeDelta = 0;
    this.postList = {};
    this.selectedPostIndex = 0;
  }



  openDetailPage (index) {
      this.props.navigator.push({
          screen: 'page.PostDetails',
          title: 'Details',
          passProps: {post: this.apiDatas[index], navigator: this.props.navigator},
      });
  }

    openPhotoView () {
        this.props.navigator.push({
            screen: 'page.PhotoView',
        });
    }

    
   getPostsFromApiAsync() {
      APIWrapper.get('/posts/all',
          (responseJson) => {
              console.log("okokok")
              this.apiDatas = responseJson;
              this.forceUpdate();
              this.postList.uptadeProps(responseJson);
              console.log('refreshed')
          },
          (error) => {
              console.error(error);
          }
      );
  }

    getCurrentLocation() {
        this.location = 
        navigator.geolocation.getCurrentPosition(
        (position) => {
            console.log("success !!")
            let location = { ...this.defaultLocation };
            location.latitude = position.coords.latitude;
            location.longitude = position.coords.longitude;
            this.location = location;
            this.forceUpdate()
        },
        (error) => console.warn(error.message),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 1000 }
        )
    }


   componentWillMount() {
       this.getPostsFromApiAsync();
       this.getCurrentLocation();
  }
    
  onRegionChange(region) {
        this.latitudeDelta = region.latitudeDelta;
        this.longitudeDelta = region.longitudeDelta;
  }

  animateToPostLocation (index) {
      console.log("CALLBACK", this.map)
      this.selectedPostIndex = index;
      this.map.animateToRegion ( {   
        longitude: this.apiDatas[index].coordinate.x,
        latitude: this.apiDatas[index].coordinate.y,
      });
  }
    

  render() {
      console.log("hey")
      console.log(this.state.location)
      console.log(this.apiDatas)
    return (
        <Container>
            <Header />
      <View style ={styles.container}>
        <MapView
         ref={map => this.map = map}
          style={styles.map}
          customMapStyle={CustomStyle}
          showsUserLocation={true}
          initialRegion={this.state.location}
        >
        {this.apiDatas.map(post => (
            <MapView.Marker
              key={post.picture}
              coordinate={{longitude: post.coordinate.x, latitude: post.coordinate.y}}
              title={post.title}
              description={post.date}
            />
        ))}

        </MapView>
       <PostsList ref={postList => this.postList = postList} apiDatas={this.apiDatas} parent={this}></PostsList>
          <Fab
              active={this.state.active}
              direction="left"
              containerStyle={{ }}
              style={{ backgroundColor: '#5067FF' }}
              position="bottomLeft"
              onPress={() => this.openPhotoView()}>
              <Icon name="photo-camera" />
          </Fab>
          <Fab
              active={this.state.active}
              direction="right"
              containerStyle={{ }}
              style={{ backgroundColor: '#41a85f' }}
              position="bottomRight"
              onPress={() => this.openDetailPage(this.selectedPostIndex)}>
              <Icon name="chevron-right" />
          </Fab>
      </View>
        </Container>
    );
  }
}

AppRegistry.registerComponent('Client', () => PostsMap);
module.exports = PostsMap;
