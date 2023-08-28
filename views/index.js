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
  DeviceEventEmitter,
} from 'react-native';
import {connect} from 'react-redux';
import {resetData} from '../store/globle/action';
import AsyncStorage from '@react-native-async-storage/async-storage';

import img from '../imgs/img';
import api from '../config/api';
import date_api from '../config/date_api';
import {styles} from '../styles/index_style';
import {filterStatusData, filterTypeData, filterTimeData} from '../config/data';
import {MC, barHeight, screenHeight, windowWidth} from '../config/convert';
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
    this.getMessage = DeviceEventEmitter.addListener('message', this._getMessage);
    this.getUserinfo();
  }

  componentWillUnmount() {
    this.getMessage.remove();
  }

  _getMessage = res => {
    if (res === 'refresh') {
      this.getProjectCount();
      this.getBodyInfo();
      this.getUserList();
    }
  };

  async getUserinfo() {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      // 登录了
      api.get('app/user/info', res => {
        if (res.code === 600 || res.code === 400) {
          api.toast(res.msg);
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
      // 没登录
      this.props.navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }
  }

  getProjectCount() {
    api.post('home/count/list', {}, res => {
      let allCount = 0;
      Object.keys(res.data).forEach((item, index) => {
        allCount += res.data[item];
      });
      res.data.allCount = allCount;
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
    if (this.state.choosedState !== '' && this.state.choosedState !== 99) {
      body.statusType = this.state.choosedState;
    }
    if (this.state.choosedType !== '') {
      body.projectType = this.state.choosedType;
    }
    if (this.state.choosedTime !== '') {
      body.timeType = this.state.choosedTime;
    }
    api.post('project/user/list', body, res => {
      // console.log('user/list');
      // api.formateJSON(res);
      this.setState({userList: res.data});
    });
  }

  drewShow(item) {
    if (item.elementName === '颈部' && item.count > 0) {
      return (
        <View style={styles.TipsViewNeck} key={item.id}>
          <Image style={styles.lineBodyNeck} source={img.lineBodyNeck} />
          <View style={[styles.TipsInnerView, {borderColor: '#FF4A54'}]}>
            <Text style={styles.TipsInnerText}>颈部 {item.count}</Text>
          </View>
        </View>
      );
    } else if (item.elementName === '肾脏' && item.count > 0) {
      return (
        <View style={styles.TipsViewKidney} key={item.id}>
          <View style={[styles.TipsInnerView, {borderStyle: 'dotted', borderColor: '#0597FF', marginTop: MC(20)}]}>
            <Text style={[styles.TipsInnerText, {color: '#0597FF'}]}>肾脏 {item.count}</Text>
          </View>
          <Image style={styles.lineGutKidney} source={img.lineGutKidney} />
        </View>
      );
    } else if (item.elementName === '肝脏' && item.count > 0) {
      return (
        <View style={styles.TipsViewLiver} key={item.id}>
          <View style={[styles.TipsInnerView, {borderStyle: 'dotted', borderColor: '#FA6400'}]}>
            <Text style={[styles.TipsInnerText, {color: '#FA6400'}]}>肝脏 {item.count}</Text>
          </View>
          <Image style={styles.lineGutLiver} source={img.lineGutLiver} />
        </View>
      );
    } else if (item.elementName === '脾脏' && item.count > 0) {
      return (
        <View style={styles.TipsViewPancreas} key={item.id}>
          <Image style={styles.lineGutPancreas} source={img.lineGutPancreas} />
          <View style={[styles.TipsInnerView, {borderStyle: 'dotted', borderColor: '#00AF7F', marginTop: MC(42)}]}>
            <Text style={[styles.TipsInnerText, {color: '#00AF7F'}]}>脾脏 {item.count}</Text>
          </View>
        </View>
      );
    } else if (item.elementName === '胃' && item.count > 0) {
      return (
        <View style={styles.TipsViewStomach} key={item.id}>
          <Image style={styles.lineGutStomach} source={img.lineGutStomach} />
          <View style={[styles.TipsInnerView, {borderStyle: 'dotted', borderColor: '#822EF3'}]}>
            <Text style={[styles.TipsInnerText, {color: '#822EF3'}]}>胃部 {item.count}</Text>
          </View>
        </View>
      );
    } else if (item.elementName === '心脏' && item.count > 0) {
      return (
        <View style={styles.TipsViewHeart} key={item.id}>
          <Image style={styles.lineGutHeart} source={img.lineGutHeart} />
          <View style={[styles.TipsInnerView, {borderStyle: 'dotted', borderColor: '#E83417'}]}>
            <Text style={styles.TipsInnerText}>心脏 {item.count}</Text>
          </View>
        </View>
      );
    } else if (item.elementName === '血液' && item.count > 0) {
      return (
        <View style={styles.bloodView} key={item.id}>
          <Text style={styles.bloodText}>🩸血液 {item.count}</Text>
        </View>
      );
    } else if (item.elementName === '阴部' && item.count > 0) {
      return (
        <View style={styles.TipsViewGenital} key={item.id}>
          <Image style={styles.lineBodyGenital} source={img.lineBodyGenital} />
          <View style={[styles.TipsInnerView, {borderColor: '#FF4A54', marginTop: MC(88)}]}>
            <Text style={[styles.TipsInnerText, {color: '#FF4A54'}]}>阴部 {item.count}</Text>
          </View>
        </View>
      );
    } else if (item.elementName === '左腿' && item.count > 0) {
      return (
        <View style={styles.TipsViewLegL} key={item.id}>
          <View style={[styles.TipsInnerView, {borderColor: '#FF4A54', marginTop: MC(52)}]}>
            <Text style={[styles.TipsInnerText, {color: '#FF4A54'}]}>左腿 {item.count}</Text>
          </View>
          <Image style={styles.lineBodyLeg} source={img.lineBodyLegL} />
        </View>
      );
    } else if (item.elementName === '右腿' && item.count > 0) {
      return (
        <View style={styles.TipsViewLegR} key={item.id}>
          <Image style={styles.lineBodyLeg} source={img.lineBodyLegR} />
          <View style={[styles.TipsInnerView, {borderColor: '#FF4A54', marginTop: MC(52)}]}>
            <Text style={[styles.TipsInnerText, {color: '#FF4A54'}]}>右腿 {item.count}</Text>
          </View>
        </View>
      );
    } else if (item.elementName === '左臂' && item.count > 0) {
      return (
        <View style={styles.TipsViewHelperL} key={item.id}>
          <View style={[styles.TipsInnerView, {borderColor: '#FF4A54', marginTop: MC(20)}]}>
            <Text style={[styles.TipsInnerText, {color: '#FF4A54'}]}>左臂 {item.count}</Text>
          </View>
          <Image style={styles.lineBodyHelperL} source={img.lineBodyHelperL} />
        </View>
      );
    } else if (item.elementName === '右臂' && item.count > 0) {
      return (
        <View style={styles.TipsViewHelperR} key={item.id}>
          <Image style={styles.lineBodyHelperL} source={img.lineBodyHelperR} />
          <View style={[styles.TipsInnerView, {borderColor: '#FF4A54', marginTop: MC(20)}]}>
            <Text style={[styles.TipsInnerText, {color: '#FF4A54'}]}>右臂 {item.count}</Text>
          </View>
        </View>
      );
    } else if (item.elementName === '肠道' && item.count > 0) {
      return (
        <View style={styles.TipsViewEnteric} key={item.id}>
          <Image style={styles.lineGutEnteric} source={img.lineGutEnteric} />
          <View style={[styles.TipsInnerView, {borderStyle: 'dotted', borderColor: '#FA6400', marginTop: MC(32)}]}>
            <Text style={[styles.TipsInnerText, {color: '#FA6400'}]}>肠道 {item.count}</Text>
          </View>
        </View>
      );
    } else if (item.elementName === '膀胱' && item.count > 0) {
      return (
        <View style={styles.TipsViewBladder} key={item.id}>
          <View style={[styles.TipsInnerView, {borderStyle: 'dotted', borderColor: '#00AF7F', marginTop: MC(20)}]}>
            <Text style={[styles.TipsInnerText, {color: '#00AF7F'}]}>膀胱 {item.count}</Text>
          </View>
          <Image style={styles.lineGutBladder} source={img.lineGutBladder} />
        </View>
      );
    } else if (item.elementName === '肺' && item.count > 0) {
      return (
        <View style={styles.TipsViewLung} key={item.id}>
          <View style={[styles.TipsInnerView, {borderStyle: 'dotted', borderColor: '#0597FF'}]}>
            <Text style={[styles.TipsInnerText, {color: '#0597FF'}]}>肺部 {item.count}</Text>
          </View>
          <Image style={styles.lineGutLung} source={img.lineGutLung} />
        </View>
      );
    } else if (item.elementName === '头部' && item.count > 0) {
      return (
        <View style={styles.TipsViewHead} key={item.id}>
          <View style={[styles.TipsInnerView, {borderColor: '#FF4A54'}]}>
            <Text style={styles.TipsInnerText}>头部 {item.count}</Text>
          </View>
          <Image style={styles.lineBodyHead} source={img.lineBodyHead} />
        </View>
      );
    }
  }

  bodyInnerDrewShow(item) {
    if (item.elementName === '肾脏' && item.count > 0) {
      return <Image style={styles.bodyWarImg} source={img.ImgGutKidney} key={item.id} />;
    } else if (item.elementName === '肝脏' && item.count > 0) {
      return <Image style={styles.bodyWarImg} source={img.ImgGutLiver} key={item.id} />;
    } else if (item.elementName === '脾脏' && item.count > 0) {
      return <Image style={styles.bodyWarImg} source={img.ImgGutPancreas} key={item.id} />;
    } else if (item.elementName === '胃' && item.count > 0) {
      return <Image style={styles.bodyWarImg} source={img.ImgGutStomach} key={item.id} />;
    } else if (item.elementName === '心脏' && item.count > 0) {
      return <Image style={styles.bodyWarImg} source={img.ImgGutHeart} key={item.id} />;
    } else if (item.elementName === '肠道' && item.count > 0) {
      return <Image style={styles.bodyWarImg} source={img.ImgGutEnteric} key={item.id} />;
    } else if (item.elementName === '膀胱' && item.count > 0) {
      return <Image style={styles.bodyWarImg} source={img.ImgGutbladder} key={item.id} />;
    } else if (item.elementName === '肺' && item.count > 0) {
      return <Image style={styles.bodyWarImg} source={img.ImgGutLung} key={item.id} />;
    }
  }

  indexList(item) {
    if (item.projectEditType === 0) {
      //正常
      return (
        <TouchableOpacity style={styles.infoListItem} key={item.id} onPress={() => this.toNextPage('Record', item)}>
          <Image style={styles.dynamicIcon} source={img.dynamicIcon} />
          <Text style={styles.infoListItemTitle}>{item.projectName}</Text>
          <Text style={styles.infoListItemTime}>创建时间：{date_api.formateTdateList(item.addTime)}</Text>
          <Text style={styles.infoListItemStateNor}>{item.result}</Text>
        </TouchableOpacity>
      );
    } else if (item.projectEditType === 5) {
      //待办
      return (
        <TouchableOpacity style={styles.infoListItem} key={item.id} onPress={() => this.toAddItemPage(item)}>
          <Image style={styles.dynamicIcon} source={img.dynamicIcon} />
          <Text style={styles.infoListItemTitle}>{item.projectName}</Text>
          <Text style={styles.infoListItemTime}>创建时间：{date_api.formateTdateList(item.addTime)}</Text>
          <Text style={styles.infoListItemStateWait}>待办</Text>
        </TouchableOpacity>
      );
    } else if (item.projectEditType === 20) {
      //警示
      return (
        <TouchableOpacity style={styles.infoListItem} key={item.id} onPress={() => this.toNextPage('Record', item)}>
          <Image style={styles.dynamicIcon} source={img.dynamicIcon} />
          <Text style={styles.infoListItemTitle}>{item.projectName}</Text>
          <Text style={styles.infoListItemTime}>创建时间：{date_api.formateTdateList(item.addTime)}</Text>
          <Text style={styles.infoListItemStateMid}>{item.result}</Text>
        </TouchableOpacity>
      );
    } else if (item.projectEditType === 25) {
      //异常
      return (
        <TouchableOpacity style={styles.infoListItem} key={item.id} onPress={() => this.toNextPage('Record', item)}>
          <Image style={styles.dynamicIcon} source={img.dynamicIcon} />
          <Text style={styles.infoListItemTitle}>{item.projectName}</Text>
          <Text style={styles.infoListItemTime}>创建时间：{date_api.formateTdateList(item.addTime)}</Text>
          <Text style={styles.infoListItemStateBad}>{item.result}</Text>
        </TouchableOpacity>
      );
    } else {
      <View style={styles.infoListItem} key={item.id}>
        <Image style={styles.dynamicIcon} source={img.dynamicIcon} />
        <Text style={styles.infoListItemTitle}>{item.projectName}</Text>
        <Text style={styles.infoListItemTime}>创建时间：{date_api.formateTdateList(item.addTime)}</Text>
      </View>;
    }
  }

  toNextPage(pageName, item) {
    this.props.navigation.navigate(pageName, {transParams: item});
  }

  toAddItemPage(item) {
    this.props.navigation.navigate('AddItemFromIndex', {transParams: item});
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
      this.setState({screenCount: 0}, () => {
        this.showScreen(false);
        this.getUserList();
      });
    }
  }

  labelClick(type) {
    if (!this.state.bodyInfoState) {
      this.switchBodyInfo(this.state.bodyInfoState);
    }
    let body = {};
    if (type !== 99) {
      body.statusType = type;
    }
    api.post('project/user/list', body, res => {
      this.setState(
        {userList: res.data, choosedState: type, choosedType: '', choosedTime: '', screenCount: type === 99 ? 0 : 1},
        () => {
          if (!this.state.bodyInfoState) {
            this.switchBodyInfo(this.state.bodyInfoState);
          }
        },
      );
    });
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
              {/* 画像/列表 */}
              <Animated.View
                style={[
                  styles.infoListView,
                  {
                    transform: [{translateY: this.state.bodyInfoImgTop}],
                  },
                ]}>
                {this.state.bodyInfoState ? (
                  //! 列表
                  <ScrollView
                    style={{flex: 1}}
                    showsVerticalScrollIndicator={false}
                    overScrollMode="always"
                    contentContainerStyle={this.state.userList.length !== 0 ? {alignItems: 'center'} : {flex: 1}}>
                    {this.state.userList.length === 0 ? (
                      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: windowWidth}}>
                        <Text>暂无相关项目</Text>
                      </View>
                    ) : (
                      this.state.userList.map((item, index) => {
                        return this.indexList(item);
                      })
                    )}
                    <View style={{position: 'relative', width: windowWidth, height: 35}}></View>
                  </ScrollView>
                ) : (
                  //! 画像
                  <View style={styles.drawView}>
                    {this.state.lastDrewTime > 0 ? null : (
                      <Image resizeMode="contain" style={styles.nodataDrew} source={img.nodataDrew} />
                    )}
                    <ImageBackground
                      style={styles.manDrew}
                      source={this.props.globle.userdata.gender === 2 ? img.womanDrew : img.manDrew}>
                      <ImageBackground style={styles.bodyInner} source={img.bodyInner}>
                        {this.state.lastDrewTime > 0
                          ? this.state.drewData.map((bItem, bIndex) => {
                              return this.bodyInnerDrewShow(bItem);
                            })
                          : null}
                      </ImageBackground>
                    </ImageBackground>

                    {this.state.lastDrewTime > 0
                      ? this.state.drewData.map((dItem, dIndex) => {
                          return this.drewShow(dItem);
                        })
                      : null}
                  </View>
                )}
              </Animated.View>
              {/* 项目数量 */}
              <Animated.View
                style={[
                  styles.userBodyInfoText,
                  {
                    transform: [{translateY: this.state.bodyInfoTitleTop}],
                  },
                ]}>
                <TouchableOpacity style={styles.infoItem} onPress={() => this.labelClick(5)}>
                  <Text style={styles.infoItemTitleText}>待办项</Text>
                  <View style={styles.infoItemInner}>
                    <Text style={styles.infoItemText}>
                      {this.state.proCount.waitCount > 0 ? this.state.proCount.waitCount : '-'}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.infoItem} onPress={() => this.labelClick(20)}>
                  <Text style={styles.infoItemTitleText}>警示项</Text>
                  <View style={styles.infoItemInner}>
                    <Text style={styles.infoItemText}>
                      {this.state.proCount.warningCount > 0 ? this.state.proCount.warningCount : '-'}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.infoItem} onPress={() => this.labelClick(25)}>
                  <Text style={styles.infoItemTitleText}>异常项</Text>
                  <View style={styles.infoItemInner}>
                    <Text style={styles.infoItemText}>
                      {this.state.proCount.abnormalCount > 0 ? this.state.proCount.abnormalCount : '-'}
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.infoItem} onPress={() => this.labelClick(99)}>
                  <Text style={styles.infoItemTitleText}>全部项</Text>
                  <View style={styles.infoItemInner}>
                    <Text style={styles.infoItemText}>
                      {this.state.proCount.allCount > 0 ? this.state.proCount.allCount : '-'}
                    </Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
          {/* 底部按钮 */}
          {this.state.bodyInfoState ? (
            <View style={[styles.indexBtnView, {display: 'flex'}]}>
              <TouchableOpacity onPress={() => this.toNextPage('Add')}>
                <View style={styles.indexBtn}>
                  <Text style={styles.indexBtnText}>新增健康动态</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : this.state.lastDrewTime === 0 ? (
            <View style={[styles.indexBtnView, {display: 'flex'}]}>
              <TouchableOpacity onPress={() => this.toNextPage('Add')}>
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
              </TouchableOpacity>
            </View>
          ) : null}
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
          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)'}}>
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
