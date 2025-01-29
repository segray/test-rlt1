<script lang="ts" setup>
import InventoryItem from "@/components/InventoryItem.vue";
import RightMenu from "./RightMenu.vue";
import { useInventoryStore } from "@/stores/useInventory";

const inventoryStore = useInventoryStore();
</script>

<template>
  <div class="container frame">
    <div class="grid">
      <div v-for="(_, i) in 25" class="cell" :key="inventoryStore.key(i)">
        <template v-if="inventoryStore.data[i]">
          <InventoryItem
            :color="inventoryStore.data[i].color"
            class="inventory-grid__item"
          ></InventoryItem>
          <div class="counter">{{ inventoryStore.data[i].count }}</div>
        </template>
      </div>
    </div>
    <div class="inventory-grid-right-menu inventory-grid-right-menu--hidden">
      <RightMenu></RightMenu>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;

  background: #262626;
  border-radius: 12px;
  border: 1px solid #4d4d4d;

  overflow: hidden;
  overflow-y: auto;
  scrollbar-width: thin;
  max-height: 500px;
}

.grid {
  width: 100%;
  margin-right: -1px;
  margin-bottom: -1px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
}

.inventory-grid__item {
  width: 60%;
  height: 60%;
}

.cell {
  position: relative;
  aspect-ratio: 1;

  border: 1px solid #4d4d4d;
  border-top: none;
  border-left: none;

  display: flex;
  justify-content: center;
  align-items: center;
}

/* counter */
.counter {
  font-family: Inter, sans-serif;
  color: white;
  font-size: 10px;

  position: absolute;
  width: 16px;
  height: 16px;
  bottom: -1px;
  right: -1px;

  border-top-left-radius: 6px;
  border: 1px solid #4d4d4d;

  display: flex;
  justify-content: center;
  align-items: center;
}

.inventory-grid-right-menu {
  position: absolute;
  top: -1px;
  right: -1px;
  transition: transform 0.3s ease;
}

.inventory-grid-right-menu--hidden {
  transform: translateX(101%);
}
</style>
