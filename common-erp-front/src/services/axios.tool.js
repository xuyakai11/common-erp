import Vue from 'vue';
import router from '@/router';
import axios from 'axios';

// 设置默认请求头
// axios.defaults.headers = {
//   'X-Requested-With': 'XMLHttpRequest',
//   'Content-Type': 'application/x-www-form-urlencoded',
// }
// let token = localStorage.getItem('Authorization')
// const service = axios.create({
//     baseURL: BASE_URL, // node环境的不同，对应不同的baseURL
//     timeout: 5000, // 请求的超时时间
//     //设置默认请求头，使post请求发送的是formdata格式数据// axios的header默认的Content-Type好像是'application/json;charset=UTF-8',我的项目都是用json格式传输，如果需要更改的话，可以用这种方式修改
// })
// service.defaults.headers.common['Authorization'] = `Bearer ${token}`

Vue.prototype.axios = axios
// 开始设置请求 发起的拦截处理
// config 代表发起请求的参数的实体
Object.assign(axios.defaults,{
  baseURL: 'http://10.18.145.80:3000',
  timeout: 5000
})
// let requestName;
// const CancelToken = axios.CancelToken; // 取消请求
// axios.interceptors.request.use((config) => {
//   // 得到参数中的 requestName 字段，用于决定下次发起请求，取消对应的 相同字段的请求
//   // 如果没有 requestName 就默认添加一个 不同的时间戳
//   if (config.method === 'post') {
//     if (config.data && qs.parse(config.data).requestName) {
//       requestName = qs.parse(config.data).requestName;
//     } else {
//       requestName = new Date().getTime();
//     }
//   } else {
//     if (config.params && config.params.requestName) {
//       requestName = config.params.requestName;
//     } else {
//       requestName = new Date().getTime();
//     }
//   }
//   // 判断，如果这里拿到的参数中的 requestName 在上一次请求中已经存在，就取消上一次的请求
//   if (requestName) {
//     if (axios[requestName] && axios[requestName].cancel) {
//       axios[requestName].cancel('取消了请求');
//     }
//     config.cancelToken = new CancelToken(c => {
//       axios[requestName] = {};
//       axios[requestName].cancel = c;
//     });
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });
// 请求到结果的拦截处理
axios.interceptors.response.use((config) => {
  // 返回请求正确的结果
  const {data: {code, msg}} = config
  if (code === 200) {
    return config.data
  } else {
    if(code === 401){
      return Promise.reject('权限错误，请重新登录');
    }
    return Promise.reject(msg || '异常');
  }
}, (error) => {
  if(error.response.status === 401 || error.response.status === 403) {
    // message.warn('权限错误，请重新登录');
    router.replace('/login');
  } else {
    return Promise.reject(error);
  }
  // 错误的请求结果处理，这里的代码根据后台的状态码来决定错误的输出信息
})

// 将axios的post方法，绑定到vue实例上面的$post
Vue.prototype.post = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then((res) => {
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

// 将axios的get方法，绑定到vue实例上面的$get
Vue.prototype.get = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: params }).then((res) => {
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}
