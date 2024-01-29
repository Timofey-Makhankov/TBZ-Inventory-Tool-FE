import { redirect, useNavigate } from "react-router-dom";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import itemService from "../../services/ItemService";
import { routes } from "../../router/routes";

const CreateItemSchema = z.object({
    name: z.string({required_error: "Name Required"}),
    category: z.string({required_error : "category Required"}).trim(),
    quantity: z.coerce.number().int().min(0)
})

type CreateItemSchemaType = z.infer<typeof CreateItemSchema>

export default function CreateItem() {
    const nav = useNavigate()
    const { register, handleSubmit, formState: {errors} } = useForm<CreateItemSchemaType>({resolver: zodResolver(CreateItemSchema)})
    const onSubmit: SubmitHandler<CreateItemSchemaType> = (data) => {
        console.log(data)
        itemService().create({id: null, ...data}).then(() => {
            redirect(routes.home)
        })
        .catch((error) => {console.log(error)})
    }
    return (
        <div className='flex flex-col'>
            <div className='flex p-4'>
                <button onClick={() => { nav(-1) }}><span><svg className='fill-slate-800 hover:fill-slate-500' xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" /></svg></span></button>
            </div>
            <div className="flex flex-col justify-center">
                <h2 className="text-center text-4xl font-bold pt-16 pb-8">Create Item</h2>
            <form className="flex flex-col mx-64" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name"></label>
                    <input className="border rounded" placeholder="name" type="text" {...register("name")}/>
                    {errors.name && <span>{errors.name.message}</span>}
                    <label htmlFor="category"></label>
                    <input className="border rounded" placeholder="category" type="text" {...register("category")}/>
                    {errors.category && <span>{errors.category.message}</span>}
                    <label htmlFor="quantity"></label>
                    <input className="border rounded" placeholder="count" type="text" {...register("quantity")}/>
                    {errors.quantity && <span>{errors.quantity.message}</span>}
                    <button className="border rounded bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4" type="submit">Create</button>
                </form>
            </div>
        </div>
    )
}
