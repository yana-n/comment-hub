<script setup lang="ts">
interface IProps {
  text: string
}

const props = defineProps<IProps>()
</script>

<template>
  <button class="btn">{{ text }}</button>
</template>

<style scoped lang="scss">
.btn {
  padding: 18px;
  color: var(--text-color);
  font-size: var(--size-lg);
  font-weight: 700;
  line-height: 1;
  background: linear-gradient(90deg, #f6b8fd -7%, #316ad7 114%);
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
}
</style>
