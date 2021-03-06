import Axios from 'axios'
import baseURL from '_conf/url'
import qs from 'qs'
import { getToken, params } from '@/libs/util'

class httpRequest {
  constructor () {
    this.options = {
      method: '',
      url: ''
    }
    // 存储请求队列
    this.queue = {}
  }
  // 销毁请求实例
  destroy (url) {
    delete this.queue[url]
    const queue = Object.keys(this.queue)
    return queue.length
  }
  // 请求拦截
  interceptors (instance, url) {
    // 添加请求拦截器
    instance.interceptors.request.use(config => {
      config.headers['x-access-token'] = getToken()
      // Spin.show()
      // 在发送请求之前做些什么
      if (config.data && config.type !== 'upload') {
        config.data = qs.stringify(config.data)
      }

      return config
    }, error => {
      // 对请求错误做些什么
      return Promise.reject(error)
    })

    // 添加响应拦截器
    instance.interceptors.response.use((res) => {
      let data = res.data || {}
      this.destroy(url)
      if (data.respCo === '0000') {
        // 成功
        return data
      } else {
        // 各种失败
        return Promise.reject(data.respCo)
      }
    }, (error) => {
      // 对响应错误做点什么
      error = '9996'
      return Promise.reject(error)
    })
  }
  // 创建实例
  create () {
    let conf = {
      baseURL: baseURL,
      timeout: 2000,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
      }
    }
    return Axios.create(conf)
  }
  // 请求实例
  request (options) {
    let instance = this.create()
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }
  // http请求实例
  http (method, url, data) {
    let options = {
      url: url,
      data,
      method: method
    }
    let instance = this.create()
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }
  // POST请求实例
  post (url, data) {
    let options = {
      url: url,
      data,
      method: 'post'
    }
    let instance = this.create()
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }
  // POST文件上传请求实例
  postUpload (url, data) {
    let options = {
      type: 'upload',
      url: url,
      data,
      method: 'post'
    }
    let instance = this.create()
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }
  // PUT文件上传请求实例
  putUpload (url, data) {
    let options = {
      type: 'upload',
      url: url,
      data,
      method: 'put'
    }
    let instance = this.create()
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }
  // PUT请求实例
  put (url, data) {
    let options = {
      url: url,
      data,
      method: 'put'
    }
    let instance = this.create()
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }
  // DELETE请求实例
  delete (url, data) {
    let options = {
      url: url,
      data,
      method: 'delete'
    }
    let instance = this.create()
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }
  // GET请求实例
  get (url, data) {
    if (data) {
      url += '?' + params(data).join('&')
    }
    let options = {
      url: url,
      method: 'get'
    }
    let instance = this.create()
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }
}
export default httpRequest
