<script setup lang="ts">
import {defineProps, ref} from 'vue';
import AppMenu from "@/components/AppMenu.vue";

interface IProps {
 title?: string;
 text?: string;
 imageName?: string;
}

const props = defineProps<IProps>();

const imgSrc = ref(import.meta.env.BASE_URL + `images/${props.imageName}.jpg`);

const menuItems = ref([
 { name: 'About', path: '/about' },
 { name: 'Projects', path: '/' },
 { name: 'Testimonials', path: '/testimonials' },
 { name: 'Contact', path: '/contacts' }
]);
</script>

<template>
 <div class="container">
  <app-menu class="menu" :menuItems="menuItems" />

  <img
    v-if="imageName"
    :src="imgSrc"
    alt="Page Image"
  >
  <h1 v-html="title" />
  <p class="text" v-html="text" />
  <slot />
 </div>
</template>

<style lang="scss">
.menu {
 margin-bottom: 95px;
}

.text {
 margin-bottom: 40px;
}
</style>
