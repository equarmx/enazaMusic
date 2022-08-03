<template>
  <nav class="navbar-wrapper" role="navigation" aria-label="main navigation">
    <div class="navbar">
      <div class="navbar-brand">
        <a class="navbar-item logo" href="/">
          <img
            :src="require('~/assets/svg/EnazaMusic.svg')"
            width="192"
            height="23"
            alt="Enaza Music"
          />
        </a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item search-elem">
          <img
            :src="require('~/assets/svg/SearchIcon.svg')"
            width="24"
            height="24"
            alt="Enaza Search"
          />
        </div>
        <div class="navbar-item last-elem-mobile">
          <div
            class="menu btn1"
            :class="{ open: showBurger }"
            data-menu="1"
            @click="openMenu"
          >
            <div class="icon-left"></div>
            <div class="icon-right"></div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class MobileHeader extends Vue {
  showBurger = false

  openMenu(): void {
    this.showBurger = !this.showBurger
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/header';
</style>
