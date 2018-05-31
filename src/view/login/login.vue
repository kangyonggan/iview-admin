<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login" @keydown.enter="handleLogin">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">体验账号：guest/123456</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import loginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    loginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit (user) {
      this.handleLogin(user).then(res => {
        this.getUserInfo().then(res => {
          this.$router.push({
            name: 'home'
          })
        })
      })
    }
  }
}
</script>

<style>

</style>
