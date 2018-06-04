import Vue from 'vue'
import { httpDelete, httpPut } from '@/api/common'
import router from './router'

Vue.directive('title', {
  inserted: function (el) {
    document.title = el.innerText
    el.remove()
  }
})

// 定义全局方法
Vue.prototype.status = status
Vue.prototype.delete = deleteItem
Vue.prototype.error = error
Vue.prototype.success = success

function status (h, params, url, table) {
  let that = this
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
                  that.success(data.respCo)
                  if (table) {
                    table.refresh()
                  }
                }).catch(respCo => {
                  that.error(respCo)
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
                that.success(data.respCo)
                if (table) {
                  table.refresh()
                }
              }).catch(respCo => {
                that.error(respCo)
              })
              that.$Modal.remove()
            }
          })
        }
      }
    }, that.$t('status.enable'))
  ])
}

function deleteItem (url, callback, error) {
  let that = this
  that.$Modal.confirm({
    title: that.$t('confirm.deleteTitle'),
    content: that.$t('confirm.deleteContent'),
    loading: true,
    closable: true,
    onOk: function () {
      httpDelete(url).then(data => {
        that.success(data.respCo)
        if (callback) {
          callback(data)
        }
      }).catch(respCo => {
        that.error(respCo)
        if (error) {
          error(respCo)
        }
      })
      that.$Modal.remove()
    }
  })
}

function error (respCo, notShowNotice) {
  if (!notShowNotice) {
    this.$Notice.error({
      title: this.$t('respCode.' + respCo),
      duration: 2.5
    })
  }
  if (respCo === '9998') {
    // 登录已失效
    router.push({
      path: 'login'
    })
  } else if (respCo === '9997') {
    // 权限不足
    router.push({
      path: '401'
    })
  }
}

function success (respCo) {
  this.$Notice.success({title: this.$t('respCode.' + respCo)})
}
