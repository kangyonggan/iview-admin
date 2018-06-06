<template>
  <div>
    <div v-title>{{$t('route.articleDetail')}}</div>
    <div class="bg-white">
      <h1 style="text-align: center">{{article.title}}</h1>
      <div id="markdown" class="markdown" v-html="article.content"></div>
    </div>
  </div>
</template>

<script>
import {httpGet} from '@/api/common'
export default {
  name: 'articleDetail',
  data () {
    return {
      article: {}
    }
  },
  methods: {
    init () {
      let id = this.$route.params.id
      if (id) {
        httpGet('person/article/' + id).then(data => {
          this.article = data.article
          this.pretty()
        }).catch(respCo => {
          this.error(respCo)
        })
      }
    },
    pretty: function () {
      this.$nextTick(function () {
        let markdown = document.getElementById('markdown')
        let links = markdown.getElementsByTagName('a')
        for (let i = 0; i < links.length; i++) {
          links[i].target = '_blank'
        }
        let pres = markdown.getElementsByTagName('pre')
        for (let i = 0; i < pres.length; i++) {
          pres[i].className = 'prettyprint linenums'
        }
      })
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    '$route' () {
      this.init()
    }
  }
}
</script>
