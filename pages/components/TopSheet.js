
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Animated, Image, Dimensions} from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { connect } from 'react-redux';

var wheight = Dimensions.get('window').height;


class TopSheet extends Component {

  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: '#fff',
      bounceValue: new Animated.Value(0),  //This is the initial position of the subview
      isHidden: true,
      menu: this.props.activeMenu
    };
  };


  _toggleSubview() {

      var toValue = wheight;

      if(this.state.isHidden) {
        toValue = wheight-100;
      }

      this.setState({
        isHidden: !this.state.isHidden,
        menu: 'x'
      })
      alert(this.state.menu);
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
    if (this.state.isHidden){
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

  componentWillMount(){
    if(this.props.activeMenu != this.state.menu) {
      // alert("star");
      this.setState({menu: this.props.activeMenu});
      // this._toggleSubview();
    }
  }

  render() {

alert(this.state.menu+"tab");
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <GestureRecognizer
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

              </View>

      </GestureRecognizer>
    );
  }
}


var styles = StyleSheet.create({
  isHidden: {
    flex: .23,
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
    flex: .1,
    backgroundColor: "rgba(0,0,0,0)",
  },
  buttonNotHidden: {
  flex:1, height: wheight/45, margin:0, opacity:1
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
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    zIndex:100,
    opacity:1
  }
});


const mapStateToProps = (state, ownProps) => {
    return {
        activeMenu: state.menus.menu
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setActiveMenu: () => { dispatch(activeMenu(null)); }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopSheet);
