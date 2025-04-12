'use client';

interface Item {
    _id: string;
    name: string;
    description?: string;
}

export default function ItemList({
    items,
    setItems,
    setItemToEdit,
}: {
    items: Item[];
    setItems: React.Dispatch<React.SetStateAction<Item[]>>;
    setItemToEdit: React.Dispatch<React.SetStateAction<Item | null>>;
}) {
    const handleDelete = async (id: string) => {
        await fetch('/api/items', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });
        setItems((prev) => prev.filter((item) => item._id !== id));
    };

    return (
        <div className="max-w-2xl mx-auto mt-8">
            {items.length === 0 ? (
                <p className="text-center text-gray-500">No items yet. Add one above!</p>
            ) : (
                <ul className="space-y-4">
                    {items.map((item) => (
                        <li
                            key={item._id}
                            className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                {item.description && (
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                )}
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setItemToEdit(item)}
                                    className="px-3 py-1.5 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors text-sm"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}