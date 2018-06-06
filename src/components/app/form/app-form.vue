<template>
  <Form ref="form" :model="model" label-position="top" :rules="rules" :class="large ? 'inner-content-lg' : 'inner-content'">
    <slot></slot>

    <div class="inner-content">
      <Button type="success" icon="checkmark" :loading="isLoading" @click="handleSubmit($event, $refs.form)">{{$t('btn.submit')}}</Button>
    </div>
  </Form>
</template>

<script>
import { http } from '@/api/common'
export default {
  props: {
    model: {
      required: false,
      type: Object
    },
    action: {
      required: false,
      type: String
    },
    large: {
      required: false,
      type: Boolean,
      default: true
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
      isLoading: false
    }
  },
  methods: {
    init: function () {
      this.stop()
      this.$refs.form.resetFields()
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
            this.stop()
            this.$emit('success', data)
          }).catch(respCo => {
            this.stop()
            this.$emit('failure', respCo)
            this.error(respCo)
          })
        }
      })
    }
  }
}
</script>
