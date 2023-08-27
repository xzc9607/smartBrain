import React, {Component} from 'react';
import {View, StatusBar, Image, Text, TouchableWithoutFeedback, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {resetData} from '../../store/globle/action';
import RNEChartsPro from 'react-native-echarts-pro';

import {MC} from '../../config/convert';
import {styles} from '../../styles/bodyrecord_style';
import img from '../../imgs/img';
import api from '../../config/api';
import date_api from '../../config/date_api';

class Record extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listInfo: [],
      chartInfo: {},
      isshowChart: true,
    };
    this.lineOption = {
      color: ['#00A910 '],
      grid: {
        top: '11%',
        left: '3%',
        right: '7%',
        bottom: '19%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: [],
        axisTick: {
          alignWithLabel: true,
        },
      },
      yAxis: {
        name: '',
        type: 'category',
        nameLocation: 'end',
        data: [],
        axisLabel: {
          formatter(value) {
            return value.length >= 4 ? value.substring(0, 3) + '...' : value;
          },
        },
      },
      series: [
        {
          data: [],
          type: 'line',
          smooth: false,
        },
      ],
    };
    this.histogram = {
      color: ['#1FD1A2'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        top: '12%',
        left: '5%',
        right: '5%',
        bottom: '17%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: [],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          name: '',
          type: 'value',
          min: 0,
          max: 0,
          splitLine: {
            show: true,
          },
        },
      ],
      series: [
        {
          name: '',
          type: 'bar',
          barWidth: '30%',
          data: [],
          itemStyle: {
            normal: {
              barBorderRadius: [100, 100, 0, 0],
            },
          },
        },
      ],
    };
    // api.formateJSON(this.props.route.params.transParams);
  }

  componentDidMount() {
    this.getProjectInfo();
    this.getChartInfo();
  }

  getProjectInfo() {
    api.post(
      'project/user/list/item',
      {
        projectId: this.props.route.params.transParams.projectId,
        projectQueryType: 0,
      },
      res => {
        // api.formateJSON(res.data);
        this.setState({listInfo: res.data});
      },
      res => {
        res(this.props);
      },
    );
  }

  dealMax(val) {
    let max = val;
    if (max % 5 !== 0) {
      max++;
    } else {
      return max;
    }
  }

  getChartInfo() {
    // 1. 柱状图 2. 折线图
    api.get('app/user/chart/' + this.props.route.params.transParams.projectId, res => {
      // api.formateJSON(res.data);
      if (res.data.dataY.length === 0) {
        this.setState({isshowChart: false});
        return;
      }
      if (res.data.type === 1) {
        this.histogram.xAxis[0].data = res.data.dataX;
        this.histogram.yAxis[0].name = res.data.unitY ? '单位(' + res.data.unitY + ')' : '';
        this.histogram.yAxis[0].min = parseInt(res.data.minDataY, 10);
        this.histogram.yAxis[0].max = this.dealMax(parseInt(res.data.maxDataY, 10));
        this.histogram.series[0].data = res.data.dataY.map(item => parseFloat(item));
        this.histogram.series[0].name = res.data.unitY ? '单位(' + res.data.unitY + ')' : '';
        this.setState({chartInfo: this.histogram});
      } else if (res.data.type === 2) {
        this.lineOption.xAxis.data = res.data.dataX;
        this.lineOption.yAxis.data = res.data.dataYRange;
        this.lineOption.yAxis.name = res.data.unitY ? '单位(' + res.data.unitY + ')' : '';
        this.lineOption.series[0].data = res.data.dataY;
        this.setState({chartInfo: this.lineOption});
      }
    });
  }

  listItem(item) {
    if (item.projectEditType === 5) {
      return null;
    } else {
      return (
        <View style={styles.checkItemView} key={item.id}>
          <View style={styles.checkItemTitleView}>
            <Text style={styles.checkItemTitleText}>{item.projectName}</Text>
            <Text
              style={[
                styles.checkItemStatusText,
                {
                  color:
                    this.props.route.params.transParams.projectEditType === 0
                      ? '#1FD1A2'
                      : this.props.route.params.transParams.projectEditType === 20
                      ? '#FFA41B'
                      : this.props.route.params.transParams.projectEditType === 25
                      ? '#FF5151'
                      : '#001133',
                },
              ]}>
              {item.result ?? ''}
            </Text>
          </View>
          <View style={styles.itemLine}></View>
          {item.resultItem ? (
            <View style={styles.itemContentView}>
              {item.resultItem.map((rItem, rIndex) => {
                return (
                  <View key={rItem.elementId + item.id} style={{flexDirection: 'row'}}>
                    <Text style={styles.itemContentTextTitle}>
                      {rItem.elementName}：
                      <Text
                        style={{
                          color: '#001133',
                        }}>
                        {' '}
                        {rItem.elementValue}
                        {rItem.elementUnit ?? ''}
                      </Text>
                    </Text>
                    {rIndex + 1 === item.resultItem.length ? null : <Text style={styles.itemContentTextLine}>|</Text>}
                  </View>
                );
              })}
            </View>
          ) : null}

          <View style={styles.itemContentView}>
            <Text style={styles.itemContentTextTitle}>时间：</Text>
            <Text style={[styles.itemContentTextTitle, {color: '#001133'}]}>{date_api.formateTdateList(item.addTime)}</Text>
          </View>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content" />
        <View style={styles.safeView}>
          <View style={styles.navView}>
            <Text style={styles.navTitle}>健康记录</Text>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
              <View style={styles.backIconView}>
                <Image style={styles.backIcon} source={img.backIconBlck} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.mainView}>
            {this.state.isshowChart ? (
              <View style={styles.checkChartView}>
                <View style={styles.chartTitle}>
                  <Text style={styles.chartTitleText}>{this.props.route.params.transParams.projectName}</Text>
                </View>
                <RNEChartsPro height={MC(530)} option={this.state.chartInfo} />
              </View>
            ) : null}
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
              {this.state.listInfo.map((item, index) => {
                return this.listItem(item);
              })}
              <View style={{height: 100}}></View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Record);
