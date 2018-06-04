<template>
  <Tree ref="tree" :render="renderContent" :data="data" :showCheckbox="showCheckbox"/>
</template>

<script>
import { httpGet } from '@/api/common'
export default {
  props: {
    title: {
      required: true,
      type: String
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    getTitle: {
      type: Function
    },
    codeName: {
      type: String,
      default: 'code'
    },
    titleName: {
      type: String,
      default: 'title'
    },
    iconName: {
      type: String,
      default: 'icon'
    },
    childrenName: {
      type: String,
      default: 'children'
    },
    selectedCodesName: {
      type: String,
      default: 'selectedCodes'
    },
    itemsName: {
      type: String,
      default: 'items'
    }
  },
  data () {
    return {
      data: []
    }
  },
  methods: {
    refresh: function (treeUrl, selectedUrl) {
      if (selectedUrl) {
        httpGet(selectedUrl).then(data => {
          this.init(treeUrl, data[this.selectedCodesName])
        }).catch(respCo => {
          this.error(respCo)
        })
      } else {
        this.init(treeUrl, [])
      }
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
              type: data[this.iconName]
            },
            style: {
              marginRight: '8px'
            }
          }),
          h('span', data[this.titleName])
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
    init: function (treeUrl, selectedCodes) {
      httpGet(treeUrl).then(data => {
        let items = []
        for (let i in data[this.itemsName]) {
          items.push(this.loadItem(data[this.itemsName][i], selectedCodes))
        }

        this.data = [{
          title: this.title,
          code: '',
          expand: true,
          children: items,
          render: (h, { root, node, data }) => {
            let result = h('span', {
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

            return result
          }
        }]
      }).catch(respCo => {
        this.error(respCo)
      })
    },
    loadItem: function (item, selectedCodes) {
      let checked = this.isChecked(item, selectedCodes)
      let title = item[this.titleName]
      if (this.getTitle) {
        title = this.getTitle(item[this.codeName])
      }
      let menu = {
        title: title,
        code: item[this.codeName],
        icon: item[this.iconName],
        checked: checked,
        expand: true,
        children: []
      }
      let children = []
      if (item[this.childrenName] && item[this.childrenName].length) {
        for (let i in item[this.childrenName]) {
          children.push(this.loadItem(item[this.childrenName][i], selectedCodes))
        }
      }
      menu.children = children
      return menu
    },
    isChecked: function (item, selectedCodes) {
      for (let i in selectedCodes) {
        if (selectedCodes[i] === item[this.codeName]) {
          return true
        }
      }
      return false
    },
    getSelectedCodes: function () {
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
