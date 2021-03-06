import Cookies from 'js-cookie'
// cookie保存的天数
import config from '@/config'
import { hasOneOf } from '@/libs/tools'

export const TOKEN_KEY = 'token'
export const LANG_KEY = 'lang'

export const setLockPage = (pageName) => {
  Cookies.set('last_page_name', pageName)
  Cookies.set('locking', '1')
}

export const unlock = () => {
  Cookies.set('locking', '0')
}

export const getLockPage = () => {
  let lastPageName = Cookies.get('last_page_name')
  if (lastPageName) {
    return lastPageName
  }

  return 'home'
}

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, {expires: config.cookieExpires || 1})
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}

export const setLang = (lang) => {
  Cookies.set(LANG_KEY, lang, {expires: config.cookieExpires || 1})
}

export const getLang = () => {
  const lang = Cookies.get(LANG_KEY)
  if (lang) return lang
  else return null
}

export const removeToken = () => {
  Cookies.set(TOKEN_KEY, '', {expires: -1})
}

export const hasChild = (item) => {
  return item.children && item.children.length !== 0
}

/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
export const getMenuByRouter = (list, menus) => {
  let res = []

  for (let i in menus) {
    let menu = menus[i]
    let route = menuInRouters(list, menu.code)
    if (route) {
      let obj = {
        icon: menu.icon || '',
        name: menu.code
      }
      if (hasChild(menu)) {
        obj.children = getMenuByRouter(list, menu.children)
      }
      res.push(obj)
    }
  }

  return res
}

function menuInRouters (list, code) {
  for (let i in list) {
    let route = list[i]
    if (route.name === code) {
      return route
    } else if (hasChild(route)) {
      let rt = menuInRouters(route.children, code)
      if (rt) {
        return rt
      }
    }
  }

  return null
}

/**
 * @param {Array} routeMetched 当前路由metched
 * @returns {Array}
 */
export const getBreadCrumbList = (routeMetched) => {
  let res = routeMetched.map(item => {
    let obj = {
      icon: (item.meta && item.meta.icon) || '',
      name: item.name,
      meta: item.meta
    }
    return obj
  })
  res = res.filter(item => {
    return !item.meta.hideInMenu
  })

  return [{
    name: 'home',
    to: '/home',
    icon: 'ios-home'
  }, ...res]
}

export const showTitle = (item, vm) => vm.$config.useI18n ? vm.$t('route.' + item.name) : ((item.meta && item.meta.title) || item.name)

/**
 * @description 本地存储和获取标签导航列表
 */
export const setTagNavListInLocalstorage = list => {
  localStorage.tagNaveList = JSON.stringify(list)
}
/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
export const getTagNavListFromLocalstorage = () => {
  const list = localStorage.tagNaveList
  return list ? JSON.parse(list) : []
}

/**
 * @param {Array} routers 路由列表数组
 * @param {String} name 路由名称
 * @description 用于找到路由列表中指定name的对象
 */
export const getRoute = (routers, name) => {
  let i = -1
  let len = routers.length
  let route = {}
  while (++i < len) {
    let item = routers[i]
    if (item.children && item.children.length) {
      let res = getRoute(item.children, name)
      if (res.name) return res
    } else {
      if (item.name === name) route = item
    }
  }
  return route
}

/**
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则更新(考虑到带参数路由)
 */
export const getNewTagList = (list, newRoute) => {
  const { name, path, meta } = newRoute
  let newList = [...list]
  let index = newList.findIndex(item => item.name === name)
  if (index >= 0) {
    newList[index] = { name, path, meta }
  } else {
    newList.push({ name, path, meta })
  }
  return newList
}

/**
 * @param {Boolean} status 状态 1 => locked  0 => unlocked
 * @description 这里只是为了演示，实际应该将锁定状态的设置和获取用接口来实现
 */
export const setLockStatus = (status) => {
  localStorage.isLocked = status
}
export const getLockStatus = () => {
  return parseInt(localStorage.isLocked)
}

/**
 * @param {*} access 用户权限数组，如 ['super_admin', 'admin']
 * @param {*} route 路由列表
 */
const hasAccess = (access, route) => {
  if (route.meta && route.meta.access) return hasOneOf(access, route.meta.access)
  else return true
}

/**
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
export const canTurnTo = (name, access, routes) => {
  const getHasAccessRouteNames = (list) => {
    let res = []
    list.forEach(item => {
      if (item.children && item.children.length) {
        res = [].concat(res, getHasAccessRouteNames(item.children))
      } else {
        if (item.meta && item.meta.access) {
          if (hasAccess(access, item)) res.push(item.name)
        } else {
          res.push(item.name)
        }
      }
    })
    return res
  }
  const canTurnToNames = getHasAccessRouteNames(routes)
  return canTurnToNames.indexOf(name) > -1
}

export const getParams = url => {
  if (url.indexOf('?') === -1) return {}
  const keyValueArr = url.split('?')[1].split('&')
  let paramObj = {}
  keyValueArr.forEach(item => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}

/**
 * 拼接请求参数
 *
 * @param data
 * @returns {*}
 */
export const params = (data) => {
  if (data.constructor !== Object) {
    return data
  }

  let arr = []
  for (let key in data) {
    let obj = data[key]
    if (obj === undefined || obj === null) {
      continue
    }
    if (obj.constructor === Array) {
      let a = []
      for (let i in obj) {
        a.push(encodeURI(params(obj[i])))
      }
      arr.push(key + '=' + a.join(','))
    } else if (obj.constructor === Object) {
      arr.push(key + '=' + params(obj))
    } else {
      arr.push(key + '=' + encodeURI(obj))
    }
  }
  return arr
}
