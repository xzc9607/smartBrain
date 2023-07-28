/* eslint-disable react/self-closing-comp */
import React, {Component} from 'react';
import {View, StatusBar, Image, Text, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import {resetData} from '../../store/globle/action';
import DatePicker from 'react-native-date-picker';
import Picker from 'react-native-picker';

import {styles} from '../../styles/takemedicine_style';
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

class TakeMedicine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: undefined,
      isopenDP: false,
      date: new Date(),
      type: '请选择',
      blood: '请选择',
      reactions: {
        non: false,
        dizzy: false,
        nausea: false,
        diarrhea: false,
        vomit: false,
        abdomen: false,
        constipation: false,
      },
    };
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

  chooseReaction(item) {
    let obj = this.state.reactions;
    obj[item] = !obj[item];
    this.setState({reactions: obj});
  }

  toRecord() {
    this.props.navigation.navigate('TakeMedicineRecord');
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <View style={styles.safeView}>
          <View style={styles.navView}>
            <Text style={styles.navTitle}>服药</Text>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
              <View style={styles.backIconView}>
                <Image style={styles.backIcon} source={img.backIconBlck} />
              </View>
            </TouchableWithoutFeedback>
            <Text style={styles.navRBtn} onPress={() => this.toRecord()}>
              服药记录
            </Text>
          </View>
          <View style={styles.mainView}>
            <View style={styles.checkView}>
              <View style={styles.checkTitleView}>
                <Text style={styles.checkTitle}>萘普生</Text>
              </View>
              <View style={styles.line}></View>
              <View style={styles.checkTitleView}>
                <Text style={styles.checkTitle2}>2粒 温开水送服 每天三次饭后服用或遵医嘱</Text>
              </View>
              <View style={styles.itemView}>
                <Text style={styles.itemTitle}>用量:</Text>
                <Text style={styles.itemContent}>2</Text>
              </View>
              <View style={styles.itemView}>
                <Text style={styles.itemTitle}>单位:</Text>
                <Text style={styles.itemContent}>粒</Text>
              </View>
              <TouchableOpacity style={styles.itemView} onPress={() => this.setState({isopenDP: true})}>
                <Text style={styles.itemTitle}>时间:</Text>
                <Text style={styles.itemContent}>
                  {dateTool.formateTdate(this.state.date)}
                  <View style={styles.arrowView}>
                    <Image style={styles.itemArrow} source={img.backIconBlck} />
                  </View>
                </Text>
              </TouchableOpacity>
              <View style={styles.reactionsView}>
                <Text style={styles.itemTitle}>不良反应:</Text>
                <TouchableOpacity style={styles.reactionsItemView} onPress={() => this.chooseReaction('non')}>
                  <Text style={styles.reactionsItemTitle}>无不良反应</Text>
                  <View style={styles.reactionsItemCheckbox}>
                    {this.state.reactions.non ? <Image style={styles.choosedIcon} source={img.choosedIcon} /> : null}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.reactionsItemView} onPress={() => this.chooseReaction('dizzy')}>
                  <Text style={styles.reactionsItemTitle}>头晕</Text>
                  <View style={styles.reactionsItemCheckbox}>
                    {this.state.reactions.dizzy ? <Image style={styles.choosedIcon} source={img.choosedIcon} /> : null}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.reactionsItemView} onPress={() => this.chooseReaction('nausea')}>
                  <Text style={styles.reactionsItemTitle}>恶心</Text>
                  <View style={styles.reactionsItemCheckbox}>
                    {this.state.reactions.nausea ? <Image style={styles.choosedIcon} source={img.choosedIcon} /> : null}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.reactionsItemView} onPress={() => this.chooseReaction('nodiarrhean')}>
                  <Text style={styles.reactionsItemTitle}>腹泻</Text>
                  <View style={styles.reactionsItemCheckbox}>
                    {this.state.reactions.nodiarrhean ? (
                      <Image style={styles.choosedIcon} source={img.choosedIcon} />
                    ) : null}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.reactionsItemView} onPress={() => this.chooseReaction('vomit')}>
                  <Text style={styles.reactionsItemTitle}>呕吐</Text>
                  <View style={styles.reactionsItemCheckbox}>
                    {this.state.reactions.vomit ? <Image style={styles.choosedIcon} source={img.choosedIcon} /> : null}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.reactionsItemView} onPress={() => this.chooseReaction('abdomen')}>
                  <Text style={styles.reactionsItemTitle}>上腹部不适</Text>
                  <View style={styles.reactionsItemCheckbox}>
                    {this.state.reactions.abdomen ? (
                      <Image style={styles.choosedIcon} source={img.choosedIcon} />
                    ) : null}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.reactionsItemView} onPress={() => this.chooseReaction('constipation')}>
                  <Text style={styles.reactionsItemTitle}>便秘</Text>
                  <View style={styles.reactionsItemCheckbox}>
                    {this.state.reactions.constipation ? (
                      <Image style={styles.choosedIcon} source={img.choosedIcon} />
                    ) : null}
                  </View>
                </TouchableOpacity>
              </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(TakeMedicine);
