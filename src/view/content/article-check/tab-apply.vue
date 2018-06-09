<template>
  <div>
    <!--搜索表单-->
    <Form ref="queryForm" :model="article" class="bg-white" inline>
      <FormItem prop="title">
        <Input v-model="article.title" :placeholder="$t('article.placeholder.title')" clearable />
      </FormItem>
      <FormItem prop="createdName">
        <Input v-model="article.createdName" :placeholder="$t('article.placeholder.createdName')" clearable />
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
        <Button type="error" icon="close" @click="check('REJECT')">{{$t('article.btn.reject')}}</Button>
        <Button type="success" icon="checkmark" @click="check('COMPLETE')">{{$t('article.btn.complete')}}</Button>
      </Row>
    </Form>

    <!--表格-->
    <AppTable ref="table" url="content/articleCheck" :columns="columns" :form="$refs.queryForm" sort="updatedTime"/>
  </div>
</template>

<script>
import { httpPut } from '@/api/common'
export default {
  data () {
    return {
      /**
       * 搜索表单的参数
       */
      article: {
        applyStatus: 'APPLY'
      },
      /**
       * 审批信息
       */
      replyMsg: '',
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
          title: this.$t('article.label.createdName'),
          key: 'createdName',
          width: 120,
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
        }
      ]
    }
  },
  methods: {
    check: function (type) {
      let ids = this.$refs.table.getSelectionFieldsWithCondition('id', 'applyStatus', 'APPLY')
      if (ids.length === 0) {
        this.$Message.warning(this.$t('article.msg.check'))
        return
      }
      this.replyMsg = ''
      this.$Modal.confirm({
        title: this.$t('article.label.replyMsg'),
        loading: true,
        render: (h) => {
          return h('Input', {
            props: {
              type: 'textarea',
              autofocus: true,
              placeholder: this.$t('article.placeholder.check')
            },
            style: {marginTop: '10px'},
            on: {
              input: (val) => {
                this.replyMsg = val
              }
            }
          })
        },
        onOk: () => {
          let params = '?type=' + type + '&ids=' + ids.join(',') + '&replyMsg=' + this.replyMsg
          httpPut('content/articleCheck' + params).then(data => {
            this.success(data.respCo)
            this.$refs.table.refresh()
            this.$Modal.remove()
          }).catch(respCo => {
            this.error(respCo)
            this.$Modal.remove()
          })
        }
      })
    }
  }
}
</script>
