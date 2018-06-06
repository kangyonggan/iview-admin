<template>
  <div class="bg-white">
    <div v-title>{{$t('route.articleForm')}}</div>
    <AppForm :model="article" :rules="rules" :method="article.id ? 'put' : 'post'" action="person/article" @success="success">
      <FormItem prop="title" :label="$t('article.label.title')">
        <Input v-model="article.title" :placeholder="$t('article.placeholder.title')"/>
      </FormItem>
      <FormItem prop="content" :label="$t('article.label.content')" style="margin-top: 30px;">
        <AppMarkdown ref="markdown" :model="article" prop="content" :placeholder="$t('article.placeholder.content')"/>
      </FormItem>
    </AppForm>
  </div>
</template>

<script>
import {httpGet} from '@/api/common'
export default {
  name: 'articleForm',
  data () {
    return {
      article: {},
      rules: {
        title: [
          {required: true, message: this.$t('article.valid.title.required'), trigger: 'blur'},
          {min: 1, message: this.$t('article.valid.title.min', 1), trigger: 'blur'},
          {max: 128, message: this.$t('article.valid.title.max', 32), trigger: 'blur'}
        ],
        content: [
          {required: true, message: this.$t('article.valid.content.required'), trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    init () {
      let id = this.$route.query.id
      if (id) {
        httpGet('person/article/' + id).then(data => {
          this.article = {
            id: data.article.id,
            title: data.article.title,
            content: data.article.content
          }
          this.$refs.markdown.value(this.article.content)
        }).catch(respCo => {
          this.error(respCo)
        })
      }
    },
    success: function () {
      this.$router.push({
        name: 'article'
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
