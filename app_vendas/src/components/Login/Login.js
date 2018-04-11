import React, { Component } from 'react';

import { View,AsyncStorage, Alert, Actions, Text, TextInput, TouchableOpacity,StyleSheet, Image,  ActivityIndicator} from 'react-native';

import LoginForm from './LoginForm';

import Environment from '../../../Environment';

export default class Login extends Component {
  state = {
      username: '',
      password: '',
      isLoggingIn: false,
      message: ''
  }
  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

  _userLogin = () => {
   
    this.setState({ isLoggingIn: true, message: '' });

    var params = {
        email: this.state.username,
        password: this.state.password,
        grant_type: 'password'
    };

    var formBody = [];
    for (var property in params) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(params[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");
    var proceed = false;

    fetch('http://geovanedevelop.pythonanywhere.com/api-token-auth/', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.username,
        password: this.state.password,
      })
    })

    .then((response) => response.json())
    .then((response) => {
        if (response.non_field_errors){
            this.setState({message: response.non_field_errors});
        }
        else{
            proceed = true
            Alert.alert(response.token);
        };
    })
    .then(() => {
        this.setState({isLoggingIn: false})
        if (proceed) this.props.onLoginPress();
    })
    .catch(err => {
        this.setState({ message: err.message });
        this.setState({ isLoggingIn: false })
    });
  }

  clearUsername = () => {
      this._username.setNativeProps({ text: '' });
      this.setState({ message: '' });
  }

  clearPassword = () => {
      this._password.setNativeProps({ text: '' });
      this.setState({ message: '' });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loginContainer}>
              <Image resizeMode="contain" style={styles.logo} source={require('../../components/imagens/logo.png')} />
        </View>

        <View style={styles.formContainer}>
          <TextInput style = {styles.input} 
              onChangeText={(username) => this.setState({username})} 
              autoCapitalize="none" 
              onSubmitEditing={() => this.passwordInput.focus()} 
              autoCorrect={false} 
              keyboardType='email-address' 
              returnKeyType="next" 
              placeholder='Email' 
              placeholderTextColor='#878080'  
          />
          <TextInput style = {styles.input}   
              onChangeText={(password) => this.setState({password})} 
              returnKeyType="go" 
              ref={(input)=> this.passwordInput = input} 
              placeholder='Senha' 
              placeholderTextColor='#878080' 
              secureTextEntry
          />

        {!!this.state.message && (
            <Text
                style={{fontSize: 14, color: 'red', padding: 5}}>
                {this.state.message}
            </Text>
        )}
          {this.state.isLoggingIn && <ActivityIndicator />}
          <TouchableOpacity style={styles.buttonContainer} 
          disabled={this.state.isLoggingIn||!this.state.username||!this.state.password}
          onPress={this._userLogin}
                  >
                  <Text  style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity> 
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
  },
  containerLogin: {
    padding: 20
   },
   input:{
       height: 60,
       backgroundColor: 'rgba(225,225,225,0.2)',
       marginBottom: 10,
       padding: 10,
       color: '#726e6e',
       fontSize: 15
   },
  buttonContainer:{
    backgroundColor: '#2980b6',
    paddingVertical: 15,
    borderRadius: 4,
    marginTop: 20,
  },
  buttonText:{
      color: '#fff',
      textAlign: 'center',
      fontWeight: '700',
  }
})