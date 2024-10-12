<script setup lang="ts">
import AppCommentBubble from "@/components/comments/AppCommentBubble.vue";
import AppAvatar from "@/components/AppAvatar.vue";
</script>

<template>
 <div class="block">
  <app-avatar class="avatar" name="Test" />
  <app-comment-bubble
    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod ligula quis lacus fermentum, vitae vulputate sem tristique. Nunc justo orci, porta in luctus eget, ultrices vitae justo. Mauris dignissim laoreet mi, a commodo libero volutpat non. Maecenas aliquam sed leo eu blandit. Nam vehicula rhoncus libero ut porttitor. Proin urna tortor, bibendum at faucibus auctor, cursus sit amet odio. In hac habitasse platea dictumst. "
    name="Test Name"
    date="10-10-2021"
    :comments-count="10"
    :likes="5"
  />
 </div>
</template>

<style scoped lang="scss">
.block {
 display: flex;
 align-items: flex-start;
 justify-content: center;
 gap: 20px;
}

.avatar {
 flex-shrink: 0;
}
</style>
