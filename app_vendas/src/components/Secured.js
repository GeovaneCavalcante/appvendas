import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,
    Button
} from 'react-native';

export default class Secured extends Component {
    render() {
        return (
            <ScrollView style={{padding: 20}}>
                <Text 
                    style={{fontSize: 27}}>
                    Bem vindo
                </Text>
                <View style={{margin:20}} />
                <Button
                            onPress={this.props.onLogoutPress}
                            title="Logout"
                     />
                </ScrollView>
                )
    }
}