import React, {Component} from 'react';
import {View, StatusBar, ScrollView, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {resetData, resetaddList} from '../store/globle/action';

import {styles} from '../styles/continue_style';

class Continue extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.log(this.props.globle.addList);
  }

  toNextPage(pageName) {
    this.props.navigation.navigate(pageName);
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
                <Text style={styles.itemContentTextTitle}>时长:</Text>
                <Text style={[styles.itemContentTextTitle, {opacity: 1}]}>{'5天'}</Text>
                <Text style={styles.itemContentTextLine}>|</Text>
                <Text style={styles.itemContentTextTitle}>部位:</Text>
                <Text style={[styles.itemContentTextTitle, {opacity: 1}]}>{'枕部正中'}</Text>
                <Text style={styles.itemContentTextLine}>|</Text>
                <Text style={styles.itemContentTextTitle}>程度:</Text>
                <Text style={[styles.itemContentTextTitle, {opacity: 1}]}>{'重度'}</Text>
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
          </ScrollView>
          <View style={styles.footer} onPress={() => this.submit()}>
            <Text style={styles.footerConBtnView} onPress={() => this.props.navigation.navigate('Add')}>
              继续新增
            </Text>
            <Text style={styles.footerBtnView}>完成</Text>
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
