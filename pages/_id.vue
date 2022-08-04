<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  async asyncData({ store, params }) {
    const album = store.dispatch('getCard', params.id)
    return { album }
  },
})
export default class Id extends Vue {}
</script>

<style lang="scss" scoped></style>
