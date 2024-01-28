import { ReactElement, ReactNode, useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { routes } from './routes'
import { redirect } from 'react-router-dom'
import { jwtTokenKey } from '../services/Api'
import { validateToken } from '../services/AuthorisationService'

export default function PrivateRoute({children}: {children: ReactNode | ReactElement}) {
    const {user} = useContext(AuthContext)

    if(user == null) {
        redirect(routes.login);
    }

    const jwtToken = localStorage.getItem(jwtTokenKey)

    if(jwtToken){
        if(!validateToken(jwtToken)){
            redirect(routes.login)
        }
    } else {
        redirect(routes.login)
    }

  return (
    //authenticated ? {children} : <div>failed to load</div>
    children
  )
}
