<template>
  <!--新增/编辑角色-->
  <AppModal ref="modal" action="system/role" :method="role.id ? 'put' : 'post'"
            :title="(role.id ? $t('btn.edit') : $t('btn.create')) + $t('role.entity')" :model="role" :rules="rules" @success="handleSuccess">
    <FormItem :label="$t('role.label.code')" prop="code">
      <Input v-model="role.code" :readonly="!!role.id" :placeholder="$t('role.placeholder.code')"/>
    </FormItem>
    <FormItem :label="$t('role.label.name')" prop="name">
      <Input v-model="role.name" :placeholder="$t('role.placeholder.name')"/>
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
       * 角色信息
       */
      role: {},
      /**
       * 表单的校验
       */
      rules: {
        code: [
          {required: true, message: this.$t('role.valid.code.required'), trigger: 'blur'},
          {min: 1, message: this.$t('role.valid.code.min', 5), trigger: 'blur'},
          {max: 32, message: this.$t('role.valid.code.max', 32), trigger: 'blur'},
          {validator: this.validateRole, trigger: 'blur'}
        ],
        name: [
          {required: true, message: this.$t('role.valid.name.required'), trigger: 'blur'},
          {min: 1, message: this.$t('role.valid.name.min', 1), trigger: 'blur'},
          {max: 32, message: this.$t('role.valid.name.max', 32), trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    /**
     * 校验角色代码是否存在
     */
    validateRole: function (rule, value, callback) {
      if (this.role.id) {
        callback()
        return
      }

      let that = this
      httpGet('validate/role?code=' + value).then(() => {
        callback()
      }).catch(respCo => {
        callback(new Error(this.$t('role.valid.code.exists')))
        that.error(respCo)
      })
    },
    show: function (role) {
      this.role = role
      this.$refs.modal.show()
    },
    handleSuccess (event) {
      this.$emit('success', event)
    }
  }
}
</script>
