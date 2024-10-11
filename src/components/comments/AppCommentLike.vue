<script setup lang="ts">
import IconLike from '@/assets/images/icons/like.svg'
</script>

<template>
 <div class="wrapper">
  <icon-like class="icon" />
  <span>1</span>
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
