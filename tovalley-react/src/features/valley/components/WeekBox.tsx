import styled from 'styled-components'

interface ContainerProps {
  weekend: string
}

const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: right;
  padding: 0 1.2em;
  height: 20px;
  margin-bottom: 2em;

  p {
    font-weight: bold;
    font-size: 1.1em;
    color: ${({ weekend }) =>
      weekend === '일' ? `#F52E2E` : weekend === '토' ? `#567BFD` : ``};
  }

  @media screen and (max-width: 450px) {
    padding: 0 0.6em;
  }
`

const WeekBox = ({ weekName }: { weekName: string }) => {
  return (
    <Container weekend={weekName}>
      <p>{weekName}</p>
    </Container>
  )
}

export default WeekBox
