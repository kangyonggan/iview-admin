<template>
  <div @click='lockScreen' class='lock-screen-btn-con'>
    <Tooltip :content="$t('lockPage.lockScreen')" placement='bottom'>
      <Icon type='locked' :size='20'></Icon>
    </Tooltip>
  </div>
</template>

<script>
import Cookies from 'js-cookie'

const setLockBackSize = () => {
  let x = document.body.clientWidth
  let y = document.body.clientHeight
  let r = Math.sqrt(x * x + y * y)
  return parseInt(r)
}
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
  },
  mounted () {
    let size = setLockBackSize()
    this.lockScreenSize = size
  }
}
</script>
