import { useState, useEffect } from 'react'
import { Container, Links, Content } from './styles'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../../services/api'

import { Section } from '../../componets/Section'
import { Header } from '../../componets/Header'
import { Button } from '../../componets/Button'
import { Tag } from '../../componets/Tag'
import { ButtonText } from '../../componets/ButtonText'

export function Details() {
  const [data, setData] = useState(null)
  const params = useParams()
  const navigate = useNavigate()

  function handleBack(){
    navigate(-1)
  }

  async function handleRemove(){
    const confirm = window.confirm("Deseja realmente remover a nota?")
    if(confirm){
      await api.delete(`/notes/${params.id}`)
      navigate(-1)
    }
  }

  useEffect(() => {
    async function fetchNotes(){
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data)

      
    }

    fetchNotes()
  }, [])
  
  return (
    <Container>
      <Header />
      { data &&
        <main>
          <Content>
            <ButtonText 
              title="Excluir nota" 
              onClick={handleRemove}
            />

            <h1>
              {data.title}
            </h1>

            <p>
              {data.description}
            </p>

            { data.links &&
              <Section title="Links úteis">
                <Links>
                  {
                    data.links.map(link => (
                      <li key={String(link.id)}>
                        <a href={`https://${link.url}`} target='_blank'>
                          {link.url}
                        </a>
                      </li>
                    ))
                  }
                </Links>
              </Section>
            }

            { data &&
              
                <Section title="Marcadores">
                  {
                    data.tags.map(tag => (
                      <Tag 
                        key={tag.id}
                        title={tag.name} 
                      />
                    ))
                  }
                </Section>
              
            }
            <Button 
              title="Voltar" 
              onClick={handleBack}
            />
          </Content>
        </main>
      }
    </Container>
  )
}