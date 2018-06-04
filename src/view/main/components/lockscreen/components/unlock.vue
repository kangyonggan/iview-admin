<style lang="less">
  @import '../styles/unlock.less';
</style>

<template>
  <transition name="show-unlock">
    <div class="unlock-body-con" v-if="showUnlock" @keydown.enter="handleUnlock">
      <div v-title>{{$t('route.lock')}}</div>
      <div @click="handleClickAvator" class="unlock-avator-con" :style="{marginLeft: avatorLeft}">
        <img class="unlock-avator-img" :src="avatorPath">
        <div class="unlock-avator-cover">
          <span><Icon type="unlocked" :size="30"></Icon></span>
          <p>{{$t('lockPage.lock')}}</p>
        </div>
      </div>
      <div class="unlock-avator-under-back" :style="{marginLeft: avatorLeft}"></div>
      <div class="unlock-input-con">
        <div class="unlock-input-overflow-con">
          <div class="unlock-overflow-body" :style="{right: inputLeft}">
            <input ref="inputEle" v-model="user.password" class="unlock-input" type="password" :placeholder="$t('placeholder.lockPwd')"/>
            <button ref="unlockBtn" @mousedown="unlockMousedown" @mouseup="unlockMouseup" @click="handleUnlock"
                    class="unlock-btn">
              <Icon color="white" type="key"></Icon>
            </button>
          </div>
        </div>
      </div>
      <div class="unlock-locking-tip-con">{{$t('status.locked')}}</div>
    </div>
  </transition>
</template>

<script>
import { unlock } from '@/libs/util'
import { httpPost } from '@/api/common'

export default {
  name: 'Unlock',
  data () {
    return {
      avatorLeft: '0px',
      inputLeft: '400px',
      user: {
        password: ''
      },
      check: null
    }
  },
  props: {
    showUnlock: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    avatorPath () {
      return require('@/assets/images/lock.jpg')
    }
  },
  methods: {
    validator () {
      // 你可以在这里写密码验证方式，如发起ajax请求将用户输入的密码this.password与数据库用户密码对比
      return true
    },
    handleClickAvator () {
      this.avatorLeft = '-180px'
      this.inputLeft = '0px'
      this.$refs.inputEle.focus()
    },
    handleUnlock () {
      httpPost('validate/password', this.user).then(data => {
        this.avatorLeft = '0px'
        this.inputLeft = '400px'
        this.user.password = ''
        unlock()
        this.$emit('on-unlock')
      }).catch(respCo => {
        this.$Notice.error({title: this.$t('msg.code' + respCo)})
        this.error(respCo)
      })
    },
    unlockMousedown () {
      this.$refs.unlockBtn.className = 'unlock-btn click-unlock-btn'
    },
    unlockMouseup () {
      this.$refs.unlockBtn.className = 'unlock-btn'
    }
  }
}
</script>
