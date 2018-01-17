import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Dimensions, Image, Text, View, Button, TextInput, TouchableHighlight,
StyleSheet, FlatList, RefreshControl, TouchableOpacity, ActivityIndicator, Animated, Platform, StatusBar } from 'react-native';
import { logout } from '../redux/actions/auth';
import { activeMenu } from '../redux/actions/menus';
import BottomSheet from './components/BottomSheet.js';
import TopSheet from './components/TopSheet.js';
import SideMenu from 'react-native-side-menu';
import Menu from './components/Menu';


const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

var windowWidth = Dimensions.get('window').width;

class Secured extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      scrollY: new Animated.Value(0),
      bounceValue: new Animated.Value(100),  //This is the initial position of the subview
      buttonText: "Show Subview",
      isOpen: false,
      selectedItem: 'About',
      thisActiveMenu: 'none',
    };
  }


  toggle() {
     this.setState({
       isOpen: !this.state.isOpen,
     });
   }

   updateMenuState(isOpen) {
     this.setState({ isOpen });
   }

   onMenuItemSelected = item =>
     this.setState({
       isOpen: false,
       selectedItem: item,
     });

    userLogout(e) {
        this.props.onLogout();
        e.preventDefault();
    }

    _renderScrollViewContent() {
      const data = Array.from({ length: 30 });
      return (
        <View style={styles.scrollViewContent}>
          {data.map((_, i) => (
            <View key={i} style={styles.row}>
              <Text>{i}</Text>
            </View>
          ))}
        </View>
      );
    }


    _renderSideMenu(){
      const menu = <Menu onItemSelected={this.onMenuItemSelected} />;

      return (
        <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
        >

        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to React Native!
          </Text>
          <Text style={styles.instructions}>
            To get started, edit index.ios.js
          </Text>
          <Text style={styles.instructions}>
            Press Cmd+R to reload,{'\n'}
            Cmd+Control+Z for dev menu
          </Text>
          <Text style={styles.instructions}>
            Current selected menu item is: {this.state.selectedItem}
          </Text>
        </View>
        <TouchableOpacity
          onPress={this.toggle}
          style={styles.button}
        >
        </TouchableOpacity>
      </SideMenu>
    );
    }


    _renderSlidingUpPanel() {
      return (
        <BottomSheet />
      )
    }

    _renderSlidingDownPanel(){
      return (
        <TopSheet menu={this.state.thisActiveMenu} _setActiveMenu={this._setActiveMenu.bind(this)}/>
      );
      }

    _setActiveMenu(activeMenu) {
      this.setState({thisActiveMenu : activeMenu});
      // alert("setActiveMenu called "+ this.state.thisActiveMenu);
      this.props.setActiveMenu(activeMenu);
    }

    render() {

      const headerTranslate = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, -HEADER_SCROLL_DISTANCE],
        extrapolate: 'clamp',
      });

      const imageOpacity = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 1, 0],
        extrapolate: 'clamp',
      });
      const imageTranslate = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 100],
        extrapolate: 'clamp',
      });

      const titleScale = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 1, 0.8],
        extrapolate: 'clamp',
      });
      const titleTranslate = this.state.scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 0, -8],
        extrapolate: 'clamp',
      });

      const menu = <Menu onItemSelected={this.onMenuItemSelected} />;

      return (

        <View style={styles.fill}>

          <View style={styles.fill}>

            <SideMenu
            menu={menu}
            isOpen={this.state.isOpen}
            openMenuOffset={windowWidth*.80}
            onChange={isOpen => this.updateMenuState(isOpen)}
            >

              <View style={styles.fill}>

                <View style = {styles.absoluteFill}>
                  <StatusBar
                    translucent
                    barStyle="light-content"
                    backgroundColor="rgba(0, 0, 0, 0.251)"
                  />
                  <Animated.ScrollView
                  style={styles.fill}
                  scrollEventThrottle={1}
                  onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                    { useNativeDriver: true },
                  )}
                  >

                    {this._renderScrollViewContent()}

                </Animated.ScrollView>

                <Animated.View
                  style={[
                    styles.header,
                    { transform: [{ translateY: headerTranslate }] },
                  ]}
                >
                  <Animated.Image
                    style={[
                      styles.backgroundImage,
                      {
                        opacity: imageOpacity,
                        transform: [{ translateY: imageTranslate }],
                      },
                    ]}
                    source={require('../redux/images/cat.jpg')}
                  />
                </Animated.View>

                <Animated.View
                  style={[
                    styles.bar,
                    {
                      transform: [
                        { scale: titleScale },
                        { translateY: titleTranslate },
                      ],
                    },
                  ]}
                >

                <View style={{flexDirection: 'row'}}>
                  <View style={{flex:1, alignItems:'flex-start'}}>
                  <TouchableHighlight onPress={()=> {this._setActiveMenu("star");}}>
                    <Image
                      style={{flex:1}}
                      source={require('./../redux/images/star.png')}
                      resizeMode='contain'
                      />
                    </TouchableHighlight>
                  </View>

                  <View style={{flex:1, alignItems:'center'}}>
                    <TextInput
                      style={styles.title}
                      // onChangeText = {return()}
                      placeholder = "happy"
                      underlineColorAndroid = "transparent"
                      multiline={false}
                    />
                  </View>
                  <View style={{flex:1, alignItems:'flex-end'}}>
                    <Image
                      style={{flex:1}}
                      source={require('./../redux/images/hamburger.png')}
                      resizeMode='contain'
                    />
                  </View>
                </View>
                </Animated.View>
              </View>
              <View style={styles.alignBottom}>
              {this._renderSlidingUpPanel()}
              </View>
              <View style={styles.aligntop}>
              {this._renderSlidingDownPanel()}
              </View>

              </View>
            </SideMenu>
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
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
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
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
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
