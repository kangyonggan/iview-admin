<template>
  <div>
    <div v-title>{{$t('article.tag.all')}}</div>
    <!--搜索表单-->
    <Form ref="queryForm" :model="article" class="bg-white" inline>
      <FormItem prop="title">
        <Input v-model="article.title" :placeholder="$t('article.placeholder.title')" clearable />
      </FormItem>
      <FormItem prop="createdName">
        <Input v-model="article.createdName" :placeholder="$t('article.placeholder.createdName')" clearable />
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
      </Row>
    </Form>

    <!--表格-->
    <AppTable ref="table" url="content/articleCheck" :columns="columns" :form="$refs.queryForm" sort="id"/>
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
            return h('AppLink', {props: {href: '/#/article/' + params.row.id}}, params.row.title)
          }
        },
        {
          title: this.$t('article.label.replyMsg'),
          key: 'replyMsg',
          sortable: true
        },
        {
          title: this.$t('article.label.createdName'),
          key: 'createdName',
          width: 120,
          sortable: true
        },
        {
          title: this.$t('article.label.applyStatus'),
          key: 'applyStatus',
          width: 140,
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
          title: this.$t('article.label.operation'),
          render: (h, params) => {
            let row = params.row
            return h('Button', {
              props: {type: 'primary', size: 'small'},
              on: {
                click: () => {
                  this.$router.push({
                    name: 'articleForm',
                    query: {id: row.id}
                  })
                }
              }}, this.$t('btn.edit'))
          }
        }
      ]
    }
  }
}
</script>
