<template>
  <div class="main-wrapper">
    <div class="main-wrapper__album-list">
      <h1 class="main-wrapper__album-list__title">Каталог</h1>
      <div ref="scrollComponent" class="main-wrapper__album-list__container">
        <AlbumCard
          v-for="(item, index) in $store.state.albums"
          :key="index"
          :album="item"
        />
      </div>
      <Loader v-if="$store.state.isLoading" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import AlbumCard from '~/components/AlbumCard.vue'
import Loader from '~/components/Loader.vue'

@Component({
  components: { Loader, AlbumCard },
  layout: (ctx) => (ctx.$device.isMobile ? 'mobile' : 'default'),
  async fetch() {
    if (!this.$store.state.albums.length) {
      await this.$store.dispatch('getNews', 1)
    }
  },
})
export default class IndexPage extends Vue {
  mounted() {
    if (process.client) {
      this.$nextTick(() => {
        window.addEventListener('scroll', this.handleScroll)
      })
    }
    this.$store.commit('RESET_BREADCRUMBS')
  }

  async getMoreNews() {
    if (!this.$store.state.isLoading) {
      this.$store.commit('CHANGE_PAGE', ++this.$store.state.page)
      await this.$store.dispatch('getNews', this.$store.state.page)
    }
  }

  handleScroll() {
    let element = this.$refs.scrollComponent as Element
    if (element) {
      if (element.getBoundingClientRect().bottom < window.innerHeight) {
        this.getMoreNews()
      }
    }
  }

  beforeDestroy() {
    if (process.client) {
      this.$nextTick(() => {
        window.removeEventListener('scroll', this.handleScroll)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/main';
</style>
