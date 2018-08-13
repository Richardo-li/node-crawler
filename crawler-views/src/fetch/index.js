import axios from 'axios'

import { Loading } from 'element-ui'   //引入element-ui的loading组件

// axios.defaults.baseURL = 'http://127.0.0.1:8888';;  //默认请求url

// 环境的切换
if (process.env.NODE_ENV == 'development') {  //开发环境
  axios.defaults.baseURL = 'http://127.0.0.1:8888';
} else if (process.env.NODE_ENV == 'debug') {    //测试环境
  axios.defaults.baseURL = '';
} else if (process.env.NODE_ENV == 'production') {    //生产环境
  axios.defaults.baseURL = 'http://api.123dailu.com/';
}

//设置默认请求头
// axios.defaults.headers = {
//   'Content-Type': 'application/x-www-form-urlencoded'
// }

//设置超时时间
axios.defaults.timeout = 8000

//全局loading (element-ui)
let globalLoading = null;

//请求拦截-->执行请求前的操作
axios.interceptors.request.use(function (config) {

  //定义全局loading样式，element-ui官网有说明
  globalLoading = Loading.service({
    background: 'rgba(0,0,0,.9)',
    text: '加载中...',
    // spinner:'el-icon-loading',
    fullscreen: true,
  })

  //在这里可以判断用户是否有登录，token应该存到localstorage或者cookie中，并更新到vuex中

  return config

}, function (error) {

  return Promise.reject(error)
})

//响应拦截-->执行响应后的操作
axios.interceptors.response.use(function (response) {

  globalLoading.close()   //关闭全局loading

  if (response.status == 200 && response.data.code == '1') {
    return response.data.result;
  } else {
    //如果网络错误，则可以弹出提示
    //如果返回未登录状态码，则提示并调到登录页（得引入路由router）
    //如果.....
    //反正就是根据返回的状态码执行对应的操作
    console.log(response);
  }
}, function (error) {
  return Promise.reject(error)
})


//接口
export default axios;
//导出后注入到vue实例中比较方便  Vue.prototype.$axios=axios;
