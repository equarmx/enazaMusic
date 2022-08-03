<template>
  <div class="app">
    <Header />
    <main class="container">
      <div class="container_wrapper">
        <Breadcrumbs />
        <Nuxt></Nuxt>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import Header from '~/components/header/Header.vue'

import headLinks from '~/data/headLinks'
import Footer from '~/components/footer/Footer.vue'
import Breadcrumbs from '~/components/breadcrumbs/Breadcrumbs.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Default',
  components: {
    Breadcrumbs,
    Footer,
    Header,
  },
  head: {},
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/main';
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
</style>
