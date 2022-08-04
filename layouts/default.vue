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
}
</script>

<style lang="scss">
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

.app {
  .container {
    max-width: unset !important;
    padding: $main-margin;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .container_wrapper {
      max-width: $max-wrapper !important;
      margin: 0 auto;
      flex: 1;
    }
  }
}
</style>
