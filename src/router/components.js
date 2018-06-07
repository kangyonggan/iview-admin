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
  'article': import('@/view/person/article/index'),
  'content': import('@/view/main'),
  'articleCheck': import('@/view/content/article-check/index'),
  'novel': import('@/view/content/novel/index')
}

/**
 * 动态路由。不在左侧菜单中显示。
 * 注意：带有通配符的放下面。
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
