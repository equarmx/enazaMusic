<template>
  <b-breadcrumb class="breadcrumb-custom" align="is-left">
    <b-breadcrumb-item
      v-for="(item, index) in $store.state.breadcrumbs"
      :key="index"
      class="breadcrumb-custom__elem"
      tag="router-link"
      :to="item.href"
      >{{ item.name }}
    </b-breadcrumb-item>
  </b-breadcrumb>
</template>

<script lang="ts">
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Breadcrumbs',
}
</script>

<style lang="scss">
.breadcrumb-custom {
  margin: 0 !important;
  padding-top: 10px !important;
  padding-bottom: 2px !important;

  &__elem {
    a {
      color: #808080 !important;

      &:hover {
        color: #a7a7a7 !important;
      }
    }
  }
}
</style>
