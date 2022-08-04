<template>
  <div class="album_wrapper">
    <div v-if="album" class="album_detail">
      <div class="album_detail__top">
        <div class="album_detail__top__img">
          <img :src="albumData.coverUrl" :alt="albumData.name" />
        </div>
        <div class="album_detail__top__info">
          <span class="album_detail__top__info__block name">
            {{ albumData.name }}
          </span>
          <span class="album_detail__top__info__block author">{{
            getFullLengthAuthor
          }}</span>
          <span class="album_detail__top__info__block tracks"
            >Треков: {{ albumData.trackCount }}</span
          >
        </div>
      </div>
      <div class="album_detail__bottom">
        <TrackInAlbum
          v-for="(item, index) in album.track"
          :key="index"
          :track="item"
          :authors="albumPeople"
        />
      </div>
    </div>
    <Loader v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import TrackInAlbum from '~/components/albumDetail/TrackInAlbum.vue'
import { IAlbum, IAuthor, ICard, ITrack } from '~/services/request'
import Loader from '~/components/Loader.vue'
import getFullLengthAuthorString from '~/utils/getFullLengthAuthorString'

@Component({
  components: { Loader, TrackInAlbum },
  async asyncData({ store, params }) {
    return store.dispatch('getCard', params.id).then((res) => {
      return { album: res }
    })
  },
})
export default class Id extends Vue {
  head() {
    return {
      title: this.albumData.name,
    }
  }

  album: ICard | undefined

  get albumData(): IAlbum {
    if (!this.album) return {} as IAlbum
    return this.album.album[0] as IAlbum
  }

  get albumPeople(): Array<IAuthor> {
    if (!this.album) return []
    return this.album.people as Array<IAuthor>
  }

  get getFullLengthAuthor(): string {
    if (!this.album) return ''
    return getFullLengthAuthorString(
      this.albumPeople,
      this.album.album[0] as IAlbum
    )
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/albumDetail';
</style>
