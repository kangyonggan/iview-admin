<template>
  <Select v-model="model[prop]" style="min-width: 164px;" :placeholder="placeholder" clearable >
    <Option v-for="(item, index) in list" :key="index" :value="item.code" >
      <span>{{item.name}}</span>
      <span style="float:right;color:#ccc">{{item.code}}</span>
    </Option>
    <slot></slot>
  </Select>
</template>

<script>
import {httpGet} from '@/api/common'
export default {
  props: {
    type: {
      required: true,
      type: String
    },
    model: {
      required: true,
      type: Object
    },
    prop: {
      required: true,
      type: String
    },
    placeholder: {
      type: String
    }
  },
  data () {
    return {
      list: []
    }
  },
  mounted: function () {
    httpGet('category?type=' + this.type).then(data => {
      this.list = data.list
    })
  }
}
</script>
