<template>
  <div>
    <div v-title>{{$t('route.info')}}</div>
    <Form ref="form" :model="user" label-position="top" class="bg-white">
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
            <FormItem prop="password" :label="$t('user.label.password')">
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
        <Button type="success" icon="checkmark">{{$t('btn.submit')}}</Button>
      </div>
    </Form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showPwd: false,
      user: {
        username: 'admin',
        name: 'Manager'
      }
    }
  },
  methods: {
    seePassword: function () {
      this.showPwd = !this.showPwd
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
