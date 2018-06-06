<template>
  <textarea :id="randomId" style="display:none;"></textarea>
</template>

<script>
import SimpleMDE from 'simplemde'
import './simplemde.min.css'
import './markdown-editor.less'
export default {
  props: {
    model: {
      required: true,
      type: Object
    },
    prop: {
      required: true,
      type: String
    },
    placeholder: {
      type: String
    }
  },
  data () {
    return {
      simplemde: null,
      randomId: Math.random().toString(16).substring(2)
    }
  },
  mounted: function () {
    this.simplemde = new SimpleMDE({
      element: document.getElementById(this.randomId),
      placeholder: this.placeholder,
      initialValue: this.model[this.prop],
      toolbar: ['bold', 'italic', 'strikethrough', 'heading', 'heading-smaller', 'heading-bigger', 'heading-1', 'heading-2', 'heading-3', '|', 'code', 'quote', 'unordered-list', 'clean-block', '|', 'link', 'image', 'table', 'horizontal-rule', '|', 'preview', 'fullscreen']
    })
    let that = this
    this.simplemde.codemirror.on('change', function () {
      that.model[that.prop] = that.simplemde.value()
    })
  },
  methods: {
    value: function (val) {
      this.simplemde.value(val)
    }
  }
}
</script>
