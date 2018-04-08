import React, { Component } from 'react';

import { View, Text, TextInput, TouchableOpacity,StyleSheet, Image} from 'react-native';

import LoginForm from './LoginForm';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
       <View style={styles.loginContainer}>
            <Image resizeMode="contain" style={styles.logo} source={require('../../components/imagens/logo.png')} />
       </View>

        <View style={styles.formContainer}>
          <LoginForm />
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#ede8e8',
  },
  loginContainer:{
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center'
  },
  logo: {
      position: 'absolute',
      width: 250,
      height: 150
  },

  formContainer:{
    flex: 2,
    padding: 20,
  }
})