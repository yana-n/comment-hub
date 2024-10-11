<script setup lang="ts">
import AppCommentForm from "@/components/comments/AppCommentForm.vue";
import AppCommentBlock from "@/components/comments/AppCommentBlock.vue";
</script>

<template>
 <div class="section">
  <app-comment-form />
  <app-comment-block />
 </div>
</template>

<style scoped lang="scss">
.section {
 max-width: 100%;
 width: 660px;
 display: flex;
 flex-direction: column;
 gap: 40px;
}
</style>
