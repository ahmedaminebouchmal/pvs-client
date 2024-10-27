<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainLayout from './layouts/MainLayout.vue'
import { provideApollo } from './apollo'

// Provide Apollo client to all child components
provideApollo()
</script>

<template>
  <MainLayout>
    <RouterView />
  </MainLayout>
</template>