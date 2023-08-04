import React, {Component} from 'react';
import {View, StatusBar, Image, Text, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {resetData} from '../store/globle/action';
import DatePicker from 'react-native-date-picker';
import Picker from 'react-native-picker';

import {styles} from '../styles/userinfo_style';
import img from '../imgs/img';
import api from '../config/api';
import date_api from '../config/date_api';

const genderPickDate = ['男性', '女性'];
const maritalPickDate = ['未婚', '已婚'];

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.globle.userdata.userName,
      userGender: this.props.globle.userdata.userGender,
      marital: 1,
      birthday: new Date(),
      isopenDP: false,
    };
  }

  componentWillUnmount() {
    Picker.hide();
  }

  showGenderPicker() {
    Picker.init({
      pickerData: genderPickDate,
      pickerTitleText: '请选择',
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      onPickerConfirm: data => {
        console.log(data);
        this.setState({userGender: data[0] === '男性' ? 1 : 2});
      },
      onPickerCancel: data => {},
    });
    Picker.show();
  }

  showMaritalPicker() {
    Picker.init({
      pickerData: maritalPickDate,
      pickerTitleText: '请选择',
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      onPickerConfirm: data => {
        console.log(data);
        this.setState({marital: data[0] === '未婚' ? 1 : 2});
      },
      onPickerCancel: data => {},
    });
    Picker.show();
  }

  submit() {
    api.toast('暂未开放该功能');
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content" />
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
                <Text style={styles.infoItemTextRight}>{this.state.userName}</Text>
              </View>
              <TouchableOpacity style={styles.infoItem} onPress={() => this.showGenderPicker()}>
                <Text style={styles.infoItemTextLeft}>性别</Text>
                <Text style={styles.infoItemTextRight}>
                  {this.state.userGender === 1 ? '男' : this.state.userGender === 2 ? '女' : '保密'}
                </Text>
                <Image style={styles.ItemIcon} source={img.backIconBlck} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.infoItem} onPress={() => this.showMaritalPicker()}>
                <Text style={styles.infoItemTextLeft}>婚姻状况</Text>
                <Text style={styles.infoItemTextRight}>{this.state.marital === 1 ? '未婚' : '已婚'}</Text>
                <Image style={styles.ItemIcon} source={img.backIconBlck} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.infoItem, {borderBottomColor: '#ffffff'}]}
                onPress={() => this.setState({isopenDP: true})}>
                <Text style={styles.infoItemTextLeft}>出生日期</Text>
                <Text style={styles.infoItemTextRight}>{date_api.formateTdateShort(this.state.birthday)}</Text>
                <Image style={styles.ItemIcon} source={img.backIconBlck} />
              </TouchableOpacity>
            </View>
            <Text style={styles.Tips}>为了获得精准的智能诊断建议，请如实填写个人信息</Text>
            <Text style={styles.saveBtn} onPress={() => this.submit()}>
              保存
            </Text>
          </View>
        </View>
        <DatePicker
          modal
          mode="date"
          open={this.state.isopenDP}
          date={this.state.birthday}
          onConfirm={date => {
            this.setState({isopenDP: false, birthday: date});
          }}
          onCancel={() => {
            this.setState({isopenDP: false});
          }}
          maximumDate={new Date()}
          is24hourSource="locale"
          title="选择时间"
          confirmText="确定"
          cancelText="取消"
        />
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
