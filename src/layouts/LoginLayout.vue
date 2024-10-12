<script setup lang="ts">
import AppLogo from "@/components/AppLogo.vue";
import AppFormNotice from "@/components/form/AppFormNotice.vue";
import {IFormNotice} from "@/types/components";

interface IProps {
 notice?: IFormNotice
}

const props = defineProps<IProps>();
</script>

<template>
 <div class="page">
  <img src="/images/flickers/top.png" class="flicker flicker-top" alt="Flicker #1">
  <img src="/images/flickers/bottom.png" class="flicker flicker-bottom" alt="Flicker #2">

  <div class="container">
   <app-logo class="logo" />
   <slot />
   <app-form-notice :notice />
  </div>
 </div>
</template>

<style lang="scss">
.page {
 position: relative;
 height: 100vh;
 width: 100%;
 background: url("/images/bg-register.png") no-repeat center / cover;
}

.flicker {
 position: absolute;
 width: 120px;

 &-top {
  right: 0;
  top: 6%;
 }

 &-bottom {
  bottom: 15%;
 }
}

.container {
 position: relative;
 margin: 0 auto;
 padding: 40px 10px;
 max-width: 1570px;
 display: flex;
 flex-direction: column;
 justify-content: space-between;
 align-items: center;
 height: 100%;
 z-index: 10;
}

.logo, .notice {
 align-self: flex-start;
}

.notice {
 display: flex;
 align-items: center;
 justify-content: center;
}
</style>
