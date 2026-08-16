import { ref } from "vue";

// Composable - pomocna funkcija za citanje role korisnika iz localStorage
export function useUserRole() {
  const userRole = ref(null);

  const checkUserRole = () => {
    const role = localStorage.getItem("rola");
    userRole.value = role;
  };

  return {
    userRole,
    checkUserRole,
  };
}