import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod"
import { Item } from "../../types/Item";

const SearchTermSchema = z.object({
    term: z.string()
})

type SearchTermSchemaType = z.infer<typeof SearchTermSchema>

export default function Searchbar({items, onSearch}: {items: Item[], onSearch: (items: Item[], term: string) => void}) {
    const { register, handleSubmit } = useForm<SearchTermSchemaType>({ resolver: zodResolver(SearchTermSchema) })
    const onSubmit: SubmitHandler<SearchTermSchemaType> = (data) => {
        console.log(data.term)
        onSearch(items, data.term)
    }
    return (
        <form className="flex gap-2" onSubmit={handleSubmit(onSubmit)}>
            <input className="border rounded pl-2" type="text" placeholder="Search..." {...register("term")}/>
            <button type="submit">Search</button>
        </form>
    )
}
