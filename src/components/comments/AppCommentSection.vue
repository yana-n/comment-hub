<script setup lang="ts">
import { useComments } from '@/composables/useComments';
import AppCommentForm from "@/components/comments/AppCommentForm.vue";
import AppCommentBlock from "@/components/comments/AppCommentBlock.vue";
import {onMounted} from "vue";

const { comments, getComments } = useComments();

onMounted(async () => {
 try {
  comments.value = await getComments();
 } catch (error) {
  console.error('Error fetching comments:', error);
 }
});
</script>

<template>
 <div class="section">
  <app-comment-form class="form" />

  <div v-for="comment in comments" :key="comment.id">
   <app-comment-block :comment="comment" />
  </div>
 </div>
</template>

<style scoped lang="scss">
.section {
 max-width: 100%;
 width: 660px;
 display: flex;
 flex-direction: column;
}

.form {
 margin-bottom: 40px;
}
</style>
