import axios from 'axios'
import _ from 'lodash'
import Cookies from 'js-cookie'
import qs from 'qs'
import Loading from '@hi-ui/hiui/es/loading'
import { handleNotificate } from '@hi-ui/hiui/es/notification'
import config from '../config'

let loadingInstance = null
const showLoading = () => {
  if (!loadingInstance) {
    loadingInstance = Loading.open({
      target: document.body,
      tip: '加载中...'
    })
  }
}
const closeLoading = () => {
  loadingInstance.close()
  loadingInstance = null
}
const notificate = options => {
  handleNotificate(Object.assign({
    type: 'error',
    showClose: true,
    autoClose: true,
    title: 'Error',
    duration: 5000,
    message: '请求错误，请稍后重试...'
  }, options))
}
const allwaysTrue = () => true

export const request = async (url, options = {}, host = config('apiHost')) => {
  const {
    timeout = 30000,
    loading = true,
    withCredentials = true,
    catchError = true, // 是否捕获请求中的错误，并提示
    beforeResponse = allwaysTrue,
    errorResponse = allwaysTrue,
    beforeRequest = allwaysTrue,
    errorRequest = allwaysTrue,
    errorCallback = allwaysTrue,
    params = {},
    ...restOptions
  } = options

  if (loading && !loadingInstance) {
    showLoading()
  }

  restOptions.headers = Object.assign({ // 设置header，可放置一些验证相关的
    'content-type': 'application/x-www-form-urlencoded',
    'userId': Cookies.get('userId') || '', // demo，可根据需求自定义或删除
    'serviceToken': Cookies.get('serviceToken') || '' // demo，可根据需求自定义或删除
  }, restOptions.headers)
  if (!restOptions.method) {
    restOptions.method = 'post'
  }
  if (restOptions.headers['content-type'].toLocaleLowerCase() === 'application/x-www-form-urlencoded' && restOptions.data) {
    restOptions.data = qs.stringify(restOptions.data)
  }
  restOptions.params = Object.assign({ // 配置全站所有请求的公用参数
    siteId: 1 // demo，可根据需求自定义或删除
  }, params)

  const _axios = axios.create({
    timeout: timeout,
    withCredentials: withCredentials
  })

  _axios.interceptors.request.use(config => {
    let bool = !!beforeRequest

    if (_.isFunction(beforeRequest)) {
      bool = beforeRequest(config)
    }
    if (bool) {
      //
    }

    return config
  }, function (error) {
    if (catchError) {
      let bool = !!errorRequest

      if (_.isFunction(errorRequest)) {
        bool = errorRequest(error)
      }
      if (bool) {
        notificate({ message: '请求错误，请稍后重试' })
      // console.log('----error request', error)
      }
    }

    return Promise.reject(error)
  })

  _axios.interceptors.response.use(response => {
    let bool = !!beforeResponse

    if (_.isFunction(beforeResponse)) {
      bool = beforeResponse(response)
    }
    if (bool) {
      //
    }

    return response
  }, function (error) {
    if (catchError) {
      let bool = !!errorResponse

      if (_.isFunction(errorResponse)) {
        bool = errorResponse(error)
      }
      if (bool) {
      // console.log('----error response', error)
        const errMsg = error.toString()
        let msg = '网络错误，请稍后重试...'

        if (errMsg.includes('Error: timeout')) {
          msg = '请求超时，请稍后重试...'
        }

        notificate({ message: msg })
      }
    }

    return Promise.reject(error)
  })

  return _axios({
    url: host + url,
    ...restOptions
  }).then(response => {
    if (loading) {
      closeLoading()
    }

    const ret = response.data

    if (ret.code === 10015) { // 未登录，跳转到登录。可以根据接口返回的code验证用户是否登录或有权限，此处逻辑需根据业务具体调整
      window.location.href = config('loginUrl')
    } else if (ret.code !== 200) {
      if (catchError) {
        let bool = !!errorCallback

        if (_.isFunction(errorCallback)) {
          bool = errorCallback(ret)
        }
        if (bool) {
          notificate({ message: ret.msg && ret.msg.toString() })
        }
      }
    }

    return ret
  }, error => {
    if (loading) {
      closeLoading()
    }
    throw error
  })
}
