import React, {Component} from 'react';
import {View, StatusBar, ScrollView, Text, DeviceEventEmitter} from 'react-native';
import {connect} from 'react-redux';
import {resetData, resetaddList} from '../../store/globle/action';

import {styles} from '../../styles/continue_style';
import date_api from '../../config/date_api';

class Continue extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  allright() {
    this.props.resetaddList([]);
    DeviceEventEmitter.emit('message', 'refresh');
    this.props.navigation.navigate('Index');
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content" />
        <View style={styles.safeView}>
          <View style={styles.navView}>
            <Text style={styles.navTitle}>结果</Text>
          </View>
          <ScrollView style={styles.mainView} contentContainerStyle={{alignItems: 'center'}}>
            {this.props.globle.addList.map((item, index) => {
              return (
                <View style={styles.checkItemView} key={item.addTime}>
                  <View style={styles.checkItemTitleView}>
                    <Text style={styles.checkItemTitleText}>{item.projectName}</Text>
                    <Text style={[styles.checkItemStatusText, {color: '#FF5151'}]}>{item.result ?? ''}</Text>
                  </View>
                  <View style={styles.itemLine}></View>
                  <View style={styles.itemContentView}>
                    {item.resultItem.map((rItem, rIndex) => {
                      return (
                        <View key={rItem.elementName} style={{flexDirection: 'row'}}>
                          <Text style={styles.itemContentTextTitle}>
                            {rItem.elementName}：<Text style={{color: '#001133'}}>{rItem.elementValue}</Text>
                            <Text style={{color: '#001133'}}>{rItem.elementUnit ?? ''}</Text>
                          </Text>
                          {rIndex + 1 === item.resultItem.length ? null : <Text style={styles.itemContentTextLine}>|</Text>}
                        </View>
                      );
                    })}
                  </View>
                  <View style={styles.itemContentView}>
                    <Text style={styles.itemContentTextTitle}>记录：</Text>
                    <Text style={[styles.itemContentTextTitle, {opacity: 1}]}>{date_api.formateTdate(item.addTime * 1000)}</Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.footer} onPress={() => this.submit()}>
            <Text style={styles.footerConBtnView} onPress={() => this.props.navigation.navigate('Add')}>
              继续新增
            </Text>
            <Text style={styles.footerBtnView} onPress={() => this.allright()}>
              完成
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
    resetaddList: data => dispatch({...resetaddList(), data}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Continue);
