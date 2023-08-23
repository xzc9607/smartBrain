const filterStatusData = [
  {value: 5, name: '待办项'},
  {value: 20, name: '警示项'},
  {value: 25, name: '异常项'},
  {value: 99, name: '全部项'},
];

const filterTypeData = [
  {value: 1, name: '体检'},
  {value: 2, name: '诊断'},
  {value: 3, name: '治疗'},
  {value: 5, name: '病史'},
];

const filterTimeData = [
  {value: 1, name: '近一个月'},
  {value: 2, name: '近三个月'},
  {value: 3, name: '近六个月'},
  {value: 4, name: '近一年'},
];

const DAY = 24 * 60 * 60;
const genderPickDate = ['男', '女'];
const maritalPickDate = ['未婚', '已婚'];

export {filterStatusData, filterTypeData, filterTimeData, DAY, genderPickDate, maritalPickDate};
