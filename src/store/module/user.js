import { httpGet, httpPost } from '@/api/common'
import { getToken, setToken } from '@/libs/util'

export default {
  state: {
    user: {},
    token: getToken()
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    }
  },
  actions: {
    // 登录
    login ({commit}, user) {
      return new Promise((resolve) => {
        httpPost('login', user).then(data => {
          commit('setToken', data.token)
          resolve(data)
        }).catch(respCo => {
          resolve(respCo)
        })
      })
    },
    // 获取用户信息
    getUserInfo ({commit}) {
      return new Promise((resolve) => {
        httpGet('info').then(data => {
          if (!data) {
            resolve({respCo: '9998'})
          } else {
            commit('setUser', data.user)
            resolve(data)
          }
        }).catch(respCo => {
          resolve(respCo)
        })
      })
    },
    // 登出请求
    logout ({commit}) {
      return new Promise((resolve) => {
        httpGet('logout').then(data => {
          commit('setToken', '')
          resolve(data)
        }).catch(respCo => {
          resolve(respCo)
        })
      })
    }
  }
}
