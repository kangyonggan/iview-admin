import Mock from 'mockjs'
import { login, logout, getUserInfo } from './login'
import { getUserPage, save, update } from './user'
import { validate } from './validate'

// 登录相关和获取用户信息
Mock.mock(/\/login/, login)
Mock.mock(/\/get_info/, getUserInfo)
Mock.mock(/\/logout/, logout)

// 用户信息
Mock.mock(/\/system\/user/, getUserPage)
Mock.mock(/\/system\/user\/save/, save)
Mock.mock(/\/system\/user\/update/, update)
Mock.mock(/\/validate\/user/, validate)

export default Mock
