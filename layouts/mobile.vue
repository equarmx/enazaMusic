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

import Footer from '~/components/footer/Footer.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Mobile',
  components: {
    Footer,
    MobileHeader,
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/main';
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#__nuxt,
#__layout,
.app,
.container,
.container_wrapper {
  min-height: 100vh;
}

body {
  font-family: 'Roboto', sans-serif !important;
  margin: 0 !important;
  min-height: 100vh;
}
</style>
