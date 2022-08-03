<template>
  <div class="app">
    <Header />
    <main class="container">
      <Nuxt></Nuxt>
    </main>
    <transition name="slide-fade">
      <Footer v-if="showFooter" />
    </transition>
  </div>
</template>

<script lang="ts">
import Header from '~/components/header/Header.vue'

import headLinks from '~/data/headLinks'
import Footer from '~/components/footer/Footer.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Default',
  components: {
    Footer,
    Header,
  },
  head: {
    link: headLinks.headLinks,
  },
  computed: {
    showFooter(): boolean {
      return (
        this.$store.state.currentPlaying !== null &&
        !!this.$store.state.authors.length !== 0
      )
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/main';
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');

body {
  font-family: 'Roboto', sans-serif;
  margin: 0 !important;
}

.container {
  max-width: $max-wrapper !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.8s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
