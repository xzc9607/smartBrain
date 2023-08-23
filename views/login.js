import React, {Component} from 'react';
import {View, StatusBar, ImageBackground, Image, Text, TouchableOpacity, TextInput, Modal, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {resetData} from '../store/globle/action';

import img from '../imgs/img';
import api from '../config/api';
import {styles} from '../styles/login_style';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      code: '',
      isShowPrivacy: false,
      isAgree: false,
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

  showPrivacy() {
    if (!this.state.isShowPrivacy && !this.state.isAgree) {
      this.setState({isShowPrivacy: true});
    } else if (this.state.isAgree) {
      this.setState({isAgree: false});
    }
  }

  toNextPage(pageName) {
    this.props.navigation.navigate(pageName);
  }

  Login() {
    if (!this.state.isAgree) {
      this.setState({isShowPrivacy: true});
      return;
    }
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
            <TouchableOpacity style={styles.allowView} onPress={() => this.showPrivacy()}>
              <View style={styles.arrowView}>
                {this.state.isAgree ? <Image style={styles.allowIcon} source={img.allowIcon} /> : null}
              </View>
              <Text style={styles.allowText}>
                {/* 同意《健康智脑APP<Text style={styles.clickText}>用户协议</Text>和<Text style={styles.clickText}>隐私政策</Text>条款》 */}
                同意《健康智脑APP用户协议和隐私政策条款》
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <Modal
          animationType="fade"
          statusBarTranslucent={true}
          transparent={true}
          visible={this.state.isShowPrivacy}
          onRequestClose={() => {
            this.setState({isShowPrivacy: false});
          }}>
          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.privacyView}>
              <Text style={styles.privacyTitle}>服务协议与隐私政策</Text>
              <ScrollView>
                <Text style={styles.privacyContent}>
                  为了更好地保障您的个人权益，在您使用产品的全部功能前，请仔细阅读并理解《服务协议》和《隐私政策》，（您可以在【APP-我的-设置-隐私政策】中查看）。如您拒绝，将无法进行登录。
                </Text>
                <Text style={styles.privacyContent}>
                  1.【健康智脑】会根据您使用的具体功能需要，收集必要的用户信息（如申请设备系统权限收集设备信息、日志信息，并申请存储等相关权限）；涉及重要或敏感的权限时，我们会在您使用到相应业务功能时，另行弹窗再次征得您的同意后开启；权限开启后，您还可以随时通过设置关闭权限；您不同意开启权限，将不会影响其他相关业务功能的正常使用。{' '}
                </Text>
                <Text style={styles.privacyContent}>
                  2.
                  为了为您提供持续稳定的服务运营支持，使您获得最优使用体验。【健康智脑】收集您所使用的设备信息包括设备名称、设备型号、硬件序列号、操作系统版本及类型、语言设置、分辨率、存储内存。{' '}
                </Text>
                <Text style={styles.privacyContent}>
                  3. 为了向【健康智脑】上传您的头像及/或其他图片信息，【健康智脑】将申请调用您所使用设备中的摄像头或者相册权限；
                </Text>
              </ScrollView>
              <View style={styles.privacyBtnView}>
                <TouchableOpacity style={styles.privacyBtnLeft} onPress={() => this.setState({isShowPrivacy: false})}>
                  <Text style={styles.privacyBtnText1}>不同意</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.privacyBtnRight}
                  onPress={() => this.setState({isAgree: true, isShowPrivacy: false})}>
                  <Text style={styles.privacyBtnText2}>同意并继续</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
