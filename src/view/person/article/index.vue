<template>
  <div>
    <div v-title>{{$t('route.article')}}</div>
    <!--搜索表单-->
    <Form ref="queryForm" :model="article" class="bg-white" inline>
      <FormItem prop="title">
        <Input v-model="article.title" :placeholder="$t('article.placeholder.title')" clearable />
      </FormItem>
      <FormItem prop="applyStatus">
        <Select v-model="article.applyStatus" style="min-width: 164px;" :placeholder="$t('article.placeholder.applyStatus')" clearable >
          <Option value="APPLY" >{{$t('applyStatus.APPLY')}}</Option>
          <Option value="REJECT" >{{$t('applyStatus.REJECT')}}</Option>
          <Option value="COMPLETE" >{{$t('applyStatus.COMPLETE')}}</Option>
        </Select>
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
        <Button type="primary" icon="plus" @click="create">{{$t('btn.create')}}</Button>
      </Row>
    </Form>

    <!--表格-->
    <AppTable ref="table" url="person/article" :columns="columns" :form="$refs.queryForm" sort="updatedTime"/>
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
          title: this.$t('article.label.id'),
          key: 'id',
          width: 70,
          sortable: true
        },
        {
          title: this.$t('article.label.title'),
          key: 'title',
          width: 400,
          sortable: true,
          render: (h, params) => {
            return h('a', {on: {click: () => {
              this.$router.push({
                name: 'articleDetail',
                params: {id: params.row.id}
              })
            }}}, params.row.title)
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
          sortable: true,
          render: (h, params) => {
            return this.applyStatus(h, params)
          }
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
                  this.$router.push({
                    name: 'articleForm',
                    query: {id: row.id}
                  })
                },
                select: (name) => {
                  if (name === 'delete') {
                    let that = this
                    this.delete('person/article?id=' + row.id, function () {
                      that.$refs.table.jump(1)
                    })
                  }
                }
              }}, [
              h('DropdownItem', {props: {name: 'delete'}}, this.$t('btn.delete'))
            ])
          }
        }]
    }
  },
  methods: {
    create: function () {
      this.$router.push({
        name: 'articleForm',
        query: {}
      })
    }
  }
}
</script>
