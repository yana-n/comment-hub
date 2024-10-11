<script setup lang="ts">
import IconComment from '@/assets/images/icons/comment.svg'
</script>

<template>
 <div class="wrapper">
  <icon-comment class="icon" />
  <span>5</span>
 </div>
</template>

<style scoped lang="scss">
.wrapper {
 display: flex;
 justify-content: center;
 align-items: center;
 gap: 4px;
 color: #9397AD;
}

.icon {
 cursor: pointer;
 transition: opacity .2s ease-in-out;

 &:hover {
  opacity: 0.8;
 }
}
</style>
