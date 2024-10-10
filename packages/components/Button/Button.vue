<script setup lang="ts">
defineOptions(
  {
    name: "ToyButton",
  }
);
</script>

<template>
  <button style="background-color: blue; color: red;">
    <slot />
  </button>
</template>