<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';

const title = 'A small selection of <span>recent projects</span>';
const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod ligula quis lacus fermentum, vitae vulputate sem tristique. Nunc justo orci, porta in luctus eget, ultrices vitae justo. Mauris dignissim laoreet mi, a commodo libero volutpat non. Maecenas aliquam sed leo eu blandit. Nam vehicula rhoncus libero ut porttitor. Proin urna tortor, bibendum at faucibus auctor, cursus sit amet odio. In hac habitasse platea dictumst. Proin ac tortor vel tortor auctor pellentesque eget nec nisl. Phasellus pulvinar varius tortor sed sagittis. Etiam aliquam consectetur purus fringilla varius. Maecenas nec dolor dolor. Cras faucibus malesuada luctus. Nam auctor vel tortor eget congue. Fusce porta imperdiet ante scelerisque ullamcorper. Pellentesque luctus ullamcorper lectus faucibus fringilla. Aenean tristique efficitur iaculis. Aliquam eu egestas mi, quis tristique justo. Donec eu ante at tellus eleifend pellentesque. Curabitur fermentum lectus eu erat porta, id sagittis sem aliquet. Integer aliquet vehicula lectus, nec finibus nibh tincidunt eu. Vestibulum quis dui nisi. In a pharetra enim, id blandit quam. Sed lobortis ligula enim, egestas aliquam purus facilisis et. Phasellus vitae leo a ligula commodo ultrices sed non elit.';
</script>

<template>
 <DefaultLayout
   :title
   :text
   image-name="projects"
 >
  <p>This is the About page.</p>
 </DefaultLayout>
</template>
