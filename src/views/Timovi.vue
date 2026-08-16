<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import TableContainer from "@/components/TableContainer.vue";
import DeleteModal from "@/components/DeleteModal.vue";

const router = useRouter();
const timovi = ref([]);
const timToDelete = ref(null);
const confirmModalRef = ref(null);

const rola = localStorage.getItem("rola"); // Rola odredjuje sta korisnik moze da vidi

// Ucitava listu svih timova sa servera
const fetchTimovi = async () => {
  try {
    const response = await axios.get("/api/Timovi");
    timovi.value = response.data;
  } catch (error) {
    toast.error("Greška pri učitavanju timova.");
  }
};

// Otvara modal za potvrdu brisanja
const confirmDelete = (tim) => {
  timToDelete.value = tim;
  confirmModalRef.value.showModal();
};

// Salje DELETE zahtev i uklanja tim iz liste
const deleteTim = async () => {
  try {
    await axios.delete(`/api/Timovi/${timToDelete.value.timId}`);
    timovi.value = timovi.value.filter((t) => t.timId !== timToDelete.value.timId);
    timToDelete.value = null;
    toast.success("Tim obrisan!");
  } catch (error) {
    toast.error("Greška pri brisanju tima.");
  }
};

onMounted(() => {
  fetchTimovi();
});
</script>

<template>
  <!-- Dugme za dodavanje vidljivo samo Adminu, kolona Akcije skrivena od Igraca -->
  <TableContainer to="/timovi-novi" buttonText="Dodaj tim" :showButton="rola === 'Admin'">
    <template #table-header>
      <tr>
        <th>#</th>
        <th>Naziv</th>
        <th>Opis</th>
        <th>Datum osnivanja</th>
        <th v-if="rola !== 'Igrac'">Akcije</th>
      </tr>
    </template>
    <template #table-body>
      <tr v-for="(tim, index) in timovi" :key="tim.timId">
        <td>{{ index + 1 }}</td>
        <td>{{ tim.naziv }}</td>
        <td>{{ tim.opis }}</td>
        <td>{{ (tim.datumOsnivanja || '').split('T')[0] }}</td>
        <td v-if="rola !== 'Igrac'">
          <!-- Izmena dostupna Adminu i Kapitenu -->
          <button
            v-if="rola !== 'Igrac'"
            @click="router.push(`/timovi-izmena/${tim.timId}`)"
            class="btn btn-warning btn-sm me-2"
          >
            <i class="fas fa-edit"></i> Izmeni
          </button>
          <!-- Brisanje dostupno samo Adminu -->
          <button
            v-if="rola === 'Admin'"
            @click="confirmDelete(tim)"
            class="btn btn-danger btn-sm"
          >
            <i class="fas fa-trash"></i> Obriši
          </button>
        </td>
      </tr>
    </template>
  </TableContainer>

  <DeleteModal
    ref="confirmModalRef"
    :title="'Potvrda brisanja'"
    :message="'Da li ste sigurni da želite da obrišete ovaj tim?'"
    :onConfirm="deleteTim"
  />
</template>