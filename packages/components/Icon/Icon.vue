<script setup lang="ts">
import type { StyleValue } from 'vue';
import { computed } from 'vue';
import type { IconProps } from "./types";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { omit } from 'lodash-es';

defineOptions({
  name: "ToyIcon",
});

const props = defineProps<IconProps>();

const filterProps = computed(() => {
  return omit(props, ["type", "color"]);
});

const customStyles = computed<StyleValue>(() => {
  return { color: props.color ?? void 0 };
});
</script>

<template>
  <i
    class="toy-icon"
    :class="{ [`toy-icon--${type}`]: type }"
    :style="customStyles">
    <font-awesome-icon v-bind="filterProps" />
  </i>
</template>

<style>
@import "./style.css";
</style>
