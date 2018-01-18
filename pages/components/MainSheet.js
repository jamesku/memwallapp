import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Animated, Image, Dimensions} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';


var windowWidth = Dimensions.get('window').width;
var windowHeight = Dimensions.get('window').height;
const subviewWidth = windowWidth;

class MainSheet extends Component {

  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: '#fff',
      bounceValue: new Animated.Value(subviewWidth),  //This is the initial position of the subview
      menuIsHidden: true,
    };
  }

  _toggleSubviewLeft() {

      var toValue = 0;

      //This will animate the transalteY of the subview between 0 & 100 depending on its current state
      //100 comes from the style below, which is the height of the subview.
      Animated.spring(
        this.state.bounceValue,
        {
          toValue: toValue,
          velocity: 3,
          tension: 2,
          friction: 8,
        }
      ).start();
    }

  _toggleSubviewRight() {

      //controls width of tab
      var toValue = subviewWidth/1.2;

      //This will animate the transalteY of the subview between 0 & 100 depending on its current state
      //100 comes from the style below, which is the height of the subview.
      Animated.spring(
        this.state.bounceValue,
        {
          toValue: toValue,
          velocity: 3,
          tension: 2,
          friction: 8,
        }
      ).start();
    }


  _renderAnimatedView(){
    return(
    <Animated.View
      style={[styles.subView,
      {transform: [{translateX: this.state.bounceValue}]}]}
    >
    <View style={{flexDirection: 'column', flex:.8}}>
    <Text> PROFILEtest </Text>
        </View>
      </Animated.View>
    );
  }


  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <GestureRecognizer
        onSwipeRight={()=> {this._toggleSubviewRight()}}
        onSwipeLeft={()=> {this._toggleSubviewLeft()}}
        config={config}
        style={styles.notHidden}
        >
        <View style={styles.greyBackground}>
          {this._renderAnimatedView()}
        </View>
      </GestureRecognizer>
    );
  }
}

  var styles = StyleSheet.create({
  greyBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 0
  },
  notHidden: {
    width:subviewWidth,
    backgroundColor: "rgba(0,0,0,0)",
  },
  subView:{
    // position:'absolute',
    height:windowHeight,
    bottom:0,
    width:windowWidth,
    backgroundColor: "#FFFFFF",
    left:0,
  }
  });


export default MainSheet;
