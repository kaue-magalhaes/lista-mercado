import { Slot } from "expo-router";
import { SessionProvider } from "../providers/auth";

export default function RootLayout() {
    return (
        <SessionProvider>
            <Slot />
        </SessionProvider>
    )
}