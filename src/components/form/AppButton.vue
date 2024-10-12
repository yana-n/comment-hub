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
 background: linear-gradient(90deg, #F6B8FD -7%, #316AD7 114%);
 border-radius: 4px;
 border: none;
 cursor: pointer;
 transition: opacity .2s ease-in-out;

 &:hover {
  opacity: 0.8;
 }
}
</style>
