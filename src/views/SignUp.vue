<script setup lang="ts">
import LoginLayout from '@/layouts/LoginLayout.vue';
import {ref} from "vue";
import AppForm from "@/components/form/AppForm.vue";

const notice = ref({
 text: 'Already have an account?',
 btn: {
  text: 'Login',
  pathName: 'SignIn',
 }
})
</script>

<template>
 <LoginLayout :notice>
  <app-form :type="'signUp'" />
 </LoginLayout>
</template>
