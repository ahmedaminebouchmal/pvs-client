<script setup lang="ts">
interface Patient {
  id: string
  name: string
  dateOfBirth: string
  phoneNumber: string
  email: string
  address: string
}

defineProps<{
  patients: Patient[]
}>()
</script>

<template>
  <div class="bg-white shadow-md rounded-lg overflow-hidden">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Geburtsdatum</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefon</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aktionen</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="patient in patients" :key="patient.id">
          <td class="px-6 py-4 whitespace-nowrap">{{ patient.name }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ patient.dateOfBirth }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ patient.phoneNumber }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ patient.email }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <button class="text-blue-600 hover:text-blue-800 mr-2">Bearbeiten</button>
            <button class="text-red-600 hover:text-red-800">Löschen</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>