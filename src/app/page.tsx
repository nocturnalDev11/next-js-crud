'use client';

import { useState, useEffect } from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

interface Item {
  _id: string;
  name: string;
  description?: string;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [itemToEdit, setItemToEdit] = useState<Item | null>(null);

  useEffect(() => {
    fetch('/api/items')
      .then((res) => res.json())
      .then((data: Item[]) => setItems(data));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">
          CRUD App
        </h1>
        <ItemForm setItems={setItems} itemToEdit={itemToEdit} setItemToEdit={setItemToEdit} />
        <ItemList items={items} setItems={setItems} setItemToEdit={setItemToEdit} />
      </div>
    </main>
  );
}