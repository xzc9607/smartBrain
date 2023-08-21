import {StyleSheet} from 'react-native';
import {MC, safeHeight, windowWidth, barHeight, screenHeight} from '../config/convert';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeView: {
    width: windowWidth,
    height: screenHeight - barHeight,
    marginTop: barHeight,
    alignItems: 'center',
    flex: 1,
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
  infoView: {
    width: MC(690),
    height: MC(100),
    backgroundColor: '#ffffff',
    borderRadius: MC(30),
    marginTop: MC(30),
  },
  infoTitle: {
    color: '#001133',
    fontSize: MC(32),
    fontWeight: '500',
    marginTop: MC(40),
    marginLeft: MC(30),
  },
  infoItem: {
    height: MC(100),
    width: MC(630),
    marginLeft: MC(30),
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: 'rgba(249,249,249,1)',
    borderBottomWidth: 1,
  },
  infoItemTextLeft: {
    fontSize: MC(28),
    color: '#001133',
    fontWeight: '500',
  },
  ItemIcon: {
    position: 'absolute',
    right: 0,
    width: MC(12),
    height: MC(24),
    transform: [{rotate: '180deg'}],
  },
  saveBtn: {
    position: 'absolute',
    bottom: MC(60),
    width: MC(650),
    height: MC(100),
    backgroundColor: '#EEEEEE',
    borderRadius: MC(30),
    color: '#001133',
    fontSize: MC(28),
    textAlign: 'center',
    lineHeight: MC(100),
  },
  privacyText: {
    width: MC(650),
    fontSize: MC(28),
    color: '#000000',
  },
  footer: {
    position: 'relative',
    width: windowWidth,
    height: MC(144),
    backgroundColor: '#ffffff',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footerConBtnView: {
    width: MC(304),
    height: MC(100),
    backgroundColor: '#F5F5F5',
    borderRadius: MC(50),
    color: '#001133',
    fontSize: MC(28),
    textAlign: 'center',
    lineHeight: MC(100),
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderStyle: 'solid',
  },
  footerBtnView: {
    width: MC(304),
    height: MC(100),
    backgroundColor: '#1fd1a2',
    borderRadius: MC(50),
    color: '#ffffff',
    fontSize: MC(28),
    textAlign: 'center',
    lineHeight: MC(100),
  },
  checkItemView: {
    width: MC(690),
    minHeight: MC(240),
    backgroundColor: '#ffffff',
    borderRadius: MC(30),
    alignItems: 'center',
    marginTop: MC(24),
    paddingBottom: 10,
  },
  checkItemTitleView: {
    width: MC(690),
    height: MC(86),
    justifyContent: 'center',
  },
  checkItemTitleText: {
    position: 'absolute',
    fontSize: MC(28),
    color: '#001133',
    left: MC(30),
  },
  checkItemStatusText: {
    position: 'absolute',
    fontSize: MC(28),
    color: '#1FD1A2',
    right: MC(30),
  },
  itemLine: {
    width: MC(630),
    height: 1,
    backgroundColor: '#e6e9f2',
  },
  itemContentView: {
    width: MC(630),
    minHeight: MC(34),
    marginTop: MC(20),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemContentTextTitle: {
    color: '#0011337f',
  },
  itemContentTextLine: {
    color: '#0011337f',
    fontSize: MC(32),
    marginLeft: MC(20),
    marginRight: MC(20),
  },
});

export {styles};