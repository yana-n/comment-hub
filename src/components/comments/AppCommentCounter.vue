<script setup lang="ts">
import IconComment from '@/assets/images/icons/comment.svg'
import { defineProps } from 'vue'
import AppIconWithCounter from '@/components/AppIconWithCounter.vue'

const props = defineProps<{
  count: number
}>()
</script>

<template>
  <app-icon-with-counter :count>
    <icon-comment />
  </app-icon-with-counter>
</template>
