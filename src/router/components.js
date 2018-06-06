/**
 * 菜单路由：其中key对应菜单代码，也是路由的name，value是菜单对应的界面
 */
export const components = {
  'system': import('@/view/main'),
  'user': import('@/view/system/user/index'),
  'role': import('@/view/system/role/index'),
  'menu': import('@/view/system/menu/index'),
  'person': import('@/view/main'),
  'info': import('@/view/person/info/index'),
  'article': import('@/view/person/article/index')
}

/**
 * 动态路由。不在左侧菜单中显示
 */
export const dynamicRouter = [
  {
    path: '/',
    name: 'dynamic',
    redirect: '/home',
    component: () => import('@/view/main'),
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: 'article/:id',
        name: 'articleDetail',
        meta: {
          active: 'person'
        },
        component: () => import('@/view/person/article/detail')
      }
    ]
  }
]
