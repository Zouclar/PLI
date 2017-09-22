import React, { Component } from 'react';

import {
  AppRegistry,
} from 'react-native'

import { Navigation } from 'react-native-navigation';

import PostsMap from './PostsMap/components/index.js'
import PostDetails from './PostDetails/components/index.js'
import PhotoView from './PhotoView/components/index.js'
import PhotoZoomView from './PhotoView/components/zoom.js'
import PhotoEditView from './PhotoEditView/components/index.js'

export function registerScreens() {
    Navigation.registerComponent('Client', () => PostsMap);
    Navigation.registerComponent('page.PostDetails', () => PostDetails);
    Navigation.registerComponent('page.PhotoView', () => PhotoView);
    Navigation.registerComponent('page.PhotoEditView', () => PhotoEditView);
    Navigation.registerComponent('page.PhotoZoomView', () => PhotoZoomView);
}