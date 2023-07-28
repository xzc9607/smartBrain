import React, {Component} from 'react';
import {View, StatusBar, Image, Text, Animated, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import {resetData} from '../store/globle/action';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {styles} from '../styles/mian_style';
import {MC, safeHeight} from '../config/convert';
import img from '../imgs/img';
import api from '../config/api';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bodyInfoState: true,
      bodyInfoTitleTop: new Animated.Value(0),
      bodyInfoImgTop: new Animated.Value(MC(140)),
    };
    api.formateJSON(this.props.globle);
  }

  async exit() {
    this.props.resetData({});
    await AsyncStorage.removeItem('token');
    setTimeout(() => {
      this.props.navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }, 50);
  }

  toNextPage(pageName) {
    this.props.navigation.navigate(pageName);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <Image style={styles.topBg} source={img.topBg} />
        <View style={styles.safeView}>
          <View style={styles.navView}>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
              <View style={styles.backIconView}>
                <Image style={styles.backIcon} source={img.backIcon} />
              </View>
            </TouchableWithoutFeedback>

            <Text style={styles.navTitle}>个人中心</Text>
          </View>
          <View style={styles.userInfoView}>
            <Text style={styles.userName}>{this.props.globle.userdata.userName}</Text>
            <View style={styles.userUseDay}>
              <Text style={{color: '#ffffff', fontSize: MC(20)}}>已使用健康智脑1333天</Text>
            </View>
            <TouchableWithoutFeedback onPress={() => this.toNextPage('UserInfo')}>
              <View style={styles.userAvatar}>
                <Image style={styles.userAvatarImg} source={img.userAvatar} />
                <Image style={styles.backIcon2} source={img.backIcon} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.mainView}>
            <TouchableWithoutFeedback onPress={() => this.toNextPage('UserInfo')}>
              <View style={styles.itemTop}>
                <Image style={styles.ItemIcon} source={img.myIcon} />
                <Text style={styles.ItemText}>个人信息</Text>
                <Image style={styles.backIcon3} source={img.backIconBlck} />
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.itemMid}>
              <Image style={styles.ItemIcon} source={img.kefuIcon} />
              <Text style={styles.ItemText}>客服帮助</Text>
              <Image style={styles.backIcon3} source={img.backIconBlck} />
            </View>
            <View style={styles.itemMid}>
              <Image style={styles.ItemIcon} source={img.aboutIcon} />
              <Text style={styles.ItemText}>关于我们</Text>
              <Image style={styles.backIcon3} source={img.backIconBlck} />
            </View>
            <TouchableWithoutFeedback onPress={() => this.toNextPage('Setting')}>
              <View style={styles.itemEnd}>
                <Image style={styles.ItemIcon} source={img.setIcon} />
                <Text style={styles.ItemText}>设置</Text>
                <Image style={styles.backIcon3} source={img.backIconBlck} />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => this.exit()}>
              <View style={styles.itemExit}>
                <Image style={styles.ItemIcon} source={img.exitIcon} />
                <Text style={styles.ItemText}>退出登录</Text>
                <Image style={styles.backIcon3} source={img.backIconBlck} />
              </View>
            </TouchableWithoutFeedback>
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

export default connect(mapStateToProps, mapDispatchToProps)(Index);
