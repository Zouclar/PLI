import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Dimensions,
  Animated,
  View,
  Text
} from 'react-native';

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import Carousel from 'react-native-snap-carousel';
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
        location: this.defaultLocation
    }
    this.map = {};
    this.latitudeDelta = 0;
    this.longitudeDelta = 0;
    this.postList = {};
      
  }
    
   getPostsFromApiAsync() {
       console.log("calling api")
    return fetch('http://192.168.0.110:3000/posts')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("okokok")
        this.apiDatas = responseJson;
        this.forceUpdate()
        this.postList.uptadeProps(responseJson);
        console.log('refreshed')
      })
      .catch((error) => {
        console.error(error);
      });
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
      this.map.animateToRegion ( {   
        longitude: this.apiDatas[index].coordinates.longitude,
        latitude: this.apiDatas[index].coordinates.latitude,
      });
  }
    

    
   

  render() {
      console.log("hey")
      console.log(this.state.location)
      console.log(this.apiDatas)
    return (
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
              key={post.title}
              coordinate={post.coordinates}
              title={post.title}
              description={post.date}
            />
        ))}

        </MapView>
       <PostsList ref={postList => this.postList = postList} apiDatas={this.apiDatas} parent={this}></PostsList>
      </View>
    );
  }
}

AppRegistry.registerComponent('PostsMap', () => PostsMap);
module.exports = PostsMap;
