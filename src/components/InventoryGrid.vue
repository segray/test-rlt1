<script lang="ts" setup>
</script>

<template>
  <div class="container">
    <div class="grid">
      <div v-for="i in 250" class="cell" :key="i">
        <div class="counter">{{ i }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  background: #262626;
  border-radius: 12px;
  border: 1px solid #4D4D4D;
  overflow: hidden;
  overflow-y: auto;
  max-height: 500px;
}

.grid {
  margin-right: -1px;
  margin-bottom: -1px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
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

  color: #FFFFFF;
  font-size: 10px;;
}

</style>
