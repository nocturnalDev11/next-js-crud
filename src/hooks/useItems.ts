import { useState, useEffect } from 'react';

interface Item {
    _id: string;
    name: string;
    description?: string;
}

export function useItems() {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        fetch('/api/items')
        .then((res) => res.json())
        .then((data: Item[]) => setItems(data));
    }, []);

    return { items, setItems };
}
