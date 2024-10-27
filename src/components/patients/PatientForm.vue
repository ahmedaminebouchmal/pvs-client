<script setup lang="ts">
import { ref } from 'vue'
import { useMutation } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const emit = defineEmits(['close'])

const ADD_PATIENT = gql`
  mutation AddPatient($input: PatientInput!) {
    addPatient(input: $input) {
      id
      name
      dateOfBirth
      phoneNumber
      email
      address
    }
  }
`

const { mutate: addPatient, loading } = useMutation(ADD_PATIENT)

const form = ref({
  name: '',
  dateOfBirth: '',
  phoneNumber: '',
  email: '',
  address: ''
})

const handleSubmit = async () => {
  try {
    await addPatient({
      input: {
        ...form.value
      }
    })
    emit('close')
  } catch (error) {
    console.error('Error adding patient:', error)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
      <input
        type="text"
        id="name"
        v-model="form.name"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>

    <div>
      <label for="dateOfBirth" class="block text-sm font-medium text-gray-700">Geburtsdatum</label>
      <input
        type="date"
        id="dateOfBirth"
        v-model="form.dateOfBirth"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>

    <div>
      <label for="phoneNumber" class="block text-sm font-medium text-gray-700">Telefonnummer</label>
      <input
        type="tel"
        id="phoneNumber"
        v-model="form.phoneNumber"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>

    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
      <input
        type="email"
        id="email"
        v-model="form.email"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>

    <div>
      <label for="address" class="block text-sm font-medium text-gray-700">Adresse</label>
      <textarea
        id="address"
        v-model="form.address"
        rows="3"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      ></textarea>
    </div>

    <div class="flex justify-end space-x-3">
      <button
        type="button"
        @click="emit('close')"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Abbrechen
      </button>
      <button
        type="submit"
        :disabled="loading"
        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {{ loading ? 'Speichern...' : 'Speichern' }}
      </button>
    </div>
  </form>
</template>