import { useEffect, useState } from "react";
import itemService from "../../services/ItemService";
import Searchbar from "../molecules/Searchbar";
import { Item } from "../../types/Item";
import Card from "../atoms/ItemCard";
import { AxiosError } from "axios";

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [previewItem, setPreviewItem] = useState<Item|null>(null)

  useEffect(() => {
    itemService()
      .getAll()
      .then((response) => {
        setItems(response);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }, []);

  return (
    <main className="grid grid-flow-row grid-cols-12 overflow-hidden">
      <div className="col-span-12 overflow-hidden">
        <Searchbar />
      </div>
      <div className="bg-slate-400 col-span-8 h-svh overflow-auto flex flex-col gap-2 px-2 pt-2">
        {items.map((item: Item) => (
          <Card key={item.id} item={item} handleOnClick={(idItem) => {
            const item = items.find((value) => {value.id === idItem})
            item && setPreviewItem(item);
          }}/>
        ))}
      </div>
      <div className="bg-amber-400 col-span-4 h-svh overflow-hidden">
        <h1>Item</h1>
        <p>{previewItem?.name}</p>
        <p>{previewItem?.id}</p>
      </div>
    </main>
  );
}
