<script setup lang="ts">
</script>

<template>
  <span class="skeleton-line"><del><slot>loremupsim</slot></del></span>
</template>

<style scoped>
.skeleton-line {
  background: linear-gradient(90deg, #3C3C3C 0%, #444444 51.04%, #333333 100%);
  border-radius: 0.3em;
  display: inline-block;
  line-height: 0.8em;
}

.skeleton-line del {
  visibility: hidden;
}
</style>
