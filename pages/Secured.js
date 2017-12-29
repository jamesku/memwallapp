import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ScrollView, Text, View, Button,
StyleSheet, FlatList, RefreshControl, TouchableOpacity, Animated, Platform, StatusBar } from 'react-native';
import { logout } from '../redux/actions/auth';



const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;


class Secured extends Component {

  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
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

    // render() {
    //     return (
    //         <ScrollView style={{padding: 20}}>
    //             <Text style={{fontSize: 27}}>
    //                 {`Welcome ${this.props.username}`}
    //             </Text>
    //             <View style={{margin: 20}}/>
    //             <Button onPress={(e) => this.userLogout(e)} title="Logout"/>
    //         </ScrollView>
    //     )
    // }
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
            <Text style={styles.title}>Title</Text>
          </Animated.View>
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
    height: 32,
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
});

Expo.registerRootComponent(App);