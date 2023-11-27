import { Link } from "react-router-dom";
import { Header } from '../../componets/Header'
import { Input } from '../../componets/Input'
import { TextArea } from '../../componets/TextArea'
import { NoteItem } from '../../componets/NoteItem'
import { Section } from '../../componets/Section'
import { Button } from '../../componets/Button'
 
import { Container, Form } from './styles'

export function New(){

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
                    <NoteItem value="htt´s://rocketseat.com.br"/>
                    <NoteItem  isNew/>
                  </Section>

                  <Section title="Marcadores">
                    <div class="tags">
                        <NoteItem value="react"/>
                        <NoteItem  isNew placeholder="nova tag"/>
                    </div>
                  </Section>
                    
                  <Button title="salvar"/>


                </Form>
            </main>

        </Container>
    )
}