import React, {Component} from 'react';
import {
  View,
  StatusBar,
  Image,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {resetData} from '../store/globle/action';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {styles} from '../styles/add_style';
import {MC} from '../config/convert';
import img from '../imgs/img';
import api from '../config/api';

const DATA = [
  {value: '1', label: '脑'},
  {value: '2', label: '大脑'},
  {value: '3', label: '小脑'},
  {value: '4', label: '太阳穴'},
];

class Add extends Component {
  constructor(props) {
    super(props);
    this.inputsearchRef = React.createRef();
    this.state = {
      searchText: '',
      searching: false,
      choosedType: '',
      choosedBodyType: '',
      choosedSystemType: '',
      wantData: [],
      history: [],
    };
  }

  componentDidMount() {
    this.getWant();
    this.getHistory();
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidHideListener.remove();
  }

  async getHistory() {
    const value = await AsyncStorage.getItem('history');
    if (value !== null) {
      let his = JSON.parse(value);
      if (his.length >= 9) {
        his.pop();
      }
      this.setState({history: his});
    }
  }

  search() {
    if (this.state.searchText === '') {
      api.toast('请输入需要搜索的内容');
      return;
    }
    this.setState({history: [this.state.searchText, ...this.state.history]}, () => {
      AsyncStorage.setItem('history', JSON.stringify(this.state.history));
      // todo 搜索
      api.post(
        'app/element/search',
        {
          keyword: this.state.searchText,
        },
        res => {
          console.log(res);
        },
      );
    });
  }

  getWant() {
    api.post('app/common/want/search', {}, res => {
      this.setState({wantData: res.data});
    });
  }

  //键盘收起
  _keyboardDidHide = () => {
    if (this.state.searchText === '') {
      this.setState({searching: false});
    }
    this.inputsearchRef.current.blur();
  };

  chooseType(type) {
    this.setState({choosedType: type});
    if (type === 'body') {
    } else if (type === 'system') {
    } else if (type === 'spare') {
    } else if (type === 'disease') {
    }
  }

  chooseBodyType(type) {
    this.setState({choosedBodyType: type});
    if (type === 'body') {
    } else if (type === 'system') {
    } else if (type === 'spare') {
    } else if (type === 'disease') {
    }
  }

  chooseSystemType(type) {
    this.setState({choosedSystemType: type});
    if (type === 'body') {
    } else if (type === 'system') {
    } else if (type === 'spare') {
    } else if (type === 'disease') {
    }
  }

  toNextPage(pageName) {
    this.props.navigation.navigate(pageName);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <View style={styles.safeView}>
          {/*//! 标题栏 */}
          <View style={styles.navView}>
            <Text style={styles.navTitle}>新增</Text>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
              <View style={styles.backIconView}>
                <Image style={styles.backIcon} source={img.backIconBlck} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.mainView}>
            {/*//! 搜索框 */}
            <View style={styles.searchView}>
              <TextInput
                ref={this.inputsearchRef}
                style={styles.inputCode}
                onChangeText={text => this.setState({searchText: text})}
                value={this.state.searchText}
                onFocus={() => this.setState({searching: true})}
                placeholder="搜索体检/疾病/诊断"
              />
              <TouchableOpacity style={styles.searchIcon} onPress={() => this.search()}>
                <Image style={styles.searchIconImg} source={img.searchIcon} />
              </TouchableOpacity>
            </View>
            {!this.state.searching ? (
              // !新增默认显示区域
              <ScrollView style={styles.itemView} contentContainerStyle={styles.itemContentView}>
                <Text style={styles.itemTitle}>选择动态类型</Text>
                <View style={styles.itemInnerView}>
                  <View style={styles.itemTypeView}>
                    <TouchableWithoutFeedback onPress={() => this.chooseType('body')}>
                      <View
                        style={[styles.IconView, {backgroundColor: this.state.choosedType === 'body' ? '#1FD1A2' : '#f5f5f5'}]}>
                        <Image
                          style={styles.searchItemIcon}
                          source={this.state.choosedType === 'body' ? img.searchBodywIcon : img.searchBodyIcon}
                        />
                        <Text style={[styles.searchItemText, {color: this.state.choosedType === 'body' ? '#ffffff' : '#001133'}]}>
                          身体部位
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.chooseType('system')}>
                      <View
                        style={[styles.IconView, {backgroundColor: this.state.choosedType === 'system' ? '#1FD1A2' : '#f5f5f5'}]}>
                        <Image
                          style={styles.searchItemIcon}
                          source={this.state.choosedType === 'system' ? img.searchDiseasewIcon : img.searchDiseaseIcon}
                        />
                        <Text
                          style={[styles.searchItemText, {color: this.state.choosedType === 'system' ? '#ffffff' : '#001133'}]}>
                          身体系统
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.chooseType('disease')}>
                      <View
                        style={[
                          styles.IconView,
                          {backgroundColor: this.state.choosedType === 'disease' ? '#1FD1A2' : '#f5f5f5'},
                        ]}>
                        <Image
                          style={styles.searchItemIcon}
                          source={this.state.choosedType === 'disease' ? img.searchSystemwIcon : img.searchSystemIcon}
                        />
                        <Text
                          style={[styles.searchItemText, {color: this.state.choosedType === 'disease' ? '#ffffff' : '#001133'}]}>
                          病史
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => this.chooseType('spare')}>
                      <View
                        style={[styles.IconView, {backgroundColor: this.state.choosedType === 'spare' ? '#1FD1A2' : '#f5f5f5'}]}>
                        <Image
                          style={styles.searchItemIcon}
                          source={this.state.choosedType === 'spare' ? img.searchSparewIcon : img.searchSpareIcon}
                        />
                        <Text
                          style={[styles.searchItemText, {color: this.state.choosedType === 'spare' ? '#ffffff' : '#001133'}]}>
                          项目集
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                  {this.state.choosedType === 'body' ? (
                    <View style={styles.itemType2View}>
                      <Text style={styles.itemTitle2}>选择身体部位</Text>
                      <View style={styles.itemBodyTypeView}>
                        <TouchableWithoutFeedback onPress={() => this.chooseBodyType('brain')}>
                          <View style={styles.itemBodyTypeInnerView}>
                            <View
                              style={[
                                styles.itemBodyTypeInnerAvatarView,
                                {
                                  backgroundColor: this.state.choosedBodyType === 'brain' ? '#1FD1A2' : '#ffffff',
                                },
                              ]}>
                              <Image style={styles.bodyInnerIcon} source={img.brainIcon} />
                            </View>
                            <Text
                              style={[
                                styles.itemBodyTypeInnerText,
                                {color: this.state.choosedBodyType === 'brain' ? '#1FD1A2' : '#001133'},
                              ]}>
                              头部
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.chooseBodyType('neck')}>
                          <View style={styles.itemBodyTypeInnerView}>
                            <View
                              style={[
                                styles.itemBodyTypeInnerAvatarView,
                                {
                                  backgroundColor: this.state.choosedBodyType === 'neck' ? '#1FD1A2' : '#ffffff',
                                },
                              ]}>
                              <Image style={styles.bodyInnerIcon} source={img.neckIcon} />
                            </View>
                            <Text
                              style={[
                                styles.itemBodyTypeInnerText,
                                {color: this.state.choosedBodyType === 'neck' ? '#1FD1A2' : '#001133'},
                              ]}>
                              颈部
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.chooseBodyType('waist')}>
                          <View style={styles.itemBodyTypeInnerView}>
                            <View
                              style={[
                                styles.itemBodyTypeInnerAvatarView,
                                {
                                  backgroundColor: this.state.choosedBodyType === 'waist' ? '#1FD1A2' : '#ffffff',
                                },
                              ]}>
                              <Image style={styles.bodyInnerIcon} source={img.waistIcon} />
                            </View>
                            <Text
                              style={[
                                styles.itemBodyTypeInnerText,
                                {color: this.state.choosedBodyType === 'waist' ? '#1FD1A2' : '#001133'},
                              ]}>
                              腰部
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.chooseBodyType('leg')}>
                          <View style={styles.itemBodyTypeInnerView}>
                            <View
                              style={[
                                styles.itemBodyTypeInnerAvatarView,
                                {
                                  backgroundColor: this.state.choosedBodyType === 'leg' ? '#1FD1A2' : '#ffffff',
                                },
                              ]}>
                              <Image style={styles.bodyInnerIcon} source={img.legIcon} />
                            </View>
                            <Text
                              style={[
                                styles.itemBodyTypeInnerText,
                                {color: this.state.choosedBodyType === 'leg' ? '#1FD1A2' : '#001133'},
                              ]}>
                              腿部
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                      </View>
                    </View>
                  ) : this.state.choosedType === 'system' ? (
                    <View style={styles.itemType2View}>
                      <Text style={styles.itemTitle2}>选择身体系统</Text>
                      <View style={styles.itemSystemTypeView}>
                        <TouchableWithoutFeedback onPress={() => this.chooseSystemType('sport')}>
                          <View style={styles.itemSystemTypeInnerView}>
                            <View
                              style={[
                                styles.itemBodyTypeInnerAvatarView,
                                {
                                  backgroundColor: this.state.choosedSystemType === 'sport' ? '#1FD1A2' : '#ffffff',
                                },
                              ]}>
                              <Image style={styles.bodyInnerIcon} source={img.sportIcon} />
                            </View>
                            <Text
                              style={[
                                styles.itemBodyTypeInnerText,
                                {
                                  color: this.state.choosedSystemType === 'sport' ? '#1FD1A2' : '#001133',
                                },
                              ]}>
                              运动系统
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.chooseSystemType('nerve')}>
                          <View style={styles.itemBodyTypeInnerView}>
                            <View
                              style={[
                                styles.itemBodyTypeInnerAvatarView,
                                {
                                  backgroundColor: this.state.choosedSystemType === 'nerve' ? '#1FD1A2' : '#ffffff',
                                },
                              ]}>
                              <Image style={styles.bodyInnerIcon} source={img.nerveIcon} />
                            </View>
                            <Text
                              style={[
                                styles.itemBodyTypeInnerText,
                                {
                                  color: this.state.choosedSystemType === 'nerve' ? '#1FD1A2' : '#001133',
                                },
                              ]}>
                              神经系统
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.chooseSystemType('secrete')}>
                          <View style={styles.itemBodyTypeInnerView}>
                            <View
                              style={[
                                styles.itemBodyTypeInnerAvatarView,
                                {
                                  backgroundColor: this.state.choosedSystemType === 'secrete' ? '#1FD1A2' : '#ffffff',
                                },
                              ]}>
                              <Image style={styles.bodyInnerIcon} source={img.secreteIcon} />
                            </View>
                            <Text
                              style={[
                                styles.itemBodyTypeInnerText,
                                {
                                  color: this.state.choosedSystemType === 'secrete' ? '#1FD1A2' : '#001133',
                                },
                              ]}>
                              内分泌系统
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.chooseSystemType('cycle')}>
                          <View style={styles.itemBodyTypeInnerView}>
                            <View
                              style={[
                                styles.itemBodyTypeInnerAvatarView,
                                {
                                  backgroundColor: this.state.choosedSystemType === 'cycle' ? '#1FD1A2' : '#ffffff',
                                },
                              ]}>
                              <Image style={styles.bodyInnerIcon} source={img.cycleIcon} />
                            </View>
                            <Text
                              style={[
                                styles.itemBodyTypeInnerText,
                                {
                                  color: this.state.choosedSystemType === 'cycle' ? '#1FD1A2' : '#001133',
                                },
                              ]}>
                              循环系统
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                      </View>
                      <View style={[styles.itemSystemTypeView, {marginTop: MC(40), marginBottom: MC(40)}]}>
                        <TouchableWithoutFeedback onPress={() => this.chooseSystemType('breath')}>
                          <View style={styles.itemBodyTypeInnerView}>
                            <View
                              style={[
                                styles.itemBodyTypeInnerAvatarView,
                                {
                                  backgroundColor: this.state.choosedSystemType === 'breath' ? '#1FD1A2' : '#ffffff',
                                },
                              ]}>
                              <Image style={styles.bodyInnerIcon} source={img.breathIcon} />
                            </View>
                            <Text
                              style={[
                                styles.itemBodyTypeInnerText,
                                {
                                  color: this.state.choosedSystemType === 'breath' ? '#1FD1A2' : '#001133',
                                },
                              ]}>
                              呼吸系统
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.chooseSystemType('digest')}>
                          <View style={styles.itemBodyTypeInnerView}>
                            <View
                              style={[
                                styles.itemBodyTypeInnerAvatarView,
                                {
                                  backgroundColor: this.state.choosedSystemType === 'digest' ? '#1FD1A2' : '#ffffff',
                                },
                              ]}>
                              <Image style={styles.bodyInnerIcon} source={img.digestIcon} />
                            </View>
                            <Text
                              style={[
                                styles.itemBodyTypeInnerText,
                                {
                                  color: this.state.choosedSystemType === 'digest' ? '#1FD1A2' : '#001133',
                                },
                              ]}>
                              消化系统
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.chooseSystemType('urology')}>
                          <View style={styles.itemBodyTypeInnerView}>
                            <View
                              style={[
                                styles.itemBodyTypeInnerAvatarView,
                                {
                                  backgroundColor: this.state.choosedSystemType === 'urology' ? '#1FD1A2' : '#ffffff',
                                },
                              ]}>
                              <Image style={styles.bodyInnerIcon} source={img.urologyIcon} />
                            </View>
                            <Text
                              style={[
                                styles.itemBodyTypeInnerText,
                                {
                                  color: this.state.choosedSystemType === 'urology' ? '#1FD1A2' : '#001133',
                                },
                              ]}>
                              泌尿系统
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => this.chooseSystemType('flourish')}>
                          <View style={styles.itemBodyTypeInnerView}>
                            <View
                              style={[
                                styles.itemBodyTypeInnerAvatarView,
                                {
                                  backgroundColor: this.state.choosedSystemType === 'flourish' ? '#1FD1A2' : '#ffffff',
                                },
                              ]}>
                              <Image style={styles.bodyInnerIcon} source={img.flourishIcon} />
                            </View>
                            <Text
                              style={[
                                styles.itemBodyTypeInnerText,
                                {
                                  color: this.state.choosedSystemType === 'flourish' ? '#1FD1A2' : '#001133',
                                },
                              ]}>
                              生殖系统
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                      </View>
                    </View>
                  ) : null}
                  {/* {this.state.choosedBodyType !== '' ? (
                              <View style={styles.itemNextView}>
                                 {DATA.map((item, index) => {
                                    return (
                                       <Text style={styles.nextText} key={item.value}>
                                          {item.label}
                                       </Text>
                                    );
                                 })}
                              </View>
                           ) : null} */}
                </View>
              </ScrollView>
            ) : (
              // !搜索输入框获取焦点
              <View style={styles.itemSearchView}>
                <Text style={styles.searchTitle}>历史搜索</Text>
                <View style={styles.historyView}>
                  {this.state.history.map((item, index) => {
                    return (
                      <Text style={styles.historyText} key={index}>
                        {item}
                      </Text>
                    );
                  })}
                </View>
                <Text style={[styles.searchTitle, {marginTop: 20}]}>猜你喜欢</Text>
                <View style={styles.historyView}>
                  {this.state.wantData.map((item, index) => {
                    return (
                      <Text style={styles.historyText} key={index}>
                        {item}
                      </Text>
                    );
                  })}
                </View>
              </View>
            )}
            {this.state.choosedType && !this.state.searching !== '' ? (
              <Text style={styles.saveBtn} onPress={() => this.toNextPage('AddItem')}>
                确定
              </Text>
            ) : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(Add);
