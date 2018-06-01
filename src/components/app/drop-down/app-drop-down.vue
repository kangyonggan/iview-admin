<template>
  <div>
    <Button :type="type" size="small" @click="handleClick" :style="{borderTopRightRadius: '0', borderBottomRightRadius: '0'}">
      {{text}}
    </Button>
    <Dropdown placement="bottom-end" trigger="click">
      <Button :type="type" size="small" :style="{borderTopLeftRadius: '0', borderBottomLeftRadius: '0', paddingLeft: '0px', paddingRight: '3px', marginLeft: '-2px'}">
        <Icon type="arrow-down-b" :style="{paddingLeft: '3px'}"/>
      </Button>
      <DropdownMenu slot="list">
        <slot></slot>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      required: true,
      type: String
    },
    type: {
      type: String,
      default: 'primary'
    }
  },
  methods: {
    handleClick: function (e) {
      this.$emit('click', e)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
