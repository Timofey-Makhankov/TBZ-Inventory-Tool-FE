import React from 'react'
import { Item } from '../../types/Item'

export default function PreviewPane({ item }: { item: Item | null }) {
    return (
        <div>
            <p>{item?.name}</p>
            <p>{item?.id}</p>
        </div>
    )
}
