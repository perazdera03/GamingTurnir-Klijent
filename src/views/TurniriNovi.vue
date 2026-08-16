<script setup>
import { ref } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import FormContainer from "@/components/FormContainer.vue";

const router = useRouter();
const naziv = ref("");
const igrica = ref("");
const datumPocetka = ref("");

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    await axios.post("/api/Turniri", {
      naziv: naziv.value,
      igrica: igrica.value,
      datumPocetka: datumPocetka.value,
    });
    router.push("/turniri").then(() => toast.success("Turnir uspešno dodat!"));
  } catch (error) {
    toast.error("Greška pri dodavanju turnira.");
  }
};
</script>

<template>
  <FormContainer title="Novi turnir">
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