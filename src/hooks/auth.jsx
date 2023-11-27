import { createContext, useContext, useState } from "react";

import { api } from '../services/api'

export const authContext = createContext({})

function AuthProvider({ children }){
    const [ data, setData] = useState({})

    async function singIn({email, password}){
       try{
        const response = await api.post('/session', {email, password})
        const {user, token} = response.data

        api.defaults.headers.authorization = `Bearer ${token}`
        setData({ user, token })

       }
       catch (error){
        if(error.response){
            alert(error.response.data.message)
        }
        else{
            alert("Não foi possível entrar")
        }
       }

    }

    return(
        <authContext.Provider value={{ singIn, user: data.userdera }}>
            {children}
        </authContext.Provider>
    )
}

function useAuth(){
    const context = useContext(authContext)

    return context
}

export { AuthProvider, useAuth }