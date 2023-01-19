import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Text,
  DrawerFooter,
  Image,
  Flex,
  Stack,
  Divider,
  Tag,
  Link,
  SimpleGrid,
  TagLeftIcon,
  TagLabel,
  Box,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import Anime from "../types/anime";
import { GenreColors } from "../const/theme";
import { LinkIcon } from "@chakra-ui/icons";

export interface AnimeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  item: Anime;
}

const AnimeDrawer = ({ isOpen, onClose, item }: AnimeDrawerProps) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    console.log(item);
  }, [item]);

  return (
    <>
      <Drawer
        size="md"
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Stack direction="row" gap="3">
              <Text>{item?.title}</Text>
              <Text>{item?.score} ⭐</Text>
            </Stack>
            <Text>{item?.title_japanese}</Text>
            <Divider border="1px" />
          </DrawerHeader>
          <DrawerBody>
            <Flex flexDirection="row">
              <Image
                objectFit="cover"
                height={{ base: "280px", md: "auto" }}
                width={{ base: "177px", md: "auto" }}
                src={item?.images.jpg.image_url}
              />

              <Stack direction="column" ml="1rem">
                {item.trailer.embed_url && (
                  <Link href={item.trailer.embed_url} mb="0.5rem">
                    <Tag variant="outline">
                      <TagLeftIcon as={LinkIcon} />
                      <TagLabel>Watch Trailer</TagLabel>
                    </Tag>
                  </Link>
                )}
                {item.episodes && (
                  <Flex gap="2">
                    <Text color="gray.600">Episodes:</Text>
                    <Text color="gray.600">{item.episodes}</Text>
                  </Flex>
                )}
                {item.duration && (
                  <Flex gap="2">
                    <Text color="gray.600">Duration:</Text>
                    <Text color="gray.600">{item.duration}</Text>
                  </Flex>
                )}
                {item.year && (
                  <Flex gap="2">
                    <Text color="gray.600">Year:</Text>
                    <Text color="gray.600">{item.year}</Text>
                  </Flex>
                )}
                {item.studios && (
                  <Flex gap="2" flexDirection="row">
                    <Text color="gray.600">Studios:</Text>
                    <SimpleGrid columns={2} gap={2}>
                      {item.studios.map((studio, i) => (
                        <Text color="gray.600" minW="82px" key={i}>
                          {studio.name}
                        </Text>
                      ))}
                    </SimpleGrid>
                  </Flex>
                )}
                {item.genres && (
                  <Flex gap="2" flexDirection="row">
                    <Text color="gray.600">Genres:</Text>
                    <SimpleGrid columns={1} gap={2}>
                      {item.genres.map((genre, i) => (
                        <Tag
                          minW="90px"
                          fontSize="sm"
                          key={i}
                          colorScheme={GenreColors[genre.name]}
                          borderRadius="full"
                        >
                          {genre.name}
                        </Tag>
                      ))}
                    </SimpleGrid>
                  </Flex>
                )}
              </Stack>
            </Flex>
            {item.synopsis && (
              <Flex flexDirection="column" px="5px" mt="1rem" pb="5px">
                <Text color="gray.600">Synopsis</Text>
                <Divider border="2px" mt="3px" mb="10px" />
                <Text color="gray.700">{item.synopsis}</Text>
              </Flex>
            )}
          </DrawerBody>

          <DrawerFooter>
            {/* <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AnimeDrawer;
