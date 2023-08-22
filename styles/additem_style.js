import {StyleSheet} from 'react-native';
import {screenHeight, MC, windowWidth, barHeight} from '../config/convert';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeView: {
    position: 'absolute',
    width: windowWidth,
    height: screenHeight - barHeight,
    top: barHeight,
    alignItems: 'center',
  },
  navView: {
    height: MC(88),
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTitle: {
    color: '#001134',
    fontSize: MC(32),
    fontWeight: '500',
  },
  backIconView: {
    position: 'absolute',
    left: 0,
    width: MC(88),
    height: MC(88),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    position: 'absolute',
    left: MC(54),
    width: MC(12),
    height: MC(24),
  },
  mainView: {
    flex: 1,
    backgroundColor: '#F8FAFF',
    width: windowWidth,
  },
  bigiconView: {
    position: 'absolute',
    width: MC(40),
    height: MC(40),
    right: MC(50),
  },
  bigicon: {
    width: MC(40),
    height: MC(40),
  },
  smallIconView: {
    position: 'absolute',
    right: MC(30),
    width: MC(32),
    height: MC(32),
  },
  smallIcon: {
    width: MC(32),
    height: MC(32),
  },
  singleChooseView: {
    width: MC(690),
    minHeight: MC(170),
    borderRadius: MC(30),
    marginTop: MC(30),
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  headView: {
    width: MC(690),
    height: MC(90),
    flexDirection: 'row',
    alignItems: 'center',
  },
  headTitle: {
    marginLeft: MC(30),
    color: '#001133',
    fontSize: MC(28),
    fontWeight: '500',
  },
  itemView: {
    width: MC(630),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  singleChooseItem: {
    minWidth: MC(104),
    height: MC(34),
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: MC(44),
    marginBottom: MC(16),
  },
  singleChooseItemView: {
    width: MC(32),
    height: MC(32),
    borderRadius: MC(50),
    borderColor: 'rgba(0,17,51,0.5)',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: MC(24),
  },
  singleChooseItemText: {
    fontSize: MC(24),
    color: 'rgba(0,17,51,0.5)',
    fontWeight: '500',
  },
  singleChooseIcon: {
    width: MC(32),
    height: MC(32),
  },
  pickerView: {
    width: MC(690),
    height: MC(92),
    borderRadius: MC(30),
    marginTop: MC(30),
    backgroundColor: '#ffffff',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  pickerTitle: {
    position: 'absolute',
    left: MC(30),
    fontSize: MC(28),
    color: '#001133',
    fontWeight: '500',
  },
  pickerChooseText: {
    fontSize: MC(28),
    color: '#001133',
    fontWeight: '500',
    marginRight: MC(10),
  },
  rightArrow: {
    width: MC(16),
    height: MC(28),
    marginRight: MC(30),
  },
  pickerChooseView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerInput: {
    fontSize: MC(28),
    color: '#001133',
    fontWeight: '500',
    textAlign: 'right',
    width: MC(220),
    marginRight: MC(20),
  },
  multiView: {
    width: MC(690),
    minHeight: MC(200),
    borderRadius: MC(30),
    marginTop: MC(30),
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  multiChooseItemView: {
    width: MC(32),
    height: MC(32),
    borderColor: 'rgba(0,17,51,0.5)',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: MC(24),
    borderRadius: 2,
  },
  multiChooseIcon: {
    width: MC(34),
    height: MC(34),
    borderRadius: 2,
  },
  footer: {
    position: 'relative',
    width: windowWidth,
    height: MC(144),
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerBtnView: {
    width: MC(650),
    height: MC(100),
    backgroundColor: '#1fd1a2',
    borderRadius: MC(50),
    color: '#ffffff',
    fontSize: MC(28),
    textAlign: 'center',
    lineHeight: MC(100),
  },
  inputView: {
    width: MC(630),
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 0,
  },
  inputOusideView: {
    width: MC(690),
    height: MC(170),
    borderRadius: MC(30),
    marginTop: MC(30),
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  valueInput: {
    position: 'absolute',
    right: MC(72),
    fontSize: MC(28),
    color: '#001133',
    fontWeight: '500',
    width: MC(300),
    textAlign: 'right',
  },
});

export {styles};
