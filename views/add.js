import React, {Component} from 'react';
import {
  View,
  StatusBar,
  Image,
  ImageBackground,
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
import img from '../imgs/img';
import api from '../config/api';

const haha = [
  {
    leave: 'p1',
    data: [
      {
        id: 'q1',
        name: '头部',
      },
      {
        id: 'q2',
        name: '脸部',
      },
    ],
  },
];

const hahaha = [
  {
    leave: 'p2',
    data: [
      {
        id: 'w1',
        name: '头痛',
      },
      {
        id: 'w2',
        name: '头晕',
      },
    ],
  },
];

class Add extends Component {
  constructor(props) {
    super(props);
    this.inputsearchRef = React.createRef();
    this.state = {
      searchText: '',
      searching: false,
      choosedTypeId: '',
      wantData: [],
      history: [],
      typeList: [],
      subtypeList: [],
      subtypeId: [],
    };
  }

  componentDidMount() {
    this.getFirstType();
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

  getFirstType() {
    api.post('app/element/type/2', {}, res => {
      this.setState({typeList: res.data});
    });
  }

  getSubType(id) {
    // 1.存大类id，判断选择的是哪个大类
    // 2.请求当前类目下的第一个子类
    // this.setState({choosedTypeId: id, subtypeList: haha}, () => {
    // api.post('app/project/get/element/' + id, {}, res => {
    //   // this.setState({subtypeList: [...this.state.subtypeList, ...res.data]})
    //   api.formateJSON(res.data);
    // });
    // });
  }

  getNext(id, index) {
    this.setState({subtypeList: [...this.state.subtypeList, ...hahaha], subtypeId: [...this.state.subtypeId, id]}, () => {
      console.log(this.state.subtypeId);
    });
  }

  chooseType(type) {
    this.setState({choosedType: type});
  }

  toNextPage(pageName) {
    this.props.navigation.navigate(pageName);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content" />
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
                onFocus={() =>
                  this.setState({searching: true}, () => {
                    this.getWant();
                    this.getHistory();
                  })
                }
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
                    {this.state.typeList.map((item, index) => {
                      return (
                        <TouchableWithoutFeedback onPress={() => this.getSubType(item.id)} key={item.id}>
                          <ImageBackground
                            style={styles.IconView}
                            source={{
                              uri:
                                this.state.choosedTypeId === item.id ? item.imageUrlObject.select : item.imageUrlObject.unselect,
                            }}>
                            <Text
                              style={[
                                styles.searchItemText,
                                {color: this.state.choosedTypeId === item.id ? '#ffffff' : '#001133'},
                              ]}>
                              {item.elementName}
                            </Text>
                          </ImageBackground>
                        </TouchableWithoutFeedback>
                      );
                    })}
                  </View>
                  {/* <View style={styles.itemType2View}>
                    <Text style={styles.itemTitle2}>选择身体部位</Text>
                  </View> */}
                  {this.state.subtypeList.map((item, index) => {
                    return (
                      <View style={styles.itemNextView} key={item.leave}>
                        {item.data.map((innerItem, innerIndex) => {
                          return (
                            <Text
                              key={innerItem.id}
                              style={[
                                styles.nextText,
                                {color: this.state.subtypeId[innerIndex] === innerItem.id ? 'red' : 'black'},
                              ]}
                              onPress={() => this.getNext(innerItem.id, innerIndex)}>
                              {innerItem.name}
                            </Text>
                          );
                        })}
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            ) : (
              // !搜索输入框获取焦点
              <View style={styles.itemSearchView}>
                {this.state.history.length > 0 ? <Text style={styles.searchTitle}>历史搜索</Text> : null}
                <View style={styles.historyView}>
                  {this.state.history.map((item, index) => {
                    return (
                      <Text style={styles.historyText} key={item}>
                        {item}
                      </Text>
                    );
                  })}
                </View>
                <Text style={[styles.searchTitle, {marginTop: 20}]}>猜你喜欢</Text>
                <View style={styles.historyView}>
                  {this.state.wantData.map((item, index) => {
                    return (
                      <Text style={styles.historyText} key={item} onPress={() => this.setState({searchText: item})}>
                        {item}
                      </Text>
                    );
                  })}
                </View>
              </View>
            )}
            {/* {this.state.choosedType && !this.state.searching !== '' ? (
              <Text style={styles.saveBtn} onPress={() => this.toNextPage('AddItem')}>
                确定
              </Text>
            ) : null} */}
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
