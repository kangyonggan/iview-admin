<template>
  <div style="text-align: center;" class="bg-white">
    <div v-title>{{$t('route.home')}}</div>
    <p>为了防止不法分子在游览本站时破坏站长的博文，所以呢，对于博客的修改和物理删除功能，把权限设置到了特定的用户（admin），客官也是可以看到物理删除按钮的，不过再最后提交时会被服务端拦截！</p>
    <p>既然只有admin才能删除博文，那客官肯定又出新花样的，那就去修改admin的密码，不好意思，修改密码我也把权限交给的admin。</p>
    <p>客官想了又想，那我先把admin删除，在新增admin的时候可以指定密码。不好意思，删除用户的功能我也给了admin。</p>
    <p>我给你这么大的权限，不是让你来搞破坏的，而是让你可以尽情的游览的，去好好看看吧。</p>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style scoped>
p {
  margin-top: 20px;
}
</style>
