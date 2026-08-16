<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import FormContainer from "@/components/FormContainer.vue";

const router = useRouter();
const korisnici = ref([]);
const timovi = ref([]);
const korisnikId = ref("");
const timId = ref("");
const uloga = ref("");

// Ucitava listu korisnika i timova za dropdown menije
const fetchData = async () => {
  try {
    const [korisnaciRes, timoviRes] = await Promise.all([
      axios.get("/api/Korisnici"),
      axios.get("/api/Timovi"),
    ]);
    korisnici.value = korisnaciRes.data;
    timovi.value = timoviRes.data;
  } catch (error) {
    toast.error("Greška pri učitavanju podataka.");
  }
};

// Salje POST zahtev za dodavanje novog clana tima
const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    await axios.post("/api/ClanoviTima", {
      korisnikId: parseInt(korisnikId.value),
      timId: parseInt(timId.value),
      uloga: uloga.value,
    });
    router.push("/clanovi").then(() => toast.success("Član uspešno dodat!"));
  } catch (error) {
    toast.error("Greška pri dodavanju člana.");
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <FormContainer title="Novi član tima">
    <form @submit="handleSubmit">
      <div class="mb-3">
        <label class="form-label">Korisnik</label>
        <select v-model="korisnikId" class="form-select" required>
          <option value="" disabled>Izaberi korisnika</option>
          <option v-for="korisnik in korisnici" :key="korisnik.korisnikId" :value="korisnik.korisnikId">
            {{ korisnik.username }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Tim</label>
        <select v-model="timId" class="form-select" required>
          <option value="" disabled>Izaberi tim</option>
          <option v-for="tim in timovi" :key="tim.timId" :value="tim.timId">
            {{ tim.naziv }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Uloga u timu</label>
        <input type="text" v-model="uloga" class="form-control" placeholder="npr. Kapiten, Igrac..." required />
      </div>
      <button type="submit" class="btn btn-primary">Sačuvaj</button>
      <button type="button" class="btn btn-secondary ms-2" @click="router.push('/clanovi')">Otkaži</button>
    </form>
  </FormContainer>
</template>