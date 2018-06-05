import { httpGet } from '@/api/common'
import components from './components'
import { getToken } from '@/libs/util'

let defaultRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/view/login/login.vue'),
    meta: {
      hideInMenu: true
    }
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
          notCache: true
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
  if (getToken()) {
    httpGet('menus').then(data => {
      if (data && data.menus) {
        for (let i in data.menus) {
          let route = loadMenuRoutes(data.menus[i])
          if (route) {
            defaultRoutes.push(route)
          }
        }
      }
      loadCommonRoutes(defaultRoutes)
      router.addRoutes(defaultRoutes)
    }).catch(() => {
      loadCommonRoutes(defaultRoutes)
      router.addRoutes(defaultRoutes)
    })
  } else {
    loadCommonRoutes(defaultRoutes)
    router.addRoutes(defaultRoutes)
  }
}

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: '/',
  name: 'other',
  redirect: '/home',
  meta: {
    hideInMenu: true,
    notCache: true
  },
  component: import('@/view/main'),
  children: [{
    path: '/article/detail',
    name: 'articleDetail',
    component: () => import('@/view/person/article/detail')
  }]
}

function loadCommonRoutes (userRoutes) {
  userRoutes.push(otherRouter)

  userRoutes.push({
    path: '/locking',
    name: 'locking',
    component: () => import('@/view/main/components/lockscreen/components/locking')
  })
  userRoutes.push({
    path: '/401',
    name: 'error-401',
    component: () => import('@/view/error/401')
  })
  userRoutes.push({
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
