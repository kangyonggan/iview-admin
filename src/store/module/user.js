import { httpGet, httpPost } from '@/api/common'
import { getToken, setToken } from '@/libs/util'
import { Message } from 'iview'

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
          resolve(true)
        }).catch(respMsg => {
          Message.error(respMsg)
          resolve()
        })
      })
    },
    // 获取用户信息
    getUserInfo ({commit}) {
      return new Promise((resolve) => {
        httpGet('user/info').then(data => {
          if (!data) {
            Message.error('登录已失效，请重新登录！')
            resolve()
          } else {
            commit('setUser', data.user)
            resolve(data)
          }
        }).catch(respMsg => {
          Message.error(respMsg)
          resolve()
        })
      })
    },
    // 登出请求
    logout ({commit}) {
      return new Promise((resolve) => {
        httpGet('logout').then(() => {
          commit('setToken', '')
          resolve(true)
        }).catch(respMsg => {
          Message.error(respMsg)
          resolve()
        })
      })
    }
  }
}
