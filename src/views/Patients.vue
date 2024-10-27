<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import PatientForm from '../components/patients/PatientForm.vue'
import PatientList from '../components/patients/PatientList.vue'
import { Dialog, DialogPanel } from '@headlessui/vue'

const showAddPatient = ref(false)

const GET_PATIENTS = gql`
  query GetPatients {
    patients {
      id
      name
      dateOfBirth
      phoneNumber
      email
      address
    }
  }
`

const { result, loading, error } = useQuery(GET_PATIENTS)

const patients = computed(() => result.value?.patients ?? [])

const handleAddPatient = () => {
  showAddPatient.value = true
}

const handleCloseDialog = () => {
  showAddPatient.value = false
}
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Patienten</h1>
      <button
        @click="handleAddPatient"
        class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Neuer Patient
      </button>
    </div>

    <Dialog :open="showAddPatient" @close="handleCloseDialog" class="relative z-50">
      <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel class="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 class="text-xl font-semibold mb-4">Neuen Patienten hinzufügen</h2>
          <PatientForm @close="handleCloseDialog" />
        </DialogPanel>
      </div>
    </Dialog>

    <div v-if="loading" class="text-center py-4">
      Laden...
    </div>
    <div v-else-if="error" class="text-red-600 text-center py-4">
      Ein Fehler ist aufgetreten
    </div>
    <PatientList v-else :patients="patients" />
  </div>
</template>