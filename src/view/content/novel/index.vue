<template>
  <div>
    <div v-title>{{$t('route.novel')}}</div>
    <!--搜索表单-->
    <Form ref="queryForm" :model="novel" class="bg-white" inline>
      <FormItem prop="code">
        <Input v-model="novel.code" :placeholder="$t('novel.placeholder.code')" clearable />
      </FormItem>
      <FormItem prop="name">
        <Input v-model="novel.name" :placeholder="$t('novel.placeholder.name')" clearable />
      </FormItem>
      <FormItem prop="author">
        <Input v-model="novel.author" :placeholder="$t('novel.placeholder.author')" clearable />
      </FormItem>
      <FormItem prop="categoryCode">
        <AppSelectCategory :model="novel" prop="categoryCode" :placeholder="$t('novel.placeholder.categoryName')" type="NOVEL"/>
      </FormItem>
      <Row>
        <Button type="info" icon="ios-search" @click="$refs.table.refresh()">{{$t('btn.query')}}</Button>
        <Button type="warning" icon="ios-refresh-empty" @click="$refs.queryForm.resetFields()">{{$t('btn.clear')}}</Button>
      </Row>
    </Form>

    <!--表格-->
    <AppTable ref="table" url="content/novel" :columns="columns" :form="$refs.queryForm" sort="id"/>
  </div>
</template>

<script>
import {httpPut} from '@/api/common'
export default {
  data () {
    return {
      /**
       * 搜索表单的参数
       */
      novel: {},
      /**
       * 表格的列
       */
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: this.$t('novel.label.code'),
          key: 'code',
          sortable: true
        },
        {
          title: this.$t('novel.label.name'),
          key: 'name',
          sortable: true
        },
        {
          title: this.$t('novel.label.author'),
          key: 'author',
          sortable: true
        },
        {
          title: this.$t('novel.label.categoryName'),
          key: 'categoryName',
          sortable: true
        },
        {
          title: this.$t('novel.label.status'),
          key: 'status',
          sortable: true,
          render: (h, params) => {
            return this.status(h, params,
              'content/novel/' + params.row.id + '/status/' + 1 * !params.row.status,
              this.$refs.table)
          }
        },
        {
          title: this.$t('novel.label.createdTime'),
          key: 'createdTime',
          sortable: true
        },
        {
          title: this.$t('novel.label.operation'),
          render: (h, params) => {
            let row = params.row
            return h('AppDropDown', {
              props: {text: this.$t('btn.detail')},
              on: {
                click: () => {
                  this.$router.push({
                    name: 'novelDetail',
                    params: {novelCode: row.code}
                  })
                },
                select: (name) => {
                  if (name === 'pull') {
                    httpPut('content/novel/' + row.code + '/pull').then(data => {
                      this.success(data.respCo)
                    }).catch(respCo => {
                      this.error(respCo)
                    })
                  }
                }
              }}, [
              h('DropdownItem', {props: {name: 'pull'}}, this.$t('novel.btn.pull'))
            ])
          }
        }
      ]
    }
  }
}
</script>
