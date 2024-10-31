import { postApi } from "@/actions/api";
import { useAuthStore } from "@/stores/auth";

export async function logout() {
    await postApi('/api/logout');
    useAuthStore.getState().setUser(null);
}