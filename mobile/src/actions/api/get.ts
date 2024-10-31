import { fetchApi } from "@/actions/api/fetchApi";

export function getApi(url: string, options: RequestInit = {}) {
    return fetchApi(url, { method: 'GET', ...options });
}