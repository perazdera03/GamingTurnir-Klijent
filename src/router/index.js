import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Timovi from "@/views/Timovi.vue";
import TimoviNovi from "@/views/TimoviNovi.vue";
import TimoviIzmena from "@/views/TimoviIzmena.vue";
import Turniri from "@/views/Turniri.vue";
import TurniriNovi from "@/views/TurniriNovi.vue";
import TurniriIzmena from "@/views/TurniriIzmena.vue";
import Mecevi from "@/views/Mecevi.vue";
import MeceviNovi from "@/views/MeceviNovi.vue";
import MeceviIzmena from "@/views/MeceviIzmena.vue";
import Korisnici from "@/views/Korisnici.vue";
import KorisniciNovi from "@/views/KorisniciNovi.vue";
import KorisniciIzmena from "@/views/KorisniciIzmena.vue";
import ClanoviTima from "@/views/ClanoviTima.vue";
import ClanoviNovi from "@/views/ClanoviNovi.vue";
import ClanoviIzmena from "@/views/ClanoviIzmena.vue";

// Definicija svih ruta aplikacije
// meta.requiresAuth - ruta zahteva prijavljivanje
// meta.requiresRole - ruta dostupna samo odredjenim rolama
const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", name: "Login", component: Login },
  { path: "/timovi", name: "Timovi", component: Timovi, meta: { requiresAuth: true } },
  { path: "/timovi-novi", name: "TimoviNovi", component: TimoviNovi, meta: { requiresAuth: true } },
  { path: "/timovi-izmena/:id", name: "TimoviIzmena", component: TimoviIzmena, meta: { requiresAuth: true } },
  { path: "/turniri", name: "Turniri", component: Turniri, meta: { requiresAuth: true } },
  { path: "/turniri-novi", name: "TurniriNovi", component: TurniriNovi, meta: { requiresAuth: true } },
  { path: "/turniri-izmena/:id", name: "TurniriIzmena", component: TurniriIzmena, meta: { requiresAuth: true } },
  { path: "/mecevi", name: "Mecevi", component: Mecevi, meta: { requiresAuth: true } },
  { path: "/mecevi-novi", name: "MeceviNovi", component: MeceviNovi, meta: { requiresAuth: true } },
  { path: "/mecevi-izmena/:id", name: "MeceviIzmena", component: MeceviIzmena, meta: { requiresAuth: true } },
  { path: "/korisnici", name: "Korisnici", component: Korisnici, meta: { requiresAuth: true, requiresRole: ["Admin"] } },
  { path: "/korisnici-novi", name: "KorisniciNovi", component: KorisniciNovi, meta: { requiresAuth: true, requiresRole: ["Admin"] } },
  { path: "/korisnici-izmena/:id", name: "KorisniciIzmena", component: KorisniciIzmena, meta: { requiresAuth: true, requiresRole: ["Admin"] } },
  { path: "/clanovi", name: "ClanoviTima", component: ClanoviTima, meta: { requiresAuth: true } },
  { path: "/clanovi-novi", name: "ClanoviNovi", component: ClanoviNovi, meta: { requiresAuth: true } },
  { path: "/clanovi-izmena/:id", name: "ClanoviIzmena", component: ClanoviIzmena, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Guard koji se izvrsava pre svake navigacije
// Proverava da li je korisnik prijavljen i da li ima odgovarajucu rolu
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("access_token");
  const rola = localStorage.getItem("rola");

  // Ako ruta zahteva prijavu a korisnik nije prijavljen -> login
  if (to.meta.requiresAuth && !token) {
    return next("/login");
  }

  // Ako ruta zahteva odredjenu rolu a korisnik je nema -> timovi
  if (to.meta.requiresRole && !to.meta.requiresRole.includes(rola)) {
    return next("/timovi");
  }

  next();
});

export default router;