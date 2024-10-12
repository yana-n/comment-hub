<template>
  <div v-if="toasts.length" class="toaster">
    <div
      v-for="(toast, index) in toasts"
      :key="index"
      :class="['toast', toast.type]"
    >
      <p class="message">{{ toast.message }}</p>
      <button class="close" @click="removeToast(index)">×</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToaster } from '@/composables/useToaster'

const { toasts } = useToaster()

const removeToast = (index: number) => {
  toasts.value.splice(index, 1)
}
</script>

<style lang="scss" scoped>
.toaster {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
}

.toast {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  margin-bottom: 10px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  animation:
    fadein 0.5s,
    fadeout 0.5s 4.5s;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  &.success {
    background-color: #4caf50;
  }

  &.error {
    background-color: #ff574b;
  }

  &.info {
    background-color: #3790d6;
  }
}

.message {
  line-height: 1;
  margin: 0;
  font-weight: 400;
}

.close {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
}

@keyframes fadein {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeout {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
