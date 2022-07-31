<template>
  <div class="app">
    <Header />
    <main class="container">
      <Nuxt></Nuxt>
    </main>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Default',
  components: {
    Header,
  },
  head: {
    link: [
      /* Bulma.css */
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.2/css/bulma.min.css',
      },
      /** mdi icons from google for better usability
       * if we want to change color/size/state of icons
       * alternative - use @nuxtjs/fontawesome or custom svg
       * from folder's directory /assets/svg **/
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
      },
    ],
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

body {
  font-family: 'Roboto', sans-serif;
}
</style>
