import React, { Component } from 'react';

import {
  AppRegistry,
} from 'react-native'

import { Navigation } from 'react-native-navigation';

import PostsMap from './PostsMap/components/index.js'
import PostDetails from './PostDetails/components/index.js'

export function registerScreens() {
    Navigation.registerComponent('Client', () => PostsMap);
    Navigation.registerComponent('page.PostDetails', () => PostDetails);
}