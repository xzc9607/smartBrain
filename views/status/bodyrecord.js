import React, {Component} from 'react';
import {View, StatusBar, Image, Text, TouchableWithoutFeedback, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {resetData} from '../../store/globle/action';

import {styles} from '../../styles/bodyrecord_style';
import img from '../../imgs/img';
import dateTool from '../../config/date_api';
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
    name: '程度',
    type: 'category',
    data: ['轻度', '中度', '重度'],
  },
  series: [
    {
      data: ['轻度', '轻度', '重度', '中度', '轻度', '中度', '重度'],
      type: 'line',
    },
  ],
};

class BodyRecord extends Component {
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
            <Text style={styles.navTitle}>身体记录</Text>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
              <View style={styles.backIconView}>
                <Image style={styles.backIcon} source={img.backIconBlck} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.mainView}>
            <View style={styles.checkChartView}>
              <View style={styles.chartTitle}>
                <Text style={styles.chartTitleText}>头痛</Text>
              </View>
              <RNEChartsPro height={MC(460)} option={pieOption} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
              <View style={styles.checkItemView}>
                <View style={styles.checkItemTitleView}>
                  <Text style={styles.checkItemTitleText}>头痛</Text>
                  <Text style={[styles.checkItemStatusText, {color: '#FF5151'}]}>重度</Text>
                </View>
                <View style={styles.itemLine}></View>
                <View style={styles.itemContentView}>
                  <Text style={styles.itemContentTextTitle}>
                    时长：
                    <Text style={{color: '#001133'}}>5天</Text>
                  </Text>
                  <Text style={styles.itemContentTextLine}>|</Text>
                  <Text style={styles.itemContentTextTitle}>
                    时长：
                    <Text style={{color: '#001133'}}>5天</Text>
                  </Text>
                  <Text style={styles.itemContentTextLine}>|</Text>
                  <Text style={styles.itemContentTextTitle}>
                    性质:
                    <Text style={{color: '#001133'}}>振发性 胀痛</Text>
                  </Text>
                </View>
                <View style={styles.itemContentView}>
                  <Text style={styles.itemContentTextTitle}>时间</Text>
                  <Text style={[styles.itemContentTextTitle, {opacity: 1}]}>2023.03.12 14:08</Text>
                </View>
              </View>
              <View style={styles.checkItemView}>
                <View style={styles.checkItemTitleView}>
                  <Text style={styles.checkItemTitleText}>头痛</Text>
                  <Text style={[styles.checkItemStatusText, {color: '#FFA41B'}]}>中度</Text>
                </View>
                <View style={styles.itemLine}></View>
                <View style={styles.itemContentView}>
                  <Text style={styles.itemContentTextTitle}>时长:</Text>
                  <Text style={[styles.itemContentTextTitle, {opacity: 1}]}>{'5天'}</Text>
                  <Text style={styles.itemContentTextLine}>|</Text>
                  <Text style={styles.itemContentTextTitle}>部位:</Text>
                  <Text style={[styles.itemContentTextTitle, {opacity: 1}]}>{'枕部正中'}</Text>
                  <Text style={styles.itemContentTextLine}>|</Text>
                  <Text style={styles.itemContentTextTitle}>程度:</Text>
                  <Text style={[styles.itemContentTextTitle, {opacity: 1}]}>{'中度'}</Text>
                </View>
                <View style={styles.itemContentView}>
                  <Text style={styles.itemContentTextTitle}>性质:</Text>
                  <Text style={[styles.itemContentTextTitle, {opacity: 1}]}>{'振发性 胀痛'}</Text>
                  <Text style={styles.itemContentTextLine}>|</Text>
                  <Text style={styles.itemContentTextTitle}>诱因:</Text>
                  <Text style={[styles.itemContentTextTitle, {opacity: 1}]}>{'熬夜'}</Text>
                  <Text style={styles.itemContentTextLine}>|</Text>
                  <Text style={styles.itemContentTextTitle}>缓解:</Text>
                  <Text style={[styles.itemContentTextTitle, {opacity: 1}]}>{'按摩'}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(BodyRecord);
