import {Dimensions, StatusBar} from 'react-native';
import {getBrand} from 'react-native-device-info';

// 手机屏幕宽高
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const screenHeight = Dimensions.get('screen').height;

//状态栏高度
const barHeight = StatusBar.currentHeight;

// 设计稿大小
const uiWidth = 750;

//安全区域高度
const safeHeight = ['Xiaomi', 'xiaomi'].includes(getBrand())
  ? Dimensions.get('screen').height - StatusBar.currentHeight
  : Dimensions.get('window').height + StatusBar.currentHeight >= Dimensions.get('screen').height
  ? Dimensions.get('screen').height - StatusBar.currentHeight
  : Dimensions.get('window').height - StatusBar.currentHeight;

//转换为px单位
const MC = uiElePx => {
  return Math.round((uiElePx * windowWidth + 0.5) / uiWidth);
};

export {MC, safeHeight, windowWidth, barHeight, windowHeight, screenHeight};
