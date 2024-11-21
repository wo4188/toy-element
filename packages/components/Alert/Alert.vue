<script setup lang="ts">
import { ref, computed, useSlots } from "vue";
import type { AlertProps, AlertEmits, AlertInstance } from "./types";
import { typeIconMap } from "@toy-view/utils";
import ToyIcon from "../Icon/Icon.vue";

defineOptions({
  name: "ToyAlert",
});

const props = withDefaults(defineProps<AlertProps>(), {
  effect: "light",
  type: "info",
  closable: true,
});

const emits = defineEmits<AlertEmits>();

const slots = useSlots();

const visible = ref(true);

const iconName = computed(() => {
  return typeIconMap.get(props.type) ?? "circle-info";
});
const withDesc = computed(() => {
  return props.description || slots.default;
});

function close() {
  visible.value = false;
  emits("close");
}

function open() {
  visible.value = true;
}

defineExpose<AlertInstance>({
  open,
  close,
});
</script>

<template>
  <transition name="toy-alert-fade">
    <div
      v-show="visible"
      class="toy-alert"
      role="alert"
      :class="{
        [`toy-alert__${type}`]: type,
        [`toy-alert__${effect}`]: effect,
        'text-center': center,
      }">
      <toy-icon
        v-if="showIcon"
        class="toy-alert__icon"
        :class="{ 'big-icon': withDesc }"
        :icon="iconName" />
      <div class="toy-alert__content">
        <span
          class="toy-alert__title"
          :class="{ 'with-desc': withDesc }"
          :style="{ display: center && !showIcon ? 'block' : 'inline' }">
          <slot name="title">{{ title }}</slot>
        </span>
        <p class="toy-alert__description">
          <slot>{{ description }}</slot>
        </p>
        <div v-if="closable" class="toy-alert__close">
          <toy-icon icon="xmark" @click.stop="close" />
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
@import "./style.css";
</style>
