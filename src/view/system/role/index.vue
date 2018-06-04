<template>
  <div>
    <div v-title>{{$t('route.role')}}</div>
    <!--搜索表单-->
    <Form ref="queryForm" :model="role" class="bg-white" inline>
      <FormItem prop="code">
        <Input v-model="role.code" :placeholder="$t('role.placeholder.code')"/>
      </FormItem>
      <FormItem prop="name">
        <Input v-model="role.name" :placeholder="$t('role.placeholder.name')"/>
      </FormItem>
      <FormItem prop="startDate">
        <AppDatePicker :model="role" prop="startDate" :placeholder="$t('role.placeholder.startDate')"/>
      </FormItem>
      <FormItem prop="endDate">
        <AppDatePicker :model="role" prop="endDate" :placeholder="$t('role.placeholder.endDate')"/>
      </FormItem>
      <Row>
        <Button type="info" icon="ios-search" @click="$refs.table.refresh()">{{$t('btn.query')}}</Button>
        <Button type="warning" icon="ios-refresh-empty" @click="$refs.queryForm.resetFields()">{{$t('btn.clear')}}</Button>
        <Button type="primary" icon="plus" @click="$refs.formModal.show({})">{{$t('btn.create')}}</Button>
      </Row>
    </Form>

    <!--表格-->
    <AppTable ref="table" url="system/role" :columns="columns" :form="$refs.queryForm"/>

    <!--新增/编辑角色的界面-->
    <FormModal ref="formModal" @success="$refs.table.refresh()"/>
  </div>
</template>

<script>
import FormModal from './form-modal.vue'
export default {
  components: {FormModal},
  data () {
    return {
      /**
       * 搜索表单的参数
       */
      role: {},
      /**
       * 表格的列
       */
      columns: [
        {
          title: this.$t('role.label.id'),
          key: 'id',
          sortable: true
        },
        {
          title: this.$t('role.label.code'),
          key: 'code',
          sortable: true
        },
        {
          title: this.$t('role.label.name'),
          key: 'name',
          sortable: true
        },
        {
          title: this.$t('role.label.status'),
          key: 'status',
          sortable: true,
          render: (h, params) => {
            return this.status(h, params,
              'system/role/' + params.row.id + '/status/' + 1 * !params.row.status,
              this.$refs.table)
          }
        },
        {
          title: this.$t('role.label.createdTime'),
          key: 'createdTime',
          sortable: true
        },
        {
          title: this.$t('role.label.updatedTime'),
          key: 'updatedTime',
          sortable: true
        },
        {
          title: this.$t('role.label.operation'),
          render: (h, params) => {
            let row = params.row
            return h('AppDropDown', {
              props: {text: this.$t('btn.edit')},
              on: {
                click: () => {
                  this.$refs.formModal.show({
                    id: row.id,
                    code: row.code,
                    name: row.name
                  })
                },
                select: (name) => {
                  if (name === 'delete') {
                    let that = this
                    this.delete('system/role?id=' + row.id, function () {
                      that.$refs.table.jump(1)
                    })
                  }
                }
              }}, [
              h('DropdownItem', {props: {name: 'delete'}, style: {display: row.status ? '' : 'none'}}, this.$t('btn.delete'))
            ])
          }
        }]
    }
  }
}
</script>
