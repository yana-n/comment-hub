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
const isAuthenticated = ref<boolean>(false);

onAuthStateChanged(auth, (currentUser) => {
  if (currentUser) {
    user.value = currentUser
    isAuthenticated.value = true
  } else {
    user.value = null
    isAuthenticated.value = false
  }
})

const resetNotificationMessage = () => {
  authError.value = null
  authSuccess.value = null
}

export const useAuth = () => {
  const register = async (email: string, password: string) => {
    resetNotificationMessage()

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      user.value = userCredential.user
      authSuccess.value = 'Registration successful'
    } catch (error) {
      console.error('Registration error:', error)
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
      authSuccess.value = 'Login successful'
    } catch (error) {
      console.error('Login error:', error)
      authError.value = (error as Error).message
    }
  }

  const logout = async () => {
    resetNotificationMessage()

    try {
      await signOut(auth)
      user.value = null
      authSuccess.value = 'Logout successful'
    } catch (error) {
      console.error('Logout error:', error)
      authError.value = (error as Error).message
    }
  }

  return {
    user,
    authError,
    authSuccess,
    isAuthenticated,
    register,
    login,
    logout,
    resetNotificationMessage,
  }
}
