<script setup lang="ts">
import type { StyleValue } from 'vue';
import { ref, computed, inject } from 'vue';
import type { ButtonProps, ButtonEmits, ButtonInstance } from "./types";
import { throttle } from 'lodash-es';
import { BUTTON_GROUP_CTX_KEY } from './constants';
import ToyIcon from '../Icon/Icon.vue';

defineOptions({
  name: "ToyButton",
});

const props = withDefaults(defineProps<ButtonProps>(), {
  tag: "button",
  nativeType: "button",
  throttleDuration: 1000,
});

const emits = defineEmits<ButtonEmits>();

const slots = defineSlots();

const btnGroupCtx = inject(BUTTON_GROUP_CTX_KEY, void 0);
const _ref = ref<HTMLButtonElement>();
const size = computed(() => {
  return btnGroupCtx?.size ?? props.size ?? "";
})
const type = computed(() => {
  return btnGroupCtx?.type ?? props.type ?? "";
})
const disabled = computed(() => {
  return props?.disabled || btnGroupCtx?.disabled || false;
})
const iconStyle = computed<StyleValue>(() => {
  return {
    marginRight: slots.default ? "6px" : "0px",
  }
});

const handleBtnClick = (e: MouseEvent) => emits("click", e);
const handleBtnClickThrottle = throttle(
  handleBtnClick,
  props.throttleDuration,
  { trailing: false }
);

defineExpose<ButtonInstance>({
  ref: _ref,
  disabled,
  size,
  type,
})
</script>

<template>
  <component
    ref="_ref"
    class="toy-button"
    :is="tag"
    :autofocus="autofocus"
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
    }"
    @click="(e: MouseEvent) =>
      useThrottle ? handleBtnClickThrottle(e) : handleBtnClick(e)
      ">
    <slot v-if="loading" name="loading">
      <toy-icon
        class="loading-icon"
        :icon="loadingIcon ?? 'spinner'"
        :style="iconStyle"
        size="1x"
        spin />
    </slot>
    <toy-icon
      v-else-if="icon && !loading"
      :icon="icon"
      size="1x" />
    <slot></slot>
  </component>
</template>

<style scoped>
@import "./style.css";
</style>
