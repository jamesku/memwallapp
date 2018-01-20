import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Dimensions, Image, Text, View, Button, TextInput, TouchableHighlight,
StyleSheet, FlatList, RefreshControl, TouchableOpacity, ActivityIndicator, Animated, Platform, StatusBar } from 'react-native';
import { logout } from '../redux/actions/auth';
import { activeMenu } from '../redux/actions/menus';
import BottomSheet from './components/BottomSheet.js';
import TopSheet from './components/TopSheet.js';
import ProfileSheet from './components/ProfileSheet.js';
import MainSheet from './components/MainSheet.js';
import SideMenu from 'react-native-side-menu';
import Menu from './components/Menu';


// const HEADER_MAX_HEIGHT = 300;
// const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
// const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

var windowWidth = Dimensions.get('window').width;

class Secured extends Component {

  constructor(props) {
    super(props);


    this.state = {
      thisActiveMenu: 'none',
    };
  }

    userLogout(e) {
        this.props.onLogout();
        e.preventDefault();
    }



    _renderMainSheet(){
      return (
      <MainSheet />
      )
    }


    _renderSlidingUpPanel() {
      return (
        <BottomSheet />
      )
    }

    _renderSlidingDownPanel(){
      return (
        <View>
        <TopSheet menu={this.state.thisActiveMenu} _setActiveMenu={this._setActiveMenu.bind(this)}/>
        <ProfileSheet menu={this.state.thisActiveMenu} _setActiveMenu={this._setActiveMenu.bind(this)}/>
        </View>
      );
      }

    _setActiveMenu(activeMenu) {
      this.setState({thisActiveMenu : activeMenu});
      this.props.setActiveMenu(activeMenu);
    }

    render() {

      return (

        <View style={styles.fill}>
              <View style={styles.alignBottom}>
              {this._renderMainSheet()}
              </View>

          </View>

      );
    }

}



const mapStateToProps = (state, ownProps) => {
    return {
        username: state.auth.username,
        activeMenu: state.menus.menu
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => { dispatch(logout()); },
        setActiveMenu: (value) => { dispatch(activeMenu(value)); }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Secured);


const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  absoluteFill: {
    left:0,
    top:0,
    right:0,
    bottom:0,
    position: 'absolute',
  },
  alignBottom:{
    flex:1,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'transparent',
    width: windowWidth,
    zIndex:200,
  },
  alignTop:{
    flex:1,
    position: 'absolute',
    top: 0,
    backgroundColor: 'transparent',
    width: windowWidth,
    zIndex:200,
  },
  content: {
    flex: 1,
  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 28 : 38,
    height: 40,
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: 'white',
    fontSize: 18,
    width:100,
    // marginTop: Platform.OS === 'ios' ? -12 : -13,
    alignItems: "flex-end",
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: "bottom",
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    top: 20,
    padding: 10,
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
