import {StyleSheet} from 'react-native';
import {MC, safeHeight, windowWidth, barHeight, screenHeight} from '../config/convert';

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
  infoView: {
    width: MC(690),
    height: MC(520),
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
    opacity: 0.3,
    fontWeight: '500',
  },
  infoItemTextRight: {
    position: 'absolute',
    width: MC(300),
    textAlign: 'right',
    right: MC(32),
    color: '#001133',
    fontSize: MC(28),
    fontWeight: '500',
    alignItems: 'center',
  },
  ItemIcon: {
    position: 'absolute',
    right: 0,
    width: MC(12),
    height: MC(24),
    transform: [{rotate: '180deg'}],
  },
  Tips: {
    color: '#000000',
    opacity: 0.4,
    fontSize: MC(24),
    width: windowWidth,
    marginLeft: MC(60),
    marginTop: MC(28),
  },
  saveBtn: {
    position: 'absolute',
    bottom: MC(60),
    width: MC(650),
    height: MC(100),
    backgroundColor: '#1FD1A2',
    borderRadius: MC(30),
    color: '#ffffff',
    fontSize: MC(28),
    textAlign: 'center',
    lineHeight: MC(100),
  },
  mask: {
    position: 'absolute',
    width: windowWidth,
    height: screenHeight,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
});

export {styles};
