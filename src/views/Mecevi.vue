<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import TableContainer from "@/components/TableContainer.vue";
import DeleteModal from "@/components/DeleteModal.vue";

const router = useRouter();
const mecevi = ref([]);
const mecToDelete = ref(null);
const confirmModalRef = ref(null);

const rola = localStorage.getItem("rola"); // Rola odredjuje sta korisnik moze da vidi

// Ucitava listu svih meceva sa servera
const fetchMecevi = async () => {
  try {
    const response = await axios.get("/api/Mecevi");
    mecevi.value = response.data;
  } catch (error) {
    toast.error("Greška pri učitavanju mečeva.");
  }
};

// Otvara modal za potvrdu brisanja
const confirmDelete = (mec) => {
  mecToDelete.value = mec;
  confirmModalRef.value.showModal();
};

// Salje DELETE zahtev i uklanja mec iz liste
const deleteMec = async () => {
  try {
    await axios.delete(`/api/Mecevi/${mecToDelete.value.mecId}`);
    mecevi.value = mecevi.value.filter((m) => m.mecId !== mecToDelete.value.mecId);
    mecToDelete.value = null;
    toast.success("Meč obrisan!");
  } catch (error) {
    toast.error("Greška pri brisanju meča.");
  }
};

onMounted(() => {
  fetchMecevi();
});
</script>

<template>
  <!-- Dugme za dodavanje i kolona Akcije vidljivi samo Adminu -->
  <TableContainer to="/mecevi-novi" buttonText="Dodaj meč" :showButton="rola === 'Admin'">
    <template #table-header>
      <tr>
        <th>#</th>
        <th>Turnir</th>
        <th>Tim 1</th>
        <th>Tim 2</th>
        <th>Rezultat</th>
        <th>Datum</th>
        <th v-if="rola === 'Admin'">Akcije</th>
      </tr>
    </template>
    <template #table-body>
      <tr v-for="(mec, index) in mecevi" :key="mec.mecId">
        <td>{{ index + 1 }}</td>
        <td>{{ mec.turnir }}</td>
        <td>{{ mec.tim1 }}</td>
        <td>{{ mec.tim2 }}</td>
        <td>{{ mec.rezultatTim1 !== null ? mec.rezultatTim1 : '-' }} : {{ mec.rezultatTim2 !== null ? mec.rezultatTim2 : '-' }}</td>
        <td>{{ (mec.datumMeca || '').split('T')[0] }}</td>
        <td v-if="rola === 'Admin'">
          <button
            @click="router.push(`/mecevi-izmena/${mec.mecId}`)"
            class="btn btn-warning btn-sm me-2"
          >
            <i class="fas fa-edit"></i> Izmeni
          </button>
          <button
            @click="confirmDelete(mec)"
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
    :message="'Da li ste sigurni da želite da obrišete ovaj meč?'"
    :onConfirm="deleteMec"
  />
</template>