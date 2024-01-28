import { useContext, useEffect, useState } from "react";
import itemService from "../../services/ItemService";
import { Item } from "../../types/Item";
import Card from "../atoms/ItemCard";
import { AxiosError } from "axios";
import PreviewPane from "../organisms/PreviewPane";
import Header from "../organisms/Header";
import { routes } from "../../router/routes";
import Searchbar from "../molecules/Searchbar";
import AuthorizationService from "../../services/AuthorisationService";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [presebtable, setPresentable] = useState<Item[]>([]);
  const [previewItem, setPreviewItem] = useState<Item | null>(null)
  const {setUser} = useContext(AuthContext)
  const nav = useNavigate()

  useEffect(() => {
    itemService()
      .getAll()
      .then((response) => {
        setItems(response);
        setPresentable(response)
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }, []);

  return (
    <main className="grid grid-flow-row grid-cols-12 overflow-hidden">
      <div className="flex align-middle gap-4 col-span-12 overflow-hidden px-4 py-2">
        <a href={routes.home}><h2 className='text-xl font-bold'>InvSys</h2></a>
        <Searchbar items={items} onSearch={(items, term) => {
          if (term !== "") {
            const filtered = items.filter((value) => value.name.includes(term) || value.category.includes(term))
            setPresentable(filtered)
          } else {
            setPresentable(items)
          }
        }} />
        <button type="button" onClick={() => {
          AuthorizationService().logOut()
          setUser(null)
          //useNavigate(routes.login)
          nav(routes.login)
        }} className="font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" /></svg>
          <span className="sr-only">Icon description</span>
        </button>
      </div>
      <div className="bg-slate-400 col-span-8 h-svh overflow-auto flex flex-col gap-2 px-2 pt-2">
        {presebtable.map((item: Item) => (
          <Card key={item.id} item={item} handleOnClick={(item: Item) => {
            setPreviewItem(item);
          }} />
        ))}
      </div>
      <div className="bg-amber-400 col-span-4 h-svh overflow-hidden">
        <PreviewPane item={previewItem} />
      </div>
    </main>
  );
}
