<template>
  <!--新增/编辑用户-->
  <AppModal ref="modal" action="system/user" :method="user.id ? 'put' : 'post'"
            :title="(user.id ? $t('btn.edit') : $t('btn.create')) + $t('user.entity')" :model="user" :rules="rules" @success="handleSuccess">
    <FormItem :label="$t('user.label.username')" prop="username">
      <Input v-model="user.username" :readonly="!!user.id" :placeholder="$t('user.placeholder.username')" :clearable="!user.id"/>
    </FormItem>
    <FormItem :label="$t('user.label.name')" prop="name">
      <Input v-model="user.name" :placeholder="$t('user.placeholder.name')" clearable/>
    </FormItem>
    <FormItem :label="$t('user.label.password')" prop="password" v-if="!user.id">
      <Input type="password" v-model="user.password" :placeholder="$t('user.placeholder.password')" clearable/>
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
          {required: true, message: this.$t('user.valid.username.required'), trigger: 'blur'},
          {min: 5, message: this.$t('user.valid.username.min', 5), trigger: 'blur'},
          {max: 32, message: this.$t('user.valid.username.max', 32), trigger: 'blur'},
          {validator: this.validateUsername, trigger: 'blur'}
        ],
        name: [
          {required: true, message: this.$t('user.valid.name.required'), trigger: 'blur'},
          {min: 1, message: this.$t('user.valid.name.min', 1), trigger: 'blur'},
          {max: 32, message: this.$t('user.valid.name.max', 32), trigger: 'blur'}
        ],
        password: [
          {required: true, message: this.$t('user.valid.password.required'), trigger: 'blur'},
          {min: 6, message: this.$t('user.valid.password.min', 6), trigger: 'blur'},
          {max: 32, message: this.$t('user.valid.password.max', 32), trigger: 'blur'}
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
        callback(new Error(this.$t('user.valid.username.exists')))
        that.error(respCo, true)
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
