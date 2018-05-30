import axios from '@/libs/api.request'

export const httpGet = (url) => {
  return axios.request({
    url: url,
    method: 'get'
  })
}
