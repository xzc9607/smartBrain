const dateFormate = (fmt, date) => {
  var o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return fmt;
};

const formateTdate = date => {
  var timer = new Date(date).getTime();
  var text = new Date(timer);
  text = dateFormate('yyyy.MM.dd hh:mm', text);
  return text;
};

const formateTimePass = dateTimeStamp => {
  dateTimeStamp = new Date(dateTimeStamp).getTime();
  var result;
  var second = 1000;
  var minute = second * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var month = day * 30;
  var now = new Date().getTime();
  var diffValue = now - dateTimeStamp;
  if (diffValue < 0) {
    return;
  }
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  var minS = diffValue / second;

  if (monthC >= 1) {
    if (monthC <= 12) {
      result = '' + parseInt(monthC, 10) + '个月';
    } else {
      result = '' + parseInt(monthC / 12, 10) + '年';
    }
  } else if (weekC >= 1) {
    result = '' + parseInt(weekC, 10) + '周';
  } else if (dayC >= 1) {
    result = '' + parseInt(dayC, 10) + '天';
  } else if (hourC >= 1) {
    result = '' + parseInt(hourC, 10) + '小时';
  } else if (minC >= 1) {
    result = '' + parseInt(minC, 10) + '分钟';
  } else {
    result = '' + parseInt(minS, 10) + '秒';
  }
  return result;
};
const formateDateSaving = dateTimeStamp => {
  var result;
  var second = 1000;

  var minute = second * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var month = day * 30;
  var now = new Date().getTime();
  var diffValue = dateTimeStamp - now;
  if (diffValue < 0) {
    return;
  }
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;
  var minS = diffValue / second;

  if (monthC >= 1) {
    if (monthC <= 12) {
      result = '' + parseInt(monthC, 10) + '月';
    } else {
      result = '' + parseInt(monthC / 12, 10) + '年';
    }
  } else if (weekC >= 1) {
    result = '' + parseInt(weekC, 10) + '周';
  } else if (dayC >= 1) {
    result = '' + parseInt(dayC, 10) + '天';
  } else if (hourC >= 1) {
    result = '' + parseInt(hourC, 10) + '小时';
  } else if (minC >= 1) {
    result = '' + parseInt(minC, 10) + '分钟';
  } else {
    result = '' + parseInt(minS, 10) + '秒';
  }
  return result;
};

const formateTdateShort = date => {
  var timer = new Date(date).getTime();
  var text = new Date(timer);
  text = dateFormate('yyyy-MM-dd', text);
  return text;
};

const formateDrewTime = date => {
  if (date === 0) {
    return '';
  } else {
    var timer = new Date(date * 1000).getTime();
    var text = new Date(timer);
    text = dateFormate('yyyy.MM.dd', text);
    return text + '更新';
  }
};

const formateTdateList = date => {
  var timer = new Date(date * 1000).getTime();
  var text = new Date(timer);
  text = dateFormate('yyyy.MM.dd hh:mm', text);
  return text;
};

export default {formateTdate, formateTimePass, formateDateSaving, formateTdateShort, formateDrewTime, formateTdateList};
