<template>
  <div>
    文章详情
  </div>
</template>

<script>
export default {
  methods: {
    init () {
      console.log('init')
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
