import { RiShutDownLine } from 'react-icons/ri'
import { Container, Profile, Logout } from './styles'
import { useAuth } from '../../hooks/auth'


export function Header() {
  const { singOut } = useAuth()
  return (
    <Container>

      <Profile to="/Profile">
        <img
          src="https://github.com/rodrigo.png"
          alt="Foto do usuário"
        />

        <div>
          <span>Bem-vindo</span>
          <strong>Rodrigo Gonçalves</strong>
        </div>
      </Profile>

      <Logout onClick={singOut}>
        <RiShutDownLine />
      </Logout>
    </Container>
  )
}