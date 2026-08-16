<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import { useRouter, useRoute } from "vue-router";
import FormContainer from "@/components/FormContainer.vue";

const router = useRouter();
const route = useRoute();
const id = route.params.id; // ID korisnika koji se menja

const username = ref("");
const rola = ref("");

// Ucitava podatke korisnika koji se menja
const fetchKorisnik = async () => {
  try {
    const response = await axios.get(`/api/Korisnici/${id}`);
    username.value = response.data.username;
    rola.value = response.data.rola.toString();
  } catch (error) {
    toast.error("Greška pri učitavanju korisnika.");
  }
};

// Salje PUT zahtev za izmenu korisnika
const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    await axios.put(`/api/Korisnici/${id}`, {
      username: username.value,
      rola: parseInt(rola.value),
    });
    router.push("/korisnici").then(() => toast.success("Korisnik uspešno izmenjen!"));
  } catch (error) {
    toast.error("Greška pri izmeni korisnika.");
  }
};

onMounted(() => {
  fetchKorisnik();
});
</script>

<template>
  <FormContainer title="Izmena korisnika">
    <form @submit="handleSubmit">
      <div class="mb-3">
        <label class="form-label">Username</label>
        <input type="text" v-model="username" class="form-control" required />
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