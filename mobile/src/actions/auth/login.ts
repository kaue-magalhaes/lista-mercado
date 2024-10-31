import { postApi } from "@/actions/api";
import { setToken } from "@/actions/auth";
import { fetchUser } from "@/actions/auth";

export async function login(credentials: LoginFormDataProps) {
    const { token } = await postApi('/api/login', { body: JSON.stringify(credentials) });
    setToken(token);

    await fetchUser();
}