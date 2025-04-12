'use client';

import { useState, useEffect } from 'react';

interface Item {
    _id: string;
    name: string;
    description?: string;
}

export default function ItemForm({
    setItems,
    itemToEdit,
    setItemToEdit,
}: {
    setItems: React.Dispatch<React.SetStateAction<Item[]>>;
    itemToEdit: Item | null;
    setItemToEdit: React.Dispatch<React.SetStateAction<Item | null>>;
}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (itemToEdit) {
        setName(itemToEdit.name);
        setDescription(itemToEdit.description || '');
        }
    }, [itemToEdit]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (itemToEdit) {
            // Update item
            const res = await fetch('/api/items', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: itemToEdit._id, name, description }),
            });
            const updatedItem: Item = await res.json();
            setItems((prev) => prev.map((item) => (item._id === updatedItem._id ? updatedItem : item)));
            setItemToEdit(null);
        } else {
            // Add new item
            const res = await fetch('/api/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, description }),
            });
            const newItem: Item = await res.json();
            setItems((prev) => [...prev, newItem]);
        }
        setName('');
        setDescription('');
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {itemToEdit ? 'Edit Item' : 'Add New Item'}
            </h2>
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                </label>
                <input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter item name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                </label>
                <input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description (optional)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
                />
            </div>
            
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
                {itemToEdit ? 'Update Item' : 'Add Item'}
            </button>
            {itemToEdit && (
                <button
                    type="button"
                    onClick={() => setItemToEdit(null)}
                    className="w-full mt-2 bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400 transition-colors duration-200"
                >
                    Cancel
                </button>
            )}
        </form>
    );
}