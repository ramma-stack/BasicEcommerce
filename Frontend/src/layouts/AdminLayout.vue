<template>
    <div class="container mx-auto px-6">
        <Navbar />
        <router-view></router-view>
    </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
</script>