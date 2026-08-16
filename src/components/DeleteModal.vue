<script setup>
import { ref, defineExpose, onMounted, onBeforeUnmount } from "vue";

// Props - title i message su opcioni, onConfirm je funkcija koja se poziva pri potvrdi
const props = defineProps({
  title: {
    type: String,
    default: "Potvrda brisanja",
  },
  message: {
    type: String,
    default: "Da li ste sigurni da želite da obrišete stavku?",
  },
  onConfirm: {
    type: Function,
    required: true,
  },
});

const modalElement = ref(null);
let modalInstance = null;

const showModal = () => {
  if (modalInstance) modalInstance.show();
};

const hideModal = () => {
  if (modalInstance) modalInstance.hide();
};

// Poziva onConfirm funkciju i zatvara modal
const handleConfirm = () => {
  props.onConfirm();
  hideModal();
};

// Inicijalizuje Bootstrap modal instancu
onMounted(() => {
  modalInstance = new bootstrap.Modal(modalElement.value);
});

// Unistava modal instancu kada se komponenta ukloni
onBeforeUnmount(() => {
  if (modalInstance) modalInstance.dispose();
});

// Izlaze showModal i hideModal roditeljskoj komponenti
defineExpose({ showModal, hideModal });
</script>

<template>
  <div class="modal fade" ref="modalElement" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          {{ message }}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Otkaži</button>
          <button type="button" class="btn btn-danger" @click="handleConfirm">Obriši</button>
        </div>
      </div>
    </div>
  </div>
</template>