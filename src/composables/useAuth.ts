import { ref } from 'vue'
import { auth } from '@/firebaseConfig.ts'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth'

const user = ref<User | null>(null)
const authError = ref<string | null>(null)
const authSuccess = ref<string | null>(null)

onAuthStateChanged(auth, (currentUser) => {
  user.value = currentUser
})

const resetNotificationMessage = () => {
  authError.value = null
  authSuccess.value = null
}

export function useAuth() {
  const register = async (email: string, password: string) => {
    resetNotificationMessage()

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )

      user.value = userCredential.user
      authSuccess.value = 'Registration successfully'
    } catch (error) {
      authError.value = (error as Error).message
    }
  }

  const login = async (email: string, password: string) => {
    resetNotificationMessage()

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      )

      user.value = userCredential.user
      authSuccess.value = 'Login successfully'
    } catch (error) {
      authError.value = (error as Error).message
    }
  }

  const logout = async () => {
    resetNotificationMessage()

    try {
      await signOut(auth)
      user.value = null
      authSuccess.value = 'Logout successfully'
    } catch (error) {
      authError.value = (error as Error).message
    }
  }

  return {
    user,
    authError,
    authSuccess,
    register,
    login,
    logout,
    resetNotificationMessage,
  }
}
