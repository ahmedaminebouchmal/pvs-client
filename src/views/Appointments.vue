<script setup lang="ts">
import { ref } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import { GET_APPOINTMENTS } from '../graphql/queries'
import { CREATE_APPOINTMENT } from '../graphql/mutations'
import BaseModal from '../components/modals/BaseModal.vue'
import AppointmentForm from '../components/forms/AppointmentForm.vue'

const isAddAppointmentModalOpen = ref(false)

const { result: appointmentsResult, loading, error } = useQuery(GET_APPOINTMENTS)
const { mutate: createAppointment } = useMutation(CREATE_APPOINTMENT)

const statusColors = {
  'Geplant': 'bg-blue-100 text-blue-800',
  'In Behandlung': 'bg-yellow-100 text-yellow-800',
  'Abgeschlossen': 'bg-green-100 text-green-800',
  'Storniert': 'bg-red-100 text-red-800'
}

const handleAddAppointment = async (appointmentData: any) => {
  try {
    await createAppointment({
      variables: {
        input: appointmentData
      },
      refetchQueries: [{ query: GET_APPOINTMENTS }]
    })
    isAddAppointmentModalOpen.value = false
  } catch (err) {
    console.error('Error creating appointment:', err)
  }
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Termine</h1>
      <button class="btn-primary" @click="isAddAppointmentModalOpen = true">
        Termin vereinbaren
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
            <th class="text-left py-3 px-4">Patient</th>
            <th class="text-left py-3 px-4">Arzt</th>
            <th class="text-left py-3 px-4">Datum</th>
            <th class="text-left py-3 px-4">Uhrzeit</th>
            <th class="text-left py-3 px-4">Status</th>
            <th class="text-left py-3 px-4">Aktionen</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="appointment in appointmentsResult?.appointments" :key="appointment.id" class="border-b">
            <td class="py-3 px-4">{{ appointment.patientName }}</td>
            <td class="py-3 px-4">{{ appointment.doctorName }}</td>
            <td class="py-3 px-4">{{ appointment.date }}</td>
            <td class="py-3 px-4">{{ appointment.time }}</td>
            <td class="py-3 px-4">
              <span :class="[statusColors[appointment.status], 'px-3 py-1 rounded-full text-sm']">
                {{ appointment.status }}
              </span>
            </td>
            <td class="py-3 px-4">
              <button class="text-blue-600 hover:text-blue-800 mr-2">Bearbeiten</button>
              <button class="text-red-600 hover:text-red-800">Stornieren</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <BaseModal
      :is-open="isAddAppointmentModalOpen"
      title="Termin vereinbaren"
      @close="isAddAppointmentModalOpen = false"
    >
      <AppointmentForm
        @submit="handleAddAppointment"
        @cancel="isAddAppointmentModalOpen = false"
      />
    </BaseModal>
  </div>
</template>