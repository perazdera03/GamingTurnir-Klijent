<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div>
    <!-- Navbar se prikazuje na svim stranicama osim Login-a -->
    <Navbar v-if="$route.name !== 'Login'"></Navbar>
    <RouterView></RouterView>
  </div>
</template>

<style>
/* Globalni stilovi aplikacije */
</style>