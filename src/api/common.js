import axios from '@/libs/api.request'

// http请求
export const http = (method, url, data) => {
  return new Promise((resolve, reject) => {
    axios.http(method, url, data).then(data => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

// GET请求
export const httpGet = (url, data) => {
  return new Promise((resolve, reject) => {
    axios.get(url, data).then(data => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

// POST请求
export const httpPost = (url, data) => {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(data => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

// PUT请求
export const httpPut = (url, data) => {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(data => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

// DELETE请求
export const httpDelete = (url, data) => {
  return new Promise((resolve, reject) => {
    axios.delete(url, data).then(data => {
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}
