import axios from '@/libs/api.request'

export const httpGet = (url) => {
  return axios.request({
    url: url,
    method: 'get'
  })
}

export const httpPost = (url, data) => {
  return axios.request({
    url: url,
    data: data,
    method: 'post'
  })
}
