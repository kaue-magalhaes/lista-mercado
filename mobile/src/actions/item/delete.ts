import { deleteApi } from "@/actions/api";
import { useItemStore } from "@/stores/item";

export async function deleteItem(id: string) {
    const response: BaseResponseProps<ItemProps> = await deleteApi(`/api/items/${id}`);

    if (response.status === 'success') {
        useItemStore.getState().deleteItem(id);
    }
}