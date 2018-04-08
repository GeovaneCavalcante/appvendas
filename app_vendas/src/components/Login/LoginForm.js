import React, { Component } from 'react';

import { View, Text, TextInput, TouchableOpacity,StyleSheet, Alert, Button, StatusBar} from 'react-native';

export default class LoginForm extends Component {
  render() {
    return (
      <View>
           <TextInput style = {styles.input} 
                autoCapitalize="none" 
                onSubmitEditing={() => this.passwordInput.focus()} 
                autoCorrect={false} 
                keyboardType='email-address' 
                returnKeyType="next" 
                placeholder='Email' 
                placeholderTextColor='#878080'/>

            <TextInput style = {styles.input}   
                returnKeyType="go" 
                ref={(input)=> this.passwordInput = input} 
                placeholder='Password' 
                placeholderTextColor='#878080' 
                secureTextEntry/>

            <TouchableOpacity style={styles.buttonContainer} 
                        >
                <Text  style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity> 
      </View> 
    );
  }
}


const styles = StyleSheet.create({
    container: {
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