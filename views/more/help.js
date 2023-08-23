import React, {Component} from 'react';
import {View, StatusBar, Image, Text, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import {resetData} from '../../store/globle/action';

import img from '../../imgs/img';
import {styles} from '../../styles/setting_style';
class Help extends Component {
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
            <Text style={styles.navTitle}>客服帮助</Text>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
              <View style={styles.backIconView}>
                <Image style={styles.backIcon} source={img.backIconBlck} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.mainView}>
            <Text style={[styles.helpText, {marginTop: 20, fontWeight: '700'}]}>1. 健康智能是什么？</Text>
            <Text style={[styles.helpText, {marginTop: 10}]}>
              答：健康智脑是由杭州博健科技有限公司研发的智能健康服务App，将根据您录入的健康动态，准确地分析出您的健康状况，并随着动态信息的变化，更加精准地推荐健康维护和改善的个性化方案。健康智脑能帮助您全面了解自身健康、提供精准帮助并对效果进行客观评价。
            </Text>
            <Text style={[styles.helpText, {marginTop: 20, fontWeight: '700'}]}>2.健康智脑能为用户提供哪些服务？</Text>
            <Text style={[styles.helpText, {marginTop: 10}]}>
              答：健康智脑对用户的各种健康相关信息，包括症状、医院各种检查报告、
              治疗病历记录等进行规范整理、存储，通过智能运算，向用户推送诊断评估和治疗干预展示、提醒和待办推送。健康智脑可根据用户的健康情况，精准对接医疗健康服务，并对服务进行智能评价疗效，不但为用户节约大量时间、精力，同时避免各种浪费或身体伤害。
            </Text>
            <Text style={[styles.helpText, {marginTop: 20, fontWeight: '700'}]}>3.健康智脑能为医生提供哪些便利？</Text>
            <Text style={[styles.helpText, {marginTop: 10}]}>
              答：健康智脑能为医生提供经整理后的病人信息，节约问诊及写病历时间，也避
              免了因信息疏漏所导致的误诊误治乃至纠纷，并保障专科服务的精准对接。
            </Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Help);
