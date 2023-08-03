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
} from 'react-native';
import {connect} from 'react-redux';
import {resetData} from '../store/globle/action';
import Picker from 'react-native-picker';

import {styles} from '../styles/additem_style';
import img from '../imgs/img';
import api from '../config/api';

const typePickDate = ['mmol/L', 'xxxx/L'];

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoData: [],
      value: [],
    };
    this.callback = {
      projectId: this.props.route.params.transParams.id,
      dataList: [],
    };
  }

  componentDidMount() {
    this.getItemInfo();
  }

  getItemInfo() {
    api.post('/app/project/info/' + this.props.route.params.transParams.id, {}, res => {
      res.data.forEach((item, index) => {
        this.callback.dataList.push({
          elementDataType: item.elementDataType,
          elementId: item.elementId,
          elementValue: '',
        });
      });
      this.setState({infoData: res.data});
    });
  }

  showItem(item, index) {
    if (item.elementDataType === 1) {
      //单选
      return (
        <View style={styles.singleChooseView} key={item.id}>
          <View style={styles.headView}>
            <Text style={styles.headTitle}>{item.elementName}</Text>
            <TouchableOpacity style={styles.smallIconView}>
              <Image style={styles.smallIcon} source={img.smallAddInfo} />
            </TouchableOpacity>
          </View>
          <View style={styles.itemView}>
            {item.selectList.map((selItem, sleIndex) => {
              return (
                <TouchableOpacity
                  style={styles.singleChooseItem}
                  key={selItem.id}
                  onPress={() => this.singleChoose(selItem.elementName, index)}>
                  <View style={styles.singleChooseItemView}>
                    {this.state.value[index] === selItem.elementName ? (
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
        <View style={styles.multiView} key={item.id}>
          <View style={styles.headView}>
            <Text style={styles.headTitle}>{item.elementName}</Text>
            <TouchableOpacity style={styles.smallIconView}>
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
                    {!!this.state.value[index] && this.state.value[index].includes(selItem.elementName) ? (
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
        <View style={styles.inputOusideView}>
          <View style={styles.headView}>
            <Text style={styles.headTitle}>{item.elementName}</Text>
            <TouchableOpacity style={styles.smallIconView}>
              <Image style={styles.smallIcon} source={img.smallAddInfo} />
            </TouchableOpacity>
          </View>
          <TextInput style={styles.inputView} placeholder={'请在此输入详情'} onChangeText={text => this.textInput(text, index)} />
        </View>
      );
    } else if (item.elementDataType === 4) {
      // number
      return (
        <View style={styles.pickerView}>
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
      // 区间，选择器?
      return (
        <TouchableOpacity style={styles.pickerView} onPress={() => this.showPicker(item, index)}>
          <Text style={styles.pickerTitle}>持续时间</Text>
          <Text style={styles.pickerChooseText}>{this.state.value[index] ? this.state.value[index] : '请选择'}</Text>
          <Image style={styles.rightArrow} source={img.rightArrow} />
        </TouchableOpacity>
      );
    }
  }

  showTips(tip) {
    Alert.alert(
      '说明',
      tip,
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
      if (tMulti.includes(value.elementName)) {
        tMulti = tMulti.filter(val => val !== value.elementName);
      } else {
        tMulti.push(value.elementName);
      }
    } else {
      tMulti = [value.elementName];
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

  showPicker(value, index) {
    const tVal = Array.from(this.state.value);
    Picker.init({
      pickerData: typePickDate,
      pickerTitleText: '请选择',
      pickerConfirmBtnText: '确定',
      pickerCancelBtnText: '取消',
      onPickerConfirm: data => {
        tVal[index] = value;
        this.setState({value: tVal});
      },
      onPickerCancel: data => {},
    });
    Picker.show();
  }

  submit() {
    for (let i = 0; i < this.state.infoData.length; i++) {
      if (this.state.value[i] === undefined) {
        api.toast('请输入完整数据!');
        return;
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
    this.props.navigation.navigate('Continue');
    // api.post('/app/project/result/' + this.props.route.params.transParams.id, this.callback, res => {
    //   api.formateJSON(res);
    // });
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
            <TouchableOpacity
              style={styles.bigiconView}
              onPress={() => this.showTips(this.props.route.params.transParams.projectName)}>
              <Image style={styles.bigicon} source={img.bigAddInfo} />
            </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);
