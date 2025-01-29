import type { DeepReadonly } from "vue";

// хак для статической проверки на неизменяемость сторов извне
// readonly и computed не гидрируют состояние и ломают dev tools
export const toReadonly = <Type>(value: Type) => {
  return value as DeepReadonly<Type>;
};
