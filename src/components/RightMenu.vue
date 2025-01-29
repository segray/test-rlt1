<script lang="ts" setup>
import SkeletonLine from "@/components/SkeletonLine.vue";
import InventoryItem from "@/components/InventoryItem.vue";
import ButtonClose from "@/components/ButtonClose.vue";
</script>

<template>
  <div class="right-menu">
    <ButtonClose class="right-menu__close"></ButtonClose>

    <component :is="InventoryItem" class="right-menu__image" color="#7FAA65"></component>
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
      <slot>
        <div class="embedded-form">
          <input type="text" placeholder="Введите количество" inputmode="numeric" />
          <div class="embedded-form__buttons">
            <button class="embedded-form__cancel">Отмена</button>
            <button class="embedded-form__confirm">Подтвердить</button>
          </div>
        </div>
      </slot>
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

.right-menu__image {
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

.embedded-form {
  display: flex;
  flex-direction: column;
}

.embedded-form__buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.embedded-form input {
  width: 100%;
  border: 1px solid var(--border-color);
  background-color: var(--background-color-secondary);
  height: 40px;
  border-radius: 4px;
  padding: 12px;

  margin-bottom: 20px;
}

.embedded-form__buttons button {
  width: 100%;
  height: 33px;
  border-radius: 8px;
  border: none;
  outline: none;
}

.embedded-form__cancel {
  flex: 2;
  background-color: #FFFFFF;
  color: #2D2D2D;
}

.embedded-form__confirm {
  flex: 3;
  background-color: #FA7272;
  color: #FFFFFF;
}
</style>
