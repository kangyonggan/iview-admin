<template>
  <!--设置角色-->
  <AppModal ref="modal" :action="'system/user/' + user.username + '/role'" :title="$t('user.btn.setRole')" method="put" :model="user">
    <FormItem prop="roleCodes">
      <CheckboxGroup v-model="user.roleCodes">
        <Checkbox v-for="(role, index) in roles" :key="index" :label="role.code">
          <span>{{role.name}}</span>
        </Checkbox>
      </CheckboxGroup>
    </FormItem>
  </AppModal>
</template>

<script>
import { httpGet } from '@/api/common'
export default {
  data () {
    return {
      /**
       * 用户信息
       */
      user: {
        username: '',
        roleCodes: []
      },
      /**
       * 全部角色
       */
      roles: []
    }
  },
  methods: {
    show: function (username) {
      this.user.username = username
      this.$refs.modal.show()

      let that = this
      httpGet('system/user/' + username + '/role').then(data => {
        that.user.roleCodes = data.roleCodes
        httpGet('system/role/all').then(data => {
          that.roles = data.roles
        }).catch(respCo => {
          that.error(respCo)
        })
      }).catch(respCo => {
        that.error(respCo)
      })
    }
  }
}
</script>
