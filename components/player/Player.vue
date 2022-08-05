<template>
  <div class="player-wrapper">
    <div class="player-wrapper__img" :style="imageStyle">
      <div class="player_controller">
        <div
          class="player_controller__invisible"
          :class="{ invisibleDark: isMobile }"
        >
          <b-icon
            :icon="$store.state.isPlaying ? 'pause' : 'play'"
            :type="isMobile ? 'is-black' : 'is-white'"
            size="is-medium"
          ></b-icon>
        </div>
        <div class="player_controller__status" @click="onClickPlayer">
          <svg width="50" height="50" class="player_controller__status__svg">
            <circle
              ref="circle"
              class="player_controller__status__svg__circle"
              :stroke="isMobile ? 'black' : 'white'"
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
      <span class="player-wrapper__info__block author">{{
        authorsString
      }}</span>
      <span class="player-wrapper__info__block name">
        {{ $store.state.currentPlaying.name }}
      </span>
      <span class="player-wrapper__info__block length">
        {{ durationTime }}
      </span>
    </div>
    <div class="player-wrapper__actions">
      <b-icon
        class="player-wrapper__actions__icon"
        icon="dots-horizontal"
        size="is-medium"
        type="is-light"
      ></b-icon>
    </div>
    <client-only>
      <vue-soundmanager
        :play-from-position="positionTime"
        :url="$store.state.playingURL"
        :play-status="$store.state.playingStatus"
      ></vue-soundmanager>
    </client-only>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'nuxt-property-decorator'
import getAuthorString from '~/utils/getAuthorsString'
import getDurationToTime from '~/utils/getDurationToTime'
import getDurationToPercent from '~/utils/getDurationToPercent'

@Component({
  components: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    [process.client && 'VueSoundmanager']: () =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      import('@serh/vue-soundmanager'),
  },
})
export default class Player extends Vue {
  positionTime = 0

  @Watch('$store.state.isPlaying')
  startPlayer(newVal: boolean) {
    if (newVal) {
      this.startSound()
    }
  }

  startSound() {
    if (this.$store.state.endedSong) {
      this.$store.commit('CHANGE_DURATION_PLAY', 0)
      this.$store.commit('SET_ENDED_SONG', false)
    }
    this.$store.commit('PLAYING_STATUS_PLAY')
    this.positionTime = this.$store.getters.playedTimeToMMS
    let playedTime = setInterval(() => {
      if (
        this.$store.state.durationPlay < this.refactoredDuration &&
        this.$store.state.isPlaying
      ) {
        this.$store.commit(
          'CHANGE_DURATION_PLAY',
          this.$store.state.durationPlay + 100
        )
      } else {
        if (this.$store.state.durationPlay === this.refactoredDuration) {
          this.$store.commit('SET_ENDED_SONG', true)
        }
        clearInterval(playedTime)
        this.pause()
      }
    }, 100)
  }

  play() {
    this.$store.commit('CHANGE_PLAY_STATUS', true)
  }

  stop() {
    this.$store.commit('PLAYING_STATUS_STOPPED')
  }

  pause() {
    this.$store.commit('CHANGE_PLAY_STATUS', false)
    this.$store.commit('PLAYING_STATUS_PAUSE')
  }

  get refactoredDuration(): number {
    let refactored =
      typeof this.$store.state.currentPlaying.duration === 'string'
        ? parseInt(this.$store.state.currentPlaying.duration)
        : this.$store.state.currentPlaying.duration
    return refactored * 1000
  }

  get isMobile(): boolean {
    return this.$device.isMobile
  }

  get imageStyle(): string {
    if (this.isMobile) {
      return `background: unset;`
    } else {
      return `background: url(${this.$store.state.currentPlaying.coverUrl}); background-repeat: no-repeat !important;
  background-size: contain, cover !important;`
    }
  }

  get authorsString(): string {
    return getAuthorString(
      this.$store.state.authors,
      this.$store.state.currentPlaying
    )
  }

  get durationTime(): string {
    return getDurationToTime(this.$store.state.currentPlaying.duration)
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
        this.$store.state.currentPlaying.duration * 1000,
        this.$store.state.durationPlay
      ) /
        100) *
        this.circumference
    )
  }

  onClickPlayer(): void {
    if (this.$store.state.isPlaying) {
      this.pause()
    } else {
      this.play()
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/player';
</style>
