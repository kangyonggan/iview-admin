<template>
  <div>
    <div v-title>{{$t('route.section')}}</div>
    <div class="bg-white">
      <div style="text-align: center">
        <h1>{{section.title}}</h1>
      </div>

      <Tool :section="section" @refresh="refresh"/>

      <div v-html="section.content" style="font-size: 16px;"></div>

      <Tool :section="section" @refresh="refresh"/>
    </div>
  </div>
</template>

<script>
import {httpGet} from '@/api/common'
import Tool from './tool.vue'
export default {
  components: {Tool},
  data () {
    return {
      section: {}
    }
  },
  methods: {
    init () {
      let novelCode = this.$route.params.novelCode
      let sectionCode = this.$route.params.sectionCode
      if (novelCode && sectionCode) {
        httpGet('content/novel/' + novelCode + '/section/' + sectionCode).then(data => {
          this.section = data.section
        }).catch(respCo => {
          this.error(respCo)
        })
      }
    },
    refresh (section) {
      if (section) {
        this.section = section
      } else {
        this.$router.push({
          name: 'novelDetail',
          params: {novelCode: this.section.novelCode}
        })
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style scoped lang="less">
</style>
