<template>
  <div class="bg-gray-900 text-gray-200 min-h-screen">
    <div class="container mx-auto px-6">
      <Navbar />
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
</script>

<style lang="scss" scoped></style>