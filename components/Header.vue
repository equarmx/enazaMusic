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
        <div class="navbar-item">
          <img
            :src="require('assets/svg/SearchIcon.svg')"
            width="24"
            height="24"
            alt="Enaza Search"
          />
        </div>
        <div v-if="!showDesktop" class="navbar-item">
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
    this.showDesktop = widthPage > 663
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
@import 'assets/styles/main';

@media only screen and (max-width: 680px) {
  .navbar-wrapper {
    height: 94px !important;
    align-items: flex-end !important;
  }
  .navbar {
    grid-template-columns:
      minmax(192px, 1fr)
      minmax(60px, auto) !important;
    column-gap: 5px;
    padding: 0 2px 0 8px;
  }
  .navbar-end {
    display: flex;
    column-gap: 15px;
  }
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

$dark: #212121;
$light: #efefef;
$color: #b3e5fc;
$white: #ffffff;

@mixin btn() {
  width: 30px;
  height: 30px;
  transition-duration: 0.5s;
}

@mixin icon($height, $width) {
  transition-duration: 0.5s;
  position: absolute;
  height: $height;
  width: $width;
  top: 12px;
  background-color: $white;
}

@mixin icon-before($height, $width, $top) {
  transition-duration: 0.5s;
  position: absolute;
  width: $width;
  height: $height;
  background-color: $white;
  content: '';
  top: $top;
}

@mixin icon-after($height, $width, $top) {
  transition-duration: 0.5s;
  position: absolute;
  width: $width;
  height: $height;
  background-color: $white;
  content: '';
  top: $top;
}

@mixin icon-circle($height, $width) {
  transition-duration: 0.5s;
  position: absolute;
  height: $height;
  width: $width;
  top: 2px;
  border-radius: 100%;
  background: transparent;
  border: 4px solid $white;
  left: -15px;
}

.menu {
  position: relative;
  margin-top: 4px;
}

.btn1 {
  @include btn;

  .icon-left {
    @include icon(2px, 9px);

    &:before {
      @include icon-before(2px, 9px, -9px);
    }

    &:after {
      @include icon-after(2px, 9px, 9px);
    }

    &:hover {
      cursor: pointer;
    }
  }

  .icon-right {
    @include icon(2px, 9px);
    left: 9px;

    &:before {
      @include icon-before(2px, 9px, -9px);
    }

    &:after {
      @include icon-after(2px, 9px, 9px);
    }
  }

  &.open {
    .icon-left {
      transition-duration: 0.5s;
      background: transparent;

      &:before {
        transform: rotateZ(45deg) scaleX(1.4) translate(3px, 3px);
      }

      &:after {
        transform: rotateZ(-45deg) scaleX(1.4) translate(3px, -3px);
      }
    }

    .icon-right {
      transition-duration: 0.5s;
      background: transparent;

      &:before {
        transform: rotateZ(-45deg) scaleX(1.4) translate(-3px, 3px);
      }

      &:after {
        transform: rotateZ(45deg) scaleX(1.4) translate(-3px, -3px);
      }
    }
  }

  &:hover {
    cursor: pointer;
  }
}
</style>
