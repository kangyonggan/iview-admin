import axios from '@/libs/api.request'

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
