<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick" trigger="click" >
      <span>{{name}} </span>
      <Icon :size="12" type="arrow-down-b"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="logout">{{$t('btn.logout')}}</DropdownItem>
        <DropdownItem name="language-en" v-if="language === 'zh-CN'">英语</DropdownItem>
        <DropdownItem name="language-zh" v-if="language === 'en-US'">Chinese</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import './user.less'
import Vue from 'vue'
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
      language: Vue.config.lang
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
          this.language = 'en-US'
          Vue.config.lang = this.language
          break
        case 'language-zh':
          this.language = 'zh-CN'
          Vue.config.lang = this.language
          break
      }
    }
  }
}
</script>
