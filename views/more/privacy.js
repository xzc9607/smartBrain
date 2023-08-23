import React, {Component} from 'react';
import {View, StatusBar, Image, Text, TouchableWithoutFeedback, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {resetData} from '../../store/globle/action';

import {styles} from '../../styles/setting_style';
import img from '../../imgs/img';
class Privacy extends Component {
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
            <Text style={styles.navTitle}>隐私政策</Text>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
              <View style={styles.backIconView}>
                <Image style={styles.backIcon} source={img.backIconBlck} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <ScrollView style={styles.mainView} contentContainerStyle={{alignItems: 'center'}}>
            <Text style={[styles.privacyText, {marginTop: 20}]}>
              一、用户信息包括个人隐私信息和非个人隐私信息。用户同意：个人隐私信息是指那些能够对用户进行个人辨识或涉及个人通信的信息，包括下列信息：用户真实姓名，身份证号，手机号码，IP地址。而非个人隐私信息是指用户对本服务的操作状态以及使用习惯等一些明确且客观反映在本公司服务器端的基本记录信息和其他一切个人隐私信息范围外的普通信息，以及用户同意公开的上述隐私信息。
            </Text>
            <Text style={[styles.privacyText, {marginTop: 20}]}>
              二、［健康智脑］重视用户的隐私，保护用户(特别是未成年人)的隐私是［健康智脑］的一项基本政策。［健康智脑］将对用户所提供的资料进行严格的管理及保护，并使用相应的技术，防止用户的个人资料丢失、被盗用或遭篡改，保证不对外公开或向第三方提供单个用户的注册资料及用户在使用网络服务时存储在［健康智脑］的非公开内容，但下列情况除外：
            </Text>
            <Text style={[styles.privacyText, {marginTop: 20}]}>1. 事先获得用户的明确授权；</Text>
            <Text style={[styles.privacyText, {marginTop: 5}]}>2. 根据有关的法律法规要求；</Text>
            <Text style={[styles.privacyText, {marginTop: 5}]}>3. 按照相关政府主管部门的要求；</Text>
            <Text style={[styles.privacyText, {marginTop: 5}]}>4. 为维护社会公众的利益；</Text>
            <Text style={[styles.privacyText, {marginTop: 5}]}>5. 为维护［健康智脑］的合法权益。</Text>
            <Text style={[styles.privacyText, {marginTop: 20}]}>
              三、任何时候如果您对我们的隐私策略有疑问，请通过［健康智脑］公众号与我们联系。我们会尽一切努力，请合理适当的范围内立即改善这个问题。
            </Text>
            <Text style={[styles.privacyText, {marginTop: 20}]}>
              四、我们可能适时修订本《隐私政策》的条款，该等修订构成本《隐私政策》的一部分。本《隐私政策》是您注册成为我们的用户，并享受我们提供的某些服务的前提，请您仔细阅读。
            </Text>
            <Text style={[styles.privacyText, {marginTop: 20, textAlign: 'right'}]}>杭州博健科技有限公司</Text>
            <Text style={[styles.privacyText, {marginTop: 5, textAlign: 'right'}]}>生效日期：2023年7月1日</Text>
          </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Privacy);
