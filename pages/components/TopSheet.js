import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Animated, Image, Dimensions} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

var wheight = Dimensions.get('window').height;
const subviewHeight = wheight/1.2;

class TopSheet extends Component {

  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: '#fff',
      bounceValue: new Animated.Value(subviewHeight),  //This is the initial position of the subview
      menuIsHidden: true,
    };
  }

  componentDidUpdate() {
    if (this.props.menu === "star"){
      this._toggleSubviewDown();
    }
  }


  _toggleSubviewDown() {

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

  _toggleSubviewUp() {

      var toValue = 0-subviewHeight;

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
        setTimeout(() => {
          this.props._setActiveMenu("none");
        }, (1 * 500));
    }


  _renderAnimatedView(){
    return(
    <Animated.View
      style={[styles.subView,
      {transform: [{translateY: this.state.bounceValue}]}]}
    >
    <View style={{flexDirection: 'row', flex:.8}}>
    <Text> test </Text>
        </View>
      </Animated.View>
    );
  }


  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

if(this.props.menu === "star"){
    return (
      <GestureRecognizer
        onSwipeUp={()=> {this._toggleSubviewUp()}}
        onSwipeDown={()=> {this._toggleSubviewUp()}}
        config={config}
        style={styles.notHidden}
        >
        <View style={styles.greyBackground}>
          {this._renderAnimatedView()}
        </View>
      </GestureRecognizer>
    );
  }
  else {return null};
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
    height:subviewHeight,
    backgroundColor: "rgba(0,0,0,0)",
  },
  subView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    zIndex:100,
    opacity:1,
    height: subviewHeight,
  }
});

export default TopSheet;
