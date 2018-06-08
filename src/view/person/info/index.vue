<template>
  <div>
    <div v-title>{{$t('route.info')}}</div>
      <Tabs type="card">
        <TabPane :label="$t('info.tag.basic')" class="bg-white">
          <div class="inner-content">
            <Form ref="formBasic" :model="userBasic" label-position="top" :rules="rules" :large="false">
              <FormItem prop="username" :label="$t('user.label.username')">
                <Input v-model="userBasic.username" :readonly="true" :placeholder="$t('user.placeholder.username')"/>
              </FormItem>
              <FormItem prop="name" :label="$t('user.label.name')">
                <Input v-model="userBasic.name" :placeholder="$t('user.placeholder.name')" clearable/>
              </FormItem>
            </Form>
          </div>

          <div class="inner-content">
            <Button type="success" icon="checkmark" :loading="isLoading" @click="handleSubmit($refs.formBasic, userBasic)">{{$t('btn.submit')}}</Button>
          </div>
        </TabPane>
        <TabPane :label="$t('info.tag.avatar')" class="bg-white">
          <div class="inner-content">
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
        <TabPane :label="$t('info.tag.password')" class="bg-white">
          <div class="inner-content">
            <Form ref="formPassword" :model="userPwd" label-position="top" :rules="rules" :large="false">
              <FormItem prop="password" :label="$t('user.label.newPassword')">
                <Input :type="showPwd ? 'text' : 'password'" v-model="userPwd.password" :placeholder="$t('user.placeholder.password')">
                  <span slot="append">
                    <Icon :type="showPwd ? 'eye-disabled' : 'eye'" class="showPwd" @click="showPwd = !showPwd"></Icon>
                  </span>
                </Input>
              </FormItem>
            </Form>
          </div>

          <div class="inner-content">
            <Button type="success" icon="checkmark" :loading="isLoading" @click="handleSubmit($refs.formPassword, userPwd)">{{$t('btn.submit')}}</Button>
          </div>
        </TabPane>
      </Tabs>
  </div>
</template>

<script>
import { httpPut, httpPutUpload } from '@/api/common'
import {domain} from '_conf/url'
export default {
  data () {
    return {
      showBigAvatar: false,
      showPwd: false,
      isLoading: false,
      user: {},
      userBasic: {},
      userPwd: {},
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
    this.$refs.formBasic.resetFields()
    this.$refs.formPassword.resetFields()
    let avatar = user.avatar
    if (avatar) {
      avatar = domain + avatar
    } else {
      avatar = require('@/assets/images/logo.jpg')
    }
    this.user.avatar = avatar
    this.userBasic = {
      username: user.username,
      name: user.name
    }
    this.userPwd = {
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
      httpPutUpload('person/info/avatar', formData).then(data => {
        this.success(data.respCo)
        this.$store.state.user.user = data.user
        this.user.avatar = domain + data.user.avatar
        this.isLoading = false
      }).catch(respCo => {
        this.isLoading = false
        this.error(respCo)
      })
      return false
    },
    handleSubmit: function (form, model) {
      form.validate((valid) => {
        if (valid) {
          this.isLoading = true
          httpPut('person/info', model).then(data => {
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
  .showPwd {
    cursor: pointer;
  }

  .avatar {
    padding: 6px;
    border: 1px solid #dfd9ce;
    box-shadow: 0px 1px 2px #adaca9;
  }
</style>
