import { useState } from 'react';
import { Item } from '../../types/Item'

export default function ItemCard({ item, handleOnClick }: { item: Item, handleOnClick: (id: string) => void }) {
    return (
        <div onClick={() => { console.log("clicked"); handleOnClick(item.id) }} className={`transform active:scale-[98%] transition-transform duration-100 rounded bg-slate-300 p-2 flex gap-4`}>
            <p>{item.name}</p>
            <p>Category: {item.category}</p>
            <p>Count: {item.quantity}</p>
        </div>
    )
}