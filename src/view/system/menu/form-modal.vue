<template>
  <!--新增/编辑角色-->
  <AppModal ref="modal" action="system/menu" :method="menu.id ? 'put' : 'post'"
            :title="(menu.id ? $t('btn.edit') : $t('btn.create')) + $t('menu.entity')" :model="menu" :rules="rules" @success="handleSuccess">
    <FormItem :label="$t('menu.label.pcode')">
      <Input :value="$t('route.' + (menu.pcode ? menu.pcode : 'all'))" :readonly="true"/>
    </FormItem>
    <FormItem :label="$t('menu.label.code')" prop="code">
      <Input v-model="menu.code" :placeholder="$t('menu.placeholder.code')" clearable/>
    </FormItem>
    <FormItem :label="$t('menu.label.icon')" prop="icon">
      <Input v-model="menu.icon" :placeholder="$t('menu.placeholder.icon')" clearable/>
    </FormItem>
    <FormItem :label="$t('menu.label.sort')" prop="sort">
      <Input v-model="menu.sort" :placeholder="$t('menu.placeholder.sort')" clearable/>
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
       * 菜单信息
       */
      menu: {},
      oldCode: '',
      /**
       * 表单的校验
       */
      rules: {
        code: [
          {required: true, message: this.$t('menu.valid.code.required'), trigger: 'blur'},
          {min: 1, message: this.$t('menu.valid.code.min', 5), trigger: 'blur'},
          {max: 32, message: this.$t('menu.valid.code.max', 32), trigger: 'blur'},
          {pattern: /^[a-z][a-z0-9_]*$/, message: this.$t('menu.valid.code.pattern'), trigger: 'blur'},
          {validator: this.validateMenu, trigger: 'blur'}
        ],
        icon: [
          {min: 1, message: this.$t('menu.valid.icon.min', 1), trigger: 'blur'},
          {max: 32, message: this.$t('menu.valid.icon.max', 32), trigger: 'blur'}
        ],
        sort: [
          {pattern: /^[0-9]{1,2}$/, message: this.$t('menu.valid.sort.pattern'), trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    /**
     * 校验菜单代码是否存在
     */
    validateMenu: function (rule, value, callback) {
      if (this.oldCode === value) {
        callback()
        return
      }

      let that = this
      httpGet('validate/menu?code=' + value).then(() => {
        callback()
      }).catch(respCo => {
        callback(new Error(this.$t('menu.valid.code.exists')))
        that.error(respCo, true)
      })
    },
    show: function (menu) {
      this.menu = menu
      this.oldCode = menu.code
      this.$refs.modal.show()
    },
    handleSuccess () {
      this.$emit('success')
    }
  }
}
</script>
