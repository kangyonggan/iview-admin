<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick" trigger="click" >
      <span>{{name}} </span>
      <Icon :size="12" type="arrow-down-b"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="language-en" v-if="language === 'zh-CN'">英语</DropdownItem>
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
    name: {
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
