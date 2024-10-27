<script setup lang="ts">
import { ref } from 'vue'
import { format } from 'date-fns'

const emit = defineEmits<{
  submit: [patient: {
    firstName: string
    lastName: string
    dateOfBirth: string
    gender: string
    email: string
    phone: string
    address: string
    emergencyContact: string
    medicalHistory: string
  }]
  cancel: []
}>()

const form = ref({
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  gender: '',
  email: '',
  phone: '',
  address: '',
  emergencyContact: '',
  medicalHistory: ''
})

const handleSubmit = () => {
  emit('submit', form.value)
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Vorname
        </label>
        <input
          v-model="form.firstName"
          type="text"
          required
          class="input-field"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Nachname
        </label>
        <input
          v-model="form.lastName"
          type="text"
          required
          class="input-field"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Geburtsdatum
        </label>
        <input
          v-model="form.dateOfBirth"
          type="date"
          required
          class="input-field"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Geschlecht
        </label>
        <select v-model="form.gender" required class="input-field">
          <option value="">Geschlecht auswählen</option>
          <option value="male">Männlich</option>
          <option value="female">Weiblich</option>
          <option value="other">Divers</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          E-Mail
        </label>
        <input
          v-model="form.email"
          type="email"
          required
          class="input-field"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Telefon
        </label>
        <input
          v-model="form.phone"
          type="tel"
          required
          class="input-field"
        />
      </div>

      <div class="md:col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Adresse
        </label>
        <input
          v-model="form.address"
          type="text"
          required
          class="input-field"
        />
      </div>

      <div class="md:col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Notfallkontakt
        </label>
        <input
          v-model="form.emergencyContact"
          type="text"
          required
          class="input-field"
        />
      </div>

      <div class="md:col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Krankengeschichte
        </label>
        <textarea
          v-model="form.medicalHistory"
          rows="3"
          class="input-field"
        ></textarea>
      </div>
    </div>

    <div class="flex justify-end space-x-4">
      <button
        type="button"
        class="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        @click="$emit('cancel')"
      >
        Abbrechen
      </button>
      <button type="submit" class="btn-primary">
        Patient hinzufügen
      </button>
    </div>
  </form>
</template>