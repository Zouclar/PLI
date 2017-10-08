import React, { Component } from 'react';

import { AppRegistry, View } from 'react-native';

import { Navigation } from 'react-native-navigation';

import { registerScreens } from './pages'

registerScreens(); // this is where you register all of your app's screens

// start the app
Navigation.startSingleScreenApp({
    screen: {
            label: 'Map',
                screen: 'page.Inscription', // this is a registered name for a screen
            title: 'Inscription'
        },

});
