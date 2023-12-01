import { Container, Form, Avatar } from "./style";
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';
import { Input } from "../../componets/Input";
import { Button } from "../../componets/Button";
import { Link } from "react-router-dom";

import { useState } from "react";
import { useAuth } from '../../hooks/auth'


export function Profile (){
    const { user } = useAuth()
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")


    



    
    return(
        <Container>
            <header>
                <Link to="/">
                    <FiArrowLeft />
                </Link>
            </header>

            <Form>

                <Avatar>
                    <img 
                     src="https://github.com/rodrigo.png"
                     alt="Foto do usuário"
                     />

                    <label htmlFor="avatar">
                    <FiCamera />

                    <input 
                     id="avatar"
                     type="file" 
                    />

                     </label>
                </Avatar>

                <Input 
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                    value={name}
                    onChange={e => {e.target.value}}
                />

                <Input 
                    placeholder="E-mail"
                    type="text"
                    icon={FiMail}
                    value={email}
                    onChange={e => {e.target.value}}

                />

                <Input 
                    placeholder="Senha atual"
                    type="password"
                    icon={FiLock}
                    onChange={e => {e.target.value}}
                />

                <Input 
                    placeholder="Nova senha"
                    type="password"
                    icon={FiUser}
                    onChange={e => {e.target.value}}
                />

                <Button 
                    title="salvar"
                />
            </Form>

        </Container>
    )
}