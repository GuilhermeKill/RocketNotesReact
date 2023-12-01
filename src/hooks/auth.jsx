import { createContext, useContext, useState, useEffect } from "react";

import { api } from '../services/api'

export const authContext = createContext({})

function AuthProvider({ children }){
    const [ data, setData] = useState({})

    function singOut(){
        localStorage.removeItem("@rocketnotes:user")
        localStorage.removeItem("@rocketnotes:token")

        setData({})
    }

    async function singIn({email, password}){
       try{
        const response = await api.post('/session', {email, password})
        const {user, token} = response.data

        localStorage.setItem("@rocketnotes:user", JSON.stringify(user))
        localStorage.setItem("@rocketnotes:token", token)

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
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

    useEffect(() => {

        
        const token = localStorage.getItem("@rocketnotes:token")
        const user = localStorage.getItem("@rocketnotes:user")

        if(token && user){
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setData({
                token,
                user: JSON.parse(user)
            })
        }


    }, [])




    return(
        <authContext.Provider value={{ 
            singIn,
            singOut,
                user: data.user
         }}>
            {children}
        </authContext.Provider>
    )
}

function useAuth(){
    const context = useContext(authContext)

    return context
}

export { AuthProvider, useAuth }