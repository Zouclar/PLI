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
import styles from '../styles/details.js';


class PostDetails extends Component {
  constructor(props){
    super(props);
  }

   getPostsFromApiAsync() {
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

   componentWillMount() {}
  render() {
    return ();
  }
}

AppRegistry.registerComponent('PostDetails', () => PostDetails);
module.exports = PostDetails;
