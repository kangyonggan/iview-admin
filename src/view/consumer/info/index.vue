<template>
  <div>
    <div v-title>{{$t('route.info')}}</div>
    <Form ref="form" :model="user" label-position="top" class="bg-white" :rules="rules">
      <Tabs type="card">
        <TabPane label="基本信息">
          <div class="content">
            <FormItem prop="username" :label="$t('user.label.username')">
              <Input v-model="user.username" :readonly="true" :placeholder="$t('user.placeholder.username')"/>
            </FormItem>
            <FormItem prop="name" :label="$t('user.label.name')">
              <Input v-model="user.name" :placeholder="$t('user.placeholder.name')" clearable/>
            </FormItem>
          </div>
        </TabPane>
        <TabPane label="头像上传">
          <div class="content">
            头像上传
          </div>
        </TabPane>
        <TabPane label="修改密码">
          <div class="content">
            <FormItem prop="password" :label="$t('user.label.newPassword')">
              <Input :type="showPwd ? 'text' : 'password'" v-model="user.password" :placeholder="$t('user.placeholder.password')">
                <span slot="append">
                  <Icon :type="showPwd ? 'eye-disabled' : 'eye'" class="showPwd" @click="seePassword"></Icon>
                </span>
              </Input>
            </FormItem>
          </div>
        </TabPane>
      </Tabs>

      <div class="content">
        <Button type="success" icon="checkmark" :loading="isLoading" @click="handleSubmit($event, $refs.form)">{{$t('btn.submit')}}</Button>
      </div>
    </Form>
  </div>
</template>

<script>
import { httpPut } from '@/api/common'
export default {
  data () {
    return {
      showPwd: false,
      isLoading: false,
      user: {},
      /**
       * 表单的校验
       */
      rules: {
        name: [
          {required: true, message: this.$t('user.valid.name.required'), trigger: 'blur'},
          {min: 1, message: this.$t('user.valid.name.min', 1), trigger: 'blur'},
          {max: 32, message: this.$t('user.valid.name.max', 32), trigger: 'blur'}
        ],
        password: [
          {required: true, message: this.$t('user.valid.password.required'), trigger: 'blur'},
          {min: 6, message: this.$t('user.valid.password.min', 6), trigger: 'blur'},
          {max: 32, message: this.$t('user.valid.password.max', 32), trigger: 'blur'},
          {pattern: /^[a-zA-Z][a-zA-Z0-9]*$/, message: this.$t('user.valid.password.pattern'), trigger: 'blur'}
        ]
      }
    }
  },
  mounted: function () {
    let user = this.$store.state.user.user
    this.$refs.form.resetFields()
    this.user = {
      id: user.id,
      username: user.username,
      name: user.name,
      password: ''
    }
  },
  methods: {
    seePassword: function () {
      this.showPwd = !this.showPwd
    },
    handleSubmit: function (e, form) {
      form.validate((valid) => {
        if (valid) {
          this.isLoading = true
          httpPut('consumer/info', this.user).then(data => {
            this.success(data.respCo)
            this.$store.state.user.user = data.user
            this.isLoading = false
          }).catch(respCo => {
            this.isLoading = false
            this.error(respCo)
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  .content {
    max-width: 600px;
    margin: 20px auto;
  }
  .showPwd {
    cursor: pointer;
  }
</style>
