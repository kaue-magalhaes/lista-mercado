import { logout } from "@/actions/auth";
import { Button } from "@/components/Button";
import { useAuthStore } from "@/stores/auth";
import { Text, View } from "react-native";

export default function Home() {
    const user = useAuthStore.getState().user;

    const logUser = () => {
        console.log(user);
    }
    return (
        <View className="flex-1 flex-col space-y-4 items-center justify-center bg-zinc-950">
            <Text className="text-3xl text-zinc-50">Home page</Text>
            <Button
                label="Sign Out"
                onPress={logout}
            />
            <Button
                label="User"
                onPress={logUser}
            />
        </View>
    )
}