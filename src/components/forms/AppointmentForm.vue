<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  submit: [appointment: {
    patientName: string
    doctorName: string
    date: string
    time: string
    type: string
    notes: string
  }]
  cancel: []
}>()

const form = ref({
  patientName: '',
  doctorName: '',
  date: '',
  time: '',
  type: '',
  notes: ''
})

const appointmentTypes = [
  'Routineuntersuchung',
  'Nachuntersuchung',
  'Beratung',
  'Notfall',
  'Operation'
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
          Patient Name
        </label>
        <input
          v-model="form.patientName"
          type="text"
          required
          class="input-field"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Arzt Name
        </label>
        <input
          v-model="form.doctorName"
          type="text"
          required
          class="input-field"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Datum
        </label>
        <input
          v-model="form.date"
          type="date"
          required
          class="input-field"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Zeit
        </label>
        <input
          v-model="form.time"
          type="time"
          required
          class="input-field"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Terminart
        </label>
        <select v-model="form.type" required class="input-field">
          <option value="">Terminart auswählen</option>
          <option v-for="type in appointmentTypes" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
      </div>

      <div class="md:col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Notizen
        </label>
        <textarea
          v-model="form.notes"
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
        Termin vereinbaren
      </button>
    </div>
  </form>
</template>