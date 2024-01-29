import { useContext, useEffect, useState } from "react";
import itemService from "../../services/ItemService";
import { Item } from "../../types/Item";
import Card from "../atoms/ItemCard";
import { AxiosError } from "axios";
import PreviewPane from "../organisms/PreviewPane";
import { routes } from "../../router/routes";
import Searchbar from "../molecules/Searchbar";
import AuthorizationService from "../../services/AuthorisationService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [presebtable, setPresentable] = useState<Item[]>([]);
  const [previewItem, setPreviewItem] = useState<Item | null>(null)
  const { setUser } = useContext(AuthContext)
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
        <h2 className='text-xl text-center flex items-center font-bold mr-32'><a href={routes.home}>InvSys</a></h2>

        <Searchbar items={items} onSearch={(items, term) => {
          if (term !== "") {
            const filtered = items.filter((value) => value.name.toLocaleLowerCase().includes(term.toLocaleLowerCase()) || value.category.toLocaleLowerCase().includes(term.toLocaleLowerCase()))
            setPresentable(filtered)
          } else {
            setPresentable(items)
          }
        }} />
        <button onClick={() => { nav(routes.createItem) }}><span><svg className='fill-slate-800 hover:fill-slate-400' xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg></span></button>
        <button><span><svg className='fill-slate-800 hover:fill-slate-400' xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" /></svg></span></button>
        <button type="button" onClick={() => {
          AuthorizationService().logOut()
          setUser(null)
          nav(routes.login)
        }} className="font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2">
          <svg className='fill-slate-800 hover:fill-slate-400' xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 -960 960 960" width="32"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" /></svg>
          <span className="sr-only">Icon description</span>
        </button>
      </div>
      <div className="bg-slate-200 col-span-8 h-svh overflow-auto flex flex-col gap-2 px-2 pt-2">
        {presebtable.map((item: Item) => (
          <Card key={item.id} item={item} handleOnClick={(item: Item) => {
            setPreviewItem(item);
          }} />
        ))}
      </div>
      <div className="bg-slate-300 col-span-4 h-svh overflow-hidden flex flex-col items-center p-4">
        <PreviewPane item={previewItem} />
      </div>
    </main>
  );
}
