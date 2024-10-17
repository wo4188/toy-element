<script setup lang="ts">
import { ref } from 'vue';
import type { ButtonProps } from "./types";

defineOptions(
  {
    name: "ToyButton",
  }
);

const props = withDefaults(defineProps<ButtonProps>(), {
  tag: "button",
  nativeType: "button",
});

const slots = defineSlots();

const _ref = ref<HTMLButtonElement | null>(null)
</script>

<template>
  <component
    :is="tag"
    ref="_ref"
    class="toy-button"
    :type="tag === 'button' ? nativeType : void 0"
    :disabled="(disabled || loading) ? true : void 0"
    :class="{
      [`toy-button--${type}`]: type,
      [`toy-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }">
    <slot></slot>
  </component>
</template>