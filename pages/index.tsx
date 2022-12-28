import {
  Container,
  Text,
  InputGroup,
  InputRightElement,
  Input,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import $anime from "../services/anime";
import { useEffect } from "react";

export default function Home() {
  const getAnime = () => {
    $anime.getAnime();
  };
  const getAnimeById = () => {
    $anime.getAnimeById("1");
  };

  useEffect(() => {
    getAnime();
    getAnimeById();
  }, []);

  return (
    <>
      <Container
        maxW="container.xl"
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="1rem"
      >
        <Text fontSize={{ base: "4xl", md: "5xl" }} mt="1rem">
          MyAnimeList API Simple Client
        </Text>
        <InputGroup maxW="700px">
          <InputRightElement pointerEvents="none">
            <Search2Icon />
          </InputRightElement>
          <Input type="text" placeholder="Type anime name" />
        </InputGroup>
      </Container>
    </>
  );
}
