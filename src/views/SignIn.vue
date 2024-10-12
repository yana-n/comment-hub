<script setup lang="ts">
import LoginLayout from '@/layouts/LoginLayout.vue'
import { ref } from 'vue'
import AppForm from '@/components/form/AppForm.vue'

const notice = ref({
  text: 'Don’t have account?',
  btn: {
    text: 'Sign Up',
    pathName: 'SignUp',
  },
})
</script>

<template>
  <LoginLayout :notice>
    <app-form :type="'signIn'" />
  </LoginLayout>
</template>
