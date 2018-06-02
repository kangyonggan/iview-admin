<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick" trigger="click" >
      <span>{{name}} </span>
      <Icon :size="12" type="arrow-down-b"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import './user.less'
import { mapActions } from 'vuex'
export default {
  name: 'user',
  props: {
    name: {
      required: true,
      type: String
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
      }
    }
  }
}
</script>
