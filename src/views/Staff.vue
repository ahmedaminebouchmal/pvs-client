<script setup lang="ts">
import { ref } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import { GET_STAFF } from '../graphql/queries'
import { CREATE_STAFF } from '../graphql/mutations'
import BaseModal from '../components/modals/BaseModal.vue'
import StaffForm from '../components/forms/StaffForm.vue'

const isAddStaffModalOpen = ref(false)

const { result: staffResult, loading, error } = useQuery(GET_STAFF)
const { mutate: createStaff } = useMutation(CREATE_STAFF)

const statusColors = {
  'Verfügbar': 'bg-green-100 text-green-800',
  'In Behandlung': 'bg-yellow-100 text-yellow-800',
  'Im Dienst': 'bg-blue-100 text-blue-800',
  'Nicht im Dienst': 'bg-gray-100 text-gray-800'
}

const handleAddStaff = async (staffData: any) => {
  try {
    await createStaff({
      variables: {
        input: staffData
      },
      refetchQueries: [{ query: GET_STAFF }]
    })
    isAddStaffModalOpen.value = false
  } catch (err) {
    console.error('Error creating staff member:', err)
  }
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Personalverwaltung</h1>
      <button class="btn-primary" @click="isAddStaffModalOpen = true">
        Personal hinzufügen
      </button>
    </div>

    <div v-if="loading" class="card p-8 text-center">
      <p class="text-gray-600">Laden...</p>
    </div>

    <div v-else-if="error" class="card p-8 text-center">
      <p class="text-red-600">Error: {{ error.message }}</p>
    </div>

    <div v-else class="card">
      <table class="min-w-full">
        <thead>
          <tr class="border-b">
            <th class="text-left py-3 px-4">Name</th>
            <th class="text-left py-3 px-4">Position</th>
            <th class="text-left py-3 px-4">Abteilung</th>
            <th class="text-left py-3 px-4">Kontakt</th>
            <th class="text-left py-3 px-4">Status</th>
            <th class="text-left py-3 px-4">Aktionen</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in staffResult?.staff" :key="member.id" class="border-b">
            <td class="py-3 px-4">{{ member.name }}</td>
            <td class="py-3 px-4">{{ member.role }}</td>
            <td class="py-3 px-4">{{ member.department }}</td>
            <td class="py-3 px-4">{{ member.contact }}</td>
            <td class="py-3 px-4">
              <span :class="[statusColors[member.status], 'px-3 py-1 rounded-full text-sm']">
                {{ member.status }}
              </span>
            </td>
            <td class="py-3 px-4">
              <button class="text-blue-600 hover:text-blue-800 mr-2">Bearbeiten</button>
              <button class="text-red-600 hover:text-red-800">Entfernen</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <BaseModal
      :is-open="isAddStaffModalOpen"
      title="Personal hinzufügen"
      @close="isAddStaffModalOpen = false"
    >
      <StaffForm
        @submit="handleAddStaff"
        @cancel="isAddStaffModalOpen = false"
      />
    </BaseModal>
  </div>
</template>