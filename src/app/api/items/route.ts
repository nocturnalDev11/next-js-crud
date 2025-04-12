import connectDB from '@/app/lib/db';
import Item from '@/models/Item';
import { NextResponse } from 'next/server';

export async function GET() {
    await connectDB();
    const items = await Item.find();
    return NextResponse.json(items);
}

export async function POST(request: Request) {
    await connectDB();
    const data = await request.json();
    const item = await Item.create(data);
    return NextResponse.json(item, { status: 201 });
}

export async function PUT(request: Request) {
    await connectDB();
    const { id, ...data } = await request.json();
    const item = await Item.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(item);
}

export async function DELETE(request: Request) {
    await connectDB();
    const { id } = await request.json();
    await Item.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Item deleted' });
}