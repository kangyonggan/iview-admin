<template>
  <Layout style="height: 100%" class="main">
    <Sider hide-trigger collapsible :width="210" :collapsed-width="70" v-model="collapsed">
      <side-menu accordion :active-name="$route" :collapsed="collapsed" @on-select="turnToPage" :menu-list="menuList">
        <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
        <div class="logo-con">
          <h1 v-show="!collapsed">
            <a :href="serverUrl" style="color: #f5f5f5">{{$t('app.name')}}</a>
          </h1>
          <h1 v-show="collapsed">
            <a :href="serverUrl" style="color: #f5f5f5">{{$t('app.shortName')}}</a>
          </h1>
        </div>
      </side-menu>
    </Sider>
    <Layout>
      <Header class="header-con">
        <lock-screen></lock-screen>
        <fullscreen v-model="isFullScreen"></fullscreen>
        <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
          <user :avatar="avatar"/>
        </header-bar>
      </Header>
      <Content>
        <Layout>
          <div class="tag-nav-wrapper">
            <tags-nav :value="$route" @input="handleClick" :list="tagNavList" @on-close="handleCloseTag"/>
          </div>
          <Content>
            <keep-alive :include="cacheList">
              <div style="margin: 10px;">
                <router-view/>
              </div>
            </keep-alive>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>
<script>
import sideMenu from './components/side-menu'
import headerBar from './components/header-bar'
import tagsNav from './components/tags-nav'
import lockScreen from './components/lockscreen'
import fullscreen from './components/fullscreen'
import user from './components/user'
import { mapMutations, mapActions } from 'vuex'
import { getNewTagList } from '@/libs/util'
import {domain} from '_conf/url'
import './main.less'
export default {
  name: 'Main',
  components: {
    sideMenu,
    headerBar,
    tagsNav,
    lockScreen,
    fullscreen,
    user
  },
  data () {
    return {
      isFullScreen: false,
      collapsed: false,
      serverUrl: domain
    }
  },
  computed: {
    tagNavList () {
      return this.$store.state.app.tagNavList
    },
    avatar () {
      let avatar = this.$store.state.user.user.avatar
      if (avatar) {
        avatar = domain + avatar
      } else {
        avatar = require('@/assets/images/logo.jpg')
      }
      return avatar
    },
    cacheList () {
      return this.tagNavList.length ? this.tagNavList.map(item => item.name).filter(item => !(item.meta && item.meta.notCache)) : []
    },
    menuList () {
      return this.$store.getters.menuList
    }
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      'setTagNavList',
      'addTag'
    ]),
    ...mapActions([
      'handleLogin'
    ]),
    turnToPage (name) {
      this.$router.push({
        name: name
      })
    },
    handleCollapsedChange (state) {
      this.collapsed = state
    },
    handleCloseTag (res, route) {
      this.setTagNavList(res)
      if (route) {
        this.handleClick(route)
      }
    },
    handleClick (item) {
      this.$router.push({
        name: item.name,
        params: item.meta.params,
        query: item.meta.query
      })
    }
  },
  watch: {
    '$route' (newRoute) {
      newRoute.meta.params = this.$route.params
      newRoute.meta.query = this.$route.query
      this.setBreadCrumb(newRoute.matched)
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
    }
  },
  mounted () {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.setTagNavList()
    this.addTag(this.$store.state.app.homeRoute)
    this.setBreadCrumb(this.$route.matched)
  }
}
</script>
