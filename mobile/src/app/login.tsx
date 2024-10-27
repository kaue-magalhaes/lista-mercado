import { Link, router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useSession } from "../providers/auth";

export default function Login() {
    const { signIn } = useSession();
    return (
        <View style={style.container}>
            <Text style={style.text}>Login page</Text>
            <Text 
                style={style.button} 
                onPress={() => {
                    signIn();

                    router.replace('/');
                }}
            >
                Sign In
            </Text>
            <Link href="/register" style={style.link}>
                Go to Register
            </Link>
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