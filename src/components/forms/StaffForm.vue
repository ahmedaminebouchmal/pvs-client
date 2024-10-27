<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  submit: [staff: {
    name: string
    role: string
    department: string
    specialization: string
    contact: string
    email: string
    schedule: string
    qualifications: string
  }]
  cancel: []
}>()

const form = ref({
  name: '',
  role: '',
  department: '',
  specialization: '',
  contact: '',
  email: '',
  schedule: '',
  qualifications: ''
})

const roles = [
  'Arzt',
  'Krankenschwester',
  'Spezialist',
  'Techniker',
  'Verwaltung'
]

const departments = [
  'Kardiologie',
  'Pädiatrie',
  'Notaufnahme',
  'Chirurgie',
  'Neurologie',
  'Orthopädie'
]

const handleSubmit = () => {
  emit('submit', form.value)
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          v-model="form.name"
          type="text"
          required
          class="input-field"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Position
        </label>
        <select v-model="form.role" required class="input-field">
          <option value="">Position auswählen</option>
          <option v-for="role in roles" :key="role" :value="role">
            {{ role }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Abteilung
        </label>
        <select v-model="form.department" required class="input-field">
          <option value="">Abteilung auswählen</option>
          <option v-for="dept in departments" :key="dept" :value="dept">
            {{ dept }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Spezialisierung
        </label>
        <input
          v-model="form.specialization"
          type="text"
          class="input-field"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Telefonnummer
        </label>
        <input
          v-model="form.contact"
          type="tel"
          required
          class="input-field"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Email
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
          Arbeitszeiten
        </label>
        <input
          v-model="form.schedule"
          type="text"
          placeholder="z.B. Mo-Fr 9-17 Uhr"
          required
          class="input-field"
        />
      </div>

      <div class="md:col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Qualifikationen & Erfahrung
        </label>
        <textarea
          v-model="form.qualifications"
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
        Personal hinzufügen
      </button>
    </div>
  </form>
</template>