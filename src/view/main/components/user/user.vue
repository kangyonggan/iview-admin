<template>
  <div class="user-dropdown-menu-con">
    <Dropdown transfer trigger="click" @on-click="handleClick" placement="bottom-end">
      <a href="javascript:void(0)">
        <span class="main-user-name">
          <Avatar :src="avatar"/>
          <Icon type="arrow-down-b" style="color: #999"></Icon>
        </span>
      </a>
      <DropdownMenu slot="list">
        <DropdownItem name="language-en" v-if="!language || language === 'zh-CN'">英语</DropdownItem>
        <DropdownItem name="language-zh" v-if="language === 'en-US'">Chinese</DropdownItem>
        <DropdownItem name="logout">{{$t('btn.logout')}}</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import './user.less'
import { getLang, setLang } from '@/libs/util'
import { mapActions } from 'vuex'
export default {
  name: 'user',
  props: {
    avatar: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      language: getLang()
    }
  },
  methods: {
    ...mapActions([
      'logout'
    ]),
    handleClick (name) {
      switch (name) {
        case 'logout':
          this.logout().then(data => {
            if (data) {
              this.$router.push({
                name: 'login'
              })
            }
          })
          break
        case 'language-en':
          setLang('en-US')
          window.location.reload()
          break
        case 'language-zh':
          setLang('zh-CN')
          window.location.reload()
          break
      }
    }
  }
}
</script>
