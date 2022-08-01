<template>
  <div class="main-wrapper">
    <div class="main-wrapper__breadcrumbs"></div>
    <div class="main-wrapper__album-list"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  layout: (ctx) => (ctx.$device.isMobile ? 'mobile' : 'default'),
})
export default class IndexPage extends Vue {
  asyncData() {
    // do something
  }
}
</script>

<style lang="scss" scoped></style>
