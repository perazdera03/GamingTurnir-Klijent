<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import TableContainer from "@/components/TableContainer.vue";
import DeleteModal from "@/components/DeleteModal.vue";

const router = useRouter();
const korisnici = ref([]);
const korisnikToDelete = ref(null);
const confirmModalRef = ref(null);

// Ucitava listu svih korisnika sa servera
const fetchKorisnici = async () => {
  try {
    const response = await axios.get("/api/Korisnici");
    korisnici.value = response.data;
  } catch (error) {
    toast.error("Greška pri učitavanju korisnika.");
  }
};

// Otvara modal za potvrdu brisanja
const confirmDelete = (korisnik) => {
  korisnikToDelete.value = korisnik;
  confirmModalRef.value.showModal();
};

// Salje DELETE zahtev i uklanja korisnika iz liste
const deleteKorisnik = async () => {
  try {
    await axios.delete(`/api/Korisnici/${korisnikToDelete.value.korisnikId}`);
    korisnici.value = korisnici.value.filter((k) => k.korisnikId !== korisnikToDelete.value.korisnikId);
    korisnikToDelete.value = null;
    toast.success("Korisnik obrisan!");
  } catch (error) {
    toast.error("Greška pri brisanju korisnika.");
  }
};

// Pretvara brojcanu vrednost role u citljiv naziv
const getRolaNaziv = (rola) => {
  const mapa = { 0: "Admin", 1: "Kapiten", 2: "Igrac" };
  return mapa[rola] || "?";
};

onMounted(() => {
  fetchKorisnici();
});
</script>

<template>
  <TableContainer to="/korisnici-novi" buttonText="Dodaj korisnika">
    <template #table-header>
      <tr>
        <th>#</th>
        <th>Username</th>
        <th>Rola</th>
        <th>Akcije</th>
      </tr>
    </template>
    <template #table-body>
      <tr v-for="(korisnik, index) in korisnici" :key="korisnik.korisnikId">
        <td>{{ index + 1 }}</td>
        <td>{{ korisnik.username }}</td>
        <td>{{ getRolaNaziv(korisnik.rola) }}</td>
        <td>
          <button
            @click="router.push(`/korisnici-izmena/${korisnik.korisnikId}`)"
            class="btn btn-warning btn-sm me-2"
          >
            <i class="fas fa-edit"></i> Izmeni
          </button>
          <button
            @click="confirmDelete(korisnik)"
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
    :message="'Da li ste sigurni da želite da obrišete ovog korisnika?'"
    :onConfirm="deleteKorisnik"
  />
</template>