<template>
  <div class="app">
    <Header />
    <main class="container">
      <Nuxt></Nuxt>
    </main>
  </div>
</template>

<script lang="ts">
import Header from '~/components/header/Header.vue'

import headLinks from '~/data/headLinks'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Default',
  components: {
    Header,
  },
  head: {
    link: headLinks.headLinks,
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

body {
  font-family: 'Roboto', sans-serif;
  margin: 0 !important;
}

.container {
  max-width: 1185px !important;
}
</style>
