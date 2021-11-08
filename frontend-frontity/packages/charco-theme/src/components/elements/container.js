import { styled } from "frontity";

const Container = styled.div`
  width: 960px;
  max-width: 960px;
  margin: 0 auto;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 560px) {
    grid-template-columns: 1fr 1fr;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    grid-gap: 16px;
  }
`

export { Container, Row };