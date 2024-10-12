<script setup lang="ts">
import { defineProps } from 'vue'

interface IProps {
  isDisabled?: boolean
}

const props = defineProps<IProps>()

const handleClick = () => {
  emit('submit-form')
}

const emit = defineEmits(['submit-form'])
</script>

<template>
  <button :disabled="isDisabled" @click="handleClick">Post</button>
</template>

<style scoped lang="scss">
button {
  border: none;
  color: var(--text-color);
  font-size: var(--size-xxs);
  padding: 12px 24px;
  background: linear-gradient(90deg, #161a31 3.4%, #06091f 100%);
  border-radius: 14px;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.7;
  }

  &[disabled] {
    filter: grayscale(1);
    cursor: not-allowed;
    pointer-events: none;
  }
}
</style>
