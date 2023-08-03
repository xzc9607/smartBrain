import React, {Component} from 'react';
import {View, StatusBar, ScrollView, Text} from 'react-native';
import {connect} from 'react-redux';
import {resetData, resetaddList} from '../store/globle/action';

import {styles} from '../styles/continue_style';

class Continue extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(this.props.globle.addList);
  }

  allright() {
    this.props.resetaddList([]);
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
              </View>
              <View style={styles.itemContentView}>
                <Text style={styles.itemContentTextTitle}>记录：</Text>
                <Text style={[styles.itemContentTextTitle, {opacity: 1}]}>2023.03.12 14:08</Text>
              </View>
            </View>
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
