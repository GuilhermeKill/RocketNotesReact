import { Container } from './styles'

export function ButtonText({ title, isActive, ...rest }) {
  return (
    <Container
      type="button"
      {...rest}
      $isactive={isActive}
    >
      {title}
    </Container>
  )
}