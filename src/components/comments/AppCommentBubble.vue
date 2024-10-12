<script setup lang="ts">
import AppCommentLike from "@/components/comments/AppCommentLike.vue";
import AppCommentCounter from "@/components/comments/AppCommentCounter.vue";
import {defineProps} from "vue";

interface IProps {
 name: string;
 date: Date;
 text: string;
 likes: number;
 commentsCount: number;
}

const props = defineProps<IProps>();
</script>

<template>
<div class="bubble">
 <div class="top">
  <div class="name">{{ name }}</div>
  <div class="date">{{ date }}</div>
 </div>
 <div class="text">
  {{ text }}
 </div>
 <div class="bottom">
  <app-comment-like :likes />
  <app-comment-counter :count="commentsCount" />
 </div>
</div>
</template>

<style scoped lang="scss">
.bubble {
 display: flex;
 flex-direction: column;
 gap: 20px;
 padding: 15px;
 background: #10132E;
 border: 1px solid #B4B7C9;
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
 color: #9397AD;
}
</style>
