import { Container, Brand, Menu, Search, Content, NewNote } from './styles'

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



    useEffect(() => {
        async function fetchTags(){
            const response = await api.get("/tags")
            setTags(response.data)
        }
        fetchTags()
    },[])

    return(
        <Container>
            <Brand>
                <h1>Rocket Notes</h1>
            </Brand>

            <Header />

            <Menu>
                <li><ButtonText title="todos" isActive/></li>
                {
                    tags && tags.map(tag => (
                        <li key={String(tag.id)}>
                            <ButtonText
                
                                title={tag.name}
                            />
                        </li>
                    ))
                }
            </Menu>

            <Search>
                <Input placeholder="pesquisar pelo título" icon={FiSearch}/>
            </Search>

            <Content>
                <Section title="Minhas notas">
                   <Note data={{ title: 'React',
                    tags: [
                        {id: '1', name: 'react'},
                        {id: '2', name: 'rocketseat'}
                    ]
                    }}
                    />
                </Section>
            </Content>


            <NewNote to="/new">
                <FiPlus />
                Criar nota
            </NewNote>
        </Container>
    );
}