import { useAuthStore } from "@/stores/auth";
import { Redirect, Stack } from "expo-router";
import { StyleSheet, Text } from "react-native";

export default function AppLayout() {
    const { isLoggedIn } = useAuthStore();

    if (!isLoggedIn) {
        return <Redirect href="/login" />
    }

    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    link: {
        color: 'blue'
    }
});