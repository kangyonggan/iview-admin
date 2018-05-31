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
    handleLogin ({commit}, user) {
      return new Promise((resolve, reject) => {
        login(user).then(data => {
          commit('setToken', data.token)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户信息
    getUserInfo ({state, commit}) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(data => {
          commit('setUser', data.user)
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 登出请求
    handleLogOut ({commit}) {
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
