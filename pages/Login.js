import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, TextInput, View, Button } from 'react-native';
import { loginUser, signup } from '../redux/actions/auth';

class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }

    userLogin (e) {
      const cred = {
        email: this.state.email.toLowerCase(),
        password: this.state.password
      }
        this.props.onLogin(cred);
        e.preventDefault();
    }

    signUp (e) {
        this.props.onSignUp();
        e.preventDefault();
    }


    render () {
        return (
            <ScrollView style={{padding: 20}}>
                <Text style={{fontSize: 27}}>Log In</Text>
                <TextInput
                    placeholder='Email'
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoFocus={true}
                    keyboardType='email-address'
                    value={this.state.email}
                    onChangeText={(text) => this.setState({ email: text })} />
                <TextInput
                    placeholder='Password'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(text) => this.setState({ password: text })} />
                <View style={{margin: 7}}/>
                <Button onPress={(e) => this.userLogin(e)} title="Log In"/>
                <Text style={{fontSize: 16, color: 'blue'}} onPress={(e) => this.signUp(e)}>Sign Up</Text>
            </ScrollView>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogin: (cred) => { dispatch(loginUser(cred)); },
        onSignUp: () => { dispatch(signup()); }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
