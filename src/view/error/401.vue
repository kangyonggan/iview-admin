<template>
  <error-content code="401" :desc="$t('msg.err401')" :src="src">
    <div v-title>401</div>
  </error-content>
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
