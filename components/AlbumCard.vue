<template>
  <!--  <NuxtLink :to="`/${album.id}`">-->
  <div class="album_preview" @click="redirectDetail">
    <div class="album_preview__img">
      <img :src="album.coverUrl" :alt="album.name" />
    </div>
    <div class="album_preview__content">
      <span class="album_preview__content__name_year"
        >{{ album.name
        }}<span v-if="parseInt(album.year)"> · {{ album.year }} </span></span
      >
      <span class="album_preview__content__author">{{ authorsString }}</span>
      <span class="album_preview__content__tracks"
        >Треков: {{ album.trackCount }}</span
      >
    </div>
  </div>
  <!--  </NuxtLink>-->
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { IAlbum } from '~/services/request'
import getAuthorString from '~/utils/getAuthorsString'

@Component
export default class AlbumCard extends Vue {
  @Prop({ type: Object, default: {} }) readonly album: IAlbum | undefined

  get authorsString(): string {
    return getAuthorString(this.$store.state.authors, this.album)
  }

  redirectDetail(): void {
    console.log('clicked')
    this.$store.commit('CHANGE_BREADCRUMBS', {
      href: '#',
      name: `${this.album?.name}${
        this.album?.year
          ? parseInt(this.album?.year)
            ? ' · ' + this.album?.year
            : ''
          : ''
      }`,
    })
    this.$router.push('/' + this.album?.id)
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/albumPreview';
</style>
