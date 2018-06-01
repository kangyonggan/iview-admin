import Vue from 'vue'
import { httpGet } from '@/api/common'

// 定义全局方法
Vue.prototype.status = status

function status (h, row, url, table) {
  if (row.status) {
    return h('Tag', {props: {type: 'dot', color: 'red'}}, [
      h('a', {
        style: {color: '#495060'},
        on: {
          click: () => {
            let that = this
            that.$Modal.confirm({
              title: '恢复确认',
              content: '确认恢复所选记录吗？',
              loading: true,
              closable: true,
              onOk: function () {
                httpGet(url + '/' + row.id + '/status/0').then(data => {
                  that.$Message.success(data.respMsg)
                  if (table) {
                    table.refresh()
                  }
                }).catch(err => {
                  that.$Message.error(err)
                })
                that.$Modal.remove()
              }
            })
          }
        }
      }, '禁用')
    ])
  }
  return h('Tag', {props: {type: 'dot', color: 'green'}}, [
    h('a', {
      style: {color: '#495060'},
      on: {
        click: () => {
          let that = this
          that.$Modal.confirm({
            title: '删除确认',
            content: '确认删除所选记录吗？',
            loading: true,
            closable: true,
            onOk: function () {
              httpGet(url + '/' + row.id + '/status/1').then(data => {
                that.$Message.success(data.respMsg)
                if (table) {
                  table.refresh()
                }
              }).catch(err => {
                that.$Message.error(err)
              })
              that.$Modal.remove()
            }
          })
        }
      }
    }, '可用')
  ])
}
