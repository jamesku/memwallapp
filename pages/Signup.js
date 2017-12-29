import React, { Component } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import { connect } from 'react-redux';
import {submitNewUser} from '../redux/actions/auth';

import t from 'tcomb-form-native'; // 0.6.9

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  username: t.maybe(t.String),
  password: t.String,
  firstname: t.maybe(t.String),
  lastname: t.maybe(t.String)
  // terms: t.Boolean
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10
    },
  },
  controlLabel: {
    normal: {
      color: 'blue',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    // the style applied when a validation error occours
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  }
}

const options = {
  fields: {
    email: {
      error: 'Without an email address how are you going to reset your password when you forget it?'
    },
    password: {
      error: 'Choose something you use on a dozen other sites or something you won\'t remember'
    },
    terms: {
      label: 'Agree to Terms',
    },
  },
  stylesheet: formStyles,
};



class Signup extends Component {
  constructor (props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);

  };

  handleSubmit = () => {
    const value = this.refs.form.getValue();
    const userObj = { FirstName:value.firstname, LastName:value.lastname, Password:value.password, Email:value.email.toLowerCase()};
    this.props.onSignUp(userObj)
    // console.log('value: ', value);
  };

  render() {
    return (
      <View style={styles.container}>
        <Form
          ref="form"
          type={User}
          options={options}
        />
        <Button
          title="Sign Up!"
          onPress={()=>this.handleSubmit()}
        />

        <View style={{margin: 7}}>
      // <Button onPress={(e) => this.userLogin(e)} title="Log In"/>
      <Text style={{fontSize: 16, color: 'blue'}} onPress={(e) => this.login(e)}>Sign Up</Text>
      </View>  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    onSignUp: (value) => {
      if (value) {
        dispatch(submitNewUser(value));
      }
    }
  };
};

export default connect(null,mapDispatchToProps)(Signup);
