import React, { Component } from 'react';
import { connect } from 'react-redux';
import Login from './Login';
import Secured from './Secured';
import Signup from './Signup';

class Application extends Component {
    render() {
        if (this.props.isLoggedIn === "yes") {
            return <Secured />;
        }
        else if (this.props.isLoggedIn === "signup") {
            return <Signup />;
          }
        else
          {
            return <Login />;
          }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    };
}

export default connect(mapStateToProps)(Application);
