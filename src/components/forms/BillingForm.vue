<script setup lang="ts">
import { ref, computed } from 'vue'

const emit = defineEmits<{
  submit: [bill: {
    patientName: string
    date: string
    items: Array<{
      description: string
      amount: number
    }>
    totalAmount: number
    paymentMethod: string
    notes: string
  }]
  cancel: []
}>()

const form = ref({
  patientName: '',
  date: '',
  items: [{ description: '', amount: 0 }],
  paymentMethod: '',
  notes: ''
})

const paymentMethods = [
  'Bar',
  'Kreditkarte',
  'EC-Karte',
  'Versicherung',
  'Überweisung'
]

const totalAmount = computed(() => {
  return form.value.items.reduce((sum, item) => sum + (item.amount || 0), 0)
})

const addItem = () => {
  form.value.items.push({ description: '', amount: 0 })
}

const removeItem = (index: number) => {
  if (form.value.items.length > 1) {
    form.value.items.splice(index, 1)
  }
}

const handleSubmit = () => {
  emit('submit', {
    ...form.value,
    totalAmount: totalAmount.value
  })
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
          Datum
        </label>
        <input
          v-model="form.date"
          type="date"
          required
          class="input-field"
        />
      </div>

      <div class="md:col-span-2">
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Rechnungspositionen
        </label>
        <div v-for="(item, index) in form.items" :key="index" class="flex gap-4 mb-2">
          <input
            v-model="item.description"
            type="text"
            placeholder="Beschreibung"
            required
            class="input-field flex-grow"
          />
          <input
            v-model.number="item.amount"
            type="number"
            min="0"
            step="0.01"
            placeholder="Betrag"
            required
            class="input-field w-32"
          />
          <button
            type="button"
            @click="removeItem(index)"
            class="text-red-600 hover:text-red-800"
            :disabled="form.items.length === 1"
          >
            Entfernen
          </button>
        </div>
        <button
          type="button"
          @click="addItem"
          class="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Position hinzufügen
        </button>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Zahlungsmethode
        </label>
        <select v-model="form.paymentMethod" required class="input-field">
          <option value="">Zahlungsmethode auswählen</option>
          <option v-for="method in paymentMethods" :key="method" :value="method">
            {{ method }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Gesamtbetrag
        </label>
        <div class="input-field bg-gray-50">
          {{ new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(totalAmount) }}
        </div>
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
        Rechnung erstellen
      </button>
    </div>
  </form>
</template>