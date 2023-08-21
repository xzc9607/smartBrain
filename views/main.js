import React, {Component} from 'react';
import {View, StatusBar, Image, Text, Animated, TouchableWithoutFeedback, Alert, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {resetData} from '../store/globle/action';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {styles} from '../styles/mian_style';
import {MC} from '../config/convert';
import img from '../imgs/img';

const day = 24 * 60 * 60;
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bodyInfoState: true,
      bodyInfoTitleTop: new Animated.Value(0),
      bodyInfoImgTop: new Animated.Value(MC(140)),
      createTime: 0,
    };
  }

  componentDidMount() {
    this.dealCreateTime();
  }

  dealCreateTime() {
    let now = Date.now() / 1000;
    let time = this.props.globle.userdata.creatorTime;
    this.setState({createTime: Math.ceil((now - time) / day)});
  }

  exit() {
    Alert.alert('退出登录', '您确定要退出登录吗？', [
      {
        text: '取消',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: '退出',
        onPress: () => {
          this.logout();
        },
        style: 'default',
      },
    ]);
  }

  async logout() {
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
            <Text style={styles.userName}>{this.props.globle.userdata.realName}</Text>
            <View style={styles.userUseDay}>
              <Text style={{color: '#ffffff', fontSize: MC(20)}}>已使用健康智脑{this.state.createTime}天</Text>
            </View>
            <TouchableWithoutFeedback onPress={() => this.toNextPage('UserInfo')}>
              <View style={styles.userAvatar}>
                <Image
                  style={styles.userAvatarImg}
                  source={this.props.globle.userdata.gender === 2 ? img.womenAvatar : img.userAvatar}
                />
                <Image style={styles.backIcon2} source={img.backIcon} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.mainView}>
            <TouchableOpacity style={styles.itemTop} onPress={() => this.toNextPage('UserInfo')}>
              <Image style={styles.ItemIcon} source={img.myIcon} />
              <Text style={styles.ItemText}>个人信息</Text>
              <Image style={styles.backIcon3} source={img.backIconBlck} />
            </TouchableOpacity>
            <View style={styles.itemMid}>
              <Image style={styles.ItemIcon} source={img.kefuIcon} />
              <Text style={styles.ItemText}>客服帮助</Text>
              <Image style={styles.backIcon3} source={img.backIconBlck} />
            </View>
            <TouchableOpacity style={styles.itemMid} onPress={() => this.toNextPage('About')}>
              <Image style={styles.ItemIcon} source={img.aboutIcon} />
              <Text style={styles.ItemText}>关于我们</Text>
              <Image style={styles.backIcon3} source={img.backIconBlck} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemEnd} onPress={() => this.toNextPage('Setting')}>
              <Image style={styles.ItemIcon} source={img.setIcon} />
              <Text style={styles.ItemText}>设置</Text>
              <Image style={styles.backIcon3} source={img.backIconBlck} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemExit} onPress={() => this.exit()}>
              <Image style={styles.ItemIcon} source={img.exitIcon} />
              <Text style={styles.ItemText}>退出登录</Text>
              <Image style={styles.backIcon3} source={img.backIconBlck} />
            </TouchableOpacity>
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
