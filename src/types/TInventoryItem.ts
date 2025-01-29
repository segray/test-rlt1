import InventoryItem from "@/components/InventoryItem.vue"

export const AVAILABLE_ITEMS = {
  'sample': InventoryItem
} as const

export type TInventoryItem = {
  name: keyof typeof AVAILABLE_ITEMS;
  attrs: object;
};


