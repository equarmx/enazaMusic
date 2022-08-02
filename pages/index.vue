<template>
  <div class="main-wrapper">
    <div class="main-wrapper__breadcrumbs"></div>
    <div class="main-wrapper__album-list">
      <span v-for="(item, index) in albums" :key="index">{{ item }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  layout: (ctx) => (ctx.$device.isMobile ? 'mobile' : 'default'),
})
export default class IndexPage extends Vue {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  async asyncData({ store }) {
    store.commit('SET_LOADING_STATUS', true)
    let albums = await store.dispatch('getNews')
    store.commit('SET_LOADING_STATUS', false)
    return { albums }
  }
}
</script>

<style lang="scss" scoped></style>
