<script setup lang="ts">
import {defineProps} from 'vue';
import AppLoginBtn from "@/components/AppLoginBtn.vue";

interface IMenuItem {
 path: string;
 name: string;
}

const props = defineProps<{
 menuItems: IMenuItem[];
}>();
</script>

<template>
 <nav class="menu">
  <ul class="menu-list">
   <li v-for="({ path, name }, index) in menuItems" :key="index">
    <router-link :to="path">{{ name }}</router-link>
   </li>
   <app-login-btn />
  </ul>
 </nav>
</template>

<style scoped lang="scss">
.menu {
 display: flex;
 align-items: center;
 justify-content: center;

 &-list {
  padding: 24px 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 32px;
  list-style: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: linear-gradient(104deg, #04071D 16.5%, #0C0E23 81.5%);

  a {
   position: relative;
   color: var(--text-color);

   &.router-link-active::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 7px;
    height: 7px;
    background-color: var(--text-color);
    border-radius: 50%;
   }

   &:hover {
    color: var(--accent-color);
   }
  }
 }
}
</style>
