<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
  .size {
    width: 100%;
    height: 100%;
  }
  html, body {
    .size;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
  #app {
    .size;
  }
  .bg-white {
    background: #fff;
    padding: 8px;
  }
  .inner-content {
    max-width: 600px;
    margin: 20px auto;
  }
  .inner-content-lg {
    max-width: 900px;
    margin: 20px auto;
  }
  .ivu-menu {
    z-index: 9 !important;
  }
  .markdown {
    margin: 20px 35px;
    font-size: 14px;

    p {
      color: #555;
      line-height: 2;
      font-size: 16px;
    }

    img {
      max-width: 100%;
    }

    ul, ol {
      margin-left: 30px;
    }

    pre {
      overflow: auto;
    }
  }
</style>
