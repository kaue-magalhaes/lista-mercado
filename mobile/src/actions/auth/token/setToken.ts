import { Platform } from "react-native";
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'token';

export async function setToken(token: string | null) {
    if (Platform.OS === 'web') {
        try {
            if (token === null) {
                localStorage.removeItem(TOKEN_KEY);
            } else {
                localStorage.setItem(TOKEN_KEY, token);
            }
        } catch (e) {
            console.error('Local storage is unavailable:', e);
        }
    } else {
        if (token == null) {
            await SecureStore.deleteItemAsync(TOKEN_KEY);
        } else {
            await SecureStore.setItemAsync(TOKEN_KEY, token);
        }
    }
}