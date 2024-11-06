import { FlatList, Text, View } from "react-native";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import { useAuthStore } from "@/stores/auth";
import { useItemStore } from "@/stores/item";
import { useLoadingStore } from "@/stores/loading";

import { logout } from "@/actions/auth/logout";
import { fetchItems } from "@/actions/item/fetch";
import { createItem } from "@/actions/item/create";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Checkbox } from "@/components/Checkbox";
import { LogOut, ArrowRight, Pencil, X } from 'lucide-react-native';
import { deleteItem } from "@/actions/item/delete";
import { Dialog, DialogContent, DialogTrigger, useDialog } from "@/components/Dialog";
import { updateItem } from "@/actions/item/update";

export default function Home() {
    const { control: createItemControl, handleSubmit: createItemHandleSubmit, formState: { errors: createItemErrors }, reset: createItemReset } = useForm<ItemFormProps>();
    const { control: updateItemControl, handleSubmit: updateItemHandleSubmit, formState: { errors: updateItemErrors }, setValue, reset: updateItemReset } = useForm<ItemFormProps>();
    const { user } = useAuthStore();
    const { items } = useItemStore();
    const { loading } = useLoadingStore();

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <View className="flex-1 flex-col space-y-4 items-center bg-zinc-950">
            <View className="w-full px-6 mt-4 flex flex-row items-center justify-between">
                <Text className="text-2xl text-zinc-50">
                    Welcome, {user?.name}
                </Text>
                <Button
                    onPress={logout}
                    size={"icon"}
                    variant={"link"}
                >
                    <LogOut className="text-zinc-50" />
                </Button>
            </View>

            <View className="w-full px-6 mt-4">
                <Text className="text-2xl text-center text-zinc-50">
                    Lista de Mercado
                </Text>
                <View className="flex flex-row items-center justify-between space-x-2 mt-4">
                    <Input
                        className="flex-1"
                        error={createItemErrors.name?.message}
                        formProps={{
                            control: createItemControl,
                            name: 'name',
                            rules: {
                                required: 'Item is required',
                            },
                        }}
                        inputProps={{
                            placeholder: 'Adicione um item na lista',
                        }}
                    />
                    <Button
                        onPress={createItemHandleSubmit( async (data) => {
                            await createItem(data);
                            createItemReset();
                        })}
                        size={"icon"}
                    >
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </View>
                {loading ? (
                    <Text className="text-center text-zinc-50">Loading...</Text>
                ) : items.length === 0 ? (
                    <Text className="text-center text-zinc-50">No items to display.</Text>
                ) : (
                    <FlatList
                        data={items}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View className="flex flex-row items-center justify-between mt-4 border border-zinc-700 rounded-lg p-4">
                                <View className="flex flex-row items-center space-x-4">
                                    <Checkbox />
                                    <Text className="text-xl text-zinc-50">
                                        {item.name}
                                    </Text>
                                </View>
                                <View className="flex flex-row items-center space-x-2">
                                    <Dialog>
                                        <DialogTrigger
                                            onExecute={() => setValue('name', item.name)}
                                        >
                                            <Button
                                                size={"icon"}
                                                variant={"link"}
                                            >
                                                <Pencil className="text-zinc-50" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <View className="flex gap-4">
                                                <Text className="font-semibold text-2xl text-zinc-50">Editar Item</Text>
                                                <View className="flex flex-row items-center justify-between space-x-2">
                                                    <Input
                                                        className="flex-1"
                                                        error={updateItemErrors.name?.message}
                                                        formProps={{
                                                            control: updateItemControl,
                                                            name: 'name',
                                                            rules: {
                                                                required: 'Item is required',
                                                            },
                                                        }}
                                                        inputProps={{
                                                            placeholder: 'Adicione um item na lista',
                                                        }}
                                                    />
                                                    <Button
                                                        onPress={updateItemHandleSubmit( async (data) => {
                                                            await updateItem({...data, id: item.id});
                                                            updateItemReset();
                                                        })}
                                                        size={"icon"}
                                                    >
                                                        <ArrowRight className="h-4 w-4" />
                                                    </Button>
                                                </View>
                                            </View>
                                        </DialogContent>
                                    </Dialog>
                                    <Button
                                        onPress={() => deleteItem(item.id)}
                                        size={"icon"}
                                        variant={"link"}
                                    >
                                        <X className="text-zinc-50" />
                                    </Button>
                                </View>
                            </View>
                        )}
                    />
                )}
            </View>
        </View>
    )
}