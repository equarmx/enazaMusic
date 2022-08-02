<template>
  <div class="album_preview">
    <div class="album_preview__img">
      <img :src="album.coverUrl" :alt="album.name" />
    </div>
    <div class="album_preview__content">
      <span class="album_preview__content__name_year"
        >{{ album.name }} · {{ album.year }}</span
      >
      <span class="album_preview__content__author">{{ authors }}</span>
      <span class="album_preview__content__tracks"
        >Треков: {{ album.trackCount }}</span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { IAlbum, IAuthor } from '~/services/request'

@Component
export default class AlbumCard extends Vue {
  @Prop({ type: Object, default: {} }) readonly album: IAlbum | undefined

  get authors(): string {
    if (!this.$store.state.authors) return ''
    let result
    let authors = this.$store.state.authors
      .filter((elem: IAuthor) => {
        return this.album?.peopleIds.includes(elem.id)
      })
      .map((elem: IAuthor) => elem.name)
    if (authors.length > 2) {
      result = authors.slice(0, 3).join(', ')
    } else result = authors.join(', ')
    return result
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/albumPreview';
</style>
