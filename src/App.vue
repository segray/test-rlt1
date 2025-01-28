<script setup lang="ts">
import InventoryGrid from '@/components/InventoryGrid.vue'
import SkeletonLine from '@/components/SkeletonLine.vue'
import SkeletonImage from '@/components/SkeletonImage.vue'
</script>

<template>
  <main>
    <InventoryGrid />
    <h1><SkeletonLine>Lorem ipsum dolor</SkeletonLine></h1>
    <p><SkeletonLine>Lorem ipsum dolor sit amet, consectetur</SkeletonLine></p>
    <p><SkeletonLine>adipiscing elit, sed do eiusmod tempor incididunt ut</SkeletonLine></p>

    <SkeletonImage></SkeletonImage>
  </main>
</template>

<style scoped>
main {
  padding: 100px;
}
</style>
