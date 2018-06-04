<template>
  <div class="bg-white" >
    <div v-title>{{$t('route.role')}}</div>
    <div style="max-width: 600px;min-width: 300px;margin: 0 auto">
      <Tree :data="data" :render="renderContent" :loadData="loadData"></Tree>
    </div>

    <!--新增/编辑菜单的界面-->
    <FormModal ref="formModal" @success="formSuccess"/>
  </div>
</template>
<script>
import FormModal from './form-modal.vue'
import { httpGet } from '@/api/common'
export default {
  components: {FormModal},
  data () {
    return {
      root: {},
      data: [
        {
          title: this.getTitle('all'),
          code: '',
          loading: false,
          children: [],
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
              }, [
                h('Button', {
                  props: Object.assign({}, this.buttonProps, {
                    icon: 'ios-plus-empty',
                    type: 'primary'
                  }),
                  style: {
                    width: '52px'
                  },
                  on: {
                    click: () => { this.form(root, node) }
                  }
                })
              ])
            ])
          }
        }
      ],
      buttonProps: {
        type: 'ghost',
        size: 'small'
      }
    }
  },
  methods: {
    getTitle: function (code) {
      return this.$t('route.' + code)
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
        }, [
          h('Button', {
            props: Object.assign({}, this.buttonProps, {
              icon: 'ios-plus-empty'
            }),
            style: {
              marginRight: '8px'
            },
            on: {
              click: () => { this.form(root, node) }
            }
          }),
          h('Button', {
            props: Object.assign({}, this.buttonProps, {
              icon: 'ios-minus-empty'
            }),
            on: {
              click: () => { this.remove(node, data) }
            }
          })
        ])
      ])
    },
    form (root, node) {
      this.root = root[0].node
      this.$refs.formModal.show({pcode: node.node.code})
    },
    formSuccess: function () {
      httpGet('system/menu').then(data => {
        let menus = []
        for (let i in data.menus) {
          menus.push(this.loadMenu(data.menus[i]))
        }
        this.$set(this.root, 'children', menus)
      }).catch(respCo => {
        this.error(respCo)
      })
    },
    remove (root, node, data) {
      const parentKey = root.find(el => el === node).parent
      const parent = root.find(el => el.nodeKey === parentKey).node
      const index = parent.children.indexOf(data)
      parent.children.splice(index, 1)
    },
    loadData (item, callback) {
      httpGet('system/menu').then(data => {
        let menus = []
        for (let i in data.menus) {
          menus.push(this.loadMenu(data.menus[i]))
        }
        callback(menus)
      }).catch(respCo => {
        this.error(respCo)
      })
    },
    loadMenu: function (item) {
      let menu = {
        title: this.getTitle(item.code),
        code: item.code,
        icon: item.icon,
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
    }
  }
}
</script>
