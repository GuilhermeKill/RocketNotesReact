import { Container, Form, Avatar } from "./style";
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';
import { Input } from "../../componets/Input";
import { Button } from "../../componets/Button";
import { Link } from "react-router-dom";
import {api} from "../../services/api"

import avatarPlaceholder from'../../assets/avatar_placeholder.svg'

import { useState } from "react";
import { useAuth } from '../../hooks/auth'


export function Profile(){
    const { user, updateProfile } = useAuth()

    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    

    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
    const [avatar, setAvatar] = useState(avatarUrl)
    const [avatarFile, setAvatarFile] = useState(null)
    
    async function handleUpdate(){
        const user = {
            name,
            email,
            password: newPassword,
            old_password: oldPassword
        }
        await updateProfile({ user, avatarFile })
    }
    
    function handleChangeAvatar(event){
        const file = event.target.files[0]
        setAvatarFile(file)
        
        const imagePreview = URL.createObjectURL(file)
        setAvatar(imagePreview)
        
    }
    


    
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
                     src={avatar}
                     alt="Foto do usuário"
                     />

                    <label htmlFor="avatar">
                    <FiCamera />

                    <input 
                     id="avatar"
                     type="file"
                     onChange={handleChangeAvatar}
                    />

                     </label>
                </Avatar>

                <Input 
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <Input 
                    placeholder="E-mail"
                    type="text"
                    icon={FiMail}
                    value={email}
                    onChange={e => setEmail(e.target.value)}

                />

                <Input 
                    placeholder="Senha atual"
                    type="password"
                    icon={FiLock}
                    onChange={e => setOldPassword(e.target.value)}
                />

                <Input 
                    placeholder="Nova senha"
                    type="password"
                    icon={FiUser}
                    onChange={e => setNewPassword(e.target.value)}
                />

                <Button 
                    title="salvar"
                    onClick={handleUpdate}
                />
            </Form>

        </Container>
    )
}