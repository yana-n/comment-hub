import { watchEffect } from 'vue'
import { useToaster } from './useToaster'
import { useRouter } from 'vue-router'

export function useAuthNotifications(authError: any, authSuccess: any) {
  const { addToast } = useToaster()
  const router = useRouter()

  const showToastAndRedirect = (message: string, type: 'success' | 'error') => {
    addToast(message, type)

    if (type === 'success') {
      setTimeout(async () => {
        await router.push({ name: 'Projects' })
      }, 1500)
    }
  }

  watchEffect(() => {
    if (authError.value) {
      showToastAndRedirect(authError.value, 'error')
      authError.value = null
    }
    if (authSuccess.value) {
      showToastAndRedirect(authSuccess.value, 'success')
      authSuccess.value = null
    }
  })
}
