<template>
  <error-content code="401" desc="Oh~~您的权限貌似有点点不足~" :src="src"/>
</template>

<script>
import error401 from '@/assets/images/error/401.svg'
import errorContent from './error-content.vue'
export default {
  name: 'error-401',
  components: {
    errorContent
  },
  data () {
    return {
      src: error401
    }
  }
}
</script>
