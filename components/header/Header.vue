<template>
  <nav class="navbar-wrapper" role="navigation" aria-label="main navigation">
    <div class="navbar">
      <div class="navbar-brand">
        <a class="navbar-item img" href="/">
          <img
            :src="require('~/assets/svg/EnazaMusic.svg')"
            width="192"
            height="23"
            alt="Enaza Music"
          />
        </a>
      </div>
      <div v-if="showDesktop" class="navbar-list">
        <a
          v-for="(item, index) in menuItems"
          :key="index"
          class="navbar-item"
          :href="item.href"
        >
          {{ item.name }}
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
        <div v-if="!showDesktop" class="navbar-item last-elem">
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

import menuItems from '~/data/menuItems'

interface IMenuItem {
  name: string
  href: string
}

@Component
export default class Header extends Vue {
  menuItems: Array<IMenuItem> = menuItems.menuItems
  showDesktop = true
  showBurger = false

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
      this.onResize()
    })
  }

  onResize(): void {
    const widthPage = document.documentElement.clientWidth
    this.showDesktop = widthPage > 703
  }

  openMenu(): void {
    this.showBurger = !this.showBurger
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/header';
</style>
