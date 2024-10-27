<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'

defineProps<{
  isOpen: boolean
  title: string
}>()

defineEmits<{
  close: []
}>()
</script>

<template>
  <Dialog :open="isOpen" @close="$emit('close')" class="relative z-50">
    <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
    
    <div class="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel class="w-full max-w-2xl bg-white rounded-lg shadow-xl">
        <div class="p-6">
          <DialogTitle class="text-xl font-bold text-gray-900 mb-4">
            {{ title }}
          </DialogTitle>
          
          <slot />
        </div>
      </DialogPanel>
    </div>
  </Dialog>
</template>