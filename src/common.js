import Vue from 'vue'

// 定义全局方法
Vue.prototype.yesNo = yesNo

/**
 * 1/0格式化为是/否
 *
 * @param h
 * @param params
 */
function yesNo (h, params) {
  return h('div', [
    h('span', params.row.isDeleted === 1 ? '是' : '否')
  ])
}
