<script lang="ts" setup>
import InventoryItem from '@/components/InventoryItem.vue'
import RightMenu from './RightMenu.vue';
</script>

<template>
  <div class="container frame">
    <div class="grid">
      <div class="cell">
        <InventoryItem color="#7FAA65" class="item"></InventoryItem>
        <div class="counter">10</div>
      </div>
      <div class="cell">
        <InventoryItem color="#AA9765" class="item"></InventoryItem>
        <div class="counter">10</div>
      </div>
      <div class="cell">
        <InventoryItem color="#656CAA" class="item"></InventoryItem>
        <div class="counter">10</div>
      </div>
      <div v-for="i in 250" class="cell" :key="i">
        <div class="counter">{{ i }}</div>
      </div>
    </div>
    <div class="inventory-grid-right-menu">
      <RightMenu></RightMenu>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;

  background: #262626;
  border-radius: 12px;
  border: 1px solid #4D4D4D;

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

.item {
  width: 60%;
  height: 60%;
}

.cell {
  position: relative;
  aspect-ratio: 1;

  border: 1px solid #4D4D4D;
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
  border: 1px solid #4D4D4D;

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
