/**
 * 动态路由：其中key对应菜单代码，value是菜单对应的界面
 */
export default {
  'system': import('@/view/main'),
  'user': import('@/view/system/user/index'),
  'role': import('@/view/system/role/index'),
  'menu': import('@/view/system/menu/index'),
  'person': import('@/view/main'),
  'info': import('@/view/person/info/index'),
  'article': import('@/view/person/article/index')
}
