<script setup lang="ts">
import InventoryGrid from '@/components/InventoryGrid.vue'
import LeftMenu from '@/components/LeftMenu.vue'
import BottomMenu from '@/components/BottomMenu.vue'
</script>

<template>
  <main>
    <div class="content">
      <div class="row">
        <LeftMenu></LeftMenu>
        <InventoryGrid class="app-grid" />
      </div>
      <div class="row">
        <BottomMenu class="app-bottom-menu"></BottomMenu>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 780px;
}

.row {
  display: flex;
  flex-direction: row;
  gap: 24px;
}

.app-grid {
  width: 525px;
}

.app-bottom-menu {
  width: 100%;
}
</style>
