import Main from '@/view/main'
import parentView from '@/components/parent-view'

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
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
          notCache: true,
          title: '首页'
        },
        component: () => import('@/view/home/index')
      }
    ]
  },
  {
    path: '/system',
    name: 'system',
    meta: {
      icon: 'gear-b',
      title: '系统'
    },
    component: Main,
    children: [
      {
        path: 'user',
        name: 'user',
        meta: {
          title: '用户管理'
        },
        component: () => import('@/view/system/user/index')
      },
      {
        path: 'role',
        name: 'role',
        meta: {
          title: '角色管理'
        },
        component: () => import('@/view/system/role/index')
      },
      {
        path: 'menu',
        name: 'menu',
        meta: {
          title: '菜单管理'
        },
        component: () => import('@/view/system/menu/index')
      },
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    component: () => import('@/view/error-page/404.vue')
  }
]
