import Ajax from './ajax';

function getTopDomain() {
  let domain = document.domain;
  if(domain == 'localhost' || /^\d+\.\d+\.\d+\.\d+$/.test(domain)) return domain;
  let dArr = domain.split('.');
  if (dArr.length > 3) {
    domain = dArr.slice(-3).join('.');
  } else {
    domain = dArr.slice(-2).join('.');
  }
  return domain;
}
function  getDomain() {
  let protocol = window.location.protocol;
  let domain = getTopDomain();
  return (domain == 'localhost' ? `${protocol}//localhost:9011` : `${protocol}//${domain}`);
}

const Request = {
  Common: {
    dict() {
      return Ajax.getJson('/lieluobo-exhibition/data/dict.json', {}, {crossDomain: true, customError: true});
    },
    hotDict() {
      return Ajax.getJson('/lieluobo-exhibition/data/hotDict.json', {}, {crossDomain: true, customError: true});
    },
    location() {
      return Ajax.getJson('/lieluobo-exhibition/data/location.json', {}, {crossDomain: true, customError: true});
    },
    env() {
      return Ajax.get('/c/envs', {}, { noTip: true });
    },
    qiniu() {
      return Ajax.get('/common/qiniu/token', {}, { noTip: true });
    },
  },
  WeixinBind: {
    getOpenId(params) {
      return Ajax.get('/weChat/openId', params);
    },
    bind(params) {
      return Ajax.postJson('/weChat/bind', params);
    },
    isBinded(params) {
      return Ajax.get('/weChat/hasOpenId', params);
    },
    unbind(params) {
      return Ajax.postJson('/weChat/unbind', params);
    },
    bindWithToken(params) {
      return Ajax.postJson('/weChat/bindWithToken', params);
    }
  },
  Login: {
    // 获取手机验证码
    sms(params) {
      return Ajax.get('/annualReport/sms', params);
    },
    // 年度报告登录接口
    login(params) {
      return Ajax.postJson('/annualReport/login', params);
    },
    // 通过微信code获得年度报表的秘钥
    getKeyByWechatCode(params) {
      return Ajax.get(`/annualReport/getKeyByWechatCode`, params);
    }
  },
  Annual: {
    getAnnualData(params) {
      return Ajax.get(`/annualReport/2018`, params)
    }
  },
  
};

module.exports = Request;
