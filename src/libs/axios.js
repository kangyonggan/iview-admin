import Axios from 'axios'
import qs from 'qs'
import baseURL from '_conf/url'
import { Message } from 'iview'
import Cookies from 'js-cookie'
import { TOKEN_KEY } from '@/libs/util'
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
      config.headers['x-access-token'] = Cookies.get(TOKEN_KEY)
      // Spin.show()
      // 在发送请求之前做些什么
      if (config.method === 'post') {
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
      if (data.respCo !== '0000') {
        Message.error(data.respMsg)
        return Promise.reject(data.respMsg)
      }
      return data
    }, (error) => {
      Message.error('服务内部错误')
      // 对响应错误做点什么
      return Promise.reject(error)
    })
  }
  // 创建实例
  create () {
    let conf = {
      baseURL: baseURL,
      // timeout: 2000,
      headers: {
        // 'Content-Type': 'application/json; charset=utf-8',
        // 'X-URL-PATH': location.pathname
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
  // GET请求实例
  get (url, data) {
    let options = {
      url: url,
      data,
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
