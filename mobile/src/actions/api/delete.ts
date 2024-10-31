import { fetchApi } from "@/actions/api/fetchApi";

export function deleteApi(url: string, options: RequestInit = {}) {
    return fetchApi(url, { method: 'DELETE', ...options });
}