<template>
  <div>
    <div v-title>{{$t('route.articleForm')}}</div>
    文章form
  </div>
</template>

<script>
export default {
  name: 'articleForm',
  methods: {
    init () {
      let id = this.$route.query.id
      console.log(id)
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
