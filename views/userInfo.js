import React, {Component} from 'react';
import {View, StatusBar, Image, Text, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import {resetData} from '../store/globle/action';

import {styles} from '../styles/userinfo_style';
import img from '../imgs/img';

class UserInfo extends Component {
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
            <Text style={styles.navTitle}>个人信息</Text>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
              <View style={styles.backIconView}>
                <Image style={styles.backIcon} source={img.backIconBlck} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.mainView}>
            <View style={styles.infoView}>
              <Text style={styles.infoTitle}>基本信息</Text>
              <View style={styles.infoItem}>
                <Text style={styles.infoItemTextLeft}>姓名</Text>
                <Text style={styles.infoItemTextRight}>{this.props.globle.userdata.userName}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoItemTextLeft}>性别</Text>
                <Text style={styles.infoItemTextRight}>
                  {this.props.globle.userdata.userGender === 1
                    ? '男'
                    : this.props.globle.userdata.userGender === 2
                    ? '女'
                    : '保密'}
                </Text>
                <Image style={styles.ItemIcon} source={img.backIconBlck} />
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoItemTextLeft}>婚姻状况</Text>
                <Text style={styles.infoItemTextRight}>保密</Text>
                <Image style={styles.ItemIcon} source={img.backIconBlck} />
              </View>
              <View style={[styles.infoItem, {borderBottomColor: '#ffffff'}]}>
                <Text style={styles.infoItemTextLeft}>出生日期</Text>
                <Text style={styles.infoItemTextRight}>1999-09-09</Text>
                <Image style={styles.ItemIcon} source={img.backIconBlck} />
              </View>
            </View>
            <Text style={styles.Tips}>为了获得精准的智能诊断建议，请如实填写个人信息</Text>
            <Text style={styles.saveBtn}>保存</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
