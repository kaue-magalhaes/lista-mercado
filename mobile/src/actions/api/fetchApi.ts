import { getToken } from "@/actions/auth/token";
import { Platform } from "react-native";

const NGROK_URL = 'https://1ec6-2804-8d4-366-cf00-fc40-cb5c-c5ac-e20a.ngrok-free.app';
const API_BASE_URL = Platform.OS === 'web' ? 'http://localhost:8000' : NGROK_URL;

export async function fetchApi(url: string, options: RequestInit = {}) {
    const token = await getToken();
    
    let headers: HeadersInit_ = {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
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