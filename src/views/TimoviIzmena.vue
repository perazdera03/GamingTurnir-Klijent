<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import { useRouter, useRoute } from "vue-router";
import FormContainer from "@/components/FormContainer.vue";

const router = useRouter();
const route = useRoute();
const id = route.params.id; // ID tima koji se menja

const naziv = ref("");
const opis = ref("");
const datumOsnivanja = ref("");

// Ucitava podatke tima koji se menja
const fetchTim = async () => {
  try {
    const response = await axios.get(`/api/Timovi/${id}`);
    naziv.value = response.data.naziv;
    opis.value = response.data.opis;
    datumOsnivanja.value = (response.data.datumOsnivanja || '').split('T')[0];
  } catch (error) {
    toast.error("Greška pri učitavanju tima.");
  }
};

// Salje PUT zahtev za izmenu tima
const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    await axios.put(`/api/Timovi/${id}`, {
      naziv: naziv.value,
      opis: opis.value,
      datumOsnivanja: datumOsnivanja.value,
    });
    router.push("/timovi").then(() => toast.success("Tim uspešno izmenjen!"));
  } catch (error) {
    toast.error("Greška pri izmeni tima.");
  }
};

onMounted(() => {
  fetchTim();
});
</script>

<template>
  <FormContainer title="Izmena tima">
    <form @submit="handleSubmit">
      <div class="mb-3">
        <label class="form-label">Naziv</label>
        <input type="text" v-model="naziv" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Opis</label>
        <input type="text" v-model="opis" class="form-control" required />
      </div>
      <div class="mb-3">
        <label class="form-label">Datum osnivanja</label>
        <input type="date" v-model="datumOsnivanja" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">Sačuvaj</button>
      <button type="button" class="btn btn-secondary ms-2" @click="router.push('/timovi')">Otkaži</button>
    </form>
  </FormContainer>
</template>