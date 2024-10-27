import { StyleSheet, Text, View } from "react-native";

export default function Register() {
    return (
        <View style={style.container}>
            <Text style={style.text}>Register page</Text>
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
    }
});