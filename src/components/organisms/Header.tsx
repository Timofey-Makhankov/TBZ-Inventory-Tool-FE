import Searchbar from '../molecules/Searchbar'
import { routes } from '../../router/routes'

export default function Header() {
  return (
    <div className='flex align-middle p-2 gap-4'>
        <a href={routes.home}><h2 className='text-xl font-bold'>InvSys</h2></a>
        <Searchbar/>
    </div>
  )
}
