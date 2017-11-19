import React, { Component } from 'react';

import { AppRegistry, View } from 'react-native';

import { Navigation } from 'react-native-navigation';

import AppConfig from './config.js'

import { registerScreens } from './pages'

registerScreens(); // this is where you register all of your app's screens

AppConfig.put("APIBaseUrl", "https://server.lasjunies.fr:8443");
AppConfig.put("AssetsBaseUrl", "https://server.lasjunies.fr");
AppConfig.put("ChatBaseUrl", "https://server.lasjunies.fr:2222");

AppConfig.readStoredToken();

// start the app
Navigation.startSingleScreenApp({
    screen: {
        label: 'EventMap',
        screen: 'page.EventMap', // this is a registered name for a screen
        title: 'EventMap'
    },
    /*drawer: {
        right: {
            screen: 'page.userListDrawer'
        },
        left: null
    }*/
});