<script setup>
import { defineProps } from "vue";
import { RouterLink } from "vue-router";

// Props koje roditelj prosledjuje ovoj komponenti
// to - ruta za dugme "Dodaj"
// buttonText - tekst na dugmetu
// showButton - da li se dugme prikazuje (zavisi od role)
const props = defineProps({
  to: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    required: true,
  },
  showButton: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div class="container mt-4">
    <div class="row">
      <div class="mb-3">
        <!-- Dugme za dodavanje - prikazuje se samo ako showButton === true -->
        <RouterLink v-if="showButton" :to="to" role="button" class="btn btn-primary">
          {{ buttonText }}
        </RouterLink>
      </div>
      <div class="row">
        <table class="table table-striped table-bordered">
          <thead class="table-dark">
            <!-- Slot za zaglavlje tabele - popunjava ga roditeljska komponenta -->
            <slot name="table-header"></slot>
          </thead>
          <tbody>
            <!-- Slot za redove tabele - popunjava ga roditeljska komponenta -->
            <slot name="table-body"></slot>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>