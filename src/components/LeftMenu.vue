<script lang="ts" setup>
import SkeletonLine from "@/components/SkeletonLine.vue";
import SkeletonImage from "@/components/SkeletonImage.vue";
</script>

<template>
  <div class="left-menu frame">
    <SkeletonImage class="left-menu__image"></SkeletonImage>
    <SkeletonLine class="left-menu__title"></SkeletonLine>
    <SkeletonLine class="left-menu__line" :width="155"></SkeletonLine>
    <SkeletonLine class="left-menu__line" :width="190"></SkeletonLine>
    <SkeletonLine class="left-menu__line" :width="170"></SkeletonLine>
    <SkeletonLine class="left-menu__line" :width="160"></SkeletonLine>
    <SkeletonLine class="left-menu__line" :width="140"></SkeletonLine>
    <SkeletonLine class="left-menu__line" :width="80"></SkeletonLine>
  </div>
</template>

<style scoped>
.left-menu {
  width: 236px;
  height: 500px;
  padding-top: 18px;

  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}

.left-menu__image {
  width: 208px;
  height: 240px;
}

.left-menu__title {
  width: 190px;
  height: 26px;
  margin: 20px 0;
}

.left-menu__line {
  margin-top: 4px;
  margin-bottom: 12px;
  height: 10px;
}

.left-menu__line:last-child {
  margin-top: 12px;
}
</style>
