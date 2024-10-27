import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Dashboard from '../views/Dashboard.vue'
import Patients from '../views/Patients.vue'
import Appointments from '../views/Appointments.vue'
import Staff from '../views/Staff.vue'
import Billing from '../views/Billing.vue'
import Login from '../views/Login.vue'

export const routes = [
  {
    path: '/login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/patients',
    component: Patients,
    meta: { requiresAuth: true }
  },
  {
    path: '/appointments',
    component: Appointments,
    meta: { requiresAuth: true }
  },
  {
    path: '/staff',
    component: Staff,
    meta: { requiresAuth: true }
  },
  {
    path: '/billing',
    component: Billing,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const isAuthenticated = authStore.checkAuth()

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router