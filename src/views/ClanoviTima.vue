<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import TableContainer from "@/components/TableContainer.vue";
import DeleteModal from "@/components/DeleteModal.vue";

const router = useRouter();
const clanovi = ref([]);
const clanToDelete = ref(null);
const confirmModalRef = ref(null);

const rola = localStorage.getItem("rola"); // Rola odredjuje sta korisnik moze da vidi

// Ucitava listu svih clanova tima sa servera
const fetchClanovi = async () => {
  try {
    const response = await axios.get("/api/ClanoviTima");
    clanovi.value = response.data;
  } catch (error) {
    toast.error("Greška pri učitavanju članova tima.");
  }
};

// Otvara modal za potvrdu brisanja
const confirmDelete = (clan) => {
  clanToDelete.value = clan;
  confirmModalRef.value.showModal();
};

// Salje DELETE zahtev i uklanja clana iz liste
const deleteClan = async () => {
  try {
    await axios.delete(`/api/ClanoviTima/${clanToDelete.value.clanTimaId}`);
    clanovi.value = clanovi.value.filter((c) => c.clanTimaId !== clanToDelete.value.clanTimaId);
    clanToDelete.value = null;
    toast.success("Član obrisan!");
  } catch (error) {
    toast.error("Greška pri brisanju člana.");
  }
};

onMounted(() => {
  fetchClanovi();
});
</script>

<template>
  <!-- showButton - dugme za dodavanje skriveno od Igraca -->
  <TableContainer to="/clanovi-novi" buttonText="Dodaj člana" :showButton="rola !== 'Igrac'">
    <template #table-header>
      <tr>
        <th>#</th>
        <th>Korisnik</th>
        <th>Tim</th>
        <th>Uloga</th>
        <th v-if="rola !== 'Igrac'">Akcije</th>
      </tr>
    </template>
    <template #table-body>
      <tr v-for="(clan, index) in clanovi" :key="clan.clanTimaId">
        <td>{{ index + 1 }}</td>
        <td>{{ clan.korisnik }}</td>
        <td>{{ clan.tim }}</td>
        <td>{{ clan.uloga }}</td>
        <td v-if="rola !== 'Igrac'">
          <button
            @click="router.push(`/clanovi-izmena/${clan.clanTimaId}`)"
            class="btn btn-warning btn-sm me-2"
          >
            <i class="fas fa-edit"></i> Izmeni
          </button>
          <!-- Brisanje dostupno samo Adminu -->
          <button
            v-if="rola === 'Admin'"
            @click="confirmDelete(clan)"
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
    :message="'Da li ste sigurni da želite da obrišete ovog člana?'"
    :onConfirm="deleteClan"
  />
</template>