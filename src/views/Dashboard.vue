<script setup lang="ts">
import { ref } from 'vue'

const stats = ref([
  { name: 'Gesamtpatienten', value: '1,234' },
  { name: 'Heutige Termine', value: '45' },
  { name: 'Verfügbare Ärzte', value: '12' },
  { name: 'Ausstehende Berichte', value: '8' }
])
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-8">Dashboard</h1>
    
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div v-for="stat in stats" :key="stat.name" class="card">
        <h3 class="text-lg font-medium text-gray-500">{{ stat.name }}</h3>
        <p class="text-3xl font-bold text-blue-600 mt-2">{{ stat.value }}</p>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="card">
      <h2 class="text-xl font-bold mb-4">Letzte Aktivitäten</h2>
      <div class="space-y-4">
        <div class="flex items-center justify-between py-3 border-b">
          <div>
            <p class="font-medium">Neue Patientenregistrierung</p>
            <p class="text-sm text-gray-500">Hans Müller - 10:30 Uhr</p>
          </div>
          <span class="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
            Abgeschlossen
          </span>
        </div>
        <div class="flex items-center justify-between py-3 border-b">
          <div>
            <p class="font-medium">Termin vereinbart</p>
            <p class="text-sm text-gray-500">Maria Schmidt - 11:45 Uhr</p>
          </div>
          <span class="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
            Geplant
          </span>
        </div>
      </div>
    </div>
  </div>
</template>