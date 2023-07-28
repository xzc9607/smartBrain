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

import {styles} from '../styles/setting_style';
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
            <Text style={styles.navTitle}>设置</Text>
            <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
              <View style={styles.backIconView}>
                <Image style={styles.backIcon} source={img.backIconBlck} />
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.mainView}>
            <View style={styles.infoView}>
              <TouchableOpacity
                style={styles.infoItem}
                onPress={() =>
                  this.props.navigation.navigate('Webview', {
                    weburi: 'https://www.baidu.com',
                    title: '隐私政策',
                  })
                }>
                <Text style={styles.infoItemTextLeft}>隐私政策</Text>
                <Image style={styles.ItemIcon} source={img.backIconBlck} />
              </TouchableOpacity>
              <View style={styles.infoItem}>
                <Text style={styles.infoItemTextLeft}>个人信息收集清单</Text>
                <Image style={styles.ItemIcon} source={img.backIconBlck} />
              </View>
              <View style={[styles.infoItem, {borderBottomColor: '#ffffff'}]}>
                <Text style={styles.infoItemTextLeft}>个人信息共享清单</Text>
                <Image style={styles.ItemIcon} source={img.backIconBlck} />
              </View>
            </View>
            <Text style={styles.saveBtn}>注销账号</Text>
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
