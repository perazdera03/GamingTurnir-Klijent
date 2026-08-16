<script setup>
import { ref } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import FormContainer from "@/components/FormContainer.vue";

const router = useRouter();
const username = ref("");
const password = ref("");
const rola = ref("");

// Salje POST zahtev na /api/Auth/register za dodavanje novog korisnika
const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    await axios.post("/api/Auth/register", {
      username: username.value,
      password: password.value,
      rola: parseInt(rola.value),
    });
    router.push("/korisnici").then(() => toast.success("Korisnik uspešno dodat!"));
  } catch (error) {
    toast.error("Greška pri dodavanju korisnika.");
  }
};
</script>

<template>
  <FormContainer title="Novi korisnik">
    <form @submit="handleSubmit">
      <div class="mb-3">
        <label class="form-label">Username</label>
        <input type="text" v-model="username" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Lozinka</label>
        <input type="password" v-model="password" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Rola</label>
        <select v-model="rola" class="form-select" required>
          <option value="" disabled>Izaberi rolu</option>
          <option value="0">Admin</option>
          <option value="1">Kapiten</option>
          <option value="2">Igrac</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Sačuvaj</button>
      <button type="button" class="btn btn-secondary ms-2" @click="router.push('/korisnici')">Otkaži</button>
    </form>
  </FormContainer>
</template>