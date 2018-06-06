<style lang="less">
    @import './403.less';
</style>

<template>
    <div class="error403">
        <div class="error403-body-con">
            <Card>
                <div class="error403-body-con-title">4<span class="error403-0-span"><Icon type="android-lock"></Icon></span><span class="error403-key-span"><Icon size="220" type="ios-bolt"></Icon></span></div>
                <p class="error403-body-con-message">{{$t('app.403')}}</p>
                <div class="error403-btn-con">
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
  name: 'Error403'
}
</script>
