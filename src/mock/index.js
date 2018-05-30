import Mock from 'mockjs'
import { login, logout, getUserInfo } from './login'
import { getUserPage } from './user'

// 登录相关和获取用户信息
Mock.mock(/\/login/, login)
Mock.mock(/\/get_info/, getUserInfo)
Mock.mock(/\/logout/, logout)

// 用户信息
Mock.mock(/\/system\/user/, getUserPage)

export default Mock
