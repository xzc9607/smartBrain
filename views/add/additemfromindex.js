import React, {Component} from 'react';
import {
  View,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput,
  Alert,
  DeviceEventEmitter,
} from 'react-native';
import {connect} from 'react-redux';
import {resetData, resetaddList} from '../../store/globle/action';
import Picker from 'react-native-picker';

import img from '../../imgs/img';
import api from '../../config/api';
import {styles} from '../../styles/additem_style';

class AddItemFromIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoData: [],
      value: [],
      unitArr: [],
      isshowPicker: false,
    };
    this.callback = {
      projectId: this.props.route.params.transParams.projectId,
      dataList: [],
    };
    this.pickerArr = [];
    api.formateJSON(this.props.route.params.transParams);
  }

  componentDidMount() {
    this.getItemInfo();
  }

  componentWillUnmount() {
    Picker.hide();
  }

  getItemInfo() {
    api.post('project/info/' + this.props.route.params.transParams.projectId, {}, res => {
      api.formateJSON(res.data);
      res.data.forEach((item, index) => {
        if (item.elementDataType === 5 && item.unitList.length !== 0) {
          this.callback.dataList.push({
            elementDataType: item.elementDataType,
            elementId: item.elementId,
            elementValue: '',
            elementUnitId: '',
          });
        } else {
          this.callback.dataList.push({
            elementDataType: item.elementDataType,
            elementId: item.elementId,
            elementValue: '',
          });
        }
      });
      // api.formateJSON(this.callback);
      this.setState({infoData: res.data});
    });
  }

  getDes(id) {
    api.get('element/' + this.props.route.params.transParams.elementId, res => {
      Alert.alert(
        this.props.route.params.transParams.projectName,
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
  }

  showItem(item, index) {
    if (item.elementDataType === 1) {
      //单选
      return (
        <View
          style={[
            styles.singleChooseView,
            {display: index === 0 ? 'flex' : this.state.value[index - 1] !== undefined ? 'flex' : 'none'},
          ]}
          key={item.id}>
          <View style={styles.headView}>
            <Text style={styles.headTitle}>{item.elementName}</Text>
            <TouchableOpacity style={styles.smallIconView} onPress={() => this.showTips(item.elementName, item.description)}>
              <Image style={styles.smallIcon} source={img.smallAddInfo} />
            </TouchableOpacity>
          </View>
          <View style={styles.itemView}>
            {item.selectList.map((selItem, sleIndex) => {
              return (
                <TouchableOpacity
                  style={styles.singleChooseItem}
                  key={selItem.id}
                  onPress={() => this.singleChoose(selItem.id, index)}>
                  <View style={styles.singleChooseItemView}>
                    {this.state.value[index] === selItem.id ? (
                      <Image style={styles.singleChooseIcon} source={img.singleChooseIcon} />
                    ) : null}
                  </View>
                  <Text style={styles.singleChooseItemText}>{selItem.elementName}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      );
    } else if (item.elementDataType === 2) {
      //多选
      return (
        <View
          style={[
            styles.multiView,
            {display: index === 0 ? 'flex' : this.state.value[index - 1] !== undefined ? 'flex' : 'none'},
          ]}
          key={item.id}>
          <View style={styles.headView}>
            <Text style={styles.headTitle}>{item.elementName}</Text>
            <TouchableOpacity style={styles.smallIconView} onPress={() => this.showTips(item.elementName, item.description)}>
              <Image style={styles.smallIcon} source={img.smallAddInfo} />
            </TouchableOpacity>
          </View>
          <View style={styles.itemView}>
            {item.selectList.map((selItem, sleIndex) => {
              return (
                <TouchableOpacity
                  style={styles.singleChooseItem}
                  key={selItem.id}
                  onPress={() => this.multiChoose(selItem, index)}>
                  <View style={styles.multiChooseItemView}>
                    {!!this.state.value[index] && this.state.value[index].includes(selItem.id) ? (
                      <Image style={styles.multiChooseIcon} source={img.choosedIcon} resizeMode="stretch" />
                    ) : null}
                  </View>
                  <Text style={styles.singleChooseItemText}>{selItem.elementName}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      );
    } else if (item.elementDataType === 3) {
      //input
      return (
        <View
          style={[
            styles.inputOusideView,
            {display: index === 0 ? 'flex' : this.state.value[index - 1] !== undefined ? 'flex' : 'none'},
          ]}
          key={item.id}>
          <View style={styles.headView}>
            <Text style={styles.headTitle}>{item.elementName}</Text>
            <TouchableOpacity style={styles.smallIconView} onPress={() => this.showTips(item.elementName, item.description)}>
              <Image style={styles.smallIcon} source={img.smallAddInfo} />
            </TouchableOpacity>
          </View>
          <TextInput style={styles.inputView} placeholder={'请在此输入详情'} onChangeText={text => this.textInput(text, index)} />
        </View>
      );
    } else if (item.elementDataType === 4) {
      // number
      return (
        <View style={styles.pickerView} key={item.id}>
          <Text style={styles.pickerTitle}>{item.elementName}</Text>
          <TextInput
            style={styles.valueInput}
            placeholder="请在此输入数值"
            keyboardType="numeric"
            onChangeText={num => this.valueEnter(num, index)}
          />
        </View>
      );
    } else if (item.elementDataType === 5) {
      // 区间
      return (
        <View
          style={[
            styles.pickerView,
            {display: index === 0 ? 'flex' : this.state.value[index - 1] !== undefined ? 'flex' : 'none'},
          ]}
          key={item.id}>
          <Text style={styles.pickerTitle}>{item.elementName}</Text>
          <TextInput
            style={styles.pickerInput}
            placeholder="请输入数值"
            keyboardType="numeric"
            onChangeText={num => this.pickerInputEnter(num, index)}
          />
          {item.unitList.length > 0 ? (
            <TouchableOpacity style={styles.pickerChooseView} onPress={() => this.showPicker(item, index)}>
              <Text style={styles.pickerChooseText}>{this.state.unitArr[index] ? this.state.unitArr[index] : '单位'}</Text>
              <Image style={styles.rightArrow} source={img.rightArrow} />
            </TouchableOpacity>
          ) : null}
        </View>
      );
    }
  }

  showTips(title, tip) {
    Alert.alert(
      title,
      tip === '' || tip === null ? '暂无详情' : tip,
      [
        {
          text: '好的',
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  }

  singleChoose(value, index) {
    const tVal = Array.from(this.state.value);
    tVal[index] = value;
    this.setState({value: tVal}, () => {
      console.log(this.state.value);
    });
  }

  multiChoose(value, index) {
    const tVal = Array.from(this.state.value);
    let tMulti = [];
    if (tVal[index]) {
      tMulti = [...tVal[index]];
      if (tMulti.includes(value.id)) {
        tMulti = tMulti.filter(val => val !== value.id);
      } else {
        tMulti.push(value.id);
      }
    } else {
      tMulti = [value.id];
    }
    tVal[index] = tMulti;
    this.setState({value: tVal}, () => {
      console.log(this.state.value);
    });
  }

  textInput(value, index) {
    const tVal = Array.from(this.state.value);
    tVal[index] = value;
    this.setState({value: tVal}, () => {
      console.log(this.state.value);
    });
  }

  valueEnter(value, index) {
    const tVal = Array.from(this.state.value);
    tVal[index] = Number(value);
    this.setState({value: tVal}, () => {
      console.log(this.state.value);
    });
  }

  genPickerArr(val) {
    let arr = [];
    val.forEach(e => {
      arr.push(e.elementName);
    });
    return Array.from(arr);
  }

  showPicker(value, index) {
    this.setState({isshowPicker: true});
    this.pickerArr = this.genPickerArr(value.unitList);
    Picker.init({
      pickerData: this.pickerArr,
      pickerTitleText: '请选择单位',
      pickerTitleColor: [0, 17, 51, 1],
      pickerConfirmBtnText: '确定',
      pickerConfirmBtnColor: [0, 17, 51, 1],
      pickerCancelBtnText: '取消',
      pickerCancelBtnColor: [0, 17, 51, 0.5],
      pickerToolBarBg: [255, 255, 255, 1],
      pickerBg: [255, 255, 255, 1],
      pickerToolBarFontSize: 17,
      onPickerConfirm: data => {
        value.unitList.forEach((item, Iindex) => {
          if (item.elementName === data[0]) {
            let arr = Array.from(this.state.unitArr);
            arr[index] = item.elementName;
            this.setState({unitArr: arr, isshowPicker: false});
            this.callback.dataList[index].elementUnitId = item.id;
          }
        });
        api.formateJSON(this.callback);
      },
      onPickerCancel: data => {
        this.setState({isshowPicker: false});
      },
    });
    Picker.show();
  }

  pickerInputEnter(value, index) {
    const tVal = Array.from(this.state.value);
    tVal[index] = Number(value);
    if (Number.isNaN(Number(value))) {
      Alert.alert('提示', '请输入正确的数值！', [
        {
          text: '好的',
          onPress: () => {
            this.setState({value: tVal}, () => {
              console.log(this.state.value);
            });
          },
          style: 'default',
        },
      ]);
    } else {
      this.setState({value: tVal}, () => {
        console.log(this.state.value);
      });
    }
  }

  submit() {
    for (let i = 0; i < this.state.infoData.length; i++) {
      if (this.state.value[i] === undefined) {
        api.toast('请输入完整数据!');
        return;
      }

      if (this.callback.dataList[i].elementUnitId === '') {
        api.toast('请选择单位!');
        return;
      }

      if (this.callback.dataList[i].elementDataType === 5) {
        if (Number.isNaN(this.state.value[i])) {
          api.toast('请输入正确的数值！');
          return;
        }
      }
    }
    this.state.value.forEach((val, index) => {
      if (this.state.infoData[index].elementDataType === 2) {
        //多选
        this.callback.dataList[index].elementValue = val.join(',');
      } else {
        this.callback.dataList[index].elementValue = val;
      }
    });
    api.formateJSON(this.callback);
    api.post(
      'project/result/' + this.props.route.params.transParams.projectId,
      this.callback,
      res => {
        api.formateJSON(res.data);
        DeviceEventEmitter.emit('message', 'refresh');
        this.props.navigation.navigate('Index');
      },
      res => res(this.props),
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content" />
        <View style={styles.safeView}>
          <View style={styles.navView}>
            <Text style={styles.navTitle}>{this.props.route.params.transParams.projectName}</Text>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
              <View style={styles.backIconView}>
                <Image style={styles.backIcon} source={img.backIconBlck} />
              </View>
            </TouchableWithoutFeedback>
            {/* <TouchableOpacity style={styles.bigiconView} onPress={() => this.getDes()}>
              <Image style={styles.bigicon} source={img.bigAddInfo} />
            </TouchableOpacity> */}
          </View>
          <ScrollView style={styles.mainView} contentContainerStyle={{alignItems: 'center'}}>
            {this.state.infoData.map((item, index) => {
              return this.showItem(item, index);
            })}
          </ScrollView>
          <TouchableOpacity style={styles.footer} onPress={() => this.submit()}>
            <Text style={styles.footerBtnView}>确定</Text>
          </TouchableOpacity>
        </View>
        {this.state.isshowPicker ? <View style={styles.mask}></View> : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(AddItemFromIndex);
