<script setup lang="ts">
import { ref } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import { GET_BILLS } from '../graphql/queries'
import { CREATE_BILL } from '../graphql/mutations'
import BaseModal from '../components/modals/BaseModal.vue'
import BillingForm from '../components/forms/BillingForm.vue'

const isAddBillModalOpen = ref(false)

const { result: billsResult, loading, error } = useQuery(GET_BILLS)
const { mutate: createBill } = useMutation(CREATE_BILL)

const statusColors = {
  'Bezahlt': 'bg-green-100 text-green-800',
  'Ausstehend': 'bg-yellow-100 text-yellow-800',
  'Überfällig': 'bg-red-100 text-red-800'
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount)
}

const handleAddBill = async (billData: any) => {
  try {
    await createBill({
      variables: {
        input: billData
      },
      refetchQueries: [{ query: GET_BILLS }]
    })
    isAddBillModalOpen.value = false
  } catch (err) {
    console.error('Error creating bill:', err)
  }
}
</script>

<template>
  <div>
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Abrechnung</h1>
      <button class="btn-primary" @click="isAddBillModalOpen = true">
        Neue Rechnung erstellen
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
            <th class="text-left py-3 px-4">Datum</th>
            <th class="text-left py-3 px-4">Beschreibung</th>
            <th class="text-left py-3 px-4">Betrag</th>
            <th class="text-left py-3 px-4">Status</th>
            <th class="text-left py-3 px-4">Aktionen</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="bill in billsResult?.bills" :key="bill.id" class="border-b">
            <td class="py-3 px-4">{{ bill.patientName }}</td>
            <td class="py-3 px-4">{{ bill.date }}</td>
            <td class="py-3 px-4">{{ bill.items.map(item => item.description).join(', ') }}</td>
            <td class="py-3 px-4">{{ formatCurrency(bill.totalAmount) }}</td>
            <td class="py-3 px-4">
              <span :class="[statusColors[bill.status], 'px-3 py-1 rounded-full text-sm']">
                {{ bill.status }}
              </span>
            </td>
            <td class="py-3 px-4">
              <button class="text-blue-600 hover:text-blue-800 mr-2">Bearbeiten</button>
              <button class="text-green-600 hover:text-green-800">Bezahlen</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <BaseModal
      :is-open="isAddBillModalOpen"
      title="Neue Rechnung erstellen"
      @close="isAddBillModalOpen = false"
    >
      <BillingForm
        @submit="handleAddBill"
        @cancel="isAddBillModalOpen = false"
      />
    </BaseModal>
  </div>
</template>