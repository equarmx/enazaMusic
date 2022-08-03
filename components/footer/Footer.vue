<template>
  <div class="footer">
    <div class="footer__wrapper">
      <Player />
    </div>
  </div>
</template>

<script lang="ts">
import Player from '~/components/player/Player.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Footer',
  components: { Player },
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/main';

.footer {
  position: sticky;
  bottom: 0;
  background: #f5f5f5;
  height: 80px;
  padding: 0 !important;

  &__wrapper {
    display: flex;
    max-width: $max-wrapper;
    flex-grow: 1;
    margin: 0 auto;
    height: 100%;
  }
}
</style>
