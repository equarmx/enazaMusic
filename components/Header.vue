<template>
  <nav class="navbar-wrapper" role="navigation" aria-label="main navigation">
    <div class="navbar">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img
            :src="require('assets/svg/EnazaMusic.svg')"
            width="192"
            height="23"
            alt="Enaza Music"
          />
        </a>
      </div>

      <div class="navbar-list">
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
        <div class="navbar-item">
          <img
            :src="require('assets/svg/SearchIcon.svg')"
            width="24"
            height="24"
            alt="Enaza Search"
          />
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

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })
  }

  onResize(): void {
    console.log(window.innerHeight)
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/main';

@media only screen and (max-width: 930px) {
}

.navbar-wrapper {
  background: $base-color;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}

.navbar {
  background: $base-color;
  max-width: 1440px;
  width: 100%;
  display: grid;
  grid-template-columns:
    minmax(192px, 1fr)
    minmax(312px, auto)
    minmax(24px, 1fr);
  column-gap: 15px;
}

.navbar-list {
  justify-self: center;
  display: flex;
  width: 100%;
  justify-content: center;
  align-self: center;
  flex: 1;
  padding-top: 6px;
}

.navbar-end {
  justify-self: end;
  align-self: center;
  padding-top: 6px;
}

.navbar-item {
  cursor: pointer;
  color: #ffffff;
  font-family: 'Roboto', sans-serif;
  align-items: center !important;
  display: flex !important;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
}
</style>
