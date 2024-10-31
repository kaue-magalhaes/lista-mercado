import { fetchApi } from "@/actions/api/fetchApi";

export function putApi(url: string, options: RequestInit = {}) {
    return fetchApi(url, { method: 'PUT', ...options });
}