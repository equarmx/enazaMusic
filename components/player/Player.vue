<template>
  <div class="player-wrapper">
    <div
      class="player-wrapper__img"
      :style="`background: url(${$store.state.currentPlaying.coverUrl}); background-repeat: no-repeat;
  background-size: contain, cover;`"
    >
      <div class="player_controller">
        <div class="player_controller__invisible">
          <b-icon
            :icon="playing ? 'pause' : 'play'"
            type="is-white"
            size="is-medium"
          ></b-icon>
        </div>
        <div class="player_controller__status">
          <svg
            width="50"
            height="50"
            class="player_controller__status__svg"
            @click="onClickPlayer"
          >
            <circle
              ref="circle"
              class="player_controller__status__svg__circle"
              stroke="white"
              stroke-width="1"
              cx="25"
              cy="25"
              r="24"
              fill="transparent"
              :style="`stroke-dasharray: ${circumference} ${circumference}; stroke-dashoffset: ${getProgress}`"
            />
          </svg>
        </div>
      </div>
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
import getDurationToPercent from '~/utils/getDurationToPercent'

@Component
export default class Player extends Vue {
  playing = false

  get authorsString(): string {
    return getAuthorString(
      this.$store.state.authors,
      this.$store.state.currentPlaying
    )
  }

  get durationTime(): string {
    return getDurationToMinutes(this.$store.state.currentPlaying.duration)
  }

  get radius(): number {
    if (process.client) {
      const circle = document.querySelector(
        '.player_controller__status__svg__circle'
      ) as SVGCircleElement
      return circle.r.baseVal.value
    } else return 0
  }

  get circumference(): number {
    return 2 * Math.PI * this.radius
  }

  get getProgress(): number {
    return (
      this.circumference -
      (getDurationToPercent(
        this.$store.state.currentPlaying.duration,
        this.$store.state.durationPlay
      ) /
        100) *
        this.circumference
    )
  }

  onClickPlayer(): void {
    this.playing = !this.playing
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/player';
</style>