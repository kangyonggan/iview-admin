<template>
  <Modal :title="title" v-model="showModel" :mask-closable="false" :closable="false">
    <Form ref="form" :model="model" :rules="rules">
      <slot></slot>
    </Form>

    <template slot="footer">
      <Button icon="close" @click="cancel">{{$t('btn.cancel')}}</Button>
      <Button type="success" icon="checkmark" :loading="isLoading" @click="handleSubmit($event, $refs.form)">{{$t('btn.submit')}}</Button>
    </template>
  </Modal>
</template>

<script>
import { http } from '@/api/common'
export default {
  props: {
    title: {
      required: true,
      type: String
    },
    model: {
      required: false,
      type: Object
    },
    action: {
      required: false,
      type: String
    },
    method: {
      required: false,
      type: String,
      default: 'post'
    },
    rules: {
      required: false,
      type: Object
    },
    submit: {
      required: false,
      type: Function
    }
  },
  data () {
    return {
      isLoading: false,
      showModel: false
    }
  },
  methods: {
    show: function () {
      this.stop()
      this.$refs.form.resetFields()
      this.showModel = true
    },
    hide: function () {
      this.stop()
      this.showModel = false
    },
    loading: function () {
      this.isLoading = true
    },
    stop: function () {
      this.isLoading = false
    },
    handleSubmit: function (e, form) {
      if (this.submit) {
        this.submit(e, form)
        return
      }
      form.validate((valid) => {
        if (valid) {
          this.loading()
          http(this.method, this.action, this.model).then(data => {
            this.success(data.respCo)
            this.hide()
            this.$emit('success', data)
          }).catch(respCo => {
            this.stop()
            this.$emit('failure', respCo)
            this.error(respCo)
          })
        }
      })
    },
    cancel: function () {
      this.hide()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
