<template>
  <div>
    <div v-title>{{$t('route.articleDetail')}}</div>
    <div class="bg-white">
      <h1 style="text-align: center">{{article.title}}</h1>
      <AppMdPretty ref="mdp"/>
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
          this.$refs.mdp.load(this.article.content)
        }).catch(respCo => {
          this.error(respCo)
        })
      }
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
