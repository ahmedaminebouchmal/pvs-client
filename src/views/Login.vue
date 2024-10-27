<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const password = ref('')
const error = ref('')

const validatePassword = (pass: string): boolean => {
  return pass.length >= 12
}

const handleLogin = () => {
  if (!validatePassword(password.value)) {
    error.value = 'Das Passwort muss mindestens 12 Zeichen lang sein.'
    return
  }

  if (password.value === import.meta.env.VITE_ADMIN_PASSWORD) {
    authStore.login()
    router.push('/')
  } else {
    error.value = 'Ungültiges Passwort.'
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-blue-600">PVS Holding</h1>
        <p class="text-gray-600 mt-2">Praxisverwaltungssystem</p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Passwort
          </label>
          <input
            v-model="password"
            type="password"
            required
            class="input-field"
            placeholder="Mindestens 12 Zeichen"
          />
          <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
        </div>

        <button type="submit" class="w-full btn-primary">
          Anmelden
        </button>
      </form>
    </div>
  </div>
</template>