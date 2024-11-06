import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

type AuthState = {
    user: UserProps | null;
    isLoggedIn: boolean;
    setUser: (user: UserProps | null) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isLoggedIn: false,
            setUser: (user) => set(() => ({ user, isLoggedIn: !!user })),
        }),
        { 
            name: 'auth-store',
            getStorage: () => (Platform.OS === 'web' ? localStorage : SecureStore),
        } as PersistOptions<AuthState>
    )
)