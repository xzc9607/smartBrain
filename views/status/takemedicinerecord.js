import React, {Component} from 'react';
import {View, StatusBar, Image, Text, TouchableWithoutFeedback, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {resetData} from '../../store/globle/action';

import {styles} from '../../styles/takemedicine_style';
import img from '../../imgs/img';
import RNEChartsPro from 'react-native-echarts-pro';
import {MC} from '../../config/convert';

const pieOption = {
  color: ['#1FD1A2'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      data: ['3/6', '3/7', '3/8', '3/9', '3/10', '3/11', '3/12'],
      axisTick: {
        alignWithLabel: true,
      },
    },
  ],
  yAxis: [
    {
      name: '单位(粒)',
      type: 'value',
      min: 0,
      max: 6,
    },
  ],
  series: [
    {
      name: 'Direct',
      type: 'bar',
      barWidth: '30%',
      data: [4, 0, 0, 4, 6, 6, 4],
      itemStyle: {
        normal: {
          barBorderRadius: [100, 100, 0, 0],
        },
      },
    },
  ],
};

class TakeMedicineRecord extends Component {
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
            <Text style={styles.navTitle}>服药记录</Text>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
              <View style={styles.backIconView}>
                <Image style={styles.backIcon} source={img.backIconBlck} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.mainView}>
            <View style={styles.checkChartView}>
              <View style={styles.chartTitle}>
                <Text style={styles.chartTitleText}>用量</Text>
              </View>
              <RNEChartsPro height={MC(460)} option={pieOption} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
              <View style={styles.checkItemView}>
                <View style={styles.checkItemTitleView}>
                  <Text style={styles.checkItemTitleText}>萘普生</Text>
                  <Text style={styles.checkItemStatusText}>已服用</Text>
                </View>
                <View style={styles.itemLine}></View>
                <View style={styles.itemContentView}>
                  <Text style={styles.itemContentTextTitle}>用量:</Text>
                  <Text style={[styles.itemContentTextTitle, {opacity: 1}]}>{'2粒'}</Text>
                </View>
                <View style={styles.itemContentView}>
                  <Text style={styles.itemContentTextTitle}>时间</Text>
                  <Text style={[styles.itemContentTextTitle, {opacity: 1}]}>2023.03.12 14:08</Text>
                </View>
              </View>
              <View style={styles.checkItemView}>
                <View style={styles.checkItemTitleView}>
                  <Text style={styles.checkItemTitleText}>萘普生</Text>
                  <Text style={styles.checkItemStatusText}>已服用</Text>
                </View>
                <View style={styles.itemLine}></View>
                <View style={styles.itemContentView}>
                  <Text style={styles.itemContentTextTitle}>用量:</Text>
                  <Text style={[styles.itemContentTextTitle, {opacity: 1}]}>{'2粒'}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(TakeMedicineRecord);
