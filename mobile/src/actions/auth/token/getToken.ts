import { Platform } from "react-native";
import * as SecureStore from 'expo-secure-store';

export async function getToken() {
    if (Platform.OS === 'web') {
        return localStorage.getItem('token');
    }

    return await SecureStore.getItemAsync('token');
}