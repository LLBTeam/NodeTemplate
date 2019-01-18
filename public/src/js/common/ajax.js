import qs from 'qs';
import axios from 'axios';

const ajax = {
  // PREFIX: '/annualSummary2018/api', // 线上使用
  PREFIX: '/api', // 本地使用
  HEADER: Utils.getAuthor() || 'llbc',
  requestingApi: new Set(),
  changeHeader(header) {
    this.HEADER = header;
  },
  extractUrl(url) {
    return url ? url.split('?')[0] : '';
  },
  isRequesting(url) {
    const api = this.extractUrl(url);
    return this.requestingApi.has(api);
  },
  addRequest(url) {
    const api = this.extractUrl(url);
    this.requestingApi.add(api);
  },
  deleteRequest(url) {
    const api = this.extractUrl(url);
    this.requestingApi.delete(api);
  },
  getJson(url, paramJson, extendParam) {
    return this.ajax({
      url,
      method: 'GET',
      cache: false,
      params: paramJson
    }, extendParam);
  },
  get(url, param, extendParam) {
    const params = {
      url,
      method: 'GET',
    };
    if (param) {
      params.params = param;
    }
    return this.ajax(params, extendParam);
  },
  post(url, param, extendParam) {
    const params = {
      url,
      method: 'POST'
    };
    if (param) params.data = qs.stringify(param);
    return this.ajax(params, extendParam);
  },
  postJson(url, paramJson, extendParam) {
    return this.ajax({
      url,
      method: 'POST',
      data: paramJson
    }, extendParam);
  },
  patchJson(url, paramJson, dataType, extendParam) {
    return this.ajax({
      url,
      method: 'PATCH',
      data: paramJson,
    }, extendParam);
  },
  delete(url, extendParam) {
    return this.ajax({
      url,
      method: 'DELETE',
    }, extendParam);
  },
  ajax(param, extendParam) {
    let params = Utils.extend({ isRepeat: false }, param, extendParam || {});
    if(Utils.isNull(params.crossDomain)){
      params.crossDomain = params.url.indexOf('http') === 0;
    }
    let url = params.url;
    if (!params.crossDomain) {
      let prefix = '';
      // if(url.indexOf('/c/') != 0) { // 非通用接口
      //   if(params.platform) {
      //     prefix = `/biz/${params.platform}`;
      //   } else {
      //     let _role = Utils.getCookie('_role');
      //     if(_role == 'llbhr') {
      //       prefix = '/biz/hr';
      //     } else {
      //       prefix = '/biz/c';
      //     }
      //   }
      // }
      prefix = `/biz`
      url = `${this.PREFIX}${prefix}${params.url}`;
      params.url = url;
    }
    if (params.method !== 'GET') {
      if (this.isRequesting(url)) {
        return Promise.reject();
      }
      if (params.isRepeat === false) {
        this.addRequest(url);
      }
    }
    const header = {
      author: this.HEADER,
      channel: 'c',
      authorization: Utils.getCookie('_token')
    };
    const defaultParam = {
      headers: header,
      responseType: 'json',
      validateStatus(status) {
        return true;
      },
      paramsSerializer(p) {
        return qs.stringify(p, { allowDots: true });
      }
    };
    if (params.crossDomain) {
      defaultParam.headers = {};
    }
    const that = this;
    params = Utils.extend({}, defaultParam, params);
    params.url += `${params.url.indexOf('?') !== -1 ? '&' : '?'}_=${new Date().getTime()}`;
    return new Promise(resolve => (
      axios.request(params).then((response) => {
        that.deleteRequest(params.url);
        const data = response.data || {};
        let { status } = response;
        if (status == 200) {
          status = data.code == 1 ? 200 : data.code;
        }
        if (status != 200) {
          if (status == 401) {
            if (window.location.pathname != '/' && window.location.pathname != '/lieluobo-login') {
              let path = encodeURIComponent(window.location);
              window.top.location = `/lieluobo-login?originPath=${path}`;
            }
            return;
          }
          if (status == 500) {
            alert('后台异常');
          } else if (status == 404) {
            alert('请求不存在');
          } else if (status != 200 && status != 1001 && !params.customError  && data.code != 1001 && data.msg != "code:40163") {
            // 1001: login need captcha
            alert(data.msg || '请求异常');
          }
        }
        data.ok = data.code == 1;
        resolve(data);
      }).catch(() => {
        resolve({
          ok: false
        });
      })
    ));
  },
  getContextPath() {
    const pathName = document.location.pathname;
    const index = pathName.substr(1).indexOf('/');
    const result = pathName.substr(0, index + 1);
    return result;
  }
};
module.exports = ajax;
