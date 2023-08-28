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
  Alert,
  DeviceEventEmitter,
} from 'react-native';
import {connect} from 'react-redux';
import {resetData} from '../../store/globle/action';
import AsyncStorage from '@react-native-async-storage/async-storage';

import img from '../../imgs/img';
import api from '../../config/api';
import {styles} from '../../styles/add_style';

class Add extends Component {
  constructor(props) {
    super(props);
    this.inputsearchRef = React.createRef();
    this.state = {
      searchText: '',
      searching: false,
      searchResult: [],
      choosedTypeId: '',
      wantData: [],
      history: [],
      typeList: [],
      subtypeList: [],
      subtypeId: [],
      isShowComfirm: false,
      isShowResult: false,
    };
    this.transParams = {};
  }

  componentDidMount() {
    this.getFirstType();
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount() {
    DeviceEventEmitter.emit('message', 'refresh');
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
    if (this.state.history.includes(this.state.searchText)) {
      api.post(
        'project/search',
        {
          keyword: this.state.searchText,
        },
        res => {
          // api.formateJSON(res.data);
          this.setState({isShowResult: true, searchResult: res.data});
        },
      );
    } else {
      this.setState({history: [this.state.searchText, ...this.state.history]}, () => {
        AsyncStorage.setItem('history', JSON.stringify(this.state.history));
        // todo 搜索
        api.post(
          'project/search',
          {
            keyword: this.state.searchText,
          },
          res => {
            // api.formateJSON(res.data);
            this.setState({isShowResult: true, searchResult: res.data});
          },
          res => {
            res(this.props);
          },
        );
      });
    }
  }

  getWant() {
    api.post(
      'common/want/search',
      {},
      res => {
        this.setState({wantData: res.data});
      },
      res => {
        res(this.props);
      },
    );
  }

  //键盘收起
  _keyboardDidHide = () => {
    if (this.state.searchText === '') {
      this.setState({searching: false});
    }
    this.inputsearchRef.current.blur();
  };

  getFirstType() {
    api.post(
      'element/type/2',
      {},
      res => {
        this.setState({typeList: res.data});
      },
      res => {
        res(this.props);
      },
    );
  }

  getSubType(id) {
    // 1.存大类id，判断选择的是哪个大类
    // 2.请求当前类目下的第一个子类
    this.setState({choosedTypeId: id}, () => {
      api.post(
        'element/parent/' + id,
        {},
        res => {
          this.setState({subtypeList: [res.data], subtypeId: [], isShowComfirm: false});
        },
        res => {
          res(this.props);
        },
      );
    });
  }

  getNext(id, innerindex, index) {
    //? innerindex 当前index下的子项的index

    if (this.state.subtypeId[index] === undefined) {
      api.post(
        'element/parent/' + id,
        {},
        res => {
          if (res.data.length === 0) {
            this.setState({subtypeId: [...this.state.subtypeId, id]}, () => {
              this.canToAdd(id);
            });
            return;
          }
          this.setState({
            subtypeId: [...this.state.subtypeId, id],
            subtypeList: [...this.state.subtypeList, res.data],
          });
        },
        res => {
          res(this.props);
        },
      );
    } else if (this.state.subtypeId[index] !== undefined && this.state.subtypeId[index] === id) {
      return;
    } else {
      this.setState(
        {
          subtypeId: [...this.state.subtypeId.slice(0, index), id],
          subtypeList: this.state.subtypeList.slice(0, index + 1),
          isShowComfirm: false,
        },
        () => {
          api.post(
            'element/parent/' + id,
            {},
            res => {
              if (res.data.length === 0) {
                this.setState({subtypeId: [...this.state.subtypeId, id]}, () => {
                  this.canToAdd(id);
                });
                return;
              }
              this.setState({
                subtypeList: [...this.state.subtypeList, res.data],
              });
            },
            res => {
              res(this.props);
            },
          );
        },
      );
    }
  }

  canToAdd(id) {
    api.post(
      'project/get/element/' + id,
      {},
      res => {
        // console.log(res.data.length === 0 ? '无法添加此项，因为没有添加项' : '可以被添加');
        this.setState({isShowComfirm: res.data.length !== 0}, () => {
          this.transParams = res.data[0];
        });
      },
      res => {
        res(this.props);
      },
    );
  }

  searchToAdd(item) {
    if (item.projectType === 2 || item.projectType === 3) {
      api.get('element/' + item.elementId, res => {
        Alert.alert(
          item.projectName,
          res.data.description === null || res.data.description === '' ? '暂无详情' : res.data.description,
          [
            {
              text: '好的',
              onPress: () => {},
              style: 'default',
            },
          ],
        );
      });
    } else {
      this.props.navigation.navigate('AddItem', {transParams: item});
    }
  }

  toAdd() {
    this.props.navigation.navigate('AddItem', {transParams: this.transParams});
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
                onChangeText={text =>
                  this.setState({searchText: text}, () => {
                    if (text === '') {
                      this.setState({isShowResult: false});
                    }
                  })
                }
                value={this.state.searchText}
                onFocus={() =>
                  this.setState({searching: true}, () => {
                    this.getWant();
                    this.getHistory();
                  })
                }
                onSubmitEditing={() => this.search()}
                returnKeyType="search"
                placeholder="搜索体检/疾病/诊断"
              />
              <TouchableOpacity style={styles.searchIcon} onPress={() => this.search()}>
                <Image style={styles.searchIconImg} source={img.searchIcon} />
              </TouchableOpacity>
            </View>
            {!this.state.searching && !this.state.isShowResult ? (
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
                      <View style={styles.itemNextView} key={index}>
                        {item.map((innerItem, innerIndex) => {
                          return (
                            <Text
                              key={innerItem.id}
                              style={[
                                styles.nextText,
                                {
                                  backgroundColor: this.state.subtypeId[index] === innerItem.id ? '#1FD1A2' : '#f5f5f5',
                                  color: this.state.subtypeId[index] === innerItem.id ? '#ffffff' : '#000000',
                                },
                              ]}
                              onPress={() => this.getNext(innerItem.id, innerIndex, index)}>
                              {innerItem.elementName}
                            </Text>
                          );
                        })}
                      </View>
                    );
                  })}
                </View>
                {this.state.isShowComfirm ? (
                  <Text style={styles.saveBtn} onPress={() => this.toAdd()}>
                    确定
                  </Text>
                ) : null}
              </ScrollView>
            ) : this.state.searching && !this.state.isShowResult ? (
              // !搜索输入框获取焦点
              <View style={styles.itemSearchView}>
                {this.state.history.length > 0 ? <Text style={styles.searchTitle}>历史搜索</Text> : null}
                <View style={styles.historyView}>
                  {this.state.history.map((item, index) => {
                    return (
                      <Text
                        style={styles.historyText}
                        key={item}
                        onPress={() => this.setState({searchText: item}, () => this.search())}>
                        {item}
                      </Text>
                    );
                  })}
                </View>
                <Text style={[styles.searchTitle, {marginTop: 20}]}>猜你想搜</Text>
                <View style={styles.historyView}>
                  {this.state.wantData.map((item, index) => {
                    return (
                      <Text
                        style={styles.historyText}
                        key={item}
                        onPress={() => this.setState({searchText: item}, () => this.search())}>
                        {item}
                      </Text>
                    );
                  })}
                </View>
              </View>
            ) : (
              // !搜索结果展示
              <View style={styles.itemSearchView}>
                {this.state.searchResult.length > 0 ? (
                  this.state.searchResult.map((Ritem, Rindex) => {
                    return (
                      <Text style={styles.searchResult} key={Ritem.id} onPress={() => this.searchToAdd(Ritem)}>
                        {Ritem.projectName}
                      </Text>
                    );
                  })
                ) : (
                  <Text style={styles.searchResultBlank}>暂无相关信息</Text>
                )}
              </View>
            )}
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
