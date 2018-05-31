import { login, logout, getUserInfo } from '@/api/user'
import { setToken, getToken } from '@/libs/util'

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
        login(user).then(data => {
          commit('setToken', data.token)
          resolve(true)
        }).catch(() => {
          resolve()
        })
      })
    },
    // 获取用户信息
    getUserInfo ({state, commit}) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(data => {
          commit('setUser', data.user)
          resolve(data)
        }).catch(() => {
          resolve()
        })
      })
    },
    // 登出请求
    logout ({commit}) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('setToken', '')
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
