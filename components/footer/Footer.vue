<template>
  <transition name="slide-fade">
    <div v-if="showFooter" class="footer">
      <div class="footer__wrapper">
        <Player />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Player from '~/components/player/Player.vue'

@Component({
  components: { Player },
})
export default class Footer extends Vue {
  get showFooter(): boolean {
    return (
      !!this.$store.getters.authorsLength &&
      this.$store.getters.currentPlayingState
    )
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/main';

.footer {
  position: sticky;
  bottom: 0;
  background: #f5f5f5;
  height: 80px;
  padding: 0 20px !important;

  &__wrapper {
    display: flex;
    max-width: $max-wrapper;
    flex-grow: 1;
    margin: 0 auto;
    height: 100%;
  }
}
</style>
