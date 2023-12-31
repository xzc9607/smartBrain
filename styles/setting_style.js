import {StyleSheet} from 'react-native';
import {MC, safeHeight, windowWidth, barHeight} from '../config/convert';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeView: {
    width: windowWidth,
    height: safeHeight,
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
    alignItems: 'center',
  },
  scrollMainView: {
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
  helpText: {
    width: MC(650),
    fontSize: MC(30),
    color: '#000000',
  },
  appicon: {
    position: 'absolute',
    top: MC(80),
    width: MC(147),
    height: MC(147),
    borderRadius: MC(30),
  },
  aboutTitle: {
    position: 'absolute',
    top: MC(274),
    fontSize: MC(32),
    fontWeight: '500',
    color: '#001133',
  },
  versionTitle: {
    position: 'absolute',
    top: MC(334),
    fontSize: MC(24),
    fontWeight: '500',
    color: 'rgba(0,0,0,0.4)',
  },
  rightTitle: {
    position: 'absolute',
    bottom: MC(80),
    fontSize: MC(24),
    fontWeight: '500',
    color: 'rgba(0,0,0,0.4)',
  },
});

export {styles};
