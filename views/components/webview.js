import React, {Component} from 'react';
import {View, StatusBar, Image, Text, TouchableWithoutFeedback, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {resetData} from '../../store/globle/action';
import {WebView} from 'react-native-webview';

import {MC, safeHeight, windowWidth, barHeight} from '../../config/convert';
import img from '../../imgs/img';

const INJECTEDJAVASCRIPT = `
    //这是缩放的js
    const meta = document.createElement('meta');
    meta.setAttribute('content', 'initial-scale=0.5, maximum-scale=0.5, user-scalable=0');
    meta.setAttribute('name', 'viewport');
    document.getElementsByTagName('head')[0].appendChild(meta);
`;

class Webview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <View style={styles.safeView}>
          <View style={styles.navView}>
            <Text style={styles.navTitle}>{this.props.route.params.title}</Text>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
              <View style={styles.backIconView}>
                <Image style={styles.backIcon} source={img.backIconBlck} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <WebView
            style={styles.mainView}
            source={{uri: this.props.route.params.weburi}}
            textZoom={100}
            javaScriptEnabled={true}
            scalesPageToFit={false}
            injectedJavaScript={INJECTEDJAVASCRIPT}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeView: {
    position: 'absolute',
    width: windowWidth,
    height: safeHeight,
    top: barHeight,
    alignItems: 'center',
  },
  navView: {
    height: MC(88),
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitle: {
    color: '#001134',
    fontSize: MC(32),
    fontWeight: '500',
  },
  backIconView: {
    position: 'absolute',
    left: 0,
    width: MC(88),
    height: MC(88),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    position: 'absolute',
    left: MC(54),
    width: MC(12),
    height: MC(24),
  },
  mainView: {
    flex: 1,
    backgroundColor: '#F8FAFF',
    width: windowWidth,
  },
});

export {styles};

function mapStateToProps(state) {
  return {
    globle: state.globle,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetData: data => dispatch({...resetData(), data}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Webview);
