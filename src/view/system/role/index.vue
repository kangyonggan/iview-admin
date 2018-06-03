<template>
  <div>
    <div v-title>{{$t('route.role')}}</div>
    角色管理
    <DatePicker v-model="date" placeholder="测试i18n"/>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      date: ''
    }
  }
}
</script>

<style>

</style>
