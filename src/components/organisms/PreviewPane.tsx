import { Item } from '../../types/Item'

export default function PreviewPane({ item }: { item: Item | null }) {
    return (
        <>
            <img className='min-w-96 min-h-72 text-center rounded bg-slate-400 mb-8' src="" alt="Thumbnail" />
            <p className='text-xl font-semibold self-start mx-4'> {item?.name}</p>
            <p className='text-sm text-slate-500 self-start mx-4'>Id: {item?.id}</p>
            <p className='text-lg self-start mx-4'>Category: {item?.category}</p>
            <p className='text-lg self-start mx-4'>Count: {item?.quantity}</p>
        </>
    )
}
