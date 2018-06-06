<template>
  <div>
    <Button @click="backHome" size="large" style="width: 200px;" type="text">{{$t('btn.backHome')}}</Button>
    <Button @click="backPrev" size="large" style="width: 200px;margin-left: 40px;" type="primary">{{$t('btn.backPrev')}}({{ second }}s)</Button>
  </div>
</template>

<script>
import './error.less'
export default {
  name: 'backBtnGroup',
  data () {
    return {
      second: 5,
      timer: null
    }
  },
  methods: {
    backHome () {
      this.$router.replace({
        name: 'home'
      })
    },
    backPrev () {
      this.$router.go(-1)
    }
  },
  mounted () {
    this.timer = setInterval(() => {
      if (this.second === 0) {
        this.backPrev()
      } else {
        this.second--
      }
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>
