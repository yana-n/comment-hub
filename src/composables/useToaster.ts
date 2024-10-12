import { ref } from 'vue'

interface IToast {
  message: string
  type: 'success' | 'error' | 'info'
}

const toasts = ref<IToast[]>([])

export function useToaster() {
  const addToast = (message: string, type: 'success' | 'error' | 'info') => {
    toasts.value.push({ message, type })

    setTimeout(() => {
      toasts.value.shift()
    }, 5000)
  }

  const removeToast = (index: number) => {
    toasts.value.splice(index, 1)
  }

  const clearToasts = () => {
    toasts.value = []
  }

  return {
    toasts,
    addToast,
    removeToast,
    clearToasts,
  }
}
