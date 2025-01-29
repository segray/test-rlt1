<script lang="ts" setup>
import RightMenu from "./RightMenu.vue";
import AmountsForm from "./AmountsForm.vue";
import { useInventoryStore } from "@/stores/useInventory";
import { ref } from "vue";
import type { TInventoryItem } from "@/types/TInventoryItem";
import { AVAILABLE_ITEMS } from "@/types/TInventoryItem";

const inventoryStore = useInventoryStore();

// индексы ячеек, участвующие в транзакции
const dragIndex = ref<number>();
// TODO: форма с переносом открывается на dropIndex !== undefined, пока есть неконсистентность в состояниях
const dropIndex = ref<number>();

// текущий компонент в правом меню
const rightMenuComponent = ref<TInventoryItem>();

// v-model инпута из формы ввода количества
const amountInput = ref<string>();

// callback функция для валидации формы
const amountValidate = (input: string) => {
  const number = Number(input);
  return !!(
    dragIndex.value !== undefined &&
    number &&
    (inventoryStore.data[dragIndex.value]?.count ?? 0) >= number
  );
};

// callback для @confirm формы
const moveConfirm = (input: string) => {
  const number = Number(input);
  if (dragIndex.value !== undefined && dropIndex.value !== undefined && number) {
    inventoryStore.moveItem(dragIndex.value, dropIndex.value, number);
  }

  moveCancel();
};

// callback для @cancel формы
const moveCancel = () => {
  rightMenuComponent.value = undefined;
  dropIndex.value = undefined;
};


// тут дальше будет грязь с легаси драг-н-дропом ----------------------
const cellSelector = ".inventory__cell";
const itemSelector = ".inventory__item";

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

    // запомнили схваченый итем
    dragIndex.value = getCellIndex(target);

    event.dataTransfer!.setData("text/app-inventory", dragIndex.value.toString());
    event.dataTransfer!.effectAllowed = "move"; // TODO: должно изменить курсор. не меняет
  },

  dragenter: (event: DragEvent) => {
    const cell = matchTarget(event, cellSelector);
    if (!cell || dragIndex.value === undefined) {
      return;
    }

    // отменяем все стили для дроп таргетов
    cell.parentNode?.querySelectorAll(cellSelector).forEach((c) => {
      c.classList.remove("inventory__cell--drag-over");
    });

    // дефолтное поведение браузера, если попали не туда
    if (!inventoryStore.canMoveItem(dragIndex.value, getCellIndex(cell))) {
      return;
    }

    event.preventDefault();

    cell.classList.add("inventory__cell--drag-over");
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

    // запомнили индекс дроп таргета
    dropIndex.value = cellIndex;

    const data = inventoryStore.data[dragIndex.value!]!;

    // показ левого меню с формой для ввода количества
    amountInput.value = "" + data.count;
    rightMenuComponent.value = data.component;
  },

  dragend: (event: DragEvent) => {
    const cell = matchTarget(event, cellSelector);
    if (!cell) {
      return;
    }

    // если бросили элемент за пределами грида
    cell.parentNode?.querySelectorAll(cellSelector).forEach((c) => {
      c.classList.remove("inventory__cell--drag-over");
    });
  },
};
</script>

<template>
  <div class="inventory-container frame" v-on="dragEvents">
    <div class="inventory">
      <div v-for="(_, i) in 25" class="inventory__cell" :key="inventoryStore.key(i)" :data-index="i">
        <template v-if="inventoryStore.data[i]">
          <component
            :is="AVAILABLE_ITEMS[inventoryStore.data[i].component.name]"
            :="inventoryStore.data[i].component.attrs"
            :data-index="i"
            draggable="true"
            class="inventory__item"
          ></component>
          <div class="inventory__counter">{{ inventoryStore.data[i].count }}</div>
        </template>
      </div>
    </div>
    <div
      class="inventory__right-menu"
      :class="{ 'inventory__right-menu--hidden': !rightMenuComponent }"
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
.inventory-container {
  position: relative;

  background: var(--background-color-secondary);
  border-radius: 12px;
  border: 1px solid var(--border-color);

  overflow: hidden;
  max-height: 500px;
}

.inventory {
  width: calc(100% + 1px);
  height: calc(100% + 1px);
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
}

.inventory__item {
  width: 60%;
  height: 60%;
}

.inventory__cell {
  position: relative;

  border: 1px solid var(--border-color);
  border-top: none;
  border-left: none;

  display: flex;
  justify-content: center;
  align-items: center;
}

.inventory__cell--drag-over {
  background-color: hsl(from var(--background-color-secondary) h s 20%);
}

.inventory__counter {
  color: var(--color-primary);
  font-size: 10px;

  position: absolute;
  width: 16px;
  height: 16px;
  bottom: -1px;
  right: -1px;

  border-top-left-radius: 6px;
  border: 1px solid var(--border-color);

  display: flex;
  justify-content: center;
  align-items: center;

  pointer-events: none;
}

.inventory__right-menu {
  position: absolute;
  top: -1px;
  right: -1px;
  transition: transform 0.3s ease;
}

.inventory__right-menu--hidden {
  transform: translateX(101%);
}
</style>
