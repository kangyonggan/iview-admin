<template>
  <!--新增/编辑用户-->
  <AppModal ref="modal" action="system/user" :method="user.id ? 'put' : 'post'"
            :title="(user.id ? $t('btn.edit') : $t('btn.create')) + $t('entity.user')" :model="user" :rules="rules" @success="handleSuccess">
    <input v-if="user.id" :value="user.id" name="id" type="hidden"/>
    <FormItem :label="$t('field.username')" prop="username">
      <Input v-model="user.username" :readonly="!!user.id" :placeholder="$t('placeholder.username')"/>
    </FormItem>
    <FormItem :label="$t('field.name')" prop="name">
      <Input v-model="user.name" :placeholder="$t('placeholder.name')"/>
    </FormItem>
    <FormItem :label="$t('field.password')" prop="password" v-if="!user.id">
      <Input type="password" v-model="user.password" :placeholder="$t('placeholder.password')"/>
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
          {required: true, message: this.$t('valid.usernameRequired'), trigger: 'blur'},
          {min: 5, message: this.$t('valid.usernameMin', 5), trigger: 'blur'},
          {max: 32, message: this.$t('valid.usernameMax', 32), trigger: 'blur'},
          {validator: this.validateUsername, trigger: 'blur'}
        ],
        name: [
          {required: true, message: this.$t('valid.nameRequired'), trigger: 'blur'},
          {min: 1, message: this.$t('valid.nameMin', 1), trigger: 'blur'},
          {max: 32, message: this.$t('valid.nameMax', 32), trigger: 'blur'}
        ],
        password: [
          {required: true, message: this.$t('valid.passwordRequired'), trigger: 'blur'},
          {min: 6, message: this.$t('valid.passwordMin', 6), trigger: 'blur'},
          {max: 32, message: this.$t('valid.passwordMax', 32), trigger: 'blur'}
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

      let that = this
      httpGet('validate/user?username=' + value).then(() => {
        callback()
      }).catch(respCo => {
        callback(new Error(this.$t('valid.usernameExists')))
        that.error(respCo)
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
