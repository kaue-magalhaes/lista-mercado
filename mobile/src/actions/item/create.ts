import { postApi } from "@/actions/api";
import { useItemStore } from "@/stores/item";

export async function createItem(item: ItemFormProps) {
    if (item.name) {
        const response: BaseResponseProps<ItemProps> = await postApi('/api/items', { body: JSON.stringify(item) });

        if (response.status === 'success') {
            useItemStore.getState().addItem(response.data);
        }
    } else {
        throw new Error('Item name is required');
    }
}