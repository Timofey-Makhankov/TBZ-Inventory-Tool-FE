import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod"

const SearchTermSchema = z.object({
    term: z.string()
})

type SearchTermSchemaType = z.infer<typeof SearchTermSchema>

export default function Searchbar() {
    const { register, handleSubmit } = useForm<SearchTermSchemaType>({ resolver: zodResolver(SearchTermSchema) })
    const onSubmit: SubmitHandler<SearchTermSchemaType> = (data) => {
        console.log(data.term)
    }
    return (
        <form className="flex" onSubmit={handleSubmit(onSubmit)}>
            <input className="border rounded" type="text" placeholder="Search..." {...register("term")}/>
            <button type="submit">Search</button>
        </form>
    )
}
