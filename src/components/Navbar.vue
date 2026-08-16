<script setup>
import { RouterLink, useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { useUserRole } from "@/composables/useUserRole.js";
import { toast } from "vue3-toastify";
import { onMounted } from "vue";

const router = useRouter();
const { userRole, checkUserRole } = useUserRole();

// Proverava da li je trenutna ruta aktivna (za stilizaciju linka)
const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};

// Ucitava rolu korisnika iz localStorage kada se komponenta mount-uje
onMounted(() => {
  checkUserRole();
});

// Odjavljuje korisnika - brise token i rolu iz localStorage
const handleLogout = async () => {
  try {
    localStorage.removeItem("access_token");
    localStorage.removeItem("rola");
    router.push("/login").then(() => toast.success("Uspešno ste se odjavili."));
  } catch (error) {
    toast.error(error.message);
  }
};
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/timovi">🎮 Gaming Turnir</RouterLink>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li :class="{ 'nav-item': true, active: isActiveLink('/timovi') }">
            <RouterLink class="nav-link" to="/timovi">Timovi</RouterLink>
          </li>
          <li :class="{ 'nav-item': true, active: isActiveLink('/turniri') }">
            <RouterLink class="nav-link" to="/turniri">Turniri</RouterLink>
          </li>
          <li :class="{ 'nav-item': true, active: isActiveLink('/mecevi') }">
            <RouterLink class="nav-link" to="/mecevi">Mečevi</RouterLink>
          </li>
          <li :class="{ 'nav-item': true, active: isActiveLink('/clanovi') }">
            <RouterLink class="nav-link" to="/clanovi">Članovi tima</RouterLink>
          </li>
          <!-- Korisnici tab vidljiv samo Adminu -->
          <li v-if="userRole === 'Admin'" :class="{ 'nav-item': true, active: isActiveLink('/korisnici') }">
            <RouterLink class="nav-link" to="/korisnici">Korisnici</RouterLink>
          </li>
        </ul>
        <form class="d-flex" @submit.prevent="handleLogout">
          <button type="submit" class="btn btn-danger">Odjavi se</button>
        </form>
      </div>
    </div>
  </nav>
</template>