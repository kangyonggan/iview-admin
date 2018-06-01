<template>
  <!--修改密码-->
  <AppModal ref="modal" :action="'system/user/' + user.id + '/password'" title="修改密码" :model="user" :rules="rules" @success="handleSuccess">
    <FormItem label="新密码" prop="password">
      <Input type="password" v-model="user.password" placeholder="请输入新密码"/>
    </FormItem>
  </AppModal>
</template>

<script>
export default {
  data () {
    return {
      /**
       * 用户信息
       */
      user: {},
      /**
       * 表单的校验
       */
      rules: {
        password: [
          {required: true, message: '密码为必填项', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    show: function (id) {
      this.user = {id: id}
      this.$refs.modal.show()
    },
    handleSuccess (event) {
      this.$emit('success', event)
    }
  }
}
</script>
