<template>
  <div class="track">
    <div class="track__img">
      <img :src="track.coverUrl" :alt="track.name" />
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
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/albumDetail';
</style>
