<template>
  <div @click='lockScreen' class='lock-screen-btn-con'>
    <Tooltip :content="$t('lockPage.lockScreen')" placement='bottom'>
      <Icon type='locked' :size='20'></Icon>
    </Tooltip>
  </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  name: 'lockscreen',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    lockScreen () {
      this.showUnlock = true
      // 本地存储锁屏之前打开的页面以便解锁后打开
      Cookies.set('last_page_name', this.$route.name)
      Cookies.set('locking', '1')
      this.$router.push({
        name: 'locking'
      })
    }
  }
}
</script>
