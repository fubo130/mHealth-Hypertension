import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Signup } from './Signup';
import {Login} from './Login';



export class HomeScreen extends React.Component {
    render() {

      return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text> This is my Home screen </Text>
          <Signup/>
        </View>
      );
    }
  }
  