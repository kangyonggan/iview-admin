<template>
  <div>
    <div v-title>{{$t('route.articleCheck')}}</div>
    <Tabs type="card">
      <TabPane :label="$t('article.tag.apply')">
        <TabApply/>
      </TabPane>
      <TabPane :label="$t('article.tag.all')">
        <TabAll/>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
import TabApply from './tab-apply.vue'
import TabAll from './tab-all.vue'
export default {
  components: {TabApply, TabAll}
}
</script>
