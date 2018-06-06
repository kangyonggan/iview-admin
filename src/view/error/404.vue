<style lang="less">
    @import './404.less';
</style>

<template>
    <div class="error404">
        <div class="error404-body-con">
            <Card>
                <div class="error404-body-con-title">4<span><Icon type="ios-navigate-outline"></Icon></span>4</div>
                <p class="error404-body-con-message">{{$t('app.404')}}</p>
                <div class="error404-btn-con">
                  <back-btn-group/>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import BackBtnGroup from './back-btn-group.vue'

export default {
  components: {BackBtnGroup},
  name: 'Error404'
}
</script>
