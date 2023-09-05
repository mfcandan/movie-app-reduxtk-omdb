import { Container, Flex, Text } from '@mantine/core';
import MovieList from './components/MovieList';

function App() {
  return (
    <Container>
      <Flex h="100vh" direction="column" justify="center">
        <h1>💫 Movie Map: Film Arama Motoru </h1>
        <Text mb="lg">
          🔎 Arama yapmak için aşağıdaki arama kutusuna bir film adı girin ve
          arama butonuna tıklayın. Dilerseniz yayınlanma yılı ve tür bilgilerini de girerek aramanızı daraltabilirsiniz.
        </Text>
        <MovieList />
      </Flex>
    </Container>
  );
}

export default App;