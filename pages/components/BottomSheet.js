
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Animated, Image, Dimensions} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';


var wheight = Dimensions.get('window').height;

class BottomSheet extends Component {

  constructor(props) {
    super(props);
    this.state = {
      myText: 'I\'m ready to get swiped!',
      gestureName: 'none',
      backgroundColor: '#fff',
      bounceValue: new Animated.Value(100),  //This is the initial position of the subview
      buttonText: "Show Subview",
      isHidden: true
    };
  }


  _toggleSubview() {
      this.setState({
        buttonText: !this.state.isHidden ? "Show Subview" : "Hide Subview"
      });

      var toValue = 100;

      if(this.state.isHidden) {
        toValue = 0;
      }

      this.setState({
        isHidden: !this.state.isHidden
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

  onSwipeUp(gestureState) {
    this.setState({myText: 'You swiped up!'});
  }

  onSwipeDown(gestureState) {
    this.setState({myText: 'You swiped down!'});
  }

  onSwipeLeft(gestureState) {
    this.setState({myText: 'You swiped left!'});
  }

  onSwipeRight(gestureState) {
    this.setState({myText: 'You swiped right!'});
  }

  onSwipe(gestureName, gestureState) {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    this.setState({gestureName: gestureName});
    switch (gestureName) {
      case SWIPE_UP:
        this.setState({backgroundColor: 'red'});
        break;
      case SWIPE_DOWN:
        this.setState({backgroundColor: 'green'});
        break;
      case SWIPE_LEFT:
        this.setState({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
        this.setState({backgroundColor: 'yellow'});
        break;
    }
  }

  _renderBottomButton(){
    if (this.state.isHidden){
    return(
      <TouchableHighlight style={styles.button} onPress={()=> {this._toggleSubview()}}>
      <Image
                style={this.state.isHidden ? styles.buttonNotHidden : styles.buttonHidden}
                source={require('./../../redux/images/circleplus.png')}
                resizeMode='contain'
          />
      </TouchableHighlight>
      )
    }
  return;
  }

  render() {

    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <GestureRecognizer
        onSwipe={(direction, state) => this.onSwipe(direction, state)}
        onSwipeUp={()=> {this._toggleSubview()}}
        onSwipeDown={()=> {this._toggleSubview()}}
        // onSwipeLeft={(state) => this.onSwipeLeft(state)}
        // onSwipeRight={(state) => this.onSwipeRight(state)}
        config={config}
        style={this.state.isHidden ? styles.isHidden : styles.notHidden}
        >
        <View style={this.state.isHidden ? styles.container : styles.backback}>
        {this._renderBottomButton()}
                  <Animated.View
                    style={[styles.subView,
                      {transform: [{translateY: this.state.bounceValue}]}]}
                  >
                  <View style={{flexDirection: 'row', flex:.5}}>
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

              </View>

      </GestureRecognizer>
    );
  }
}


var styles = StyleSheet.create({
  isHidden: {
    flex: .05,
    backgroundColor: "rgba(0,0,0,0)",

  },
  backback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(211,211,211)',
    marginTop: 0
  },
  notHidden: {
    flex: .12,
    backgroundColor: "rgba(0,0,0,0)",
  },
  buttonNotHidden: {
  flex:1, height: wheight/45, margin:0, opacity:1
  },
  buttonHidden: {
    flex:1, height: wheight/45, margin:0, opacity:0
  },
  container: {
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
