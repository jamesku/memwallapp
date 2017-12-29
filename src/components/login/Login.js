import React, { Component } from 'react';
import LoginForm from './LoginForm';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
          <View style = {styles.logoConten}>
            <Image
             style = {styles.logo}
             source={require('../images/heart.png')} />
          <Text style = {styles.titleApp}>An App make for github using React native</Text>
          </View>
          <LoginForm style ={{flex:0}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B8057',
  },
  logoConten:{
    flexGrow :1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleApp: {
    width : 200,
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color :'#ffffff'
  },
  logo:{
    width:100,
    height: 100
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
