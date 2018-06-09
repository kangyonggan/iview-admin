import { httpGet } from '@/api/common'
import {components, dynamicRouter} from './components'
import { getToken } from '@/libs/util'

// 登录
export const routeLogin = {
  path: '/login',
  name: 'login',
  component: () => import('@/view/login/login.vue'),
  meta: {
    hideInMenu: true
  }
}

// 404
export const route404 = {
  path: '/*',
  name: 'error-404',
  component: () => import('@/view/error/404')
}

// 未登录之前的路由
export const unLoginRoutes = [
  routeLogin,
  route404
]

// 显示在左侧菜单中的路由（动态根据用户权限从服务端加载）
let defaultRoutes = [
  {
    path: '/',
    name: 'index',
    redirect: '/home',
    component: () => import('@/view/main'),
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: 'home',
        name: 'home',
        meta: {
          hideInMenu: true,
          notCache: true
        },
        component: () => import('@/view/home/index')
      }
    ]
  }
]

/**
 * 加载路由
 *
 * @param router
 */
export const loadRoutes = (router) => {
  // 判断是否登录
  if (getToken()) {
    // 先加载一些登录后的通用路由
    router.addRoutes(commonRoutes)

    // 加载动态路由。不在左侧菜单中显示
    router.addRoutes(dynamicRouter)

    // 已登录，按权加载路由，这些路由将显示在菜单中
    httpGet('menus').then(data => {
      if (data && data.menus) {
        for (let i in data.menus) {
          let route = loadMenuRoutes(data.menus[i])
          if (route) {
            defaultRoutes.push(route)
          }
        }
      }

      // 加载404(要放在最后)
      defaultRoutes.push(route404)
      router.addRoutes(defaultRoutes)
      defaultRoutes.push(...commonRoutes)
    }).catch(() => {
      // 加载404(要放在最后)
      defaultRoutes.push(route404)
      router.addRoutes(defaultRoutes)
    })
  } else {
    // 未登录
    router.addRoutes(unLoginRoutes)
  }
}

// 根据路径查找路由
export const findRouteByPath = function (path, routers) {
  for (let i in routers) {
    let route = routers[i]
    if (route.path === path) {
      return route
    } else if (route.children && route.children.length) {
      let r = findRouteByPath(path, route.children)
      if (r) {
        return r
      }
    }
  }

  return routeLogin
}

// 通用路由
export const commonRoutes = [
  {
    path: '/locking',
    name: 'locking',
    component: () => import('@/view/main/components/lockscreen/components/locking')
  }, {
    path: '/403',
    name: 'error-403',
    component: () => import('@/view/error/403')
  },
  routeLogin
]

/**
 * 加载菜单的路由及子路由
 *
 * @param menu
 */
function loadMenuRoutes (menu) {
  let children = []
  let route = {
    path: '/' + menu.code,
    name: menu.code,
    meta: {
      icon: menu.icon,
      title: menu.name
    },
    component: () => components[menu.code]
  }

  if (menu.children && menu.children.length) {
    for (let i in menu.children) {
      children.push(loadMenuRoutes(menu.children[i]))
    }
  }

  if (children.length > 0) {
    route.children = children
  }

  return route
}

// 显示到左侧菜单中的路由
export default defaultRoutes
