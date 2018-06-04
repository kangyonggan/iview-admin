<template>
  <!--设置菜单-->
  <AppModal ref="modal" :title="$t('role.btn.setMenu')" :submit="submit">
    <div style="max-width: 600px;min-width: 300px;margin: 0 auto">
      <AppTree ref="tree" :title="$t('route.all')" itemsName="menus" :getTitle="getTitle" showCheckbox/>
    </div>
  </AppModal>
</template>

<script>
import { httpPut } from '@/api/common'
export default {
  data () {
    return {
      roleCode: ''
    }
  },
  methods: {
    getTitle: function (title) {
      return this.$t('route.' + title)
    },
    submit: function () {
      this.$refs.modal.loading()
      let selected = this.$refs.tree.getSelectedCodes()
      httpPut('system/role/' + this.roleCode + '/menu?menuCodes=' + selected).then(data => {
        this.success(data.respCo)
        this.$refs.modal.hide()
      }).catch(respCo => {
        this.$refs.modal.stop()
        this.error(respCo)
      })
    },
    show: function (roleCode) {
      this.roleCode = roleCode
      this.$refs.tree.refresh('system/menu', 'system/role/' + roleCode + '/menu')
      this.$refs.modal.show()
    }
  }
}
</script>
