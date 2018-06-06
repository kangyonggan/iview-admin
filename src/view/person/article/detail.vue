<template>
  <div>
    文章详情
  </div>
</template>

<script>
export default {
  name: 'articleDetail',
  methods: {
    init () {
      let id = this.$route.params.id
      this.$Message.success(id)
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
