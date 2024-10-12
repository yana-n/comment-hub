import { createRouter, createWebHistory } from 'vue-router'
import Projects from '@/views/Projects.vue'
import About from '@/views/About.vue'
import Contacts from '@/views/Contacts.vue'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import Testimonials from '@/views/Testimonials.vue'
import { useToaster } from '@/composables/useToaster'

const { clearToasts } = useToaster()

const routes = [
  {
    path: '/',
    name: 'Projects',
    component: Projects,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: Contacts,
  },
  {
    path: '/testimonials',
    name: 'Testimonials',
    component: Testimonials,
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  clearToasts()
  next()
})

export default router
