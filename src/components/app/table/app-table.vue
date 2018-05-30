<template>
  <div style="margin-top: 10px;">
    <!--表格-->
    <Table :loading="loading" border :columns="columns" :data="pageInfo.list" @on-selection-change="selectionChange"
           @on-sort-change="sortChange"/>

    <!--分页-->
    <Page v-if="pagination" :total="pageInfo.total" show-total show-sizer show-elevator :style="{marginTop: '20px'}"
          @on-change="jump"
          @on-page-size-change="changePageSize"></Page>
  </div>
</template>

<script>
import { httpGet } from '@/api/common'
export default {
  props: {
    url: {
      required: true,
      type: String
    },
    columns: {
      required: true,
      type: Array
    },
    form: {
      type: Object
    },
    pagination: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      /**
       * 分页信息
       */
      pageInfo: {},
      /**
       * 表格加载中
       */
      loading: false,
      /**
       * 已选择的行
       */
      selection: []
    }
  },
  mounted: function () {
    if (!this.pagination) {
      this.refresh()
    }
  },
  methods: {
    /**
     * 选中行发生变化时调用
     *
     * @param selection 已选项数据
     */
    selectionChange: function (selection) {
      this.selection = selection
    },
    /**
     * 刷新
     */
    refresh: function () {
      httpGet(this.url + this.getFormParams()).then(res => {
        if (res) {
          this.pageInfo = res.data.pageInfo
        } else {
          this.$Message.error('服务器内部错误，请联系管理员！')
        }
      }).catch(() => {
        this.$Message.error('网络错误，请稍后再试！')
      })
    },
    /**
     * 获取查询表单的参数
     */
    getFormParams: function () {
      let params = ''
      if (this.form) {
        let model = this.form.model
        for (let key in model) {
          if (model[key]) {
            if (params === '') {
              params += '?'
            } else {
              params += '&'
            }
            params += key + '='
            params += model[key]
          }
        }
      }

      return params
    },
    /**
     * 修改分页大小
     */
    changePageSize: function (pageSize) {
      let form = this.form
      if (form && form.model) {
        form.model.pageSize = pageSize
        form.model.pageNum = 1
      }

      this.refresh()
    },
    /**
     * 跳转
     */
    jump: function (pageNum) {
      let form = this.form
      if (form && form.model) {
        form.model.pageNum = pageNum
      }

      this.refresh()
    },
    /**
     * 排序
     */
    sortChange: function (e) {
      let form = this.form
      if (form) {
        let model = form.model
        if (model) {
          if (e.order !== 'normal') {
            model.sort = e.key
            model.order = e.order
          } else {
            model.sort = null
            model.order = null
          }
        }
        this.refresh()
      }
    },
    /**
     * 判断是否有选中的行
     *
     * @returns {boolean}
     */
    hasSelection: function () {
      return this.selection.length > 0
    },
    /**
     * 获取选中的行
     *
     * @returns {*|Array}
     */
    getSelection: function () {
      return this.selection
    },
    /**
     * 获取选中的行（指定字段）
     *
     * @param field
     * @returns {Array}
     */
    getSelectionFields: function (field) {
      let arr = []
      for (let i = 0; i < this.selection.length; i++) {
        arr.push(this.selection[i][field])
      }

      return arr
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
