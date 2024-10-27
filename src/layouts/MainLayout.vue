<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { ChevronLeftIcon, ChevronRightIcon, Bars3Icon } from '@heroicons/vue/24/outline'

const router = useRouter()
const authStore = useAuthStore()
const isSidebarCollapsed = ref(false)
const isMobileMenuOpen = ref(false)

const navigation = [
  { name: 'Dashboard', path: '/' },
  { name: 'Patienten', path: '/patients' },
  { name: 'Termine', path: '/appointments' },
  { name: 'Personal', path: '/staff' },
  { name: 'Abrechnung', path: '/billing' }
]

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Mobile menu button -->
    <div class="lg:hidden fixed top-4 left-4 z-50">
      <button
        @click="toggleMobileMenu"
        class="p-2 rounded-md bg-white shadow-lg hover:bg-gray-50 focus:outline-none"
      >
        <Bars3Icon class="h-6 w-6 text-gray-600" />
      </button>
    </div>

    <!-- Sidebar container -->
    <div
      class="fixed inset-y-0 left-0 z-30 transition-transform duration-300 ease-in-out transform"
      :class="[isSidebarCollapsed ? '-translate-x-64' : 'translate-x-0']"
    >
      <!-- Sidebar -->
      <aside class="w-64 h-full bg-white shadow-lg hidden lg:block">
        <div class="p-6 flex items-center space-x-2">
          <span class="text-2xl font-bold text-blue-600">PVS</span>
          <span class="text-lg font-medium text-gray-600">Holding</span>
        </div>

        <nav class="mt-6">
          <ul>
            <li v-for="item in navigation" :key="item.name">
              <router-link
                :to="item.path"
                class="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                :class="{ 'bg-blue-50 text-blue-600': $route.path === item.path }"
                @click="closeMobileMenu"
              >
                <span class="truncate">{{ item.name }}</span>
              </router-link>
            </li>
          </ul>
        </nav>

        <!-- Logout button at bottom of sidebar -->
        <div class="absolute bottom-0 w-full p-4">
          <button
            @click="handleLogout"
            class="w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
          >
            Abmelden
          </button>
        </div>
      </aside>

      <!-- Toggle button - moves with sidebar -->
      <button
        @click="toggleSidebar"
        class="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 hidden lg:block"
      >
        <div class="bg-white rounded-r-full p-2 shadow-lg hover:bg-gray-50 focus:outline-none transition-transform duration-300 hover:scale-110">
          <ChevronLeftIcon v-if="!isSidebarCollapsed" class="h-8 w-8 text-blue-600" />
          <ChevronRightIcon v-else class="h-8 w-8 text-blue-600" />
        </div>
      </button>
    </div>

    <!-- Mobile sidebar -->
    <aside
      class="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden transition-opacity duration-300"
      :class="{ 'opacity-100': isMobileMenuOpen, 'opacity-0 pointer-events-none': !isMobileMenuOpen }"
      @click="closeMobileMenu"
    >
      <div
        class="fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300"
        :class="{ 'translate-x-0': isMobileMenuOpen, '-translate-x-full': !isMobileMenuOpen }"
        @click.stop
      >
        <div class="p-6 flex items-center space-x-2">
          <span class="text-2xl font-bold text-blue-600">PVS</span>
          <span class="text-lg font-medium text-gray-600">Holding</span>
        </div>

        <nav class="mt-6">
          <ul>
            <li v-for="item in navigation" :key="item.name">
              <router-link
                :to="item.path"
                class="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                :class="{ 'bg-blue-50 text-blue-600': $route.path === item.path }"
                @click="closeMobileMenu"
              >
                <span class="truncate">{{ item.name }}</span>
              </router-link>
            </li>
          </ul>
        </nav>

        <!-- Mobile logout button -->
        <div class="absolute bottom-0 w-full p-4">
          <button
            @click="handleLogout"
            class="w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
          >
            Abmelden
          </button>
        </div>
      </div>
    </aside>

    <!-- Main content -->
    <main
      class="transition-all duration-300 ease-in-out"
      :class="{
        'lg:ml-64': !isSidebarCollapsed,
        'lg:ml-0': isSidebarCollapsed
      }"
    >
      <div class="p-8">
        <slot />
      </div>
    </main>
  </div>
</template>

<style scoped>
.router-link-active {
  @apply bg-blue-50 text-blue-600;
}
</style>