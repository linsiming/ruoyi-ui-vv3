<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>

  // function metaInfo() {
  //   return {
  //     title: this.$store.state.settings.dynamicTitle && this.$store.state.settings.title,
  //     titleTemplate: title => {
  //       return title ? `${title} - ${process.env.VITE_APP_TITLE}` : process.env.VITE_APP_TITLE
  //     }
  //   }
  // }


// export default  {
//   name:  'App',
//     metaInfo() {
//         return {
//             title: this.$store.state.settings.dynamicTitle && this.$store.state.settings.title,
//             titleTemplate: title => {
//                 return title ? `${title} - ${process.env.VITE_APP_TITLE}` : process.env.VITE_APP_TITLE
//             }
//         }
//     }
// }
</script>
