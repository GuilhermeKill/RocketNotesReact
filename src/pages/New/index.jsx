import { Link } from "react-router-dom";
import { Header } from '../../componets/Header'
import { Input } from '../../componets/Input'
import { TextArea } from '../../componets/TextArea'
import { NoteItem } from '../../componets/NoteItem'
import { Section } from '../../componets/Section'
import { Button } from '../../componets/Button'

import { useState } from "react";

import { Container, Form } from './styles'

export function New(){
    const [links, setLinks] = useState([])
    const [newLinks, setNewLinks] = useState("")

    const [tags, setTags] = useState([])
    const [newTags, setNewTags] = useState("")

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
                    />

                    <TextArea placeholder="observações"/>

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
                    
                  <Button title="salvar"/>


                </Form>
            </main>

        </Container>
    )
}