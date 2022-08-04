<template>
  <div class="track">
    <div class="track__img" @click="onPlayAudio">
      <img :src="track.coverUrl" :alt="track.name" />
      <div class="track__img__player">
        <b-icon
          :icon="playing && $store.state.isPlaying ? 'pause' : 'play'"
          type="is-white"
          size="is-medium"
        ></b-icon>
      </div>
    </div>
    <div class="track__info">
      <span class="track__info__block author">{{ authorsString }}</span>
      <span class="track__info__block name"> {{ track.name }} </span>
      <span class="track__info__block duration">{{ durationTime }}</span>
    </div>
    <div class="track__actions">
      <b-icon
        class="track__actions__icon"
        icon="dots-horizontal"
        size="is-medium"
        type="is-light"
      ></b-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { IAuthor, ITrack } from '~/services/request'
import getAuthorString from '~/utils/getAuthorsString'
import getDurationToTime from '~/utils/getDurationToTime'

@Component
export default class TrackInAlbum extends Vue {
  @Prop({ type: Object, default: {} }) readonly track: ITrack | undefined
  @Prop({
    type: Array,
    default: () => [],
  })
  readonly authors: Array<IAuthor> | undefined

  get authorsString(): string {
    return getAuthorString(this.authors, this.track)
  }

  get durationTime(): string {
    if (!this.track) return '0'
    return getDurationToTime(this.track.duration)
  }

  get playing(): boolean {
    if (!this.$store.state.currentPlaying || !this.track) return false
    return this.$store.state.currentPlaying.id === this.track.id
  }

  newTrackToPlay(): void {
    if (this.$store.state.currentPlaying && this.track) {
      if (this.$store.state.currentPlaying.id === this.track.id) {
        this.$store.commit('CHANGE_PLAY_STATUS', true)
        this.$store.commit('PLAYING_STATUS_PLAY')
      } else {
        this.$store.commit('CHANGE_PLAY_STATUS', false)
        this.$store.commit('CHANGE_DURATION_PLAY', 0)
        this.$store.commit('CHANGE_URL_BY_CLICK')
        setTimeout(() => {
          this.$store.commit('ADD_AUTHORS', this.authors)
          this.$store.commit('CHANGE_PLAYER_STATE', this.track)
          this.$store.commit('CHANGE_PLAY_STATUS', true)
          this.$store.commit('PLAYING_STATUS_PLAY')
        }, 100)
      }
    }
  }

  onPlayAudio(): void {
    if (this.$store.state.currentPlaying && this.track) {
      if (
        this.$store.state.currentPlaying.id === this.track.id &&
        this.$store.state.isPlaying
      ) {
        this.$store.commit('CHANGE_PLAY_STATUS', false)
        this.$store.commit('PLAYING_STATUS_STOPPED')
      } else {
        this.newTrackToPlay()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/albumDetail';
</style>
