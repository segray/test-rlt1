<script lang="ts" setup>
import RightMenu from "./RightMenu.vue";
import AmountsForm from "./AmountsForm.vue";
import { useInventoryStore } from "@/stores/useInventory";
import { ref } from "vue";
import type { TInventoryItem } from "@/types/TInventoryItem";
import { AVAILABLE_ITEMS } from "@/types/TInventoryItem";

const inventoryStore = useInventoryStore();

const dragIndex = ref<number>();
const dropIndex = ref<number>();

const rightMenuComponent = ref<TInventoryItem>();

const amountInput = ref<string>();

const amountValidate = (input: string) => {
  const number = Number(input);
  return !!(
    dragIndex.value !== undefined &&
    number &&
    (inventoryStore.data[dragIndex.value]?.count ?? 0) >= number
  );
};

const moveConfirm = (input: string) => {
  const number = Number(input);
  if (dragIndex.value !== undefined && dropIndex.value !== undefined && number) {
    inventoryStore.moveItem(dragIndex.value, dropIndex.value, number);
  }

  moveCancel();
};

const moveCancel = () => {
  rightMenuComponent.value = undefined;
  dropIndex.value = undefined;
};

const cellSelector = ".inventory-cell";
const itemSelector = ".inventory-grid__item";

const matchTarget = (event: MouseEvent, selector: string) => {
  const target = event.target as HTMLElement;
  return target.closest(selector);
};

const getCellIndex = (cell: Element) => {
  return parseInt(cell.getAttribute("data-index") ?? "0");
};

const dragEvents = {
  dragstart: (event: DragEvent) => {
    const target = matchTarget(event, itemSelector);

    if (!target) {
      event.preventDefault();
      return;
    }

    dragIndex.value = getCellIndex(target);

    event.dataTransfer!.setData("text/app-inventory", dragIndex.value.toString());
    event.dataTransfer!.effectAllowed = "move";
  },

  dragenter: (event: DragEvent) => {
    const cell = matchTarget(event, cellSelector);
    if (!cell || dragIndex.value === undefined) {
      return;
    }

    cell.parentNode?.querySelectorAll(cellSelector).forEach((c) => {
      c.classList.remove("inventory-cell--drag-over");
    });

    if (!inventoryStore.canMoveItem(dragIndex.value, getCellIndex(cell))) {
      return;
    }

    event.preventDefault();

    cell.classList.add("inventory-cell--drag-over");
    event.dataTransfer!.dropEffect = "move";
  },

  dragover: (event: DragEvent) => {
    event.preventDefault();
  },

  drop: (event: DragEvent) => {
    const cell = matchTarget(event, cellSelector);
    if (!cell) {
      return;
    }

    const cellIndex = getCellIndex(cell);

    if (!inventoryStore.canMoveItem(dragIndex.value!, cellIndex)) {
      return;
    }

    event.preventDefault();

    dropIndex.value = cellIndex;

    const data = inventoryStore.data[dragIndex.value!]!;
    amountInput.value = "" + data.count;
    rightMenuComponent.value = data.component;
  },

  dragend: (event: DragEvent) => {
    const cell = matchTarget(event, cellSelector);
    if (!cell) {
      return;
    }

    cell.parentNode?.querySelectorAll(cellSelector).forEach((c) => {
      c.classList.remove("inventory-cell--drag-over");
    });
  },
};
</script>

<template>
  <div class="container frame" v-on="dragEvents">
    <div class="grid">
      <div v-for="(_, i) in 25" class="inventory-cell" :key="inventoryStore.key(i)" :data-index="i">
        <template v-if="inventoryStore.data[i]">
          <component
            :is="AVAILABLE_ITEMS[inventoryStore.data[i].component.name]"
            :="inventoryStore.data[i].component.attrs"
            :data-index="i"
            draggable="true"
            class="inventory-grid__item"
          ></component>
          <div class="counter">{{ inventoryStore.data[i].count }}</div>
        </template>
      </div>
    </div>
    <div
      class="inventory-grid-right-menu"
      :class="{ 'inventory-grid-right-menu--hidden': !rightMenuComponent }"
    >
      <RightMenu v-if="rightMenuComponent">
        <template #item>
          <component
            :is="AVAILABLE_ITEMS[rightMenuComponent.name]"
            :="rightMenuComponent.attrs"
          ></component>
        </template>
        <template #form v-if="dropIndex !== undefined">
          <AmountsForm
            :validate="amountValidate"
            @confirm="moveConfirm"
            @cancel="moveCancel"
            v-model="amountInput"
          >
          </AmountsForm>
        </template>
      </RightMenu>
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

.inventory-cell {
  position: relative;
  aspect-ratio: 1;

  border: 1px solid #4d4d4d;
  border-top: none;
  border-left: none;

  display: flex;
  justify-content: center;
  align-items: center;
}

.inventory-cell--drag-over {
  background-color: hsl(from var(--background-color-secondary) h s 20%);
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

  pointer-events: none;
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
