/* eslint-disable no-bitwise */
import React, {Component} from 'react';
import {
  View,
  StatusBar,
  Image,
  Text,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ImageBackground,
  ScrollView,
  Modal,
} from 'react-native';
import {connect} from 'react-redux';
import {resetData} from '../store/globle/action';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {styles} from '../styles/index_style';
import {MC, safeHeight, screenHeight} from '../config/convert';
import img from '../imgs/img';
import api from '../config/api';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bodyInfoState: true,
      bodyInfoTitleTop: new Animated.Value(0),
      bodyInfoImgTop: new Animated.Value(MC(140)),
      modalTop: new Animated.Value(screenHeight),
      opticy: new Animated.Value(0),
      isShowScreen: false,
      screenCount: 0,
      choosedState: '',
      choosedType: '',
      choosedTime: '',
    };
  }

  componentDidMount() {
    this.getUserinfo();
  }

  async getUserinfo() {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      // todo 登录了
      console.log('登录了');
      api.get('app/user/info', res => {
        this.props.resetData(res.data);
      });
    } else {
      // todo 没登录
      this.props.navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }
  }

  toNextPage(pageName) {
    this.props.navigation.navigate(pageName);
  }

  switchBodyInfo(action) {
    this.setState({bodyInfoState: !action}, () => {
      if (action) {
        Animated.parallel([
          Animated.timing(this.state.bodyInfoTitleTop, {
            toValue: safeHeight - MC(596),
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(this.state.bodyInfoImgTop, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(({finished}) => {
          if (finished) {
            this.setState({bodyInfoState: false}, () => {});
          }
        });
      } else {
        Animated.parallel([
          Animated.timing(this.state.bodyInfoTitleTop, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(this.state.bodyInfoImgTop, {
            toValue: MC(140),
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(({finished}) => {
          if (finished) {
          }
        });
      }
    });
  }

  showScreen(action) {
    if (action) {
      this.setState({isShowScreen: true}, () => {
        Animated.timing(this.state.modalTop, {
          toValue: screenHeight - MC(980),
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    } else {
      Animated.timing(this.state.modalTop, {
        toValue: screenHeight,
        duration: 200,
        useNativeDriver: true,
      }).start(({finished}) => {
        if (finished) {
          this.setState({isShowScreen: false});
        }
      });
    }
  }

  chooseState(state) {
    this.setState({choosedState: state === this.state.choosedState ? '' : state});
  }

  chooseType(type) {
    this.setState({choosedType: type === this.state.choosedType ? '' : type});
  }

  chooseTime(time) {
    this.setState({choosedTime: time === this.state.choosedTime ? '' : time});
  }

  submitScreen() {
    if (this.state.choosedState !== '' || this.state.choosedType !== '' || this.state.choosedTime !== '') {
      this.setState(
        {
          screenCount:
            ((this.state.choosedState !== '') | 0) +
            ((this.state.choosedType !== '') | 0) +
            ((this.state.choosedTime !== '') | 0),
        },
        () => {
          this.showScreen(false);
        },
      );
    } else {
      //todo 重新拿所有数据
      this.setState({screenCount: 0}, () => {
        this.showScreen(false);
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <Image style={styles.topBg} source={img.topBg} />
        <View style={styles.safeView}>
          <View style={styles.userInfoView}>
            <Text style={styles.userInfoTitle}>健康智脑</Text>
            <TouchableWithoutFeedback onPress={() => this.toNextPage('Main')}>
              <View style={styles.userAvatar}>
                <Image style={styles.userAvatarImg} source={img.userAvatar} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.mainView}>
            <View style={styles.mainViewTitle}>
              {/* 筛选按钮 */}
              {this.state.bodyInfoState && this.state.screenCount === 0 ? (
                <TouchableOpacity onPress={() => this.showScreen(true)}>
                  <View style={styles.screenBtn}>
                    <Image style={styles.screenIcon} source={img.screenIcon} />
                    <Text style={styles.screenBtnText}>筛选</Text>
                  </View>
                </TouchableOpacity>
              ) : this.state.bodyInfoState && this.state.screenCount > 0 ? (
                <TouchableOpacity onPress={() => this.showScreen(true)}>
                  <View style={styles.screenBtnLong}>
                    <Image style={styles.screenIcon} source={img.screenIcon} />
                    <Text style={[styles.screenBtnText, {color: this.state.screenCount > 0 ? 'red' : '#000000'}]}>
                      筛选{this.state.screenCount > 0 ? `(${this.state.screenCount})` : null}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <Text style={styles.drawUpdataTimeText}>2023.04.01更新</Text>
              )}
              {/* 状态/画像切换按钮 */}
              <TouchableOpacity onPress={() => this.switchBodyInfo(this.state.bodyInfoState)}>
                {this.state.bodyInfoState ? (
                  <View style={styles.stateBtn}>
                    <Image style={styles.stateIcon} source={img.stateIcon2} />
                    <Text style={styles.stateBtnText}>画像</Text>
                  </View>
                ) : (
                  <View style={styles.stateBtn}>
                    <Image style={styles.stateIcon} source={img.stateIcon1} />
                    <Text style={styles.stateBtnText}>动态</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            {/* 主视图 */}
            <View style={styles.mainViewCtrl}>
              <Animated.View
                style={[
                  styles.infoListView,
                  {
                    transform: [{translateY: this.state.bodyInfoImgTop}],
                  },
                ]}>
                {this.state.bodyInfoState ? (
                  <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false} overScrollMode="always">
                    <TouchableOpacity style={styles.infoListItem} onPress={() => this.toNextPage('TakeMedicine')}>
                      <Image style={styles.dynamicIcon} source={img.dynamicIcon} />
                      <Text style={styles.infoListItemTitle}>萘普生</Text>
                      <Text style={styles.infoListItemTime}>创建时间：2023.03.11 14:52</Text>
                      <Text style={styles.infoListItemStateWait}>待办</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.infoListItem} onPress={() => this.toNextPage('Check')}>
                      <Image style={styles.dynamicIcon} source={img.dynamicIcon} />
                      <Text style={styles.infoListItemTitle}>空腹血糖</Text>
                      <Text style={styles.infoListItemTime}>创建时间：2023.03.11 14:52</Text>
                      <Text style={styles.infoListItemStateWait}>待办</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.infoListItem} onPress={() => this.toNextPage('BodyRecord')}>
                      <Image style={styles.dynamicIcon} source={img.dynamicIcon} />
                      <Text style={styles.infoListItemTitle}>头痛</Text>
                      <Text style={styles.infoListItemTime}>创建时间：2023.03.11 14:52</Text>
                      <Text style={styles.infoListItemStateMid}>中度</Text>
                    </TouchableOpacity>
                    <View style={styles.infoListItem}>
                      <Image style={styles.dynamicIcon} source={img.dynamicIcon} />
                      <Text style={styles.infoListItemTitle}>拜糖平片</Text>
                      <Text style={styles.infoListItemTime}>创建时间：2023.03.11 14:52</Text>
                      <Text style={styles.infoListItemStateBad}>2项不良反应</Text>
                    </View>
                  </ScrollView>
                ) : (
                  // <View style={styles.drawView}>
                  //    <Image resizeMode="contain" style={styles.nodataDrew} source={img.nodataDrew} />
                  //    <ImageBackground style={styles.manDrew} source={img.manDrew}>
                  //       <Image style={styles.bodyInner} source={img.bodyInner} />
                  //    </ImageBackground>
                  // </View>
                  <View style={styles.drawView}>
                    <ImageBackground style={styles.manDrew} source={img.manDrew}>
                      <ImageBackground style={styles.bodyInner} source={img.bodyInner}>
                        <Image style={styles.bodyWarImg} source={img.bodyWarnHeartIcon} />
                      </ImageBackground>
                    </ImageBackground>
                    <View style={styles.TipsView}>
                      <View style={styles.TipsLine}></View>
                      <View style={styles.TipsInnerView}>
                        <Text style={styles.TipsInnerText}>心脏 1</Text>
                      </View>
                    </View>
                  </View>
                )}
              </Animated.View>
              <Animated.View
                style={[
                  styles.userBodyInfoText,
                  {
                    transform: [{translateY: this.state.bodyInfoTitleTop}],
                  },
                ]}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoItemTitleText}>代办项</Text>
                  <View style={styles.infoItemInner}>
                    <Text style={styles.infoItemText}>77</Text>
                  </View>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoItemTitleText}>进步项</Text>
                  <View style={styles.infoItemInner}>
                    <Text style={styles.infoItemText}>
                      <Image style={styles.infoItemIcon} source={img.upIcon} />8
                    </Text>
                  </View>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoItemTitleText}>退步项</Text>
                  <View style={styles.infoItemInner}>
                    <Text style={styles.infoItemText}>
                      <Image style={styles.infoItemIcon} source={img.downIcon} />9
                    </Text>
                  </View>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoItemTitleText}>警示项</Text>
                  <View style={styles.infoItemInner}>
                    <Text style={styles.infoItemText}>9</Text>
                  </View>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoItemTitleText}>异常项</Text>
                  <View style={styles.infoItemInner}>
                    <Text style={styles.infoItemText}>99</Text>
                  </View>
                </View>
              </Animated.View>
            </View>
          </View>
          {/* 底部按钮 */}
          <View style={styles.indexBtnView}>
            <TouchableOpacity onPress={() => this.toNextPage('Add')}>
              {this.state.bodyInfoState ? (
                <View style={styles.indexBtn}>
                  <Text style={styles.indexBtnText}>新增健康动态</Text>
                </View>
              ) : (
                <View style={styles.indexBtn}>
                  <Image style={styles.userBtnAvatar} source={img.userAvatar} />
                  <Text style={styles.indexBtnText}>补充健康信息，完善健康画像</Text>
                  <View style={styles.addBtnView}>
                    <Image style={styles.addIcon} source={img.addIcon} />
                    <Text style={styles.addBtnText}>新增</Text>
                  </View>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
        {/* 筛选弹窗 */}
        <Modal
          animationType="fade"
          statusBarTranslucent={true}
          transparent={true}
          visible={this.state.isShowScreen}
          onRequestClose={() => {
            this.showScreen(false);
          }}>
          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <Animated.View
              style={[
                styles.screenInnerView,
                {
                  transform: [{translateY: this.state.modalTop}],
                },
              ]}>
              <Text style={styles.popTitle}>筛选</Text>
              <TouchableOpacity style={styles.popCloseBtnView} onPress={() => this.showScreen(false)}>
                <Image style={styles.popCloseBtn} source={img.popCloseBtn} />
              </TouchableOpacity>
              <View style={styles.popchooseView}>
                <Text style={styles.popchooseTitle}>按状态筛选</Text>
                <View style={styles.popchooseStateView}>
                  <TouchableWithoutFeedback onPress={() => this.chooseState('backlog')}>
                    <View
                      style={[
                        styles.popchooseStateItem,
                        {backgroundColor: this.state.choosedState === 'backlog' ? '#1FD1A2' : '#eceff4'},
                      ]}>
                      <Text
                        style={[
                          styles.popchooseStateItemText,
                          {color: this.state.choosedState === 'backlog' ? '#ffffff' : '#001133'},
                        ]}>
                        待办项
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => this.chooseState('advance')}>
                    <View
                      style={[
                        styles.popchooseStateItem,
                        {backgroundColor: this.state.choosedState === 'advance' ? '#1FD1A2' : '#eceff4'},
                      ]}>
                      <Text
                        style={[
                          styles.popchooseStateItemText,
                          {color: this.state.choosedState === 'advance' ? '#ffffff' : '#001133'},
                        ]}>
                        进步项
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => this.chooseState('lag')}>
                    <View
                      style={[
                        styles.popchooseStateItem,
                        {backgroundColor: this.state.choosedState === 'lag' ? '#1FD1A2' : '#eceff4'},
                      ]}>
                      <Text
                        style={[
                          styles.popchooseStateItemText,
                          {color: this.state.choosedState === 'lag' ? '#ffffff' : '#001133'},
                        ]}>
                        退步项
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => this.chooseState('caution')}>
                    <View
                      style={[
                        styles.popchooseStateItem,
                        {backgroundColor: this.state.choosedState === 'caution' ? '#1FD1A2' : '#eceff4'},
                      ]}>
                      <Text
                        style={[
                          styles.popchooseStateItemText,
                          {color: this.state.choosedState === 'caution' ? '#ffffff' : '#001133'},
                        ]}>
                        警示项
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => this.chooseState('abnormal')}>
                    <View
                      style={[
                        styles.popchooseStateItem,
                        {backgroundColor: this.state.choosedState === 'abnormal' ? '#1FD1A2' : '#eceff4'},
                      ]}>
                      <Text
                        style={[
                          styles.popchooseStateItemText,
                          {color: this.state.choosedState === 'abnormal' ? '#ffffff' : '#001133'},
                        ]}>
                        异常项
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <Text style={styles.popchooseTitle}>按类型筛选</Text>
                <View style={styles.popchooseStateView}>
                  <TouchableWithoutFeedback onPress={() => this.chooseType('test')}>
                    <View
                      style={[
                        styles.popchooseStateItem,
                        {backgroundColor: this.state.choosedType === 'test' ? '#1FD1A2' : '#eceff4'},
                      ]}>
                      <Text
                        style={[
                          styles.popchooseStateItemText,
                          {color: this.state.choosedType === 'test' ? '#ffffff' : '#001133'},
                        ]}>
                        体检
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => this.chooseType('diagnose')}>
                    <View
                      style={[
                        styles.popchooseStateItem,
                        {backgroundColor: this.state.choosedType === 'diagnose' ? '#1FD1A2' : '#eceff4'},
                      ]}>
                      <Text
                        style={[
                          styles.popchooseStateItemText,
                          {color: this.state.choosedType === 'diagnose' ? '#ffffff' : '#001133'},
                        ]}>
                        诊断
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => this.chooseType('treat')}>
                    <View
                      style={[
                        styles.popchooseStateItem,
                        {backgroundColor: this.state.choosedType === 'treat' ? '#1FD1A2' : '#eceff4'},
                      ]}>
                      <Text
                        style={[
                          styles.popchooseStateItemText,
                          {color: this.state.choosedType === 'treat' ? '#ffffff' : '#001133'},
                        ]}>
                        治疗
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => this.chooseType('history')}>
                    <View
                      style={[
                        styles.popchooseStateItem,
                        {backgroundColor: this.state.choosedType === 'history' ? '#1FD1A2' : '#eceff4'},
                      ]}>
                      <Text
                        style={[
                          styles.popchooseStateItemText,
                          {color: this.state.choosedType === 'history' ? '#ffffff' : '#001133'},
                        ]}>
                        病史
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => this.chooseType('system')}>
                    <View
                      style={[
                        styles.popchooseStateItem,
                        {backgroundColor: this.state.choosedType === 'system' ? '#1FD1A2' : '#eceff4'},
                      ]}>
                      <Text
                        style={[
                          styles.popchooseStateItemText,
                          {color: this.state.choosedType === 'system' ? '#ffffff' : '#001133'},
                        ]}>
                        身体系统
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => this.chooseType('pos')}>
                    <View
                      style={[
                        styles.popchooseStateItem,
                        {backgroundColor: this.state.choosedType === 'pos' ? '#1FD1A2' : '#eceff4'},
                      ]}>
                      <Text
                        style={[
                          styles.popchooseStateItemText,
                          {color: this.state.choosedType === 'pos' ? '#ffffff' : '#001133'},
                        ]}>
                        身体部位
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <Text style={styles.popchooseTitle}>按时间筛选</Text>
                <View style={styles.popchooseStateView}>
                  <TouchableWithoutFeedback onPress={() => this.chooseTime('1mon')}>
                    <View
                      style={[
                        styles.popchooseStateItem,
                        {backgroundColor: this.state.choosedTime === '1mon' ? '#1FD1A2' : '#eceff4'},
                      ]}>
                      <Text
                        style={[
                          styles.popchooseStateItemText,
                          {color: this.state.choosedTime === '1mon' ? '#ffffff' : '#001133'},
                        ]}>
                        近一个月
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => this.chooseTime('3mon')}>
                    <View
                      style={[
                        styles.popchooseStateItem,
                        {backgroundColor: this.state.choosedTime === '3mon' ? '#1FD1A2' : '#eceff4'},
                      ]}>
                      <Text
                        style={[
                          styles.popchooseStateItemText,
                          {color: this.state.choosedTime === '3mon' ? '#ffffff' : '#001133'},
                        ]}>
                        近三个月
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => this.chooseTime('6mon')}>
                    <View
                      style={[
                        styles.popchooseStateItem,
                        {backgroundColor: this.state.choosedTime === '6mon' ? '#1FD1A2' : '#eceff4'},
                      ]}>
                      <Text
                        style={[
                          styles.popchooseStateItemText,
                          {color: this.state.choosedTime === '6mon' ? '#ffffff' : '#001133'},
                        ]}>
                        近六个月
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback onPress={() => this.chooseTime('1year')}>
                    <View
                      style={[
                        styles.popchooseStateItem,
                        {backgroundColor: this.state.choosedTime === '1year' ? '#1FD1A2' : '#eceff4'},
                      ]}>
                      <Text
                        style={[
                          styles.popchooseStateItemText,
                          {color: this.state.choosedTime === '1year' ? '#ffffff' : '#001133'},
                        ]}>
                        近一年
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
              <TouchableOpacity
                style={styles.popchooseResetbtn}
                onPress={() =>
                  this.setState({choosedState: '', choosedType: '', choosedTime: '', screenCount: 0}, () => {
                    //TODO 重新请求?
                  })
                }>
                <Text style={styles.popchooseBtnText}>重置</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.popchooseSubbtn} onPress={() => this.submitScreen()}>
                <Text style={styles.popchooseBtnText2}>完成</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(Index);
