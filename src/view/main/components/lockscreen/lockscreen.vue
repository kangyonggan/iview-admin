<template>
  <div @click='lockScreen' class='lock-screen-btn-con'>
    <Tooltip :content="$t('lock.lockScreen')" placement='bottom'>
      <Icon type='locked' :size='20'></Icon>
    </Tooltip>
  </div>
</template>

<script>
import { setLockPage } from '@/libs/util'

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
      setLockPage(this.$route.name)
      this.$router.push({
        name: 'locking'
      })
    }
  }
}
</script>
