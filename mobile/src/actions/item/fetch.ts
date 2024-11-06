import { getApi } from "@/actions/api";
import { useItemStore } from "@/stores/item";
import { useLoadingStore } from "@/stores/loading";

export async function fetchItems() {
    try {
        useLoadingStore.getState().setLoading(true);
        const items = await getApi('/api/items');
        console.log(items);

        useItemStore.getState().loadItems(items as ItemProps[]);
    } catch (error) {
        console.error('Error fetching items:', error);
    } finally {
        useLoadingStore.getState().setLoading(false);
    }
}