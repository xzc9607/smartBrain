import {StyleSheet} from 'react-native';
import {screenHeight, MC, windowWidth, barHeight} from '../config/convert';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeView: {
    width: windowWidth,
    height: screenHeight,
    marginTop: barHeight,
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
  checkView: {
    marginTop: MC(40),
    width: MC(690),
    minHeight: MC(560),
    borderRadius: MC(30),
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  checkTitleView: {
    width: MC(690),
    height: MC(90),
  },
  checkTitle: {
    marginLeft: MC(30),
    color: '#001133',
    fontSize: MC(28),
    lineHeight: MC(90),
  },
  line: {
    width: MC(630),
    height: 1,
    backgroundColor: '#e6e9f2',
  },
  itemView: {
    width: MC(690),
    height: MC(72),
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTitle: {
    position: 'absolute',
    left: MC(30),
    color: '#001133',
    fontSize: MC(24),
    opacity: 0.5,
  },
  itemContent: {
    position: 'absolute',
    right: MC(30),
    color: '#001133',
    fontSize: MC(24),
    opacity: 0.8,
  },
  arrowView: {
    paddingTop: 1,
    paddingLeft: 2,
    width: MC(12),
    height: MC(24),
  },
  itemArrow: {
    width: MC(12),
    height: MC(24),
    transform: [{rotate: '180deg'}],
  },
  footer: {
    width: windowWidth,
    height: MC(144),
    backgroundColor: '#ffffff',
    position: 'absolute',
    bottom: 0,
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
  navRBtn: {
    position: 'absolute',
    right: MC(40),
    color: '#001133',
    fontSize: MC(28),
  },
  checkChartView: {
    marginTop: MC(40),
    width: MC(690),
    height: MC(544),
    borderRadius: MC(30),
    backgroundColor: '#ffffff',
  },
  chartTitle: {
    marginTop: MC(36),
    width: MC(690),
    height: MC(44),
    justifyContent: 'center',
  },
  chartTitleText: {
    marginLeft: MC(32),
    fontSize: MC(32),
    color: '#001133',
  },
  scrollView: {
    flex: 1,
    marginTop: MC(24),
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
    color: '#001133',
    fontSize: MC(32),
    marginLeft: MC(20),
    marginRight: MC(20),
    marginTop: MC(-6),
  },
});

export {styles};
