<template>
  <b-breadcrumb class="breadcrumb-custom" align="is-left">
    <b-breadcrumb-item
      v-for="(item, index) in $store.state.breadcrumbs"
      :key="index"
      class="breadcrumb-custom__elem"
      tag="router-link"
      :to="item.href"
      :active="index === $store.state.breadcrumbs.length - 1 || index === 0"
      @click.native="onClickItem(index)"
      >{{ item.name }}
    </b-breadcrumb-item>
  </b-breadcrumb>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({})
export default class Breadcrumbs extends Vue {
  onClickItem(index: number): void {
    /* Проверка - это заглушка, чтобы отвключить первую хлебную крошку */
    if (index) {
      this.$store.commit('CLICK_BREADCRUMBS', index)
    }
  }
}
</script>

<style lang="scss">
.breadcrumb-custom {
  margin: 0 !important;
  padding-top: 10px !important;
  padding-bottom: 0px !important;

  ul {
    align-items: center;
  }

  &__elem {
    ::before {
      font-size: 15px !important;
    }

    a {
      color: #808080 !important;
      font-size: 15px !important;
      font-weight: 400 !important;
      line-height: 120% !important;

      &:hover {
        color: #a7a7a7 !important;
      }
    }
  }
}

.breadcrumb li + li::before {
  font-size: 15px !important;
}
</style>
