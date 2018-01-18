
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Animated, Image, Dimensions} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';


var wheight = Dimensions.get('window').height;
const subviewHeight = wheight/10;

class BottomSheet extends Component {

  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: '#fff',
      bounceValue: new Animated.Value(subviewHeight),  //This is the initial position of the subview
      menuIsHidden: true
    };
  }


  _toggleSubview() {

      var toValue = 0;

      if(!this.state.menuIsHidden) {
        toValue = 100;
      }

      this.setState({
        menuIsHidden: !this.state.menuIsHidden
      })

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


  _renderBottomButton(){
    if (this.state.menuIsHidden){
    return(
      <TouchableHighlight style={styles.button} onPress={()=> {this._toggleSubview()}}>
      <Image
                style={styles.buttonNotHidden}
                source={require('./../../redux/images/circleplus.png')}
                resizeMode='contain'
          />
      </TouchableHighlight>
      )
    }
  return;
  }

  _renderAnimatedView(){
    return(
    <Animated.View
      style={[styles.subView,
      {transform: [{translateY: this.state.bounceValue}]}]}
    >
    <View style={{flexDirection: 'row', flex:.8}}>
    <Image
              style={{flex:1, height: wheight/10}}
              source={require('./../../redux/images/camera.png')}
              resizeMode='contain'
        />
    <Image
              style={{flex:1, height: undefined, width: undefined}}
              source={require('./../../redux/images/text.png')}
              resizeMode='contain'
        />
    <Image
              style={{flex:1, height: undefined, width: undefined}}
              source={require('./../../redux/images/video.png')}
              resizeMode='contain'
        />
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
        onSwipeUp={()=> {this._toggleSubview()}}
        onSwipeDown={()=> {this._toggleSubview()}}
        config={config}
        style={(this.state.menuIsHidden) ? styles.menuIsHidden : styles.notHidden}
        >
        <View style={(this.state.menuIsHidden) ? styles.buttonContainer : styles.greyBackground}>
          {this._renderBottomButton()}
          {this._renderAnimatedView()}
        </View>
      </GestureRecognizer>
    );
  }
}


var styles = StyleSheet.create({
  menuIsHidden: {
    height: wheight/20,
    backgroundColor: "rgba(0,0,0,0)",
  },
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
  buttonNotHidden: {
  flex:1, height: wheight/45, margin:0, opacity:1
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 2,
  },
  button: {
    padding: 0,
  },
  buttonText: {
    fontSize: 17,
    color: "#007AFF"
  },
  subView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    zIndex:100,
    opacity:1
  }
});

export default BottomSheet;
