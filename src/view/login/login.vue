<template>
  <div class="login" @keydown.enter="submit">
    <div class="login-con">
      <Card icon="log-in" :title="$t('loginPage.title')" :bordered="false">
        <div class="form-con">
          <Form ref="loginForm" :model="user" :rules="rules">
            <FormItem prop="username">
              <Input v-model="user.username" :placeholder="$t('placeholder.username')">
                <span slot="prepend">
                  <Icon :size="16" type="person"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="user.password" :placeholder="$t('placeholder.password')">
                <span slot="prepend">
                  <Icon :size="14" type="locked"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem>
              <Button @click="submit" :loading="loading" type="primary" long>{{ $t('loginPage.submit') }}</Button>
            </FormItem>
          </Form>
          <p class="login-tip">{{ $t('loginPage.experience') }}：guest/123456</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      user: {},
      loading: false,
      rules: {
        username: [
          {required: true, message: this.$t('valid.usernameRequired'), trigger: 'blur'},
          {min: 5, message: this.$t('valid.usernameMin', 5), trigger: 'blur'},
          {max: 32, message: this.$t('valid.usernameMax', 32), trigger: 'blur'}
        ],
        password: [
          {required: true, message: this.$t('valid.passwordRequired'), trigger: 'blur'},
          {min: 6, message: this.$t('valid.passwordMin', 6), trigger: 'blur'},
          {max: 32, message: this.$t('valid.passwordMax', 32), trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    ...mapActions([
      'login',
      'getUserInfo'
    ]),
    submit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          this.login(this.user, this.loading).then(res => {
            if (res) {
              this.getUserInfo().then(res => {
                if (res) {
                  window.location.reload()
                } else {
                  this.loading = false
                }
              })
            } else {
              this.loading = false
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .login{
    width: 100%;
    height: 100%;
    background-image: url('../../assets/login_bg.jpg');
    background-size: cover;
    background-position: center;
    position: relative;
    &-con{
      position: absolute;
      right: 160px;
      top: 50%;
      transform: translateY(-60%);
      width: 300px;
      &-header{
        font-size: 16px;
        font-weight: 300;
        text-align: center;
        padding: 30px 0;
      }
      .form-con{
        padding: 10px 0 0;
      }
      .login-tip{
        font-size: 10px;
        text-align: center;
        color: #c3c3c3;
      }
    }
  }
</style>
