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
import ProfileTab from './UserProfile/components/profile.js'
import RecentPostsTab from './UserProfile/components/recent.js'
import FriendsTab from './UserProfile/components/friendsTab.js'
import ErrorNotification from '../notifications/error.notification'
import SuccessNotification from '../notifications/success.notification'
import GeneralChat from '../pages/Chat/components/index'
import PrivateChat from '../pages/Chat/components/private'
import UserListDrawer from '../pages/Chat/components/userList'
import SideMenu from '../menu/sideMenu'

export function registerScreens() {
    Navigation.registerComponent('Client', () => PostsMap);
    Navigation.registerComponent('page.PostDetails', () => PostDetails);
    Navigation.registerComponent('page.PhotoView', () => PhotoView);
    Navigation.registerComponent('page.PhotoEditView', () => PhotoEditView);
    Navigation.registerComponent('page.PhotoZoomView', () => PhotoZoomView);
    Navigation.registerComponent('page.Connection', () => Connection);
    Navigation.registerComponent('page.Inscription', () => Inscription);
    Navigation.registerComponent('page.UserProfileView', () => UserProfileView);
    Navigation.registerComponent('page.ProfileTab', () => ProfileTab);
    Navigation.registerComponent('page.RecentPostsTab', () => RecentPostsTab);
    Navigation.registerComponent('page.FriendsTab', () => FriendsTab);
    Navigation.registerComponent('notification.error', () => ErrorNotification);
    Navigation.registerComponent('notification.success', () => SuccessNotification);
    Navigation.registerComponent('page.Chat', () => GeneralChat);
    Navigation.registerComponent('page.PrivateChat', () => PrivateChat);
    Navigation.registerComponent('page.userListDrawer', () => UserListDrawer);
    Navigation.registerComponent('page.SideMenu', () => SideMenu);
}