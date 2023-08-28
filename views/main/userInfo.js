import React, {Component} from 'react';
import {View, StatusBar, Image, Text, TouchableWithoutFeedback, Keyboard, TouchableOpacity, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {resetData} from '../../store/globle/action';
import DatePicker from 'react-native-date-picker';
import Picker from 'react-native-picker';

import img from '../../imgs/img';
import api from '../../config/api';
import date_api from '../../config/date_api';
import {genderPickDate, maritalPickDate} from '../../config/data';
import {styles} from '../../styles/userinfo_style';
class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.inputnameRef = React.createRef();
    this.state = {
      userName: this.props.globle.userdata.realName,
      userGender: this.props.globle.userdata.gender,
      marital: this.props.globle.userdata.openColumn,
      birthday: new Date(this.props.globle.userdata.birthday),
      isopenDP: false,
      isshowPicker: false,
    };
  }

  componentDidMount() {
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount() {
    Picker.hide();
    this.keyboardDidHideListener.remove();
  }

  showGenderPicker() {
    this.setState({isshowPicker: true});
    Picker.init({
      pickerData: genderPickDate,
      pickerTitleText: '请选择',
      pickerTitleColor: [0, 17, 51, 1],
      pickerConfirmBtnText: '确定 ',
      pickerConfirmBtnColor: [0, 17, 51, 1],
      pickerCancelBtnText: ' 取消',
      pickerCancelBtnColor: [0, 17, 51, 0.5],
      pickerToolBarBg: [255, 255, 255, 1],
      pickerBg: [255, 255, 255, 1],
      pickerToolBarFontSize: 17,
      onPickerConfirm: data => {
        this.setState({isshowPicker: false, userGender: data[0] === '男' ? 1 : 2});
      },
      onPickerCancel: data => {
        this.setState({isshowPicker: false});
      },
    });
    Picker.show();
  }

  showMaritalPicker() {
    this.setState({isshowPicker: true});
    Picker.init({
      pickerData: maritalPickDate,
      pickerTitleText: '请选择',
      pickerTitleColor: [0, 17, 51, 1],
      pickerConfirmBtnText: '确定',
      pickerConfirmBtnColor: [0, 17, 51, 1],
      pickerCancelBtnText: '取消',
      pickerCancelBtnColor: [0, 17, 51, 0.5],
      pickerToolBarBg: [255, 255, 255, 1],
      pickerBg: [255, 255, 255, 1],
      pickerToolBarFontSize: 17,
      onPickerConfirm: data => {
        this.setState({isshowPicker: false, marital: data[0] === '未婚' ? 2 : 1});
      },
      onPickerCancel: data => {
        this.setState({isshowPicker: false});
      },
    });
    Picker.show();
  }

  submit() {
    let body = {
      account: this.props.globle.userdata.mobilePhone,
      mobilePhone: this.props.globle.userdata.mobilePhone,
      birthday: date_api.formateTdateShort(this.state.birthday),
      gender: this.state.userGender,
      openColumn: this.state.marital,
      realName: this.state.userName,
    };
    if (body.realName === '') {
      api.toast('请输入用户名');
      return;
    }
    api.put('app/user/update', body, res => {
      if (res.code === 200) {
        api.toast('更新成功');
        this.getUserInfo();
      }
    });
  }

  getUserInfo() {
    api.get('app/user/info', Sres => {
      this.props.resetData(Sres.data);
    });
  }

  //键盘收起
  _keyboardDidHide = () => {
    this.inputnameRef.current.blur();
  };

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
                <TextInput
                  ref={this.inputnameRef}
                  style={styles.infoItemTextRight}
                  onChangeText={text => this.setState({userName: text})}
                  value={this.state.userName}
                  placeholder="请输入用户名"
                />
              </View>
              <TouchableOpacity style={styles.infoItem} onPress={() => this.showGenderPicker()}>
                <Text style={styles.infoItemTextLeft}>性别</Text>
                <Text style={styles.infoItemTextRight}>
                  {this.state.userGender === 1 ? '男' : this.state.userGender === 2 ? '女' : '未选择'}
                </Text>
                <Image style={styles.ItemIcon} source={img.backIconBlck} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.infoItem} onPress={() => this.showMaritalPicker()}>
                <Text style={styles.infoItemTextLeft}>婚姻状况</Text>
                <Text style={styles.infoItemTextRight}>{this.state.marital === 1 ? '已婚' : '未婚'}</Text>
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
          {this.state.isshowPicker ? <View style={styles.mask}></View> : null}
        </View>
        <DatePicker
          modal
          mode="date"
          open={this.state.isopenDP}
          date={this.state.birthday}
          onConfirm={date => {
            this.setState({birthday: date}, () => {
              this.setState({isopenDP: false});
            });
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
