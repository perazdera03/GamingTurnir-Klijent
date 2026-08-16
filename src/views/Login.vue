<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const username = ref("");
const password = ref("");
const router = useRouter();

// Salje POST zahtev na /api/Auth/login i cuva token i rolu u localStorage
const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await axios.post("/api/Auth/login", {
      username: username.value,
      password: password.value,
    });
    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("rola", response.data.rola);
    router.push("/timovi").then(() => toast.success("Uspešno ste se prijavili!"));
  } catch (error) {
    toast.error("Pogrešno korisničko ime ili lozinka.");
  }
};
</script>

<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-lg-4 col-12">
        <h2 class="text-center mb-4">🎮 Gaming Turnir</h2>
        <form @submit="handleSubmit">
          <div class="form-group mb-3">
            <label>Korisničko ime</label>
            <input type="text" v-model="username" class="form-control" required />
          </div>
          <div class="form-group mb-3">
            <label>Lozinka</label>
            <input type="password" v-model="password" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Prijavi se</button>
        </form>
      </div>
    </div>
  </div>
</template>