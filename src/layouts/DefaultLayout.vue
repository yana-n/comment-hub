<script setup lang="ts">
import {defineProps, ref} from 'vue';
import AppMenu from "@/components/UI/AppMenu.vue";

interface LayoutProps {
 title?: string;
 text?: string;
 imageName?: string;
}

const props = defineProps<LayoutProps>();

const imgSrc = ref(import.meta.env.BASE_URL + `images/${props.imageName}.jpg`);

const menuItems = ref([
 { name: 'About', path: '/about' },
 { name: 'Projects', path: '/' },
 { name: 'Testimonials', path: '/testimonials' },
 { name: 'Contact', path: '/contacts' }
]);
</script>

<template>
 <header class="menu">
  <app-menu :menuItems="menuItems" />
 </header>

 <main class="container">
  <img
    v-if="imageName"
    :src="imgSrc"
    alt="Page Image"
  >
  <h1 v-html="title" />
  <p class="text" v-html="text" />
  <slot />
 </main>
</template>

<style lang="scss">
@import "@/assets/styles/global.scss";

.menu {
 margin-bottom: 95px;
}

.text {
 margin-bottom: 40px;
}
</style>
