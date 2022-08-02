<template>
  <div class="main-wrapper">
    <div class="main-wrapper__breadcrumbs"></div>
    <div class="main-wrapper__album-list">
      <h1 class="main-wrapper__album-list__title">Каталог</h1>
      <div
        v-if="!$store.state.isLoading"
        class="main-wrapper__album-list__container"
      >
        <AlbumCard
          v-for="(item, index) in $store.state.albums"
          :key="index"
          :album="item"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import AlbumCard from '~/components/AlbumCard.vue'

@Component({
  components: { AlbumCard },
  layout: (ctx) => (ctx.$device.isMobile ? 'mobile' : 'default'),
})
export default class IndexPage extends Vue {
  observer: IntersectionObserver | null = null

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async fetch() {
    await this.$store.dispatch('getNews', 1)
  }

  created() {
    this.observer = new IntersectionObserver(this.onElementObserved, {
      root: this.$el,
      threshold: 1.0,
    })
  }

  onElementObserved(entries: HTMLElement | null): void {
    if (entries) {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) {
          return
        }

        this.observer.unobserve(target)

        setTimeout(() => {
          const i = target.getAttribute('data-index')
          this.todos[i].seen = true
        }, 1000)
      })
    }
  }

  beforeDestroy() {
    this.observer.disconnect()
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/main';
</style>
