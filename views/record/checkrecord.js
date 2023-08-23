import React, {Component} from 'react';
import {View, StatusBar, Image, Text, TouchableWithoutFeedback, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {resetData} from '../../store/globle/action';

import {styles} from '../../styles/check_style';
import img from '../../imgs/img';
import RNEChartsPro from 'react-native-echarts-pro';
import {MC} from '../../config/convert';

const pieOption = {
  color: ['#00A910 '],
  xAxis: {
    type: 'category',
    data: ['2/1', '2/2', '2/3', '2/4', '2/5', '2/6', '2/7'],
    axisTick: {
      alignWithLabel: true,
    },
  },
  yAxis: {
    name: '单位(mmol/L)',
    type: 'value',
    min: 4.5,
    max: 6.5,
  },
  series: [
    {
      data: [5.4, 5.8, 5.0, 5.9, 5.7, 6.3, 5.7],
      type: 'line',
    },
  ],
};

class CheckRecord extends Component {
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

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <View style={styles.safeView}>
          <View style={styles.navView}>
            <Text style={styles.navTitle}>检查记录</Text>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
              <View style={styles.backIconView}>
                <Image style={styles.backIcon} source={img.backIconBlck} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.mainView}>
            <View style={styles.checkChartView}>
              <View style={styles.chartTitle}>
                <Text style={styles.chartTitleText}>空腹血糖</Text>
              </View>
              <RNEChartsPro height={MC(460)} option={pieOption} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
              <View style={styles.checkItemView}>
                <View style={styles.checkItemTitleView}>
                  <Text style={styles.checkItemTitleText}>空腹血糖</Text>
                  <Text style={styles.checkItemStatusText}>正常</Text>
                </View>
                <View style={styles.itemLine}></View>
                <View style={styles.itemContentView}>
                  <Text style={styles.itemContentTextTitle}>标本:</Text>
                  <Text style={[styles.itemContentTextTitle, {opacity: 1}]}>{'[全血]'}</Text>
                  <Text style={styles.itemContentTextLine}>|</Text>
                  <Text style={styles.itemContentTextTitle}>方法:</Text>
                  <Text style={[styles.itemContentTextTitle, {opacity: 1}]}>{'[葡萄糖氧化酶法]'}</Text>
                </View>
                <View style={styles.itemContentView}>
                  <Text style={styles.itemContentTextTitle}>时间</Text>
                  <Text style={[styles.itemContentTextTitle, {opacity: 1}]}>2023.03.12 14:08</Text>
                </View>
              </View>
              <View style={styles.checkItemView}>
                <View style={styles.checkItemTitleView}>
                  <Text style={styles.checkItemTitleText}>空腹血糖</Text>
                  <Text style={styles.checkItemStatusText}>正常</Text>
                </View>
                <View style={styles.itemLine}></View>
                <View style={styles.itemContentView}>
                  <Text style={styles.itemContentTextTitle}>标本:</Text>
                  <Text style={[styles.itemContentTextTitle, {opacity: 1}]}>{'[全血]'}</Text>
                  <Text style={styles.itemContentTextLine}>|</Text>
                  <Text style={styles.itemContentTextTitle}>方法:</Text>
                  <Text style={[styles.itemContentTextTitle, {opacity: 1}]}>{'[葡萄糖氧化酶法]'}</Text>
                </View>
                <View style={styles.itemContentView}>
                  <Text style={styles.itemContentTextTitle}>时间</Text>
                  <Text style={[styles.itemContentTextTitle, {opacity: 1}]}>2023.03.12 14:08</Text>
                </View>
              </View>
              <View style={styles.checkItemView}>
                <View style={styles.checkItemTitleView}>
                  <Text style={styles.checkItemTitleText}>空腹血糖</Text>
                  <Text style={styles.checkItemStatusText}>正常</Text>
                </View>
                <View style={styles.itemLine}></View>
                <View style={styles.itemContentView}>
                  <Text style={styles.itemContentTextTitle}>标本:</Text>
                  <Text style={[styles.itemContentTextTitle, {opacity: 1}]}>{'[全血]'}</Text>
                  <Text style={styles.itemContentTextLine}>|</Text>
                  <Text style={styles.itemContentTextTitle}>方法:</Text>
                  <Text style={[styles.itemContentTextTitle, {opacity: 1}]}>{'[葡萄糖氧化酶法]'}</Text>
                </View>
                <View style={styles.itemContentView}>
                  <Text style={styles.itemContentTextTitle}>时间</Text>
                  <Text style={[styles.itemContentTextTitle, {opacity: 1}]}>2023.03.12 14:08</Text>
                </View>
              </View>
              <View style={styles.checkItemView}>
                <View style={styles.checkItemTitleView}>
                  <Text style={styles.checkItemTitleText}>空腹血糖</Text>
                  <Text style={styles.checkItemStatusText}>正常</Text>
                </View>
                <View style={styles.itemLine}></View>
                <View style={styles.itemContentView}>
                  <Text style={styles.itemContentTextTitle}>标本:</Text>
                  <Text style={[styles.itemContentTextTitle, {opacity: 1}]}>{'[全血]'}</Text>
                  <Text style={styles.itemContentTextLine}>|</Text>
                  <Text style={styles.itemContentTextTitle}>方法:</Text>
                  <Text style={[styles.itemContentTextTitle, {opacity: 1}]}>{'[葡萄糖氧化酶法]'}</Text>
                </View>
                <View style={styles.itemContentView}>
                  <Text style={styles.itemContentTextTitle}>时间</Text>
                  <Text style={[styles.itemContentTextTitle, {opacity: 1}]}>2023.03.12 14:08</Text>
                </View>
              </View>
              <View style={styles.checkItemView}>
                <View style={styles.checkItemTitleView}>
                  <Text style={styles.checkItemTitleText}>空腹血糖</Text>
                  <Text style={styles.checkItemStatusText}>正常</Text>
                </View>
                <View style={styles.itemLine}></View>
                <View style={styles.itemContentView}>
                  <Text style={styles.itemContentTextTitle}>标本:</Text>
                  <Text style={[styles.itemContentTextTitle, {opacity: 1}]}>{'[全血]'}</Text>
                  <Text style={styles.itemContentTextLine}>|</Text>
                  <Text style={styles.itemContentTextTitle}>方法:</Text>
                  <Text style={[styles.itemContentTextTitle, {opacity: 1}]}>{'[葡萄糖氧化酶法]'}</Text>
                </View>
                <View style={styles.itemContentView}>
                  <Text style={styles.itemContentTextTitle}>时间</Text>
                  <Text style={[styles.itemContentTextTitle, {opacity: 1}]}>2023.03.12 14:08</Text>
                </View>
              </View>
              <View style={styles.itemContentView}></View>
            </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckRecord);
