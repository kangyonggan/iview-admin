<template>
  <div>
    <!--搜索表单-->
    <Form ref="queryForm" :model="user" class="bg-white" inline>
      <FormItem prop="username">
        <Input v-model="user.username" placeholder="请输入用户名"/>
      </FormItem>
      <FormItem prop="name">
        <Input v-model="user.name" placeholder="请输入姓名"/>
      </FormItem>
      <FormItem prop="startDate">
        <AppDatePicker :model="user" prop="startDate" placeholder="请选择创建开始日期"/>
      </FormItem>
      <FormItem prop="endDate">
        <AppDatePicker :model="user" prop="endDate" placeholder="请选择创建结束日期"/>
      </FormItem>
      <Row>
        <Button type="info" icon="ios-search" @click="$refs.table.refresh()">查询</Button>
        <Button type="warning" icon="ios-refresh-empty" @click="$refs.queryForm.resetFields()">清除</Button>
        <Button type="primary" icon="plus" @click="$refs.formModal.show({})">新增</Button>
      </Row>
    </Form>

    <!--表格-->
    <AppTable ref="table" url="system/user" :columns="columns" :form="$refs.queryForm"/>

    <!--新增/编辑用户的界面-->
    <FormModal ref="formModal" @success="$refs.table.refresh()"/>
  </div>
</template>

<script>
import FormModal from './form-modal.vue'
export default {
  components: {FormModal},
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
          title: 'ID',
          key: 'id',
          sortable: true
        },
        {
          title: '用户名',
          key: 'username',
          sortable: true
        },
        {
          title: '姓名',
          key: 'name',
          sortable: true
        },
        {
          title: '状态',
          key: 'status',
          sortable: true,
          render: (h, params) => {
            return this.status(h, params,
              'system/user/' + params.row.id + '/status/' + 1 * !params.row.status,
              this.$refs.table)
          }
        },
        {
          title: '创建时间',
          key: 'createdTime',
          sortable: true
        },
        {
          title: '更新时间',
          key: 'updatedTime',
          sortable: true
        },
        {
          title: '操作',
          render: (h, params) => {
            let row = params.row
            return h('AppDropDown', {
              props: {text: '编辑'},
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
                    this.$Message.warning('开发中')
                  } else if (name === 'delete') {
                    this.delete('system/user/' + row.id + '/delete', this.$refs.table)
                  }
                }
              }}, [
              h('DropdownItem', {props: {name: 'delete'}, style: {display: row.status ? '' : 'none'}}, '物理删除'),
              h('DropdownItem', {props: {name: 'setRole'}}, '设置角色')
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
