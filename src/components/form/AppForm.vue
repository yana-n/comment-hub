<script setup lang="ts">
import AppButton from '@/components/form/AppButton.vue'
import AppInput from '@/components/form/AppInput.vue'
import AppToaster from '@/components/AppToaster.vue'
import { ref, computed } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useToaster } from '@/composables/useToaster'
import { useRouter } from 'vue-router'
import { useAuthNotifications } from '@/composables/useAuthNotifications.ts'

interface IProps {
  type: 'signIn' | 'signUp'
}

const props = defineProps<IProps>()

const { login, register, authError, authSuccess } = useAuth()
const { addToast } = useToaster()
const router = useRouter()

const isLoginPage = computed(() => props.type === 'signIn')
const title = computed(() => (isLoginPage.value ? 'Sign In' : 'Sign Up'))

const form = ref({
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
})

const handleSubmit = async () => {
  if (isLoginPage.value) {
    await login(form.value.email, form.value.password)
  } else {
    if (form.value.password !== form.value.passwordConfirmation) {
      addToast('Passwords do not match!', 'error')
      return
    }

    await register(form.value.email, form.value.password)
  }
}

useAuthNotifications(authError, authSuccess)
</script>

<template>
  <app-toaster />
  <div class="form-wrapper">
    <h1>{{ title }}</h1>
    <p>
      Ready to become part of the exclusive club? Fill in the details below, and
      let the journey begin!
    </p>
    <form class="form" @submit.prevent="handleSubmit">
      <app-input
        v-if="!isLoginPage"
        v-model="form.name"
        type="text"
        placeholder="Name"
        name="name"
      />
      <app-input
        type="email"
        v-model="form.email"
        placeholder="Email Address"
        name="email"
      />
      <app-input
        type="password"
        v-model="form.password"
        placeholder="Password"
        name="password"
      />
      <app-input
        v-if="!isLoginPage"
        v-model="form.passwordConfirmation"
        type="password_confirmation"
        placeholder="Confirm Password"
        name="password_confirmation"
      />
      <app-button :text="title" />
    </form>
    <app-toaster />
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
