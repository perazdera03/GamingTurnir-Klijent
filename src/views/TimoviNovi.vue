<script setup>
import { ref } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import FormContainer from "@/components/FormContainer.vue";

const router = useRouter();
const naziv = ref("");
const opis = ref("");
const datumOsnivanja = ref("");

// Salje POST zahtev za dodavanje novog tima
const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    await axios.post("/api/Timovi", {
      naziv: naziv.value,
      opis: opis.value,
      datumOsnivanja: datumOsnivanja.value,
    });
    router.push("/timovi").then(() => toast.success("Tim uspešno dodat!"));
  } catch (error) {
    toast.error("Greška pri dodavanju tima.");
  }
};
</script>

<template>
  <FormContainer title="Novi tim">
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