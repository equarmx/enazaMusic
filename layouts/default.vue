<template>
  <div class='app'>
    <Header/>
    <main class="container">
      <Nuxt></Nuxt>
    </main>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'default',
  components: {
    Header,
  },
  head: {
    link: [
      // Bulma.css
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.2/css/bulma.min.css",
      },
      /**
       * mdi icons from google for better usability
       * if we want to change color/size/state of icons
       * alternative - use @nuxtjs/fontawesome
       * **/
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://fonts.googleapis.com/icon?family=Material+Icons"
      }
    ]
  }
}
</script>

<style lang='scss' scoped>

</style>
