import { ReactElement, ReactNode, useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { routes } from './routes'
import { useNavigate } from 'react-router-dom'
import { jwtTokenKey } from '../services/Api'
import { validateToken } from '../services/AuthorisationService'

export default function PrivateRoute({ children }: { children: ReactNode | ReactElement }) {
    const nav = useNavigate()
    const { user } = useContext(AuthContext)
    if (user == null) {
        nav(routes.login);
    }
    const jwtToken = localStorage.getItem(jwtTokenKey)
    if (jwtToken) {
        if (!validateToken(jwtToken)) {
            nav(routes.login)
        }
    } else {
        nav(routes.login)
    }
    return children
}
