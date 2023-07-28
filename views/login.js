import React, {Component} from 'react';
import {View, StatusBar, ImageBackground, Image, Text, TouchableOpacity, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {resetData} from '../store/globle/action';

import {styles} from '../styles/login_style';
import img from '../imgs/img';
import api from '../config/api';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      code: '',
    };
  }

  async saveToken(value) {
    try {
      await AsyncStorage.setItem('token', value);
      this.getUserinfo();
    } catch (e) {
      // saving error
    }
  }

  getUserinfo() {
    api.get('app/user/info', res => {
      this.props.resetData(res.data);
      setTimeout(() => {
        this.props.navigation.reset({
          index: 0,
          routes: [{name: 'Index'}],
        });
      }, 50);
    });
  }

  toNextPage(pageName) {
    this.props.navigation.navigate(pageName);
  }

  Login() {
    if (this.state.phone.length !== 11) {
      api.toast('请输入正确的手机号码!');
      return;
    }
    if (this.state.code.length !== 6) {
      api.toast('请输入正确的密码!');
      return;
    }
    api.login(this.state.phone, this.state.code, res => {
      api.formateJSON(res);
      if (res.code === 200) {
        this.saveToken(res.data.token);
      } else {
        api.toast(res.msg);
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground style={styles.Bgcontainer} source={img.loginBg}>
          <StatusBar backgroundColor="transparent" translucent={true} />
          <View style={styles.safeView}>
            <Image style={styles.logo} source={img.logo} />
            <View style={styles.InnerView}>
              <Text style={styles.loginTitle}>手机号码登录</Text>
              <View style={styles.inputView}>
                <Text style={styles.inputTitle}>手机号码</Text>
                <TextInput
                  style={styles.inputPhone}
                  onChangeText={text => this.setState({phone: text})}
                  value={this.state.phone}
                  placeholder="请输入手机号"
                  maxLength={11}
                  keyboardType="number-pad"
                />
                <Text style={styles.inputTitle}>密码</Text>
                <View style={styles.inputCodeView}>
                  <TextInput
                    style={styles.inputCode}
                    onChangeText={text => this.setState({code: text})}
                    value={this.state.code}
                    placeholder="请输入密码"
                    maxLength={6}
                    keyboardType="number-pad"
                    secureTextEntry
                  />
                  {/* <View style={styles.sendCodeView}>
                    <Text style={styles.sendCodeText}>发送验证码</Text>
                  </View> */}
                </View>
                <TouchableOpacity style={styles.loginBtnView} onPress={() => this.Login()}>
                  <Text style={styles.loginBtnText}>登录</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* <Text style={styles.loginTypeTip}>其他登录方式</Text> */}
            <View style={styles.allowView}>
              <Image style={styles.allowIcon} source={img.allowIcon} />
              <Text style={styles.allowText}>
                同意《健康智脑APP
                <Text style={styles.clickText}>用户协议</Text>和<Text style={styles.clickText}>隐私政策</Text>条款》
              </Text>
            </View>
          </View>
        </ImageBackground>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
