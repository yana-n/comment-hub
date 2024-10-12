<script setup lang="ts">
import AppCommentLike from '@/components/comments/AppCommentLike.vue'
import AppCommentCounter from '@/components/comments/AppCommentCounter.vue'
import { defineProps } from 'vue'
import { prettifyDate } from '@/utils'

interface IProps {
  id: string
  name: string
  date: string
  text: string
  likes: number
  commentsCount: number
  parentPath?: string
}

const props = defineProps<IProps>()
const emit = defineEmits(['counter-click'])

const handleCounterClick = () => {
  emit('counter-click')
}
</script>

<template>
  <div class="bubble">
    <div class="top">
      <div class="name">{{ name }}</div>
      <div class="date">{{ prettifyDate(date) }}</div>
    </div>
    <div class="text">
      {{ text }}
    </div>
    <div class="bottom">
      <app-comment-like
        :comment-id="id"
        :parent-path="parentPath"
        :initial-likes="likes || 0"
      />
      <app-comment-counter
        :count="commentsCount"
        @click="handleCounterClick"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.bubble {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 15px;
  background: #10132e;
  border: 1px solid #b4b7c9;
  border-radius: 14px;
  font-size: var(--size-xxs);
  font-weight: 300;
}

.top {
  display: flex;
  justify-content: space-between;
}

.text {
  margin: 0;
  line-height: 1.75;
}

.bottom {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-left: auto;
}

.name {
  font-weight: 600;
}

.date {
  font-size: var(--size-xxxs);
  color: #9397ad;
}
</style>
