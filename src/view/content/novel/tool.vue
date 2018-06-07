<template>
  <div class="tool">
    <a class="left" @click="prev">上一章</a>
    <a class="center" @click="list">章节列表</a>
    <a class="right" @click="next">下一章</a>
  </div>
</template>

<script>
import {httpGet} from '@/api/common'
export default {
  props: {
    section: {
      required: true,
      type: Object
    }
  },
  methods: {
    prev: function () {
      this.load('content/novel/' + this.section.novelCode + '/section/' + this.section.code + '/prev')
    },
    list: function () {
      this.$emit('refresh')
    },
    next: function () {
      this.load('content/novel/' + this.section.novelCode + '/section/' + this.section.code + '/next')
    },
    load: function (url) {
      httpGet(url).then(data => {
        this.$emit('refresh', data.section)
      }).catch(respCo => {
        this.error(respCo)
      })
    }
  }
}
</script>

<style scoped lang="less">
  .tool {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    height: 50px;
    line-height: 50px;
    background: #f9f9f9;
    a {
      display: inline-block;
      width: 160px;
      color: #555;
      font-size: 16px;
    }
    a:hover {
      text-decoration: underline;
    }
    .left {
      float: left;
    }
    .right {
      float: right;
    }
    .center {
      margin: 0 auto;
    }
  }
</style>
