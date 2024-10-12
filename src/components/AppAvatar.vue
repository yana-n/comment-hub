<script setup lang="ts">
import {computed, defineProps} from "vue";

interface IProps {
 name: string;
 src?: string;
}

const props = defineProps<IProps>();

const letter = computed(() => props.name[0])
</script>

<template>
 <img v-if="src" :src class="avatar image" alt="User Avatar" />
 <div v-else class="avatar text">
  <span>{{ letter }}</span>
 </div>
</template>

<style scoped lang="scss">
.avatar {
 width: 48px;
 height: 48px;
 border-radius: 50%;

 &.image {
  object-fit: cover;
  overflow: hidden;
 }

 &.text {
  background: #242d92;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-transform: uppercase;
  color: var(--text-color);
 }
}
</style>
