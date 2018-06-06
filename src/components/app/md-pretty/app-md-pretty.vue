<template>
  <div :id="randomId" class="markdown" v-html="contentHtml"></div>
</template>

<script>
import './prettify.min.css'
import './prettify.min.js'

export default {
  props: {
    content: {
      required: false,
      type: String,
      default: ''
    }
  },
  mounted: function () {
    this.contentHtml = this.content
    this.init()
  },
  data () {
    return {
      contentHtml: '',
      randomId: Math.random().toString(16).substring(2)
    }
  },
  methods: {
    load: function (content) {
      this.contentHtml = content
      this.init()
    },
    init: function () {
      this.$nextTick(function () {
        let markdown = document.getElementById(this.randomId)
        let links = markdown.getElementsByTagName('a')
        for (let i = 0; i < links.length; i++) {
          links[i].target = '_blank'
        }
        let pres = markdown.getElementsByTagName('pre')
        for (let i = 0; i < pres.length; i++) {
          pres[i].className = 'prettyprint'
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .markdown {
    margin: 20px 35px;
  }

  p {
    color: #555;
    line-height: 2;
    font-size: 16px;
  }

  img {
    max-width: 100%;
  }
</style>
