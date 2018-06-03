import { httpGet } from '@/api/common'
import components from './components'

let defaultRoutes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
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
          notCache: true,
          title: '首页'
        },
        component: () => import('@/view/home/index')
      }
    ]
  }
]

export default defaultRoutes

/**
 * 加载路由
 *
 * @param router
 */
export const loadRoutes = (router) => {
  httpGet('menus').then(data => {
    if (data && data.menus) {
      for (let i in data.menus) {
        let route = loadMenuRoutes(data.menus[i])
        if (route) {
          defaultRoutes.push(route)
        }
      }
      loadCommonRoutes()
    } else {
      loadCommonRoutes()
    }

    router.addRoutes(defaultRoutes)
  })
}

function loadCommonRoutes () {
  defaultRoutes.push({
    path: '/locking',
    name: 'locking',
    component: () => import('@/view/main/components/lockscreen/components/locking-page.vue')
  })
  defaultRoutes.push({
    path: '/401',
    name: 'error-401',
    component: () => import('@/view/error/401')
  })
  defaultRoutes.push({
    path: '*',
    name: 'error-404',
    component: () => import('@/view/error/404')
  })
}

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

  if (menu.leaf && menu.leaf.length) {
    for (let i in menu.leaf) {
      children.push(loadMenuRoutes(menu.leaf[i]))
    }
  }

  if (children.length > 0) {
    route.children = children
  }

  return route
}
