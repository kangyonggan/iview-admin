<template>
  <div>
    <div v-title>{{$t('route.article')}}</div>
    <!--搜索表单-->
    <Form ref="queryForm" :model="article" class="bg-white" inline>
      <FormItem prop="title">
        <Input v-model="article.title" :placeholder="$t('article.placeholder.title')" clearable />
      </FormItem>
      <FormItem prop="applyStatus">
        <Input v-model="article.name" :placeholder="$t('article.placeholder.applyStatus')" clearable />
      </FormItem>
      <FormItem prop="startDate">
        <AppDatePicker :model="article" prop="startDate" :placeholder="$t('article.placeholder.startDate')"/>
      </FormItem>
      <FormItem prop="endDate">
        <AppDatePicker :model="article" prop="endDate" :placeholder="$t('article.placeholder.endDate')"/>
      </FormItem>
      <Row>
        <Button type="info" icon="ios-search" @click="$refs.table.refresh()">{{$t('btn.query')}}</Button>
        <Button type="warning" icon="ios-refresh-empty" @click="$refs.queryForm.resetFields()">{{$t('btn.clear')}}</Button>
        <Button type="primary" icon="plus" @click="$refs.formModal.show({})">{{$t('btn.create')}}</Button>
      </Row>
    </Form>

    <!--表格-->
    <AppTable ref="table" url="person/article" :columns="columns" :form="$refs.queryForm"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      /**
       * 搜索表单的参数
       */
      article: {},
      /**
       * 表格的列
       */
      columns: [
        {
          title: this.$t('article.label.title'),
          key: 'title',
          minWidth: 240,
          sortable: true,
          render: (h, params) => {
            return h('AppLink', {props: {href: '/#/article/' + params.row.id}}, params.row.title)
          }
        },
        {
          title: this.$t('article.label.replyMsg'),
          key: 'replyMsg',
          sortable: true
        },
        {
          title: this.$t('article.label.applyStatus'),
          key: 'applyStatus',
          sortable: true
        },
        {
          title: this.$t('article.label.createdTime'),
          key: 'createdTime',
          sortable: true
        },
        {
          title: this.$t('article.label.updatedTime'),
          key: 'updatedTime',
          sortable: true
        },
        {
          title: this.$t('article.label.operation'),
          render: (h, params) => {
            let row = params.row
            return h('AppDropDown', {
              props: {text: this.$t('btn.edit')},
              on: {
                click: () => {
                  this.$Message.success('待开发')
                }
              },
              select: (name) => {
                if (name === 'delete') {
                  let that = this
                  this.delete('person/article?id=' + row.id, function () {
                    that.$refs.table.jump(1)
                  })
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
