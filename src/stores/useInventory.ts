import { defineStore } from "pinia";
import { toReadonly } from "@/utils/toReadonly";
import { useStorage } from "@vueuse/core";
import type { TInventoryItem } from "@/types/TInventoryItem";

type TInventorySlot =
  | {
      component: TInventoryItem;
      count: number;
    }
  | undefined;

const initialState: TInventorySlot[] = [
  { component: { name: "sample", attrs: { color: "#7FAA65" } }, count: 10 },
  { component: { name: "sample", attrs: { color: "#AA9765" } }, count: 8 },
  { component: { name: "sample", attrs: { color: "#656CAA" } }, count: 15 },
];

export const useInventoryStore = defineStore("inventory", () => {
  const data = useStorage<TInventorySlot[]>("inventory", []);

  if (data.value.length === 0) {
    data.value = initialState.slice();
  }

  const canMoveItem = (from: number, to: number) => {
    return (
      data.value[from] &&
      (!data.value[to] ||
        JSON.stringify(data.value[from].component) === JSON.stringify(data.value[to].component))
    );
  };

  const moveItem = (from: number, to: number, amount: number) => {
    if (!canMoveItem(from, to)) {
      return false;
    }

    // TODO: canMove type guard???
    if (!data.value[from]) {
      return false;
    }

    if (!data.value[to]) {
      data.value[to] = { component: data.value[from].component, count: 0 };
    }

    amount = Math.min(amount, data.value[from].count);

    data.value[to].count += amount;
    data.value[from].count -= amount;

    if (!data.value[from].count) {
      data.value[from] = undefined;
    }
  };

  const deleteItem = (index: number, amount: number) => {
    if (!data.value[index]) {
      return false;
    }

    data.value[index].count -= amount;
    if (data.value[index].count <= 0) {
      data.value[index] = undefined;
    }
  };

  const key = (index: number) => {
    return data.value[index] ? JSON.stringify(data.value[index]) : index;
  };

  return toReadonly({
    data,
    canMoveItem,
    moveItem,
    deleteItem,
    key,
  });
});
