import {StyleSheet} from 'react-native';
import {MC, windowWidth, barHeight} from '../config/convert';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBg: {
    position: 'absolute',
    width: windowWidth,
    top: 0,
  },
  safeView: {
    width: windowWidth,
    marginTop: barHeight,
    flex: 1,
  },
  navView: {
    width: windowWidth,
    height: MC(88),
    alignItems: 'center',
    justifyContent: 'center',
  },
  navTitle: {
    color: '#ffffff',
    fontSize: MC(32),
  },
  backIconView: {
    position: 'absolute',
    left: MC(16),
    width: MC(88),
    height: MC(88),
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: MC(12),
    height: MC(24),
    transform: [{rotate: '180deg'}],
  },
  backIconView2: {
    position: 'absolute',
    right: MC(40),
    bottom: MC(54),
    width: MC(88),
    height: MC(88),
  },
  backIcon2: {
    position: 'absolute',
    width: MC(12),
    height: MC(24),
    right: MC(-48),
  },
  userInfoView: {
    position: 'relative',
    height: MC(240),
    width: windowWidth,
  },
  userInfoTitle: {
    width: windowWidth,
    height: MC(192),
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: MC(192),
    fontSize: MC(36),
    fontWeight: '500',
  },
  userName: {
    color: '#ffffff',
    width: MC(300),
    fontSize: MC(48),
    fontWeight: '500',
    position: 'absolute',
    bottom: MC(104),
    left: MC(50),
  },
  userUseDay: {
    position: 'absolute',
    bottom: MC(56),
    left: MC(50),
    height: MC(40),
    width: MC(240),
    borderRadius: MC(16),
    backgroundColor: 'rgba(255,255,255,0.3)',
    color: '#ffffff',
    fontSize: MC(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatar: {
    position: 'absolute',
    width: MC(120),
    height: MC(120),
    right: MC(88),
    top: MC(60),
    borderRadius: MC(100),
    zIndex: 999,
    justifyContent: 'center',
  },
  userAvatarImg: {
    width: MC(120),
    height: MC(120),
    borderRadius: MC(100),
  },
  mainView: {
    flex: 1,
    backgroundColor: '#F8FAFF',
    borderTopLeftRadius: MC(40),
    borderTopRightRadius: MC(40),
    alignItems: 'center',
  },
  itemTop: {
    width: MC(690),
    height: MC(100),
    backgroundColor: '#ffffff',
    borderTopRightRadius: MC(30),
    borderTopLeftRadius: MC(30),
    marginTop: MC(40),
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemMid: {
    width: MC(690),
    height: MC(100),
    backgroundColor: '#ffffff',
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemEnd: {
    width: MC(690),
    height: MC(100),
    backgroundColor: '#ffffff',
    borderBottomRightRadius: MC(30),
    borderBottomLeftRadius: MC(30),
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemExit: {
    width: MC(690),
    height: MC(100),
    backgroundColor: '#ffffff',
    borderRadius: MC(30),
    marginTop: MC(40),
    alignItems: 'center',
    flexDirection: 'row',
  },
  ItemIcon: {
    width: MC(40),
    height: MC(40),
    marginLeft: MC(30),
    marginRight: MC(22),
  },
  ItemText: {
    fontSize: MC(28),
    color: '#001133',
    fontWeight: '500',
  },
  backIcon3: {
    position: 'absolute',
    right: MC(30),
    width: MC(12),
    height: MC(24),
    tintColor: '#000000',
    transform: [{rotate: '180deg'}],
  },
});

export {styles};