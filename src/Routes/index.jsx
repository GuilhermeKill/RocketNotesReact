import { BrowserRouter } from 'react-router-dom'

import { AppRoutes } from './app.route'
import { AuthRoutes } from './auth.route'

export function Routes(){
    
    return(
        <BrowserRouter>
            <AuthRoutes />
        </BrowserRouter>
    )
}