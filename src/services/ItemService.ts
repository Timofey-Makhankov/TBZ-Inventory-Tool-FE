import { AxiosInstance, AxiosResponse } from "axios";
import apiDefault from "./Api";
import { Item } from "../types/Item";

const itemService = (api: AxiosInstance = apiDefault) => ({
    getAll: async (): Promise<Item[]> => {
        const response: AxiosResponse = await api.get("/item")
        return response.data
    },
    getById: async (id: string): Promise<Item> => {
        const response: AxiosResponse = await api.get(`/item/${id}`);
        return response.data
    },
    create: async (item: Item): Promise<Item> => {
        const response: AxiosResponse = await api.post("/item", item)
        return response.data
    },
    update: async (id: string, item: Item): Promise<Item> => {
        item.id = id;
        const response: AxiosResponse = await api.put(`/item/${id}`, item)
        return response.data
    },
    delete: async (id: string): Promise<void> => {
        await api.delete(`/item/${id}`)
    }
})

export default itemService