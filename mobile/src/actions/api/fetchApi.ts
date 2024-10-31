import { getToken } from "@/actions/auth";

const API_BASE_URL = 'http://localhost:8000';
    
export async function fetchApi(url: string, options: RequestInit = {}) {
    const token = await getToken();
    
    let headers: HeadersInit_ = {
        'Content-Type': 'application/json',
    };
    
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }


    const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers: {
            ...headers,
            ...options?.headers,
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed: ${response.status} - ${errorText}`);
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}