import {StyleSheet} from 'react-native';
import {screenHeight, MC, safeHeight, windowWidth, barHeight} from '../config/convert';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeView: {
    position: 'absolute',
    width: windowWidth,
    height: safeHeight,
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
    alignItems: 'center',
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
});

export {styles};
