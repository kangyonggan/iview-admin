<template>
  <!--设置菜单-->
  <Modal v-model="showModel" :title="$t('role.btn.setMenu')" :mask-closable="false" :closable="false">
    <div style="max-width: 600px;min-width: 300px;margin: 0 auto">
      <Tree ref="tree" :render="renderContent" :data="data" showCheckbox multiple/>
    </div>

    <template slot="footer">
      <Button icon="close" @click="cancel">{{$t('btn.cancel')}}</Button>
      <Button type="success" icon="checkmark" :loading="isLoading" @click="submit">{{$t('btn.submit')}}</Button>
    </template>
  </Modal>
</template>

<script>
import { httpGet, httpPut } from '@/api/common'
export default {
  data () {
    return {
      isLoading: false,
      showModel: false,
      data: [],
      roleCode: '',
      roleCodes: []
    }
  },
  methods: {
    hide: function () {
      this.stop()
      this.showModel = false
    },
    loading: function () {
      this.isLoading = true
    },
    stop: function () {
      this.isLoading = false
    },
    submit: function () {
      this.loading()
      let selected = this.getSelectedMenuCodes()
      httpPut('system/role/' + this.roleCode + '/menu?menuCodes=' + selected).then(data => {
        this.success(data.respCo)
        this.hide()
      }).catch(respCo => {
        this.stop()
        this.error(respCo)
      })
    },
    renderContent (h, { root, node, data }) {
      return h('span', {
        style: {
          display: 'inline-block',
          width: '100%'
        }
      }, [
        h('span', [
          h('Icon', {
            props: {
              type: data.icon
            },
            style: {
              marginRight: '8px'
            }
          }),
          h('span', data.title)
        ]),
        h('span', {
          style: {
            display: 'inline-block',
            float: 'right',
            marginRight: '32px'
          }
        }, [])
      ])
    },
    cancel: function () {
      this.hide()
    },
    getTitle: function (code) {
      return this.$t('route.' + code)
    },
    show: function (roleCode) {
      this.roleCode = roleCode

      this.stop()
      this.showModel = true

      httpGet('system/role/' + roleCode + '/menu').then(data => {
        this.roleCodes = data.codes
        httpGet('system/menu').then(data => {
          let menus = []
          for (let i in data.menus) {
            menus.push(this.loadMenu(data.menus[i]))
          }

          this.data = [{
            title: this.getTitle('all'),
            code: '',
            expand: true,
            children: menus,
            render: (h, { root, node, data }) => {
              return h('span', {
                style: {
                  display: 'inline-block',
                  width: '100%'
                }
              }, [
                h('span', [
                  h('Icon', {
                    props: {
                      type: 'grid'
                    },
                    style: {
                      marginRight: '8px'
                    }
                  }),
                  h('span', data.title)
                ]),
                h('span', {
                  style: {
                    display: 'inline-block',
                    float: 'right',
                    marginRight: '32px'
                  }
                }, [])
              ])
            }
          }]
        }).catch(respCo => {
          this.error(respCo)
        })
      }).catch(respCo => {
        this.error(respCo)
      })
    },
    loadMenu: function (item) {
      let checked = this.isChecked(item)
      let menu = {
        title: this.getTitle(item.code),
        code: item.code,
        icon: item.icon,
        checked: checked,
        expand: true,
        children: []
      }
      let children = []
      if (item.leaf && item.leaf.length) {
        for (let i in item.leaf) {
          children.push(this.loadMenu(item.leaf[i]))
        }
      }
      menu.children = children

      return menu
    },
    isChecked: function (item) {
      if (!this.roleCodes || !this.roleCodes.length) {
        return false
      }
      for (let i in this.roleCodes) {
        if (this.roleCodes[i] === item.code) {
          return true
        }
      }
      return false
    },
    getSelectedMenuCodes: function () {
      let selected = this.$refs.tree.getCheckedNodes()
      let res = []

      for (let i in selected) {
        if (selected[i].code) {
          res.push(selected[i].code)
        }
      }

      return res.join(',')
    }
  }
}
</script>
