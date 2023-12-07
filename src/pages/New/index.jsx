import { Link } from "react-router-dom";
import { Header } from '../../componets/Header'
import { Input } from '../../componets/Input'
import { TextArea } from '../../componets/TextArea'
import { NoteItem } from '../../componets/NoteItem'
import { Section } from '../../componets/Section'
import { Button } from '../../componets/Button'

import { useNavigate } from "react-router-dom";

import { useState } from "react";

import { Container, Form } from './styles'
import { api } from '../../services/api'

export function New(){
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const [links, setLinks] = useState([])
    const [newLinks, setNewLinks] = useState("")

    const [tags, setTags] = useState([])
    const [newTags, setNewTags] = useState("")

    const navigate = useNavigate()

    function handleLinks(){
        setLinks(prevState => [...prevState, newLinks])

        setNewLinks("")
    }

    function handleRemoveLink(deleted){
        setLinks(prevState => prevState.filter((link, index) => index !== deleted))
    }


    function handleTags(){
        setTags(prevState => [...prevState, newTags])

        setNewTags("")
    }

    function handleRemoveTag(deleted){
        setTags(prevState => prevState.filter((tag, index) => index !== deleted))
    }

    async function handleNewNote(){
        if(!title && !tags && !links){
            return alert("Preencha todos os campos!")
        }

        if(newLinks){
            return alert("Você colocou a URL, mas, esqueceu de clicar no botão de adicionar")
        }

        if(newTags){
            return alert("Você colocou a TAG, mas, esqueceu de clicar no botão de adicionar")
        }

        await api.post("/notes",{
            title,
            description,
            tags,
            links
        })

        alert("Nota criada com sucesso!")
        navigate("/")
    }


    return(
        <Container>
            <Header />

            <main>
                <Form>
                    <header>
                        <h1>Criar nota</h1>
                        <Link to="/">
                            Voltar
                        </Link>
                    </header>

                    <Input 
                        placeholder="Título "
                        onChange={e => setTitle(e.target.value)}
                    />

                    <TextArea 
                        placeholder="observações"
                        onChange={e => setDescription(e.target.value)}
                    />

                  <Section title="Links úteis">
                    {
                        links.map((link, index) => (
                            <NoteItem  
                                key={String(index)}
                                value={link}
                                onClick={() => {handleRemoveLink(index)}}
                            />

                        ))
                    }

                        <NoteItem
                            isNew
                            placeholder="Novo Link"
                            value={newLinks}
                            onChange={e => setNewLinks(e.target.value)}
                            onClick={handleLinks}
                        />
                  </Section>

                  <Section title="Marcadores">
                    <div class="tags">
                        <NoteItem 
                            isNew
                            placeholder="Novo Marcador"
                            value={newTags}
                            onChange={e => setNewTags(e.target.value)}
                            onClick={handleTags}
                        />

                        {
                            tags.map((tags, index) => (
                                <NoteItem 
                                    key={String(index)}
                                    value={tags}
                                    onClick={() => {handleRemoveTag(index)}}
                                />
                            ))
                        }

                    </div>
                  </Section>
                    
                  <Button 
                    title="salvar"
                    onClick={handleNewNote}
                  />


                </Form>
            </main>

        </Container>
    )
}