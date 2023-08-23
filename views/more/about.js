import React, {Component} from 'react';
import {View, StatusBar, Image, Text, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import {resetData} from '../../store/globle/action';

import img from '../../imgs/img';
import {styles} from '../../styles/setting_style';
class About extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content" />
        <View style={styles.safeView}>
          <View style={styles.navView}>
            <Text style={styles.navTitle}>关于我们</Text>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
              <View style={styles.backIconView}>
                <Image style={styles.backIcon} source={img.backIconBlck} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.mainView}>
            <Image style={styles.appicon} source={img.appicon} />
            <Text style={styles.aboutTitle}>健康智脑</Text>
            <Text style={styles.versionTitle}>版本信息: v0.0.1</Text>
            <Text style={styles.rightTitle}>杭州博健科技有限公司版权所有</Text>
          </View>
        </View>
      </View>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(About);
