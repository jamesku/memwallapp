import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Dimensions, Image, Text, View, Button, TextInput, TouchableHighlight,
StyleSheet, FlatList, RefreshControl, TouchableOpacity, ActivityIndicator, Animated, Platform, StatusBar } from 'react-native';
import { logout } from '../redux/actions/auth';
import Drawer, { Message } from 'react-native-bottom-drawer';


const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;


var isHidden = true;

class Secured extends Component {

  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
      bounceValue: new Animated.Value(100),  //This is the initial position of the subview
      buttonText: "Show Subview"
      // visible: false
    };
  }

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

    // _toggleSubview() {
    //     this.setState({
    //       buttonText: !isHidden ? "Show Subview" : "Hide Subview"
    //     });
    //
    //     var toValue = 100;
    //
    //     if(isHidden) {
    //       toValue = 0;
    //     }
    //
    //     //This will animate the transalteY of the subview between 0 & 100 depending on its current state
    //     //100 comes from the style below, which is the height of the subview.
    //     Animated.spring(
    //       this.state.bounceValue,
    //       {
    //         toValue: toValue,
    //         velocity: 3,
    //         tension: 2,
    //         friction: 8,
    //       }
    //     ).start();
    //
    //     isHidden = !isHidden;
    //   }

    _renderSlidingUpPanel() {
      return (
        <View style={styles.container}>
       <StatusBar barStyle={"light-content"} />
       <Image style={styles.image} source={{uri: 'https://i.imgur.com/Ew8AIQ3.jpg'}}>
         <Drawer>
           <Message
             title="World Agrees To Just Take Down Internet For A While Until They Can Find A Good Use For It"
             message="NEW YORK—Saying the global computer network will cease to be available to users as of midnight tonight, the people of the world announced plans Wednesday to shut down the entire internet until such time as a good use for it can be found. According to the earth’s 7.5 billion inhabitants, the internet—a technology that allows every human on the face of the planet to communicate and share data with every other human—seemed like an excellent idea at first. But while limited parts of the internet were deemed beneficial and may one day be salvaged, the global populace concluded that the overwhelming majority of it is really awful, and in some cases, even dangerous."
           />
           <Message
             title="Middle Eastern Man Not Sure How Many Days’ Worth Of Airport Detention Clothes To Pack"
             message="MUSCAT, OMAN—Sifting through various items in his dresser and closet, 36-year-old Omani graduate student Raed Saleh told reporters Monday that he was not sure how many days’ worth of airport detention clothes to bring for his upcoming trip to the United States. “I definitely want to pack enough to last me the entire time I’m detained at Newark International Airport, but I also don’t want to overdo it,” said Saleh, adding that five T-shirts would likely be enough to avoid having to do laundry while he is being held for questioning by Immigration and Customs Enforcement agents..."
           />
           <Message
             title="DAY 45: Jeff Sessions Spits In Face Of FBI Interrogator Trying To Get Him To Turn On Trump"
             message="WASHINGTON—Angrily dismissing offers of a plea deal if he would agree to cooperate with an investigation into the current administration’s ties to Russia, Attorney General Jeff Sessions reportedly spit in the face of an FBI interrogator Thursday who was attempting to convince him to turn on President Trump. “If you goddamn Feds want to know whether I’ll turn rat: Here’s my answer,” said Sessions, shortly before leaning over the small wooden table separating him and his interrogator and spitting directly into the FBI official’s eyes. “I’m not gonna crack, so you G-men can threaten me with whatever the hell you want—you’re just wasting your time. I’ll fucking die before I flip, so you got the balls to kill me?”"
           />
         </Drawer>
       </Image>
     </View>
        // <View style={styles.container}>
        //   <SlidingUpPanel
        //     ref={c => this._panel = c}
        //     showBackdrop={false}
        //     visible={this.state.visible}
        //     onRequestClose={() => this.setState({visible: false})}>
        //     <View style={styles.panel}>
        //       <Text>Here is the content inside panel</Text>
        //       <Button title='hide' onPress={() => this._panel.transitionTo(0)} />
        //     </View>
        //   </SlidingUpPanel>
        // </View>

    //     <View style={styles.container}>
    //      <TouchableHighlight style={styles.button} onPress={()=> {this._toggleSubview()}}>
    //        <Text style={styles.buttonText}>{this.state.buttonText}</Text>
    //      </TouchableHighlight>
    //      <Animated.View
    //        style={[styles.subView,
    //          {transform: [{translateY: this.state.bounceValue}]}]}
    //      >
    //        <Text>This is a sub view</Text>
    //      </Animated.View>
    //  </View>
      )
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

      return (
        <View style={styles.fill}>
          <View style = {styles.fill}>
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
              <TextInput
              style={styles.title}
              // onChangeText = {return()}
              placeholder = "happy"
              underlineColorAndroid = "transparent"
              multiline={false}
              />
            </Animated.View>
          </View>

          {this._renderSlidingUpPanel()}
        </View>
      );
    }

}


const mapStateToProps = (state, ownProps) => {
    return {
        username: state.auth.username
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => { dispatch(logout()); }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Secured);


const styles = StyleSheet.create({
  fill: {
    flex: 1,
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
 //  container: {
 //   flex: .2,
 //   justifyContent: 'center',
 //   alignItems: 'center',
 //   backgroundColor: '#F5FCFF',
 //  //  marginTop: 66
 // },
 // button: {
 //   padding: 8,
 // },
 // buttonText: {
 //   fontSize: 17,
 //   color: "#007AFF"
 // },
 // subView: {
 //   position: "absolute",
 //   bottom: 0,
 //   left: 0,
 //   right: 0,
 //   backgroundColor: "#FFFFFF",
 //   height: 100,
 // }
 //  container: {
 //   flex: 1,
 //  //  backgroundColor: 'white',
 //   alignItems: 'center',
 //   justifyContent: 'center'
 // },
 //  panel: {
 //    flex: 1,
 //    backgroundColor: 'white',
 //    position: 'relative'
 //  },
});
