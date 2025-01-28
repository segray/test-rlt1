<script setup lang="ts">
// import defineProps from 'vue';
const props = defineProps<{
  color: string
}>();
</script>

<template>
  <div class="item" :style="{'--inventory-item-color': props.color}"></div>
</template>

<style scoped>
.item {
  position: relative;
}

.item::before, .item::after {
  content: '';
  width: 85%;
  height: 85%;
  position: absolute;
}

.item::after {
  position: absolute;
  top: 0;
  right: 0;
  background: rgb(from var(--inventory-item-color) r g b / 35%);
  filter: brightness(1.1);
  backdrop-filter: blur(18px);
}

.item::before {
  position: absolute;
  bottom: 0;
  left: 0;
  background: var(--inventory-item-color);
}
</style>
