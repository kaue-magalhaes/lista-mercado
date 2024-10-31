import { getApi } from "@/actions/api";
import { useAuthStore } from "@/stores/auth";

export async function fetchUser() {
    const user = await getApi('/api/user');

    useAuthStore.getState().setUser(user);
}