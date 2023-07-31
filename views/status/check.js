/* eslint-disable react/self-closing-comp */
import React, {Component} from 'react';
import {View, StatusBar, Image, Text, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import {resetData} from '../../store/globle/action';
import DatePicker from 'react-native-date-picker';
import Picker from 'react-native-picker';

import {styles} from '../../styles/check_style';
import img from '../../imgs/img';
import dateTool from '../../config/date_api';

const typePickDate = ['mmol/L', 'xxxx/L'];
const bloodData = [
  {
    2: [
      {
        '·': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
    ],
  },
  {
    3: [
      {
        '·': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
    ],
  },
  {
    4: [
      {
        '·': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
    ],
  },
  {
    5: [
      {
        '·': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
    ],
  },
  {
    6: [
      {
        '·': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
    ],
  },
  {
    7: [
      {
        '·': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
    ],
  },
];

class Check extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: undefined,
      isopenDP: false,
      date: new Date(),
      type: '请选择',
      blood: '请选择',
    };
  }

  componentWillUnmount() {
    Picker.hide();
  }

  onChange(value) {
    this.setState({value});
  }

  showPicker() {
    Picker.init({
      pickerData: typePickDate,
      pickerTitleText: '请选择',
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      onPickerConfirm: data => {
        this.setState({type: data});
      },
      onPickerCancel: data => {},
    });
    Picker.show();
  }

  showBloodPicker() {
    Picker.init({
      pickerData: bloodData,
      pickerTitleText: '请选择',
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      onPickerConfirm: data => {
        this.setState({blood: data[0] * 1.0 + data[2] * 0.1});
      },
      onPickerCancel: data => {},
    });
    Picker.show();
  }

  toRecord() {
    this.props.navigation.navigate('CheckRecord');
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <View style={styles.safeView}>
          <View style={styles.navView}>
            <Text style={styles.navTitle}>检查</Text>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
              <View style={styles.backIconView}>
                <Image style={styles.backIcon} source={img.backIconBlck} />
              </View>
            </TouchableWithoutFeedback>
            <Text style={styles.navRBtn} onPress={() => this.toRecord()}>
              检查记录
            </Text>
          </View>
          <View style={styles.mainView}>
            <View style={styles.checkView}>
              <View style={styles.checkTitleView}>
                <Text style={styles.checkTitle}>检查方法和内容</Text>
              </View>
              <View style={styles.line}></View>
              <View style={styles.itemView}>
                <Text style={styles.itemTitle}>类型:</Text>
                <Text style={styles.itemContent}>空腹</Text>
              </View>
              <View style={styles.itemView}>
                <Text style={styles.itemTitle}>标本:</Text>
                <Text style={styles.itemContent}>全血</Text>
              </View>
              <View style={styles.itemView}>
                <Text style={styles.itemTitle}>方法:</Text>
                <Text style={styles.itemContent}>葡萄糖氧化酶法</Text>
              </View>
              <TouchableOpacity style={styles.itemView} onPress={() => this.showBloodPicker()}>
                <Text style={styles.itemTitle}>血糖值:</Text>
                <Text style={styles.itemContent}>
                  {this.state.blood}
                  <View style={styles.arrowView}>
                    <Image style={styles.itemArrow} source={img.backIconBlck} />
                  </View>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.itemView} onPress={() => this.showPicker()}>
                <Text style={styles.itemTitle}>单位:</Text>
                <Text style={styles.itemContent}>
                  {this.state.type}
                  <View style={styles.arrowView}>
                    <Image style={styles.itemArrow} source={img.backIconBlck} />
                  </View>
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.itemView} onPress={() => this.setState({isopenDP: true})}>
                <Text style={styles.itemTitle}>时间:</Text>
                <Text style={styles.itemContent}>
                  {dateTool.formateTdate(this.state.date)}
                  <View style={styles.arrowView}>
                    <Image style={styles.itemArrow} source={img.backIconBlck} />
                  </View>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerBtnView}>保存</Text>
          </View>
        </View>
        <DatePicker
          modal
          open={this.state.isopenDP}
          date={this.state.date}
          onConfirm={date => {
            this.setState({isopenDP: false, date: date});
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

export default connect(mapStateToProps, mapDispatchToProps)(Check);
