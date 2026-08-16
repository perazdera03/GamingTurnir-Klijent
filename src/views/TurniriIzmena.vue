<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import { useRouter, useRoute } from "vue-router";
import FormContainer from "@/components/FormContainer.vue";

const router = useRouter();
const route = useRoute();
const id = route.params.id; // ID turnira koji se menja

const naziv = ref("");
const igrica = ref("");
const datumPocetka = ref("");

// Ucitava podatke turnira koji se menja
const fetchTurnir = async () => {
  try {
    const response = await axios.get(`/api/Turniri/${id}`);
    naziv.value = response.data.naziv;
    igrica.value = response.data.igrica;
    datumPocetka.value = (response.data.datumPocetka || '').split('T')[0];
  } catch (error) {
    toast.error("Greška pri učitavanju turnira.");
  }
};

// Salje PUT zahtev za izmenu turnira
const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    await axios.put(`/api/Turniri/${id}`, {
      naziv: naziv.value,
      igrica: igrica.value,
      datumPocetka: datumPocetka.value,
    });
    router.push("/turniri").then(() => toast.success("Turnir uspešno izmenjen!"));
  } catch (error) {
    toast.error("Greška pri izmeni turnira.");
  }
};

onMounted(() => {
  fetchTurnir();
});
</script>

<template>
  <FormContainer title="Izmena turnira">
    <form @submit="handleSubmit">
      <div class="mb-3">
        <label class="form-label">Naziv</label>
        <input type="text" v-model="naziv" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Igrica</label>
        <input type="text" v-model="igrica" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Datum početka</label>
        <input type="date" v-model="datumPocetka" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">Sačuvaj</button>
      <button type="button" class="btn btn-secondary ms-2" @click="router.push('/turniri')">Otkaži</button>
    </form>
  </FormContainer>
</template>