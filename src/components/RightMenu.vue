<script lang="ts" setup>
import SkeletonLine from "@/components/SkeletonLine.vue";
import ButtonClose from "@/components/ButtonClose.vue";

const emits = defineEmits<{
  (e: "close"): void;
}>();

// TODO: по идее тут скелетоны должны быть привязаны к инспектируемому элементу, пока оставил так
</script>

<template>
  <div class="right-menu">
    <ButtonClose class="right-menu__close" @click="emits('close')"></ButtonClose>

    <div class="right-menu__image">
      <slot name="item"></slot>
    </div>

    <SkeletonLine class="right-menu__divider" :width="220"></SkeletonLine>

    <SkeletonLine class="right-menu__title" :width="211"></SkeletonLine>

    <div class="right-menu__text">
      <SkeletonLine class="right-menu__line" :width="211"></SkeletonLine>
      <SkeletonLine class="right-menu__line" :width="211"></SkeletonLine>
      <SkeletonLine class="right-menu__line" :width="211"></SkeletonLine>
      <SkeletonLine class="right-menu__line" :width="180"></SkeletonLine>
      <SkeletonLine class="right-menu__line" :width="80"></SkeletonLine>
    </div>

    <SkeletonLine class="right-menu__divider" :width="220"></SkeletonLine>

    <div class="right-menu__embedded">
      <slot name="form"></slot>
    </div>
  </div>
</template>

<style scoped>
.right-menu {
  position: relative;

  width: 250px;
  height: 500px;

  border: 1px solid var(--border-color);
  background: rgb(from var(--background-color-secondary) r g b / 50%);
  backdrop-filter: blur(16px);

  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}

.right-menu__image > * {
  width: 130px;
  height: 130px;
  margin: 55px 60px;
  margin-bottom: 30px;
}

.right-menu__title {
  height: 30px;
  margin: 16px 0;
}

.right-menu__divider {
  height: 1px;
}

.right-menu__line {
  margin: 8px 0;
  height: 10px;
}

.right-menu__text {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
}

.right-menu__embedded {
  background-color: var(--background-color-secondary);
  border-top: 1px solid var(--border-color);
  padding: 20px;
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
