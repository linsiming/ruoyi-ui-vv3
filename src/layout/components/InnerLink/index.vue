<template>
  <div :style="style">
    <iframe
      :src="url"
      frameborder="no"
      style="width: 100%; height: 100%"
      scrolling="auto"
    ></iframe>
  </div>
</template>

<script>
import * as Vue from 'vue'
export default {
  data() {
    return {
      style: {},
      url: ''
    }
  },
  render() {
    const {
      $route: {
        meta: { link },
      },
    } = this
    if ({ link }.link === '') {
      return '404'
    }
    let url = { link }.link
    const height = document.documentElement.clientHeight - 94.5 + 'px'
    const style = { height: height }

    this.style = style
    this.url = url
  },
}
</script>
