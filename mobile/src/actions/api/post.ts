import { fetchApi } from "@/actions/api/fetchApi";

export function postApi(url: string, options: RequestInit = {}) {
    return fetchApi(url, { method: 'POST', ...options });
}