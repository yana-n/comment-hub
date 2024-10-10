<script setup lang="ts">
import AppButton from "@/components/form/AppButton.vue";
import AppInput from "@/components/form/AppInput.vue";
import { ref, computed } from "vue";

interface Props {
 type: 'signIn' | 'signUp';
}

const props = defineProps<Props>();

const isLogin = computed(() => props.type === 'signIn');

const title = isLogin.value ? 'Sign In' : 'Sign Up'

const name = ref('');
const email = ref('');
const password = ref('');
const passwordConfirmation = ref('');

const handleSubmit = () => {
 const formData = {
  name: name.value,
  email: email.value,
  password: password.value,
  passwordConfirmation: passwordConfirmation.value,
 };

 console.log('Form Data:', formData);
};
</script>

<template>
 <div class="form-wrapper">
  <h1>{{ title }}</h1>
  <p>Ready to become part of the exclusive club? Fill in the details below, and let the journey begin!</p>
  <form class="form" @submit.prevent="handleSubmit">
   <app-input v-if="!isLogin" v-model="name" type="text" placeholder="Name" name="name" />
   <app-input type="email" v-model="email" placeholder="Email Address" name="email" />
   <app-input type="password" v-model="password" placeholder="Password" name="password" />
   <app-input v-if="!isLogin" v-model="passwordConfirmation" type="password_confirmation" placeholder="Confirm Password" name="password_confirmation" />
   <app-button :text="title" />
  </form>
 </div>
</template>

<style scoped lang="scss">
h1 {
 margin: 0 0 28px;
}

p {
 margin: 0 0 56px;
}

.form {
 display: flex;
 flex-direction: column;
 gap: 24px;

 &-wrapper {
  max-width: 550px;
  text-align: center;
 }
}
</style>
