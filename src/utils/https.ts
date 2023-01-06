import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'
import { ElMessage } from 'element-plus'
import { debounce } from './index'
import { getToken } from './auth'

type OptionParams = {
  url: string
  method?: 'options' | 'get' | 'head' | 'post' | 'put' | 'delete' | 'trace' | 'connect'
  data?: object
  contentType?: 'json' | 'urlencoded' | 'multipart'
  prefixUrl?: string
  options?: any
}

const contentTypes = {
  json: 'application/json; charset=utf-8',
  urlencoded: 'application/x-www-form-urlencoded; charset=utf-8',
  multipart: 'multipart/form-data'
}

// 吐司提示错误信息，看完即焚
function toastMsg() {
  Object.keys(errorMsgObj).map(item => {
    ElMessage.error(item)
    delete errorMsgObj[item]
  })
}
// 存放接口报错信息，会去掉重复的信息
const errorMsgObj = {}

const defaultOptions = {
  withCredentials: true, // 允许把cookie传递到后台
  headers: {
    Accept: 'application/json',
    'Content-Type': contentTypes.json // 默认form-data
  },
  timeout: 15000
}

// 请求拦截，放在callApi外侧，同一个接口调用时只会执行一次
// 如果放在callApi里面，多个接口同时调用时，每个接口会执行多次请求拦截，不友好。
axios.interceptors.request.use((request: AxiosRequestConfig<any>) => {
  const token = getToken() || ''
  request = {
    ...request,
    headers: {
      ...(request.headers || {}),
      token,
      'Content-Type': request.headers['Content-Type']
    }
  }
  console.log('request.headers', request.url, request.headers['Content-Type'])
  return request
})
axios.interceptors.response.use(response => {
  // console.log('interceptors-response', response)
  // 世纪难题，在这个项目中，登录接口后会改变response的数据格式（在then里查看响应数据）
  return { ...response }
})

export const callApi = ({
  url,
  data = {},
  method = 'get', // 默认get请求
  options = {},
  contentType = 'json', // json || urlencoded || multipart
  prefixUrl = 'api'
}: OptionParams) => {
  if (!url) {
    const error = new Error('请传入url')
    return Promise.reject(error)
  }
  const fullUrl = `/${prefixUrl}/${url}`

  const newOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      'Content-Type':
        (options.headers && options.headers['Content-Type']) || contentTypes[contentType]
    },
    method
  }
  // console.log('===callapi===', url, newOptions.headers['Content-Type'])
  if (method === 'get') {
    newOptions.params = data
  }

  if (method !== 'get' && method !== 'head') {
    newOptions.data = data
    const formdata = new FormData()

    if (data instanceof FormData) {
      console.log('data')
      newOptions.headers = {
        'x-requested-with': 'XMLHttpRequest',
        'cache-control': 'no-cache'
      }
    } else if (newOptions.headers['Content-Type'] === contentTypes.urlencoded) {
      newOptions.data = qs.stringify(data)
    } else {
      // 和后端约定，是否要去掉空字段
      // Object.keys(data).forEach(item => {
      // if (data[item] === null || data[item] === undefined || data[item] === '') {
      //   delete data[item]
      // }
      // })
    }
  }

  return axios({
    url: fullUrl,
    ...newOptions
  })
    .then(response => {
      console.log('response success', response)
      let code = 200
      let data = {}

      if (response.status) {
        data = response.data
        code = response.data.code
      } else {
        data = response
        code = response.code
      }

      if (code == 4010) {
        // 登录校验失败
        //清空sessionStorage数据
        localStorage.clear()
        //跳到登录
        window.location.href = '/login'
      } else if (code == 200) {
        // 接口调用成功
        return Promise.resolve(data.data)
      } else {
        const { message } = data
        if (!errorMsgObj[message]) {
          errorMsgObj[message] = message
        }
        // TODO
        setTimeout(debounce(toastMsg, 1000, true), 1000)
        return Promise.reject(data)
      }
    })
    .catch(error => {
      console.log('response error', error)
      if (error.response) {
        const { data } = error.response
        const resCode = data.status
        const resMsg = data.message || '服务异常'
        if (!errorMsgObj[resMsg]) {
          errorMsgObj[resMsg] = resMsg
        }
        setTimeout(debounce(toastMsg, 1000, true), 1000)
        const err = { code: resCode, respMsg: resMsg }
        return Promise.reject(err)
      } else {
        const err = { type: 'canceled', respMsg: '数据请求超时' }
        ElMessage.error('数据请求超时')
        return Promise.reject(err)
      }
    })
}
