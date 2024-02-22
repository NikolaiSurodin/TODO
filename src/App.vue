<script setup>
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <AppHeader />
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" :key="$route.path" />
    </transition>
  </router-view>
</template>

<style scoped>

</style>
