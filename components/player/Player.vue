<template>
  <div class="player-wrapper">
    <div class="player-wrapper__img">
      <img
        :src="$store.state.currentPlaying.coverUrl"
        :alt="$store.state.currentPlaying.name"
      />
    </div>
    <div class="player-wrapper__info">
      <div class="player-wrapper__info__block author">{{ authorsString }}</div>
      <div class="player-wrapper__info__block name">
        {{ $store.state.currentPlaying.name }}
      </div>
      <div class="player-wrapper__info__block length">
        {{ durationTime }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import getAuthorString from '~/utils/getAuthorsString'
import getDurationToMinutes from '~/utils/getDurationToMinutes'

@Component
export default class Player extends Vue {
  get authorsString(): string {
    return getAuthorString(
      this.$store.state.authors,
      this.$store.state.currentPlaying
    )
  }

  get durationTime(): string {
    return getDurationToMinutes(this.$store.state.currentPlaying.duration)
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/player';
</style>
