<template>
  <div class="app">
    <MobileHeader />
    <main class="container">
      <Nuxt></Nuxt>
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import MobileHeader from '~/components/header/MobileHeader.vue'

import headLinks from '~/data/headLinks'
import Footer from '~/components/footer/Footer.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Mobile',
  components: {
    Footer,
    MobileHeader,
  },
  head: {
    link: headLinks.headLinks,
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/main';
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
</style>
