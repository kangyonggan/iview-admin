import { getBreadCrumbList, setTagNavListInLocalstorage, getMenuByRouter, getTagNavListFromLocalstorage, getRoute } from '@/libs/util'
import routers from '@/router/routers'
export default {
  state: {
    breadCrumbList: [],
    tagNavList: [],
    homeRoute: getRoute(routers, 'home')
  },
  getters: {
    menuList: (state, getters, rootState) => {
      return getMenuByRouter(routers, rootState.user.menus)
    }
  },
  mutations: {
    setBreadCrumb (state, routeMetched) {
      state.breadCrumbList = getBreadCrumbList(routeMetched)
    },
    setTagNavList (state, list) {
      if (list) {
        state.tagNavList = [...list]
        setTagNavListInLocalstorage([...list])
      } else {
        state.tagNavList = getTagNavListFromLocalstorage()
      }
    },
    addTag (state, item, type = 'unshift') {
      if (state.tagNavList.findIndex(tag => tag.name === item.name) < 0) {
        if (type === 'push') state.tagNavList.push(item)
        else state.tagNavList.unshift(item)
        setTagNavListInLocalstorage([...state.tagNavList])
      }
    }
  }
}
