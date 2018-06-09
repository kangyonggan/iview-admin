<template>
  <div>
    <div v-title>{{$t('route.novelDetail')}}</div>
    <div class="bg-white">
      <div style="text-align: center">
        <h1>{{novel.name}}</h1>
        <p>{{novel.author}}</p>
      </div>
      <ul>
        <li v-for="(section, index) in sections" :key="index">
          <a @click="click(section)">{{section.title}}</a>
        </li>
      </ul>
      <div style="clear: both;height: 1px"></div>
    </div>
  </div>
</template>

<script>
import {httpGet} from '@/api/common'
export default {
  data () {
    return {
      novel: {},
      sections: []
    }
  },
  methods: {
    init () {
      let novelCode = this.$route.params.novelCode
      if (novelCode) {
        httpGet('content/novel/' + novelCode + '/sections').then(data => {
          this.novel = data.novel
          this.sections = data.sections
        }).catch(respCo => {
          this.error(respCo)
        })
      }
    },
    click: function (section) {
      this.$router.push({
        name: 'section',
        params: {novelCode: section.novelCode, sectionCode: section.code}
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped lang="less">
  ul {
    list-style: none;
    margin: 20px;
    padding: 0;
    li {
      a {
        font-size: 15px;
        float: left;
        display: inline-block;
        width: 220px;
        height: 25px;
        margin-top: 15px;
        overflow: hidden;
      }
    }
  }
</style>
