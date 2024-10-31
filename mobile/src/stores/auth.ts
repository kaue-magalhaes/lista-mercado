import { create } from 'zustand';

type AuthState = {
    user: UserProps | null;
    isLoggedIn: boolean;
    setUser: (user: UserProps | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isLoggedIn: false,
    setUser: (user) => set(() => ({ user, isLoggedIn: !!user })),
}))