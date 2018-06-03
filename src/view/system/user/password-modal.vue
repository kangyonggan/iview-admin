<template>
  <!--修改密码-->
  <AppModal ref="modal" :action="'system/user/' + user.id + '/password'" :title="$t('btn.editPwd')" method="put" :model="user" :rules="rules" @success="handleSuccess">
    <FormItem :label="$t('field.password')" prop="password">
      <Input type="password" v-model="user.password" :placeholder="$t('placeholder.password')"/>
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
          {required: true, message: this.$t('valid.passwordRequired'), trigger: 'blur'},
          {min: 6, message: this.$t('valid.passwordMin', 6), trigger: 'blur'},
          {max: 32, message: this.$t('valid.passwordMax', 32), trigger: 'blur'}
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
