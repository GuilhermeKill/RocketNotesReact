import { Container, Brand, Menu, Search, Content, NewNote } from './styles'

import { FiPlus, FiSearch } from 'react-icons/fi'

import { Section } from '../../componets/Section'
import { Input } from '../../componets/Input'
import { Header } from '../../componets/Header'
import { ButtonText } from '../../componets/ButtonText'
import { Note } from '../../componets/Note'


export function Home(){
    

    return(
        <Container>
            <Brand>
                <h1>Rocket Notes</h1>
            </Brand>

            <Header />

            <Menu>
                <li><ButtonText title="todos" isActive/></li>
                <li><ButtonText title="React"/></li>
                <li><ButtonText title="node"/></li>
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