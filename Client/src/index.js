import React, { Component } from 'react';

import {
  AppRegistry,
} from 'react-native';

import PostsMap from './pages/PostsMap/components/index.js'

class Client extends Component {
	render() {
		return (<PostsMap></PostsMap>);
	}
}

module.exports = Client;
