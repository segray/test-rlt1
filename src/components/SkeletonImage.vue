<script setup lang="ts">
// TODO: компонент пока инстанцирется в одном месте. Пока не придумал как его универсализовать.
</script>

<template>
  <div class="skeleton-image"><div class="skeleton-image__front"></div></div>
</template>

<style scoped>
.skeleton-image {
  width: 208px;
  height: 240px;
  border-radius: 18px;
  overflow: hidden;
}

.skeleton-image__front {
  width: 100%;
  height: 100%;

  background-image: url("/nicebg.png");
  background-position: -250px -480px;
  filter: blur(6px);
}
</style>
