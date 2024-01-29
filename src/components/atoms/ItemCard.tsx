import { redirect } from 'react-router-dom'
import itemService from '../../services/ItemService'
import { Item } from '../../types/Item'
import { routes } from '../../router/routes'

export default function ItemCard({ item, handleOnClick }: { item: Item, handleOnClick: (item: Item) => void }) {
    const onDelete = (id: string) => {
        itemService().delete(id).then(() => {
          redirect(routes.home)
        })
        .catch((error) => {
          console.log(error)
        })
      }
    return (
        <div onClick={() => { console.log("clicked"); handleOnClick(item) }} className={`transform active:scale-[98%] transition-transform duration-100 rounded bg-slate-300 p-2 flex gap-4`}>
            <p>{item.name}</p>
            <p className='pl-8 grow'>Category: {item.category}</p>
            <p className='px-2 font-bold'>{item.quantity}</p>
            <button onClick={() => {}}><span><svg className='fill-slate-800 hover:fill-slate-400' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg></span></button>
            <button onClick={() => { console.log("Clicked Delete"); onDelete(item.id!) }}><span><svg className='fill-slate-800 hover:fill-slate-400' xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg></span></button>
        </div>
    )
}
