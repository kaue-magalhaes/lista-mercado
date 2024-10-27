import { useSession } from "@/src/providers/auth";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
    const { signOut } = useSession();
    return (
        <View style={style.container}>
            <Text style={style.text}>Home page</Text>
            <Text
                style={style.button}
                onPress={() => {
                    signOut();
                }}
            >
                Sign Out
            </Text>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
    },
    link: {
        color: '#fff',
        fontSize: 20,
        marginTop: 20,
        textDecorationLine: 'underline'
    },
    button: {
        fontSize: 20,
        color: '#fff',
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginTop: 20
    }
});