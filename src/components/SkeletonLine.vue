<script setup lang="ts">
const props = defineProps<{
  width?: number
}>();
// TODO: тут хотел сделать привязку к lorem upsum строкам, но в макете размеры и положения скелетонов слишком хаотичны
</script>

<template>
  <span class="skeleton-line" :style="props.width ? {'width': props.width + 'px'} : {}"><del><slot>loremupsim</slot></del></span>
</template>

<style scoped>
.skeleton-line {
  background: linear-gradient(90deg, #3C3C3C 0%, #444444 51.04%, #333333 100%);
  border-radius: 6px;
  display: inline-block;
  line-height: 0.8em;
}

.skeleton-line del {
  visibility: hidden;
}
</style>
