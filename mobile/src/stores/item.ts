import { create } from 'zustand';

type ItemState = {
    items: ItemProps[];
    loadItems: (items: ItemProps[]) => void;
    addItem: (item: ItemProps) => void;
    updateItem: (updatedItem: ItemProps) => void;
    deleteItem: (id: string) => void;
}

export const useItemStore = create<ItemState>((set) => ({
    items: [],
    loadItems: (items: ItemProps[]) => set({ items }),
    addItem: (item: ItemProps) => set((state) => ({ 
        items: [...state.items, item] 
    })),
    updateItem: (updatedItem: ItemProps) => set((state) => ({
        items: state.items.map((item) => item.id === updatedItem.id ? updatedItem : item)
    })),
    deleteItem: (id: string) => set((state) => ({ 
        items: state.items.filter((item) => item.id !== id) 
    }))
}))