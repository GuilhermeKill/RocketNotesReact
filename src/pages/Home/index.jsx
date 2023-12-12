import { Container, Brand, Menu, Search, Content, NewNote } from './styles'

import { useNavigate } from 'react-router-dom'

import { FiPlus, FiSearch } from 'react-icons/fi'

import { Section } from '../../componets/Section'
import { Input } from '../../componets/Input'
import { Header } from '../../componets/Header'
import { ButtonText } from '../../componets/ButtonText'
import { Note } from '../../componets/Note'

import { api } from '../../services/api'
import { useEffect, useState } from 'react'

export function Home(){
    const [tags, setTags] = useState([])
    const [tagsSelected, setTagsSelected] = useState([])
    const [search, setSearch] = useState("")
    const [notes, setNotes] = useState([])

    const navigate = useNavigate()

    function handleTagSelected(tagName){
        if(tagName === "all"){
            return setTagsSelected([])
        }

        const alreadySelected = tagsSelected.includes(tagName)

        if(alreadySelected){
            const filteredTags = tagsSelected.filter(tag => tag !== tagName)
            setTagsSelected(filteredTags)
        }else{
            setTagsSelected(prevState => [...prevState, tagName])
        }
        
        console.log(tagsSelected)
    }

    function handleDetails(id){
        navigate(`/details/${id}`)
    }

    useEffect(() => {
        async function fetchTags(){
            const response = await api.get("/tags")
            setTags(response.data)
        }
        fetchTags()
    }, [])

    useEffect(() => {
        async function fetchNotes(){
            const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)
            setNotes(response.data)
            console.log(notes)
        }

        fetchNotes()
    }, [tagsSelected, search])

    return(
        <Container>
            <Brand>
                <h1>Rocket Notes</h1>
            </Brand>

            <Header />

            <Menu>
                <li>
                    <ButtonText 
                        title="todos"
                        onClick={() => handleTagSelected("all")}
                        isActive={tagsSelected.length === 0}
                    />
                
                
                </li>
                {
                    tags && tags.map(tag => (
                        <li key={String(tag.id)}>
                            <ButtonText
                                onClick={() => handleTagSelected(tag.name)}
                                title={tag.name}
                                isActive={tagsSelected.includes(tag.name)}
                            />
                        </li>
                    ))
                }
            </Menu>

            <Search>
                <Input 
                    placeholder="pesquisar pelo título"
                    icon={FiSearch}
                    onChange={(e) => setSearch(e.target.value)}
                 />
            </Search>

            <Content>
                <Section title="Minhas notas">
                    {
                        notes.map(note => (
                            <Note 
                                key={String(note.id)}
                                data={note}
                                onClick={() => handleDetails(note.id)}
                                />))
                    }
                   
                   
                </Section>
            </Content>


            <NewNote to="/new">
                <FiPlus />
                Criar nota
            </NewNote>
        </Container>
    );
}