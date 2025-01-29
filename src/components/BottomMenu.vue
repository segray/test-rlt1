<script lang="ts" setup>
import SkeletonLine from "@/components/SkeletonLine.vue";
import ButtonClose from "@/components/ButtonClose.vue";
</script>

<template>
  <div class="bottom-menu frame">
    <ButtonClose></ButtonClose>
    <SkeletonLine class="bottom-menu__line"></SkeletonLine>
  </div>
</template>

<style scoped>
.bottom-menu {
  padding: 18px;
  width: 100%;
  position: relative;
}

.bottom-menu__line {
  height: 36px;
  width: 93%;
}
</style>
