<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import { useRouter, useRoute } from "vue-router";
import FormContainer from "@/components/FormContainer.vue";

const router = useRouter();
const route = useRoute();
const id = route.params.id; // ID meca koji se menja

const turniri = ref([]);
const timovi = ref([]);
const turnirId = ref("");
const tim1Id = ref("");
const tim2Id = ref("");
const rezultatTim1 = ref("");
const rezultatTim2 = ref("");
const datumMeca = ref("");

// Ucitava turnire, timove i podatke meca koji se menja
const fetchData = async () => {
  try {
    const [turniriRes, timoviRes, mecRes] = await Promise.all([
      axios.get("/api/Turniri"),
      axios.get("/api/Timovi"),
      axios.get(`/api/Mecevi/${id}`),
    ]);
    turniri.value = turniriRes.data;
    timovi.value = timoviRes.data;
    const mec = mecRes.data;
    turnirId.value = mec.turnirId;
    tim1Id.value = mec.tim1Id;
    tim2Id.value = mec.tim2Id;
    rezultatTim1.value = mec.rezultatTim1 !== null ? mec.rezultatTim1 : "";
    rezultatTim2.value = mec.rezultatTim2 !== null ? mec.rezultatTim2 : "";
    datumMeca.value = (mec.datumMeca || '').split('T')[0];
  } catch (error) {
    toast.error("Greška pri učitavanju podataka.");
  }
};

// Salje PUT zahtev za izmenu meca
const handleSubmit = async (event) => {
  event.preventDefault();
  if (tim1Id.value === tim2Id.value) {
    toast.error("Timovi moraju biti različiti!");
    return;
  }
  try {
    await axios.put(`/api/Mecevi/${id}`, {
      turnirId: parseInt(turnirId.value),
      tim1Id: parseInt(tim1Id.value),
      tim2Id: parseInt(tim2Id.value),
      rezultatTim1: rezultatTim1.value !== "" ? parseInt(rezultatTim1.value) : null,
      rezultatTim2: rezultatTim2.value !== "" ? parseInt(rezultatTim2.value) : null,
      datumMeca: datumMeca.value,
    });
    router.push("/mecevi").then(() => toast.success("Meč uspešno izmenjen!"));
  } catch (error) {
    toast.error("Greška pri izmeni meča.");
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <FormContainer title="Izmena meča">
    <form @submit="handleSubmit">
      <div class="mb-3">
        <label class="form-label">Turnir</label>
        <select v-model="turnirId" class="form-select" required>
          <option value="" disabled>Izaberi turnir</option>
          <option v-for="turnir in turniri" :key="turnir.turnirId" :value="turnir.turnirId">
            {{ turnir.naziv }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Tim 1</label>
        <select v-model="tim1Id" class="form-select" required>
          <option value="" disabled>Izaberi tim 1</option>
          <option v-for="tim in timovi" :key="tim.timId" :value="tim.timId">
            {{ tim.naziv }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Tim 2</label>
        <select v-model="tim2Id" class="form-select" required>
          <option value="" disabled>Izaberi tim 2</option>
          <option v-for="tim in timovi" :key="tim.timId" :value="tim.timId">
            {{ tim.naziv }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Rezultat Tim 1</label>
        <input type="number" v-model="rezultatTim1" class="form-control" min="0" />
      </div>
      <div class="mb-3">
        <label class="form-label">Rezultat Tim 2</label>
        <input type="number" v-model="rezultatTim2" class="form-control" min="0" />
      </div>
      <div class="mb-3">
        <label class="form-label">Datum meča</label>
        <input type="date" v-model="datumMeca" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">Sačuvaj</button>
      <button type="button" class="btn btn-secondary ms-2" @click="router.push('/mecevi')">Otkaži</button>
    </form>
  </FormContainer>
</template>