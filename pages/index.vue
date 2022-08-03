<template>
  <div class="main-wrapper">
    <div class="main-wrapper__breadcrumbs"></div>
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
})
export default class IndexPage extends Vue {
  page = 1
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async fetch() {
    await this.$store.dispatch('getNews', 1)
  }

  async getMoreNews() {
    this.page++
    await this.$store.dispatch('getNews', this.page)
  }

  handleScroll() {
    let element = this.$refs.scrollComponent as Element
    if (element) {
      if (element.getBoundingClientRect().bottom < window.innerHeight) {
        this.getMoreNews()
      }
    }
  }

  mounted() {
    if (process.client) {
      this.$nextTick(() => {
        window.addEventListener('scroll', this.handleScroll)
      })
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
