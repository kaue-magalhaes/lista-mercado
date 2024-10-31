import { Link, router } from "expo-router";
import { Platform, Text, TextInput, View } from "react-native";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { login } from "@/actions/auth";

export default function Login() {
    const { control, handleSubmit, formState: { errors } } = useForm<LoginFormDataProps>();
    const submit = async (data: LoginFormDataProps) => {
        try {
            data.device_name = `${Platform.OS} ${Platform.Version}`;
            await login(data);

            router.navigate('/(app)');
        } catch (error) {
            console.error(error);
        }
    }

    const passwordRef = useRef<TextInput>(null);
    return (
        <View className="flex-1 flex-col space-y-4 items-center justify-center bg-zinc-950">
            <Text className="text-3xl text-zinc-50">
                Login page
            </Text>
            <Link
                className="text-blue-500 hover:underline"
                href="/register"
            >
                Go to Register page
            </Link>
            <Input
                label="Email"
                error={errors.email?.message}
                formProps={{
                    control,
                    name: 'email',
                    rules: {
                        required: 'Email is required',
                    },
                }}
                inputProps={{
                    placeholder: 'Enter your email',
                    onSubmitEditing: () => passwordRef.current?.focus(),
                    returnKeyType: 'next',
                }}
            />
            <Input
                ref={passwordRef}
                error={errors.password?.message}
                label="Password"
                formProps={{
                    control,
                    name: 'password',
                    rules: {
                        required: 'Password is required',
                    },
                }}
                inputProps={{
                    placeholder: 'Enter your password',
                    secureTextEntry: true,
                }}
            />
            <Button
                label="Sign In"
                onPress={handleSubmit(submit)}
            />
        </View>
    )
}