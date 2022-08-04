<template>
  <div class="track">
    <div class="track__img" @click="onPlayAudio">
      <img :src="track.coverUrl" :alt="track.name" />
      <div class="track__img__player">
        <b-icon
          :icon="playing ? 'pause' : 'play'"
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
import getDurationToMinutes from '~/utils/getDurationToMinutes'

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
    return getDurationToMinutes(this.track.duration)
  }

  get playing(): boolean {
    if (!this.$store.state.currentPlaying || !this.track) return false
    return this.$store.state.currentPlaying.id === this.track.id
  }

  onPlayAudio(): void {
    this.$store.commit('ADD_AUTHORS', this.authors)
    this.$store.commit('CHANGE_PLAYER_STATE', this.track)
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/albumDetail';
</style>
