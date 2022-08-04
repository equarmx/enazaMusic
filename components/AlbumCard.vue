<template>
  <NuxtLink :to="album.id">
    <div class="album_preview">
      <div class="album_preview__img">
        <img :src="album.coverUrl" :alt="album.name" />
      </div>
      <div class="album_preview__content">
        <span class="album_preview__content__name_year"
          >{{ album.name
          }}<span v-if="parseInt(album.year)"> · {{ album.year }} </span></span
        >
        <span class="album_preview__content__author">{{ authorsString }}</span>
        <div v-if="!isMobile" class="album_preview__content__duration">
          <span>Время прослушивания:</span>
          <span>{{ durationTime }}</span>
        </div>
        <div class="album_preview__content__tracks_block">
          <span class="album_preview__content__tracks_block__elem"
            >Треков: {{ album.trackCount }}</span
          >
          <span class="album_preview__content__tracks_block__elem">
            Прослушано: 157
          </span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { IAlbum } from '~/services/request'
import getAuthorString from '~/utils/getAuthorsString'
import getDurationToTime from '~/utils/getDurationToTime'

@Component
export default class AlbumCard extends Vue {
  @Prop({ type: Object, default: {} }) readonly album: IAlbum | undefined

  get authorsString(): string {
    return getAuthorString(this.$store.state.authors, this.album)
  }

  get isMobile(): boolean {
    return this.$device.isMobile
  }

  get durationTime(): string {
    if (!this.album) return ''
    return getDurationToTime(this.album.duration, true)
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/albumPreview';
</style>
