import { BrowserRouter } from 'react-router-dom'

import { useAuth } from '../hooks/auth'

import { AppRoutes } from './app.route'
import { AuthRoutes } from './auth.route'

export function Routes(){
    const { user } = useAuth()

    return(
        <BrowserRouter>
            { user ? <AppRoutes/> : <AuthRoutes />}
        </BrowserRouter>
    )
}