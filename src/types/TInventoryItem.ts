import InventoryItemSample from "@/components/InventoryItemSample.vue"

export const AVAILABLE_ITEMS = {
  // можно добавить другие компоненты инвентаря
  'sample': InventoryItemSample
} as const

// plain object представление компонента инвентаря для сериализации
export type TInventoryItem = {
  name: keyof typeof AVAILABLE_ITEMS;
  attrs: object;
};


