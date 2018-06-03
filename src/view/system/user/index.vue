<template>
  <div>
    <!--搜索表单-->
    <Form ref="queryForm" :model="user" class="bg-white" inline>
      <FormItem prop="username">
        <Input v-model="user.username" :placeholder="$t('placeholder.username')"/>
      </FormItem>
      <FormItem prop="name">
        <Input v-model="user.name" :placeholder="$t('placeholder.name')"/>
      </FormItem>
      <FormItem prop="startDate">
        <AppDatePicker :model="user" prop="startDate" :placeholder="$t('placeholder.startDate')"/>
      </FormItem>
      <FormItem prop="endDate">
        <AppDatePicker :model="user" prop="endDate" :placeholder="$t('placeholder.endDate')"/>
      </FormItem>
      <Row>
        <Button type="info" icon="ios-search" @click="$refs.table.refresh()">{{$t('query')}}</Button>
        <Button type="warning" icon="ios-refresh-empty" @click="$refs.queryForm.resetFields()">{{$t('clear')}}</Button>
        <Button type="primary" icon="plus" @click="$refs.formModal.show({})">{{$t('create')}}</Button>
      </Row>
    </Form>

    <!--表格-->
    <AppTable ref="table" url="system/user" :columns="columns" :form="$refs.queryForm"/>

    <!--新增/编辑用户的界面-->
    <FormModal ref="formModal" @success="$refs.table.refresh()"/>

    <!--设置角色的界面-->
    <RoleModal ref="roleModal"/>

    <!--修改密码-->
    <PasswordModal ref="passwordModal" @success="$refs.table.refresh()"/>
  </div>
</template>

<script>
import FormModal from './form-modal.vue'
import RoleModal from './role-modal.vue'
import PasswordModal from './password-modal.vue'
export default {
  components: {FormModal, RoleModal, PasswordModal},
  name: 'index',
  data () {
    return {
      /**
       * 搜索表单的参数
       */
      user: {},
      /**
       * 表格的列
       */
      columns: [
        {
          title: this.$t('field.id'),
          key: 'id',
          sortable: true
        },
        {
          title: this.$t('field.username'),
          key: 'username',
          sortable: true
        },
        {
          title: this.$t('field.name'),
          key: 'name',
          sortable: true
        },
        {
          title: this.$t('field.status'),
          key: 'status',
          sortable: true,
          render: (h, params) => {
            return this.status(this, h, params,
              'system/user/' + params.row.id + '/status/' + 1 * !params.row.status,
              this.$refs.table)
          }
        },
        {
          title: this.$t('field.createdTime'),
          key: 'createdTime',
          sortable: true
        },
        {
          title: this.$t('field.updatedTime'),
          key: 'updatedTime',
          sortable: true
        },
        {
          title: this.$t('field.operation'),
          render: (h, params) => {
            let row = params.row
            return h('AppDropDown', {
              props: {text: this.$t('btn.edit')},
              on: {
                click: () => {
                  this.$refs.formModal.show({
                    id: row.id,
                    username: row.username,
                    name: row.name
                  })
                },
                select: (name) => {
                  if (name === 'setRole') {
                    this.$refs.roleModal.show(row.username)
                  } else if (name === 'delete') {
                    this.delete('system/user/' + row.id, this.$refs.table)
                  } else if (name === 'editPwd') {
                    this.$refs.passwordModal.show(row.id)
                  }
                }
              }}, [
              h('DropdownItem', {props: {name: 'delete'}, style: {display: row.status ? '' : 'none'}}, this.$t('btn.delete')),
              h('DropdownItem', {props: {name: 'setRole'}}, this.$t('btn.setRole')),
              h('DropdownItem', {props: {name: 'editPwd'}}, this.$t('btn.editPwd'))
            ])
          }
        }]
    }
  },
  methods: {

  }
}
</script>

<style>

</style>
