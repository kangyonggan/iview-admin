<template>
  <!--新增/编辑用户-->
  <AppModal ref="modal" :action="'system/user/' + (user.id ? 'update' : 'save')"
            :title="(user.id ? '编辑' : '新增') + '用户'" :model="user" :rules="rules" @success="handleSuccess">
    <FormItem label="用户名" prop="username">
      <Input v-model="user.username" placeholder="请输入用户名"/>
    </FormItem>
    <FormItem label="真实姓名" prop="name">
      <Input v-model="user.name" placeholder="请输入真实姓名"/>
    </FormItem>
    <FormItem label="密码" prop="password" v-if="!user.id">
      <Input type="password" v-model="user.password" placeholder="请输入密码"/>
    </FormItem>
  </AppModal>
</template>

<script>
import { httpGet } from '@/api/common'
export default {
  props: {
    success: {
      type: Function
    }
  },
  data () {
    return {
      /**
       * 用户信息
       */
      user: {},
      /**
       * 老的用户名
       */
      oldUsername: '',
      /**
       * 表单的校验
       */
      rules: {
        username: [
          {required: true, min: 5, max: 32, trigger: 'blur'},
          {validator: this.validateUsername, trigger: 'blur'}
        ],
        name: [
          {required: true, min: 1, max: 32, trigger: 'blur'}
        ],
        password: [
          {required: true, min: 6, max: 32, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    /**
     * 校验用户名是否存在
     */
    validateUsername: function (rule, value, callback) {
      if (value === this.oldUsername) {
        callback()
        return
      }

      httpGet('validate/user?username=' + value).then(() => {
        callback()
      }).catch(() => {
        callback(new Error('用户名已存在'))
      })
    },
    show: function (user) {
      this.user = user
      this.oldUsername = user.username
      this.$refs.modal.show()
    },
    handleSuccess (event) {
      this.$emit('success', event)
    }
  }
}
</script>
