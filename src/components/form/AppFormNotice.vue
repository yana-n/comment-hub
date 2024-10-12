<script setup lang="ts">
import {IFormNotice} from "@/types/components";

interface IProps {
 notice?: IFormNotice
}

const props = defineProps<IProps>();
</script>

<template>
 <div class="notice">
  <p>{{ notice.text }}</p>
  <router-link :to="{ name: notice.btn.pathName }">{{ notice.btn.text }}</router-link>
 </div>
</template>

<style scoped lang="scss">
p, a {
 font-size: var(--size-xs);
}

p {
 margin-right: 6px;
 opacity: .8;
}

a {
 font-weight: 700;
 color: var(--text-color);

 &:hover {
  color: var(--accent-color);
 }
}
</style>
