<template>
  <div class="login" @keydown.enter="submit">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <Form ref="loginForm" :model="user" :rules="rules">
            <FormItem prop="username">
              <Input v-model="user.username" placeholder="请输入用户名">
                <span slot="prepend">
                  <Icon :size="16" type="person"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="user.password" placeholder="请输入密码">
                <span slot="prepend">
                  <Icon :size="14" type="locked"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem>
              <Button @click="submit" :loading="loading" type="primary" long>登录</Button>
            </FormItem>
          </Form>
          <p class="login-tip">体验账号：guest/123456</p>
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
          {required: true, message: '用户名为必填项', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码为必填项', trigger: 'blur'}
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
