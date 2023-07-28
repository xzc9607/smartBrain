import {ToastAndroid} from 'react-native';
import {stringMd5} from 'react-native-quick-md5';
import AsyncStorage from '@react-native-async-storage/async-storage';

const toast = Text => {
  ToastAndroid.showWithGravity(Text, ToastAndroid.SHORT, ToastAndroid.CENTER);
};

const formateJSON = (str, obj) => {
  if (typeof str === 'object') {
    console.log('\n', JSON.stringify(str, null, '   '));
  } else if (typeof str === 'string') {
    console.log('str\n', JSON.stringify(obj, null, '   '));
  }
};

const login = async (phone, code, success, failure) => {
  let header = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  let body = new URLSearchParams({
    account: phone,
    password: stringMd5(code),
    origin: 'password',
    code: '',
    timestamp: Date.now(),
    client_id: 'admin',
    client_secret: '123456',
    scope: 'all',
    loginType: '1',
    grant_type: 'password',
  });

  return fetch('http://124.222.161.101/api/oauth/Login', {
    method: 'POST',
    headers: header,
    body: body.toString(),
  })
    .then(res => {
      return res.json();
    })
    .then(sres => {
      return success(sres);
    });
};

const get = async (url, success, failure) => {
  let header = {};
  const value = await AsyncStorage.getItem('token');
  if (value !== null) {
    header.Authorization = value;
  } else {
    this.showToast('登录失败');
  }

  return fetch('http://124.222.161.101/api/' + url, {
    method: 'GET',
    headers: header,
  })
    .then(res => {
      return res.json();
    })
    .then(sres => {
      return success(sres);
    });
};

const post = async (url, body, success, failure) => {
  let requestBody = {};
  let header = {
    'Content-Type': 'application/json',
  };
  //! 获取基础请求参数
  //! 获取用户token
  const value = await AsyncStorage.getItem('token');
  if (value !== null) {
    header.Authorization = value;
  }
  for (let key in body) {
    requestBody[key] = body[key];
  }
  requestBody.ts = Date.now();

  return fetch('http://124.222.161.101/api/' + url, {
    method: 'POST',
    headers: header,
    body: JSON.stringify(requestBody),
  })
    .then(res => {
      return res.json();
    })
    .then(sres => {
      return success(sres);
    });
};

export default {login, get, post, formateJSON, toast};
