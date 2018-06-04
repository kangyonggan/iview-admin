<template>
  <div>
    <div v-title>{{$t('route.user')}}</div>
    <!--搜索表单-->
    <Form ref="queryForm" :model="user" class="bg-white" inline>
      <FormItem prop="username">
        <Input v-model="user.username" :placeholder="$t('user.placeholder.username')" clearable />
      </FormItem>
      <FormItem prop="name">
        <Input v-model="user.name" :placeholder="$t('user.placeholder.name')" clearable />
      </FormItem>
      <FormItem prop="startDate">
        <AppDatePicker :model="user" prop="startDate" :placeholder="$t('user.placeholder.startDate')"/>
      </FormItem>
      <FormItem prop="endDate">
        <AppDatePicker :model="user" prop="endDate" :placeholder="$t('user.placeholder.endDate')"/>
      </FormItem>
      <Row>
        <Button type="info" icon="ios-search" @click="$refs.table.refresh()">{{$t('btn.query')}}</Button>
        <Button type="warning" icon="ios-refresh-empty" @click="$refs.queryForm.resetFields()">{{$t('btn.clear')}}</Button>
        <Button type="primary" icon="plus" @click="$refs.formModal.show({})">{{$t('btn.create')}}</Button>
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
          title: this.$t('user.label.id'),
          key: 'id',
          sortable: true
        },
        {
          title: this.$t('user.label.username'),
          key: 'username',
          sortable: true
        },
        {
          title: this.$t('user.label.name'),
          key: 'name',
          sortable: true
        },
        {
          title: this.$t('user.label.status'),
          key: 'status',
          sortable: true,
          render: (h, params) => {
            return this.status(h, params,
              'system/user/' + params.row.id + '/status/' + 1 * !params.row.status,
              this.$refs.table)
          }
        },
        {
          title: this.$t('user.label.createdTime'),
          key: 'createdTime',
          sortable: true
        },
        {
          title: this.$t('user.label.updatedTime'),
          key: 'updatedTime',
          sortable: true
        },
        {
          title: this.$t('user.label.operation'),
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
                    let that = this
                    this.delete('system/user?id=' + row.id, function () {
                      that.$refs.table.jump(1)
                    })
                  } else if (name === 'editPwd') {
                    this.$refs.passwordModal.show(row.id)
                  }
                }
              }}, [
              h('DropdownItem', {props: {name: 'delete'}, style: {display: row.status ? '' : 'none'}}, this.$t('btn.delete')),
              h('DropdownItem', {props: {name: 'setRole'}}, this.$t('user.btn.setRole')),
              h('DropdownItem', {props: {name: 'editPwd'}}, this.$t('user.btn.editPwd'))
            ])
          }
        }]
    }
  }
}
</script>
