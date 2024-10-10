<script setup lang="ts">
import LogoIcon from '@/assets/images/logo.svg'
</script>

<template>
 <router-link to="/">
  <logo-icon class="logo" />
 </router-link>
</template>

<style scoped lang="scss">
.logo {
 transition: opacity .3s ease-in-out;

 &:hover {
  opacity: 0.8;
 }
}
</style>
