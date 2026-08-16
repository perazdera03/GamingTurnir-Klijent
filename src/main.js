import { createApp } from "vue";
import App from "./App.vue";
import Vue3Toastify from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import router from "./router";
import axios from "axios";

// Automatski brise localStorage nakon 30 minuta (sigurnost)
setInterval(() => {
  localStorage.clear();
}, 30 * 60 * 1000);

// Axios interceptor - automatski dodaje JWT token u svaki HTTP zahtev
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const app = createApp(App);

// Vue3Toastify - notifikacije koje se automatski zatvaraju nakon 3 sekunde
app.use(Vue3Toastify, {
  autoClose: 3000,
});

app.use(router);
app.mount("#app");