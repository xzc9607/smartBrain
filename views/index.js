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
import {MC, barHeight, screenHeight} from '../config/convert';
import img from '../imgs/img';
import api from '../config/api';
import date_api from '../config/date_api';

const filterStatusData = [
  {value: 5, name: '代办项'},
  // {value: 'advance', name: '进步项'},
  // {value: 'lag', name: '退步项'},
  {value: 20, name: '警示项'},
  {value: 25, name: '异常项'},
];
const filterTypeData = [
  {value: 1, name: '体检'},
  {value: 2, name: '诊断'},
  {value: 3, name: '治疗'},
  {value: 5, name: '病史'},
  // {value: 'system', name: '身体系统'},
  // {value: 'position', name: '身体部位'},
];
const filterTimeData = [
  {value: 1, name: '近一个月'},
  {value: 2, name: '近三个月'},
  {value: 3, name: '近六个月'},
  {value: 4, name: '近一年'},
];

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
      proCount: {},
      drewData: [],
      lastDrewTime: 0,
      userList: [],
    };
  }

  componentDidMount() {
    this.getUserinfo();
  }

  async getUserinfo() {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      // todo 登录了
      api.get('app/user/info', res => {
        if (res.code === 600) {
          this.props.navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
          });
        } else {
          this.props.resetData(res.data);
          this.getProjectCount();
          this.getBodyInfo();
          this.getUserList();
        }
      });
    } else {
      // todo 没登录
      this.props.navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }
  }

  getProjectCount() {
    api.post('home/count/list', {}, res => {
      this.setState({proCount: res.data});
    });
  }

  getBodyInfo() {
    api.post('home/info', {}, res => {
      // api.formateJSON(res.data);
      if (res.data.updateTime > 0) {
        this.setState({lastDrewTime: res.data.updateTime, drewData: res.data.list});
      }
    });
  }

  getUserList() {
    let body = {};
    if (this.state.choosedState !== '') {
      body.statusType = this.state.choosedState;
    }
    if (this.state.choosedType !== '') {
      body.projectType = this.state.choosedType;
    }
    if (this.state.choosedTime !== '') {
      body.timeType = this.state.choosedTime;
    }
    api.post('project/user/list', body, res => {
      console.log('user/list');
      api.formateJSON(res);
      this.setState({userList: res.data});
    });
  }

  drewShow(data) {
    data.map((item, index) => {
      if (item.elementName === '颈部' && item.count > 0) {
        return (
          <View style={styles.TipsViewNeck}>
            <Image style={styles.lineBodyNeck} source={img.lineBodyNeck} />
            <View style={[styles.TipsInnerView, {borderColor: '#FF4A54'}]}>
              <Text style={styles.TipsInnerText}>颈部 {item.count}</Text>
            </View>
          </View>
        );
      } else if (item.elementName === '肾脏' && item.count > 0) {
        return (
          <View style={styles.TipsViewKidney}>
            <View style={[styles.TipsInnerView, {borderStyle: 'dotted', borderColor: '#0597FF', marginTop: MC(20)}]}>
              <Text style={[styles.TipsInnerText, {color: '#0597FF'}]}>肾脏 {item.count}</Text>
            </View>
            <Image style={styles.lineGutKidney} source={img.lineGutKidney} />
          </View>
        );
      } else if (item.elementName === '肝脏' && item.count > 0) {
        return (
          <View style={styles.TipsViewLiver}>
            <View style={[styles.TipsInnerView, {borderStyle: 'dotted', borderColor: '#FA6400'}]}>
              <Text style={[styles.TipsInnerText, {color: '#FA6400'}]}>肝脏 {item.count}</Text>
            </View>
            <Image style={styles.lineGutLiver} source={img.lineGutLiver} />
          </View>
        );
      } else if (item.elementName === '脾脏' && item.count > 0) {
        return (
          <View style={styles.TipsViewPancreas}>
            <Image style={styles.lineGutPancreas} source={img.lineGutPancreas} />
            <View style={[styles.TipsInnerView, {borderStyle: 'dotted', borderColor: '#00AF7F', marginTop: MC(42)}]}>
              <Text style={[styles.TipsInnerText, {color: '#00AF7F'}]}>脾脏 {item.count}</Text>
            </View>
          </View>
        );
      } else if ((item.elementName === '胃' || item.elementName === '胃部') && item.count > 0) {
        return (
          <View style={styles.TipsViewStomach}>
            <Image style={styles.lineGutStomach} source={img.lineGutStomach} />
            <View style={[styles.TipsInnerView, {borderStyle: 'dotted', borderColor: '#822EF3'}]}>
              <Text style={[styles.TipsInnerText, {color: '#822EF3'}]}>胃部 {item.count}</Text>
            </View>
          </View>
        );
      } else if (item.elementName === '心脏' && item.count > 0) {
        return (
          <View style={styles.TipsViewHeart}>
            <Image style={styles.lineGutHeart} source={img.lineGutHeart} />
            <View style={[styles.TipsInnerView, {borderStyle: 'dotted', borderColor: '#E83417'}]}>
              <Text style={styles.TipsInnerText}>心脏 {item.count}</Text>
            </View>
          </View>
        );
      } else if (item.elementName === '血液' && item.count > 0) {
        return (
          <View style={styles.TipsViewHeart}>
            <Image style={styles.lineGutHeart} source={img.lineGutHeart} />
            <View style={[styles.TipsInnerView, {borderStyle: 'dotted', borderColor: '#E83417'}]}>
              <Text style={styles.TipsInnerText}>心脏 {item.count}</Text>
            </View>
          </View>
        );
      } else if (item.elementName === '阴部' && item.count > 0) {
        return (
          <View style={styles.TipsViewGenital}>
            <Image style={styles.lineBodyGenital} source={img.lineBodyGenital} />
            <View style={[styles.TipsInnerView, {borderColor: '#FF4A54', marginTop: MC(88)}]}>
              <Text style={[styles.TipsInnerText, {color: '#FF4A54'}]}>阴部 {item.count}</Text>
            </View>
          </View>
        );
      } else if (item.elementName === '左腿' && item.count > 0) {
        return (
          <View style={styles.TipsViewLegL}>
            <View style={[styles.TipsInnerView, {borderColor: '#FF4A54', marginTop: MC(52)}]}>
              <Text style={[styles.TipsInnerText, {color: '#FF4A54'}]}>左腿 {item.count}</Text>
            </View>
            <Image style={styles.lineBodyLeg} source={img.lineBodyLegL} />
          </View>
        );
      } else if (item.elementName === '右腿' && item.count > 0) {
        return (
          <View style={styles.TipsViewLegR}>
            <Image style={styles.lineBodyLeg} source={img.lineBodyLegR} />
            <View style={[styles.TipsInnerView, {borderColor: '#FF4A54', marginTop: MC(52)}]}>
              <Text style={[styles.TipsInnerText, {color: '#FF4A54'}]}>右腿 {item.count}</Text>
            </View>
          </View>
        );
      } else if (item.elementName === '左臂' && item.count > 0) {
        return (
          <View style={styles.TipsViewHelperL}>
            <View style={[styles.TipsInnerView, {borderColor: '#FF4A54', marginTop: MC(20)}]}>
              <Text style={[styles.TipsInnerText, {color: '#FF4A54'}]}>左臂 {item.count}</Text>
            </View>
            <Image style={styles.lineBodyHelperL} source={img.lineBodyHelperL} />
          </View>
        );
      } else if (item.elementName === '右臂' && item.count > 0) {
        return (
          <View style={styles.TipsViewHelperR}>
            <Image style={styles.lineBodyHelperL} source={img.lineBodyHelperR} />
            <View style={[styles.TipsInnerView, {borderColor: '#FF4A54', marginTop: MC(20)}]}>
              <Text style={[styles.TipsInnerText, {color: '#FF4A54'}]}>右臂 {item.count}</Text>
            </View>
          </View>
        );
      } else if (item.elementName === '肠道' && item.count > 0) {
        return (
          <View style={styles.TipsViewEnteric}>
            <Image style={styles.lineGutEnteric} source={img.lineGutEnteric} />
            <View style={[styles.TipsInnerView, {borderStyle: 'dotted', borderColor: '#FA6400', marginTop: MC(32)}]}>
              <Text style={[styles.TipsInnerText, {color: '#FA6400'}]}>肠道 {item.count}</Text>
            </View>
          </View>
        );
      } else if (item.elementName === '膀胱' && item.count > 0) {
        return (
          <View style={styles.TipsViewBladder}>
            <View style={[styles.TipsInnerView, {borderStyle: 'dotted', borderColor: '#00AF7F', marginTop: MC(20)}]}>
              <Text style={[styles.TipsInnerText, {color: '#00AF7F'}]}>膀胱 {item.count}</Text>
            </View>
            <Image style={styles.lineGutBladder} source={img.lineGutBladder} />
          </View>
        );
      } else if ((item.elementName === '肺部' || item.elementName === '肺') && item.count > 0) {
        return (
          <View style={styles.TipsViewLung}>
            <View style={[styles.TipsInnerView, {borderStyle: 'dotted', borderColor: '#0597FF'}]}>
              <Text style={[styles.TipsInnerText, {color: '#0597FF'}]}>肺部 {item.count}</Text>
            </View>
            <Image style={styles.lineGutLung} source={img.lineGutLung} />
          </View>
        );
      } else if (item.elementName === '头部' && item.count > 0) {
        return (
          <View style={styles.TipsViewHead}>
            <View style={[styles.TipsInnerView, {borderColor: '#FF4A54'}]}>
              <Text style={styles.TipsInnerText}>头部 {item.count}</Text>
            </View>
            <Image style={styles.lineBodyHead} source={img.lineBodyHead} />
          </View>
        );
      }
    });
  }

  bodyInnerDrewShow(data) {
    data.map((item, index) => {
      if (item.elementName === '肾脏' && item.count > 0) {
        return <Image style={styles.bodyWarImg} source={img.ImgGutKidney} />;
      } else if (item.elementName === '肝脏' && item.count > 0) {
        return <Image style={styles.bodyWarImg} source={img.ImgGutLiver} />;
      } else if (item.elementName === '脾脏' && item.count > 0) {
        return <Image style={styles.bodyWarImg} source={img.ImgGutPancreas} />;
      } else if (item.elementName === '胃' && item.count > 0) {
        return <Image style={styles.bodyWarImg} source={img.ImgGutStomach} />;
      } else if (item.elementName === '心脏' && item.count > 0) {
        return <Image style={styles.bodyWarImg} source={img.ImgGutHeart} />;
      } else if (item.elementName === '肠道' && item.count > 0) {
        return <Image style={styles.bodyWarImg} source={img.ImgGutEnteric} />;
      } else if (item.elementName === '膀胱' && item.count > 0) {
        return <Image style={styles.bodyWarImg} source={img.ImgGutbladder} />;
      } else if (item.elementName === '肺部' && item.count > 0) {
        return <Image style={styles.bodyWarImg} source={img.ImgGutLung} />;
      }
    });
  }

  toNextPage(pageName) {
    this.props.navigation.navigate(pageName);
  }

  switchBodyInfo(action) {
    this.setState({bodyInfoState: !action}, () => {
      if (action) {
        Animated.parallel([
          Animated.timing(this.state.bodyInfoTitleTop, {
            toValue: screenHeight - MC(596) - barHeight,
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
          this.getUserList();
        },
      );
    } else {
      //todo 重新拿所有数据
      this.setState({screenCount: 0}, () => {
        this.showScreen(false);
        this.getUserList();
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
                <Image
                  style={styles.userAvatarImg}
                  source={this.props.globle.userdata.gender === 2 ? img.womenAvatar : img.userAvatar}
                />
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
                <Text style={styles.drawUpdataTimeText}>{date_api.formateDrewTime(this.state.lastDrewTime)}</Text>
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
                  <ScrollView
                    style={{flex: 1}}
                    showsVerticalScrollIndicator={false}
                    overScrollMode="always"
                    contentContainerStyle={{alignItems: 'center'}}>
                    {/* <Text>暂无动态</Text> */}
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
                  <View style={styles.drawView}>
                    <Image resizeMode="contain" style={styles.nodataDrew} source={img.nodataDrew} />
                    <ImageBackground
                      style={styles.manDrew}
                      source={this.props.globle.userdata.gender === 2 ? img.womanDrew : img.manDrew}>
                      <ImageBackground style={styles.bodyInner} source={img.bodyInner}>
                        {this.state.lastDrewTime > 0 ? this.bodyInnerDrewShow(this.state.drewData) : null}
                      </ImageBackground>
                    </ImageBackground>
                    {this.state.lastDrewTime > 0 ? this.drewShow(this.state.drewData) : null}
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
                  <Text style={styles.infoItemTitleText}>待办项</Text>
                  <View style={styles.infoItemInner}>
                    <Text style={styles.infoItemText}>
                      {this.state.proCount.waitCount > 0 ? this.state.proCount.waitCount : '-'}
                    </Text>
                  </View>
                </View>
                {/* <View style={styles.infoItem}>
                  <Text style={styles.infoItemTitleText}>进步项</Text>
                  <View style={styles.infoItemInner}>
                    <Text style={styles.infoItemText}>
                      <Image style={styles.infoItemIcon} source={img.upIcon} />
                      {this.state.proCount.progressiveCount > 0 ? this.state.proCount.progressiveCount : '-'}
                    </Text>
                  </View>
                </View> */}
                {/* <View style={styles.infoItem}>
                  <Text style={styles.infoItemTitleText}>退步项</Text>
                  <View style={styles.infoItemInner}>
                    <Text style={styles.infoItemText}>
                      <Image style={styles.infoItemIcon} source={img.downIcon} />{' '}
                      {this.state.proCount.behindCount > 0 ? this.state.proCount.behindCount : '-'}
                    </Text>
                  </View>
                </View> */}
                <View style={styles.infoItem}>
                  <Text style={styles.infoItemTitleText}>警示项</Text>
                  <View style={styles.infoItemInner}>
                    <Text style={styles.infoItemText}>
                      {this.state.proCount.warningCount > 0 ? this.state.proCount.warningCount : '-'}
                    </Text>
                  </View>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoItemTitleText}>异常项</Text>
                  <View style={styles.infoItemInner}>
                    <Text style={styles.infoItemText}>
                      {this.state.proCount.abnormalCount > 0 ? this.state.proCount.abnormalCount : '-'}
                    </Text>
                  </View>
                </View>
                <View style={styles.infoItem}>
                  <Text style={styles.infoItemTitleText}>全部项</Text>
                  <View style={styles.infoItemInner}>
                    <Text style={styles.infoItemText}>
                      {this.state.proCount.abnormalCount + this.state.proCount.warningCount + this.state.proCount.waitCount > 0
                        ? this.state.proCount.abnormalCount + this.state.proCount.warningCount + this.state.proCount.waitCount
                        : '-'}
                    </Text>
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
              ) : this.state.lastDrewTime === 0 ? (
                <View style={styles.indexBtn}>
                  <Image
                    style={styles.userBtnAvatar}
                    source={this.props.globle.userdata.gender === 2 ? img.womenAvatar : img.userAvatar}
                  />
                  <Text style={styles.indexBtnText}>补充健康信息，完善健康画像</Text>
                  <View style={styles.addBtnView}>
                    <Image style={styles.addIcon} source={img.addIcon} />
                    <Text style={styles.addBtnText}>新增</Text>
                  </View>
                </View>
              ) : (
                <View style={styles.indexBtn}>
                  <Text style={styles.indexBtnText}>新增健康动态</Text>
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
                  {filterStatusData.map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => this.chooseState(item.value)}
                        key={item.value}
                        style={[
                          styles.popchooseStateItem,
                          {backgroundColor: this.state.choosedState === item.value ? '#1FD1A2' : '#eceff4'},
                        ]}>
                        <Text
                          style={[
                            styles.popchooseStateItemText,
                            {color: this.state.choosedState === item.value ? '#ffffff' : '#001133'},
                          ]}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <Text style={styles.popchooseTitle}>按类型筛选</Text>
                <View style={styles.popchooseStateView}>
                  {filterTypeData.map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => this.chooseType(item.value)}
                        key={item.value}
                        style={[
                          styles.popchooseStateItem,
                          {backgroundColor: this.state.choosedType === item.value ? '#1FD1A2' : '#eceff4'},
                        ]}>
                        <Text
                          style={[
                            styles.popchooseStateItemText,
                            {color: this.state.choosedType === item.value ? '#ffffff' : '#001133'},
                          ]}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <Text style={styles.popchooseTitle}>按时间筛选</Text>
                <View style={styles.popchooseStateView}>
                  {filterTimeData.map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => this.chooseTime(item.value)}
                        key={item.value}
                        style={[
                          styles.popchooseStateItem,
                          {backgroundColor: this.state.choosedTime === item.value ? '#1FD1A2' : '#eceff4'},
                        ]}>
                        <Text
                          style={[
                            styles.popchooseStateItemText,
                            {color: this.state.choosedTime === item.value ? '#ffffff' : '#001133'},
                          ]}>
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
              <TouchableOpacity
                style={styles.popchooseResetbtn}
                onPress={() => this.setState({choosedState: '', choosedType: '', choosedTime: '', screenCount: 0})}>
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
