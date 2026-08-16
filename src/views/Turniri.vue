<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import TableContainer from "@/components/TableContainer.vue";
import DeleteModal from "@/components/DeleteModal.vue";

const router = useRouter();
const turniri = ref([]);
const turnirToDelete = ref(null);
const confirmModalRef = ref(null);

const rola = localStorage.getItem("rola");

const fetchTurniri = async () => {
  try {
    const response = await axios.get("/api/Turniri");
    turniri.value = response.data;
  } catch (error) {
    toast.error("Greška pri učitavanju turnira.");
  }
};

const confirmDelete = (turnir) => {
  turnirToDelete.value = turnir;
  confirmModalRef.value.showModal();
};

const deleteTurnir = async () => {
  try {
    await axios.delete(`/api/Turniri/${turnirToDelete.value.turnirId}`);
    turniri.value = turniri.value.filter((t) => t.turnirId !== turnirToDelete.value.turnirId);
    turnirToDelete.value = null;
    toast.success("Turnir obrisan!");
  } catch (error) {
    toast.error("Greška pri brisanju turnira.");
  }
};

onMounted(() => {
  fetchTurniri();
});
</script>

<template>
  <TableContainer to="/turniri-novi" buttonText="Dodaj turnir" :showButton="rola === 'Admin'">
    <template #table-header>
      <tr>
        <th>#</th>
        <th>Naziv</th>
        <th>Igrica</th>
        <th>Datum početka</th>
        <th v-if="rola === 'Admin'">Akcije</th>
      </tr>
    </template>
    <template #table-body>
      <tr v-for="(turnir, index) in turniri" :key="turnir.turnirId">
        <td>{{ index + 1 }}</td>
        <td>{{ turnir.naziv }}</td>
        <td>{{ turnir.igrica }}</td>
        <td>{{ (turnir.datumPocetka || '').split('T')[0] }}</td>
        <td v-if="rola === 'Admin'">
          <button
            @click="router.push(`/turniri-izmena/${turnir.turnirId}`)"
            class="btn btn-warning btn-sm me-2"
          >
            <i class="fas fa-edit"></i> Izmeni
          </button>
          <button
            @click="confirmDelete(turnir)"
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
    :message="'Da li ste sigurni da želite da obrišete ovaj turnir?'"
    :onConfirm="deleteTurnir"
  />
</template>