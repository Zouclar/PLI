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
import Connection from './Connection/components/index.js'
import Inscription from './Inscription/components/index.js'
import UserProfileView from './UserProfile/components/index.js'
import FriendsTab from './UserProfile/components/friendsTab.js'

export function registerScreens() {
    Navigation.registerComponent('Client', () => PostsMap);
    Navigation.registerComponent('page.PostDetails', () => PostDetails);
    Navigation.registerComponent('page.PhotoView', () => PhotoView);
    Navigation.registerComponent('page.PhotoEditView', () => PhotoEditView);
    Navigation.registerComponent('page.PhotoZoomView', () => PhotoZoomView);
    Navigation.registerComponent('page.Connection', () => Connection);
    Navigation.registerComponent('page.Inscription', () => Inscription);
    Navigation.registerComponent('page.UserProfileView', () => UserProfileView);
    Navigation.registerComponent('page.FriendsTab', () => FriendsTab);
}