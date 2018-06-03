import Vue from 'vue'
import { httpPut, httpDelete } from '@/api/common'

Vue.directive('title', {
  inserted: function (el) {
    document.title = el.innerText
    el.remove()
  }
})

// 定义全局方法
Vue.prototype.status = status
Vue.prototype.delete = deleteItem

function status (that, h, params, url, table) {
  let row = params.row
  if (row.status) {
    return h('Tag', {props: {type: 'dot', color: 'red'}}, [
      h('a', {
        style: {color: '#495060'},
        on: {
          click: () => {
            if (!url) {
              return
            }
            let that = this
            that.$Modal.confirm({
              title: that.$t('confirm.recoveryTitle'),
              content: that.$t('confirm.recoveryContent'),
              loading: true,
              closable: true,
              onOk: function () {
                httpPut(url).then(data => {
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
      }, that.$t('status.disable'))
    ])
  }
  return h('Tag', {props: {type: 'dot', color: 'green'}}, [
    h('a', {
      style: {color: '#495060'},
      on: {
        click: () => {
          if (!url) {
            return
          }
          let that = this
          that.$Modal.confirm({
            title: that.$t('confirm.disableTitle'),
            content: that.$t('confirm.disableContent'),
            loading: true,
            closable: true,
            onOk: function () {
              httpPut(url).then(data => {
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
    }, that.$t('status.enable'))
  ])
}

function deleteItem (url, table) {
  let that = this
  that.$Modal.confirm({
    title: that.$t('confirm.deleteTitle'),
    content: that.$t('confirm.deleteContent'),
    loading: true,
    closable: true,
    onOk: function () {
      httpDelete(url).then(data => {
        that.$Message.success(data.respMsg)
        if (table) {
          table.jump(1)
        }
      }).catch(err => {
        that.$Message.error(err)
      })
      that.$Modal.remove()
    }
  })
}
