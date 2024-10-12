<script setup lang="ts">
import { defineProps } from 'vue'

interface IProps {
  count: number
}

const props = defineProps<IProps>()
</script>

<template>
  <div class="wrapper">
    <span class="icon">
      <slot />
    </span>
    <span>{{ count }}</span>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  color: #9397ad;
}

.icon {
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
}
</style>
