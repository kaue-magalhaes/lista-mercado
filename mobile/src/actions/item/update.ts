import { putApi } from "@/actions/api";
import { useItemStore } from "@/stores/item";

export async function updateItem(item: ItemFormProps) {
    if (item.id) {
        const response: BaseResponseProps<ItemProps> = await putApi(`/api/items/${item.id}`, { body: JSON.stringify(item) });

        if (response.status === 'success') {
            useItemStore.getState().updateItem(response.data);
        }
    } else {
        throw new Error('Item ID is required');
    }
}