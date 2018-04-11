import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Router from './src/components/routes/routes';

import Login from './src/components/Login/Login';

import Secured from './src/components/Secured';


type Props = {};

export default class App extends Component<Props> {

  state = {
    isLoggingIn: false,
  }

  render() {
   if (this.state.isLoggedIn) 
      return <Secured 
          onLogoutPress={() => this.setState({isLoggedIn: false})}
        />;
    else 
      return <Login onLoginPress={() => this.setState({isLoggedIn: true})}/>;
    }
}

