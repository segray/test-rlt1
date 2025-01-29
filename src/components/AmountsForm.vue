<script setup lang="ts">
import { computed, onMounted, useTemplateRef } from "vue";

// Форма ввода количества элементов
// Форма встраиватся в меню. Могут быть другие формы и точки монтирования

const props = withDefaults(
  defineProps<{
    validate?: (input: string) => boolean;
  }>(),
  {
    validate: () => true,
  }
);

const model = defineModel<string>();

const isValid = computed(() => props.validate(model.value!));

const emits = defineEmits<{
  (e: "confirm", input: string): void;
  (e: "cancel"): void;
}>();

const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    if (isValid.value) {
      emits("confirm", model.value!);
    }
  } else if (event.key === "Escape") {
    emits("cancel");
  }
};

const inputRef = useTemplateRef("input-ref");

onMounted(() => {
  setTimeout(() => {
    inputRef.value?.focus();
    // TODO: без таймаута будет дребезжание интерфейса
  }, 400);
});

defineExpose({
  focus: () => inputRef.value!.focus(),
});
</script>

<template>
  <div class="embedded-form">
    <input
      ref="input-ref"
      type="text"
      placeholder="Введите количество"
      inputmode="numeric"
      v-model="model"
      @keydown="onKeyDown"
      :class="{ invalid: !isValid }"
    />
    <div class="embedded-form__buttons">
      <button class="embedded-form__cancel" @click="emits('cancel')">Отмена</button>
      <button class="embedded-form__confirm" :disabled="!isValid" @click="emits('confirm', model!)">
        Подтвердить
      </button>
    </div>
  </div>
</template>

<style scoped></style>
