<script setup lang="ts">
import type { CollapseProps, CollapseEmits, CollapseItemName } from "./types";
import { ref, provide, watch, watchEffect } from "vue";
import { COLLAPSE_CTX_KEY } from "./constants";

defineOptions({
  name: "ToyCollapse",
});

const props = defineProps<CollapseProps>();

const emits = defineEmits<CollapseEmits>();

const activeNames = ref(props.modelValue);

function handleItemClick(item: CollapseItemName) {
  let _acativeNames = [...activeNames.value];

  if (props.accordion) {
    _acativeNames = [_acativeNames[0] === item ? "" : item];
    updateActiveNames(_acativeNames);
    return;
  }

  const idx = _acativeNames.indexOf(item);
  if (idx > -1) {
    _acativeNames.splice(idx, 1);
  } else {
    _acativeNames.push(item);
  }
  updateActiveNames(_acativeNames);
}

function updateActiveNames(newNames: CollapseItemName[]) {
  activeNames.value = newNames;
  emits("update:modelValue", newNames);
  emits("change", newNames);
}

watchEffect(() => {
  if (props.accordion && activeNames.value.length > 1) {
    console.warn(
      // 手风琴模式：每次只能展开一个面板
      "[Collapse] accordion mode should only have one active item"
    );
  }
});

watch(
  () => props.modelValue,
  (newNames) => updateActiveNames(newNames)
);

provide(COLLAPSE_CTX_KEY, {
  activeNames,
  handleItemClick,
});
</script>

<template>
  <div class="toy-collapse">
    <slot></slot>
  </div>
</template>

<style scoped>
@import "./style.css";
</style>
