import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePatientStore = defineStore('patients', () => {
  const patients = ref([
    { id: 1, name: 'John Doe', age: 45, contact: '+1 234-567-8900', lastVisit: '2024-03-15' },
    { id: 2, name: 'Jane Smith', age: 32, contact: '+1 234-567-8901', lastVisit: '2024-03-14' },
    { id: 3, name: 'Robert Johnson', age: 28, contact: '+1 234-567-8902', lastVisit: '2024-03-13' }
  ])

  const addPatient = (patient: any) => {
    patients.value.push({
      id: patients.value.length + 1,
      ...patient
    })
  }

  const removePatient = (id: number) => {
    const index = patients.value.findIndex(p => p.id === id)
    if (index !== -1) {
      patients.value.splice(index, 1)
    }
  }

  return {
    patients,
    addPatient,
    removePatient
  }
})