<template>
  <div>
    <div v-title>{{$t('route.info')}}</div>
    <Form ref="form" :model="user" label-position="top" class="bg-white" :rules="rules">
      <Tabs type="card">
        <TabPane :label="$t('info.tag.avatar')">
          <div class="content">
            <div style="text-align: center;">
              <img :src="user.avatar" class="avatar" @click="showBigAvatar = !showBigAvatar"/>

              <Modal v-model="showBigAvatar" footerHide>
                <img :src="user.avatar" @click="showBigAvatar = !showBigAvatar" v-if="showBigAvatar" style="width: 100%">
              </Modal>
            </div>
            <Upload
              :format="['jpg','jpeg','png']"
              :max-size="2048"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload"
              type="drag"
              :action="baseURL + 'consumer/info/avatar'"
              style="margin: 20px;">
              <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>{{$t('info.tip')}}</p>
              </div>
            </Upload>
          </div>
        </TabPane>
        <TabPane :label="$t('info.tag.basic')">
          <div class="content">
            <FormItem prop="username" :label="$t('user.label.username')">
              <Input v-model="user.username" :readonly="true" :placeholder="$t('user.placeholder.username')"/>
            </FormItem>
            <FormItem prop="name" :label="$t('user.label.name')">
              <Input v-model="user.name" :placeholder="$t('user.placeholder.name')" clearable/>
            </FormItem>
          </div>

          <div class="content">
            <Button type="success" icon="checkmark" :loading="isLoading" @click="handleSubmit($event, $refs.form)">{{$t('btn.submit')}}</Button>
          </div>
        </TabPane>
        <TabPane :label="$t('info.tag.password')">
          <div class="content">
            <FormItem prop="password" :label="$t('user.label.newPassword')">
              <Input :type="showPwd ? 'text' : 'password'" v-model="user.password" :placeholder="$t('user.placeholder.password')">
                <span slot="append">
                  <Icon :type="showPwd ? 'eye-disabled' : 'eye'" class="showPwd" @click="showPwd = !showPwd"></Icon>
                </span>
              </Input>
            </FormItem>
          </div>

          <div class="content">
            <Button type="success" icon="checkmark" :loading="isLoading" @click="handleSubmit($event, $refs.form)">{{$t('btn.submit')}}</Button>
          </div>
        </TabPane>
      </Tabs>
    </Form>
  </div>
</template>

<script>
import { httpPut, httpPutUpload } from '@/api/common'
import baseURL from '_conf/url'
export default {
  data () {
    return {
      baseURL: baseURL,
      showBigAvatar: false,
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
    let avatar = user.avatar
    if (avatar) {
      avatar = baseURL + avatar
    } else {
      avatar = require('@/assets/images/lock.jpg')
    }
    this.user = {
      username: user.username,
      avatar: avatar,
      name: user.name,
      password: ''
    }
  },
  methods: {
    handleFormatError () {
      this.warning(this.$t('info.msg.format'))
    },
    handleMaxSize () {
      this.warning(this.$t('info.msg.size'))
    },
    handleBeforeUpload: function (file) {
      let formData = new FormData()
      formData.append('file', file)
      httpPutUpload('consumer/info/avatar', formData).then(data => {
        this.success(data.respCo)
        this.$store.state.user.user = data.user
        this.user.avatar = this.baseURL + data.user.avatar
        this.isLoading = false
      }).catch(respCo => {
        this.isLoading = false
        this.error(respCo)
      })
      return false
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

  .avatar {
    padding: 6px;
    border: 1px solid #dfd9ce;
    box-shadow: 0px 1px 2px #adaca9;
  }
</style>
