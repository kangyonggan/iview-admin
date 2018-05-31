import axios from '@/libs/api.request'

// 登录请求
export const login = ({ username, password }) => {
  const data = {
    username,
    password
  }
  return axios.post('login', data)
}

// 获取用户信息的请求
export const getUserInfo = () => {
  return axios.get('user/info')
}

// 登出请求
export const logout = () => {
  return axios.get('logout')
}
