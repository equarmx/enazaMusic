<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  layout: (ctx) => (ctx.$device.isMobile ? 'mobile' : 'default'),
})
</script>

<style lang="scss" scoped></style>
