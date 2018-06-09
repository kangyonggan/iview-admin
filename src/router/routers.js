import Main from '@/view/main'

// 菜单路由
let menuRoutes = [
  {
    path: '/',
    name: 'index',
    redirect: '/home',
    component: Main,
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
  },
  {
    path: '/system',
    name: 'system',
    component: Main,
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/view/system/user/index')
      },
      {
        path: 'role',
        name: 'role',
        component: () => import('@/view/system/role/index')
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/view/system/menu/index')
      }
    ]
  },
  {
    path: '/content',
    name: 'content',
    component: Main,
    children: [
      {
        path: 'articleCheck',
        name: 'articleCheck',
        component: () => import('@/view/content/article-check/index')
      },
      {
        path: 'novel',
        name: 'novel',
        component: () => import('@/view/content/novel/index')
      }
    ]
  },
  {
    path: '/person',
    name: 'person',
    component: Main,
    children: [
      {
        path: 'info',
        name: 'info',
        component: () => import('@/view/person/info/index')
      },
      {
        path: 'article',
        name: 'article',
        component: () => import('@/view/person/article/index')
      }
    ]
  }
]

// 通用路由
export const commonRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/view/login/login.vue'),
    meta: {
      hideInMenu: true
    }
  }, {
    path: '/locking',
    name: 'locking',
    component: () => import('@/view/main/components/lockscreen/components/locking')
  }, {
    path: '/403',
    name: 'error-403',
    component: () => import('@/view/error/403')
  }, {
    path: '/*',
    name: 'error-404',
    component: () => import('@/view/error/404')
  }
]

/**
 * 动态路由。不在左侧菜单中显示。
 */
export const dynamicRouter = [
  {
    path: '/',
    name: 'dynamic',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: 'article/form',
        name: 'articleForm',
        component: () => import('@/view/person/article/form')
      },
      {
        path: 'article/:id',
        name: 'articleDetail',
        component: () => import('@/view/person/article/detail')
      },
      {
        path: 'novel/:novelCode/section/:sectionCode',
        name: 'section',
        meta: {
          active: 'content'
        },
        component: () => import('@/view/content/novel/section')
      },
      {
        path: 'novel/:novelCode',
        name: 'novelDetail',
        meta: {
          active: 'content'
        },
        component: () => import('@/view/content/novel/detail')
      }
    ]
  }
]

export default menuRoutes

export const pushAllRoutes = function (router) {
  router.addRoutes(menuRoutes)
  router.addRoutes(dynamicRouter)
  router.addRoutes(commonRoutes)
}
