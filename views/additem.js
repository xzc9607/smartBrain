import React, {Component} from 'react';
import {
  View,
  StatusBar,
  ImageBackground,
  Image,
  Text,
  Animated,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import {resetData} from '../store/globle/action';

import {styles} from '../styles/additem_style';
import {MC, safeHeight} from '../config/convert';
import img from '../imgs/img';

class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <View style={styles.safeView}>
          <View style={styles.navView}>
            <Text style={styles.navTitle}>头部不适</Text>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
              <View style={styles.backIconView}>
                <Image style={styles.backIcon} source={img.backIconBlck} />
              </View>
            </TouchableWithoutFeedback>
            <TouchableOpacity style={styles.bigiconView}>
              <Image style={styles.bigicon} source={img.bigAddInfo} />
            </TouchableOpacity>
          </View>
          <View style={styles.mainView}>
            <View style={styles.singleChooseView}>
              <View style={styles.headView}>
                <Text style={styles.headTitle}>头部不适</Text>
                <TouchableOpacity style={styles.smallIconView}>
                  <Image style={styles.smallIcon} source={img.smallAddInfo} />
                </TouchableOpacity>
              </View>
              <View style={styles.itemView}>
                <View style={styles.singleChooseItem}>
                  <View style={styles.singleChooseItemView}>
                    <Image style={styles.singleChooseIcon} source={img.singleChooseIcon} />
                  </View>
                  <Text style={styles.singleChooseItemText}>头晕</Text>
                </View>
                <View style={styles.singleChooseItem}>
                  <View style={styles.singleChooseItemView}>
                    <Image style={styles.singleChooseIcon} source={img.singleChooseIcon} />
                  </View>
                  <Text style={styles.singleChooseItemText}>头痛</Text>
                </View>
                <View style={styles.singleChooseItem}>
                  <View style={styles.singleChooseItemView}>
                    <Image style={styles.singleChooseIcon} source={img.singleChooseIcon} />
                  </View>
                  <Text style={styles.singleChooseItemText}>头胀</Text>
                </View>
                <View style={styles.singleChooseItem}>
                  <View style={styles.singleChooseItemView}>
                    <Image style={styles.singleChooseIcon} source={img.singleChooseIcon} />
                  </View>
                  <Text style={styles.singleChooseItemText}>头沉</Text>
                </View>
                <View style={styles.singleChooseItem}>
                  <View style={styles.singleChooseItemView}>
                    <Image style={styles.singleChooseIcon} source={img.singleChooseIcon} />
                  </View>
                  <Text style={styles.singleChooseItemText}>头沉</Text>
                </View>
                <View style={styles.singleChooseItem}>
                  <View style={styles.singleChooseItemView}>
                    <Image style={styles.singleChooseIcon} source={img.singleChooseIcon} />
                  </View>
                  <Text style={styles.singleChooseItemText}>头沉</Text>
                </View>
              </View>
            </View>
            <View style={styles.pickerView}>
              <Text style={styles.pickerTitle}>持续时间</Text>
              <Text style={styles.pickerChooseText}>3天</Text>
              <Image style={styles.rightArrow} source={img.rightArrow} />
            </View>
            <View style={styles.multiView}>
              <View style={styles.headView}>
                <Text style={styles.headTitle}>部位</Text>
                <TouchableOpacity style={styles.smallIconView}>
                  <Image style={styles.smallIcon} source={img.smallAddInfo} />
                </TouchableOpacity>
              </View>
              <View style={styles.itemView}>
                <View style={styles.singleChooseItem}>
                  <View style={styles.multiChooseItemView}>
                    <Image style={styles.multiChooseIcon} source={img.choosedIcon} />
                  </View>
                  <Text style={styles.singleChooseItemText}>头顶</Text>
                </View>
                <View style={styles.singleChooseItem}>
                  <View style={styles.multiChooseItemView}>
                    <Image style={styles.multiChooseIcon} source={img.choosedIcon} />
                  </View>
                  <Text style={styles.singleChooseItemText}>额部</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerBtnView}>确定</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
