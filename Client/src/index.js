import React, { Component } from 'react';

import {
  AppRegistry,
} from 'react-native';

import PostDetails from './pages/PostDetails/components/index.js'

class Client extends Component {
	render() {
		return (<PostDetails></PostDetails>);
	}
}

module.exports = Client;
